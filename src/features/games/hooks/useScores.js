import { useCallback, useEffect, useState } from "react"
import { getScores } from "../api/gamesApi"

function useScores(date){
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey(value => value + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function loadScores(){
      setLoading(true)
      setError(null)

      try{
        const data = await getScores(date, { signal:controller.signal })
        let scoreGames = []

        if(Array.isArray(data?.games)){
          scoreGames = data.games.filter(game => game?.gameDate === date)
        }

        if(active){
          setGames(scoreGames)
          setLoading(false)
        }
      }catch(requestError){
        if(requestError?.name === "AbortError"){
          return
        }

        if(active){
          setGames([])
          setError(requestError?.message || "Unable to load scores")
          setLoading(false)
        }
      }
    }

    loadScores()

    return () => {
      active = false
      controller.abort()
    }
  }, [date, reloadKey])

  return { games, loading, error, refetch }
}

export default useScores
