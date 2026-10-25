import { useEffect, useState } from "react"
import { getGameRecap } from "../api/youtubeApi"
import { canShowGameMedia } from "../utils/gameMedia"
import { getGameState } from "../../../utils/games"

function useGameRecap(landing){
  const [state, setState] = useState({ key:null, recap:null, error:null })
  const shouldFetch = getGameState(landing) === "final" && canShowGameMedia(landing)
  const requestKey = landing?.id || landing?.gameDate || null
  const hasCurrentResult = state.key === requestKey

  useEffect(() => {
    if(!shouldFetch){
      return undefined
    }

    const controller = new AbortController()
    let active = true
    const timeoutId = setTimeout(() => {
      if(active){
        controller.abort()
        setState({ key:requestKey, recap:null, error:"The full-game recap lookup timed out" })
      }
    }, 8000)

    getGameRecap(landing, { signal:controller.signal })
      .then(recap => {
        if(active){
          clearTimeout(timeoutId)
          setState({ key:requestKey, recap, error:null })
        }
      })
      .catch(error => {
        if(active && error?.name !== "AbortError"){
          clearTimeout(timeoutId)
          setState({ key:requestKey, recap:null, error:error?.message || "Unable to load the full-game recap" })
        }
      })

    return () => {
      active = false
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [landing, requestKey, shouldFetch])

  return shouldFetch
    ? { recap:hasCurrentResult ? state.recap : null, loading:!hasCurrentResult, error:hasCurrentResult ? state.error : null }
    : { recap:null, loading:false, error:null }
}

export default useGameRecap
