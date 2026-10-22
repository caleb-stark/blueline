import { useEffect, useState } from "react"
import { getPlayer } from "../api/playersApi"

function validPlayerId(playerId){
  return typeof playerId === "string" && /^\d+$/.test(playerId)
}

function usePlayer(playerId){
  const [state, setState] = useState({ player:null, loading:true, error:null })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    if(!validPlayerId(playerId)){
      return () => controller.abort()
    }

    async function loadPlayer(){
      setState(current => ({ ...current, loading:true, error:null }))

      try{
        const player = await getPlayer(playerId, { signal:controller.signal })

        if(active){
          setState({ player, loading:false, error:null })
        }
      }catch(requestError){
        if(requestError?.name === "AbortError" || !active){
          return
        }

        setState({ player:null, loading:false, error:requestError?.message || "Unable to load player data" })
      }
    }

    loadPlayer()

    return () => {
      active = false
      controller.abort()
    }
  }, [playerId])

  const invalid = !validPlayerId(playerId)
  return { ...state, loading:invalid ? false : state.loading, invalid }
}

export { validPlayerId }
export default usePlayer
