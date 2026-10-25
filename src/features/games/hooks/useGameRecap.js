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

    getGameRecap(landing, { signal:controller.signal })
      .then(recap => {
        if(active){
          setState({ key:requestKey, recap, error:null })
        }
      })
      .catch(error => {
        if(active && error?.name !== "AbortError"){
          setState({ key:requestKey, recap:null, error:error?.message || "Unable to load the full-game recap" })
        }
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [landing, requestKey, shouldFetch])

  return shouldFetch
    ? { recap:hasCurrentResult ? state.recap : null, loading:!hasCurrentResult, error:hasCurrentResult ? state.error : null }
    : { recap:null, loading:false, error:null }
}

export default useGameRecap
