import { useCallback, useEffect, useState } from "react"
import { getSchedule } from "../api/gamesApi"

function useGames(date){
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

    async function loadGames(){
      setLoading(true)
      setError(null)

      try{
        const data = await getSchedule(date, { signal:controller.signal })
        let gameWeek = []

        if(Array.isArray(data?.gameWeek)){
          gameWeek = data.gameWeek
        }

        const selectedDay = gameWeek.find(day => day?.date === date)
        let selectedGames = []

        if(Array.isArray(selectedDay?.games)){
          selectedGames = selectedDay.games
        }

        if(active){
          setGames(selectedGames)
          setLoading(false)
        }
      }catch(requestError){
        if(requestError?.name === "AbortError"){
          return
        }

        if(active){
          setGames([])
          setError(requestError?.message || "Unable to load games")
          setLoading(false)
        }
      }
    }

    loadGames()

    return () => {
      active = false
      controller.abort()
    }
  }, [date, reloadKey])

  return {
    games,
    loading,
    error,
    refetch
  }
}

export default useGames;
