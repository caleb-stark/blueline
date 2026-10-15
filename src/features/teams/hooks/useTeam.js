import { useEffect, useState } from "react"
import { getTeamRoster, getTeamStats } from "../api/teamsApi"
import { getStandings } from "../../standings/api/standingsApi"

function getRows(data){
  if(Array.isArray(data?.standings)){
    return data.standings
  }

  return Array.isArray(data) ? data : []
}

function getAbbreviation(row){
  return typeof row?.teamAbbrev?.default === "string" ? row.teamAbbrev.default : null
}

function getErrorMessage(reason){
  return reason?.message || "Unable to load team data"
}

function useTeam(teamAbbrev){
  const [state, setState] = useState({
    team:null,
    roster:null,
    stats:null,
    loading:true,
    error:null,
    errors:{ roster:null, stats:null },
    invalid:false
  })

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const requestedAbbrev = typeof teamAbbrev === "string" ? teamAbbrev.toUpperCase() : ""

    async function loadTeam(){
      setState((current) => ({ ...current, loading:true, error:null, invalid:false }))

      try{
        const standingsData = await getStandings("now", { signal:controller.signal })
        const team = getRows(standingsData).find((row) => getAbbreviation(row) === requestedAbbrev) || null

        if(!active){
          return
        }

        if(!team){
          setState({
            team:null,
            roster:null,
            stats:null,
            loading:false,
            error:null,
            errors:{ roster:null, stats:null },
            invalid:true
          })
          return
        }

        const results = await Promise.allSettled([
          getTeamRoster(requestedAbbrev, { signal:controller.signal }),
          getTeamStats(requestedAbbrev, { signal:controller.signal })
        ])

        if(!active){
          return
        }

        const rosterResult = results[0]
        const statsResult = results[1]
        const roster = rosterResult.status === "fulfilled" ? rosterResult.value : null
        const stats = statsResult.status === "fulfilled" ? statsResult.value : null
        const errors = {
          roster:rosterResult.status === "rejected" ? getErrorMessage(rosterResult.reason) : null,
          stats:statsResult.status === "rejected" ? getErrorMessage(statsResult.reason) : null
        }
        const error = errors.roster && errors.stats ? "Unable to load team data" : null

        setState({ team, roster, stats, loading:false, error, errors, invalid:false })
      }catch(requestError){
        if(requestError?.name === "AbortError" || !active){
          return
        }

        setState({
          team:null,
          roster:null,
          stats:null,
          loading:false,
          error:getErrorMessage(requestError),
          errors:{ roster:null, stats:null },
          invalid:false
        })
      }
    }

    loadTeam()

    return () => {
      active = false
      controller.abort()
    }
  }, [teamAbbrev])

  return state
}

export default useTeam
