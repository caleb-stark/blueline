import { useCallback, useEffect, useState } from "react"
import { getSchedule, getScores } from "../../games/api/gamesApi"
import { getStandings } from "../../standings/api/standingsApi"

function useDashboardData(date){
  const [data, setData] = useState({ games:[], scores:[], standings:[] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey(value => value + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function loadDashboard(){
      setLoading(true)
      setError(null)

      try{
        const [scheduleData, scoreData, standingsData] = await Promise.all([
          getSchedule(date, { signal:controller.signal }),
          getScores(date, { signal:controller.signal }),
          getStandings(date, { signal:controller.signal })
        ])
        const selectedDay = Array.isArray(scheduleData?.gameWeek)
          ? scheduleData.gameWeek.find(day => day?.date === date)
          : null
        const games = Array.isArray(selectedDay?.games) ? selectedDay.games : []
        const scores = Array.isArray(scoreData?.games)
          ? scoreData.games.filter(game => game?.gameDate === date)
          : []
        const standings = Array.isArray(standingsData?.standings) ? standingsData.standings : []

        if(active){
          setData({ games, scores, standings })
          setLoading(false)
        }
      }catch(requestError){
        if(requestError?.name === "AbortError"){
          return
        }

        if(active){
          setData({ games:[], scores:[], standings:[] })
          setError(requestError?.message || "Unable to load dashboard data")
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      active = false
      controller.abort()
    }
  }, [date, reloadKey])

  return { ...data, loading, error, refetch }
}

export default useDashboardData
