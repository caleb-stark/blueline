import { useEffect, useState } from "react"
import { getGameLanding, getGameBoxScore, getGamePlayByPlay } from "../api/gamesApi"

function message(error){
  return error?.message || "Unable to load game data"
}

function useGameDetails(gameId){
  const [state, setState] = useState({
    landing:null,
    boxScore:null,
    playByPlay:null,
    loading:true,
    error:null,
    errors:{ landing:null, boxScore:null, playByPlay:null }
  })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function loadGame(){
      setState(current => ({ ...current, loading:true, error:null }))

      try{
        const results = await Promise.allSettled([
          getGameLanding(gameId, { signal:controller.signal }),
          getGameBoxScore(gameId, { signal:controller.signal }),
          getGamePlayByPlay(gameId, { signal:controller.signal })
        ])

        if(!active){
          return
        }

        const landingResult = results[0]
        const boxScoreResult = results[1]
        const playByPlayResult = results[2]
        const errors = {
          landing:landingResult.status === "rejected" ? message(landingResult.reason) : null,
          boxScore:boxScoreResult.status === "rejected" ? message(boxScoreResult.reason) : null,
          playByPlay:playByPlayResult.status === "rejected" ? message(playByPlayResult.reason) : null
        }

        setState({
          landing:landingResult.status === "fulfilled" ? landingResult.value : null,
          boxScore:boxScoreResult.status === "fulfilled" ? boxScoreResult.value : null,
          playByPlay:playByPlayResult.status === "fulfilled" ? playByPlayResult.value : null,
          loading:false,
          error:errors.landing && errors.boxScore && errors.playByPlay ? "Unable to load game data" : null,
          errors
        })
      }catch(error){
        if(error?.name === "AbortError" || !active){
          return
        }

        setState({ landing:null, boxScore:null, playByPlay:null, loading:false, error:message(error), errors:{ landing:null, boxScore:null, playByPlay:null } })
      }
    }

    loadGame()

    return () => {
      active = false
      controller.abort()
    }
  }, [gameId])

  return state
}

export default useGameDetails
