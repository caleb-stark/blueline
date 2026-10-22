import { useState } from "react"
import useGames from "../features/games/hooks/useGames"
import ScheduleWeek from "../features/games/components/ScheduleWeek"
import WeekControls from "../features/games/components/WeekControls"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"
import { formatDate } from "../utils/dates"

function GamesPage(){
  const [selectedDate, setSelectedDate] = useState(() => formatDate())

  const { gameWeek, loading, error, refetch } = useGames(selectedDate)
  let content = <ScheduleWeek gameWeek={gameWeek} />

  if(loading){
    content = <Loading />
  }

  if(error){
    content = <ErrorMessage message={error} onRetry={refetch} />
  }

  if(!loading && !error && (!Array.isArray(gameWeek) || gameWeek.length === 0)){
    content = <EmptyState title="No games scheduled" message={`There are no NHL games in the week starting ${selectedDate}.`} />
  }

  return(
    <div>
      <h1 className="page-title">Schedule</h1>
      <WeekControls
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onRefresh={refetch}
      />

      {content}
    </div>
  )
}

export default GamesPage
