import { useState } from "react"
import useGames from "../features/games/hooks/useGames"
import GameGrid from "../features/games/components/GameGrid"
import ScheduleControls from "../features/games/components/ScheduleControls"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"
import { formatDate } from "../utils/dates"

function GamesPage(){
  const [selectedDate, setSelectedDate] = useState(() => formatDate())

  const { games, loading, error, refetch } = useGames(selectedDate)
  let content = <GameGrid games={games} />

  if(loading){
    content = <Loading />
  }

  if(error){
    content = <ErrorMessage message={error} onRetry={refetch} />
  }

  if(!loading && !error && games.length === 0){
    content = <EmptyState title="No games scheduled" message={`There are no NHL games on ${selectedDate}.`} />
  }

  return(
    <div>
      <h1>Games</h1>
      <ScheduleControls
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onRefresh={refetch}
      />

      {content}
    </div>
  )
}

export default GamesPage
