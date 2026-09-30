import { useEffect, useState } from "react"
import Navbar from "../components/layout/Navbar"
import PageHeader from "../components/layout/PageHeader"
import ScheduleControls from "../components/games/ScheduleControls"
import ScoreTicker from "../components/games/ScoreTicker"
import GameGrid from "../components/games/GameGrid"
import LeagueSnapshot from "../components/stats/LeagueSnapshot"
import StandingsPreview from "../components/stats/StandingsPreview"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import { getNhlSchedule, getNhlScores, getNhlStandings } from "../utils/api"
import { getToday } from "../utils/helpers"

function getGamesForSelectedDate(scheduleData, selectedDate){
  const days = scheduleData?.gameWeek || []
  const selectedDay = days.find((day) => day.date === selectedDate)

  if(selectedDay?.games){
    return selectedDay.games
  }

  return days.flatMap((day) => day.games || [])
}

function Dashboard(){
  const [selectedDate, setSelectedDate] = useState(getToday())
  const [scheduleGames, setScheduleGames] = useState([])
  const [scoreGames, setScoreGames] = useState([])
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function loadDashboardData(dateValue){
    setLoading(true)
    setError("")

    const results = await Promise.allSettled([
      getNhlSchedule(dateValue),
      getNhlScores(dateValue),
      getNhlStandings()
    ])

    const scheduleResult = results[0]
    const scoreResult = results[1]
    const standingsResult = results[2]

    if(scheduleResult.status === "fulfilled"){
      setScheduleGames(getGamesForSelectedDate(scheduleResult.value, dateValue))
    }else{
      setScheduleGames([])
    }

    if(scoreResult.status === "fulfilled"){
      setScoreGames(scoreResult.value?.games || [])
    }else{
      setScoreGames([])
    }

    if(standingsResult.status === "fulfilled"){
      setStandings(standingsResult.value?.standings || [])
    }else{
      setStandings([])
    }

    if(scheduleResult.status === "rejected" && scoreResult.status === "rejected"){
      setError(`${scheduleResult.reason.message} | ${scoreResult.reason.message}`)
    }

    setLoading(false)
  }

  function handleDateChange(event){
    const nextDate = event.target.value
    setSelectedDate(nextDate)
    loadDashboardData(nextDate)
  }

  function handleRefresh(){
    loadDashboardData(selectedDate)
  }

  useEffect(() => {
    loadDashboardData(selectedDate)
  }, [])

  return(
    <div className="app-shell">
      <Navbar />

      <main className="dashboard-container">
        <PageHeader selectedDate={selectedDate} />
        <ScheduleControls selectedDate={selectedDate} onDateChange={handleDateChange} onRefresh={handleRefresh} />

        {error && <ErrorMessage message={error} onRetry={handleRefresh} />}

        {loading && <Loading />}

        {!loading && !error && (
          <>
            <LeagueSnapshot games={scoreGames.length ? scoreGames : scheduleGames} standings={standings} />
            <ScoreTicker games={scoreGames} />

            <section id="games" className="panel-card">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Schedule</p>
                  <h2>Games on the board</h2>
                </div>
                <span>{scheduleGames.length} matchups</span>
              </div>

              <GameGrid games={scheduleGames} />
            </section>

            <StandingsPreview standings={standings} />
          </>
        )}
      </main>
    </div>
  )
}

export default Dashboard
