import { useState } from "react"
import useGames from "../features/games/hooks/useGames"
import GameGrid from "../features/games/components/GameGrid"
import ScheduleControls from "../features/games/components/ScheduleControls"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"

function GamesPage(){
  const [selectedDate, setSelectedDate] = useState("2026-10-05")

  const { games, loading, error } = useGames(selectedDate)

  if(loading){
    return <Loading />
  }

  if(error){
    return <ErrorMessage message={error} />
  }

  return(
    <div>
        <h1>Games Page</h1>
      <ScheduleControls
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <GameGrid games={games} />
    </div>
  )
}

export default GamesPage