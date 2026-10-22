import { useEffect, useState } from "react"
import { getPlayerGameLog } from "../api/playersApi"
import { validPlayerId } from "./usePlayer"

function validGameType(gameType){
  return gameType === "2" || gameType === "3"
}

function usePlayerGameLog(playerId, season, gameType){
  const [state, setState] = useState({ gameLog:[], loading:false, error:null })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    if(!validPlayerId(playerId) || !/^\d{8}$/.test(String(season)) || !validGameType(gameType)){
      return () => controller.abort()
    }

    async function loadGameLog(){
      setState({ gameLog:[], loading:true, error:null })

      try{
        const data = await getPlayerGameLog(playerId, season, gameType, { signal:controller.signal })
        const gameLog = Array.isArray(data?.gameLog) ? data.gameLog : []

        if(active){
          setState({ gameLog, loading:false, error:null })
        }
      }catch(requestError){
        if(requestError?.name === "AbortError" || !active){
          return
        }

        setState({ gameLog:[], loading:false, error:requestError?.message || "Unable to load game log" })
      }
    }

    loadGameLog()

    return () => {
      active = false
      controller.abort()
    }
  }, [playerId, season, gameType])

  const invalid = !validPlayerId(playerId) || !/^\d{8}$/.test(String(season)) || !validGameType(gameType)
  return { ...state, invalid }
}

export default usePlayerGameLog
