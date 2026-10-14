import { Link } from "react-router-dom"

function formatStat(value){
  if(typeof value === "number" && Number.isFinite(value)){
    return value
  }

  return "—"
}

function getTeamLabel(team){
  if(typeof team?.teamName?.default === "string" && team.teamName.default){
    return team.teamName.default
  }

  if(typeof team?.teamAbbrev?.default === "string" && team.teamAbbrev.default){
    return team.teamAbbrev.default
  }

  return "Unknown team"
}

function getTeamAbbrev(team){
  if(typeof team?.teamAbbrev?.default === "string" && team.teamAbbrev.default){
    return team.teamAbbrev.default
  }

  return null
}

function StandingsTable({ standings }){
  if(!Array.isArray(standings) || standings.length === 0){
    return null
  }

  return(
    <div className="standings-table">
      <div className="standings-row standings-head">
        <span>Team</span>
        <span>GP</span>
        <span>W</span>
        <span>L</span>
        <span>OTL</span>
        <span>PTS</span>
      </div>

      {standings.map((team, index) => {
        const abbrev = getTeamAbbrev(team)
        let teamContent = <strong>{getTeamLabel(team)}</strong>

        if(abbrev){
          teamContent = <Link to={`/teams/${abbrev}`}>{getTeamLabel(team)}</Link>
        }

        return(
          <div className="standings-row" key={abbrev || index}>
            {teamContent}
            <span>{formatStat(team.gamesPlayed)}</span>
            <span>{formatStat(team.wins)}</span>
            <span>{formatStat(team.losses)}</span>
            <span>{formatStat(team.otLosses)}</span>
            <span>{formatStat(team.points)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default StandingsTable
