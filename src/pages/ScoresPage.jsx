import { useState } from "react"
import useScores from "../features/games/hooks/useScores"
import GameGrid from "../features/games/components/GameGrid"
import DateControls from "../features/games/components/DateControls"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"
import { formatDate } from "../utils/dates"

function ScoresPage(){
  const [selectedDate, setSelectedDate] = useState(() => formatDate())
  const { games, loading, error, refetch } = useScores(selectedDate)
  let content = <GameGrid games={games} variant="scores" />

  if(loading){
    content = <Loading />
  }

  if(error){
    content = <ErrorMessage message={error} onRetry={refetch} />
  }

  if(!loading && !error && games.length === 0){
    content = <EmptyState title="No scores available" message={`There are no scores for ${selectedDate}.`} />
  }

  return (
    <div>
      <h1 className="page-title">Scores</h1>
      <DateControls
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      {content}
    </div>
  )
}

export default ScoresPage;
