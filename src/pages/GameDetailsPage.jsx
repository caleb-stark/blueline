import { useParams } from "react-router-dom"
import useGameDetails from "../features/games/hooks/useGameDetails"
import GameHeader from "../features/games/components/GameHeader"
import GameScoreboard from "../features/games/components/GameScoreboard"
import BoxScore from "../features/games/components/BoxScore"
import ScoringSummary from "../features/games/components/ScoringSummary"
import PenaltySummary from "../features/games/components/PenaltySummary"
import PlayByPlay from "../features/games/components/PlayByPlay"
import GameHighlights from "../features/games/components/GameHighlights"
import { canShowGameMedia } from "../features/games/utils/gameMedia"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"

function GameDetailsPage() {
  const { gameId } = useParams()
  const { landing, boxScore, playByPlay, loading, error, errors } = useGameDetails(gameId)

  if(loading) return <Loading />
  if(error) return <ErrorMessage message={error} />
  if(!landing) return <EmptyState title="Game unavailable" message={errors.landing || "This game does not have landing data."} />

  const showGameMedia = canShowGameMedia(landing)

  return(
    <div className="game-details-page">
      <GameHeader landing={landing} />
      <GameScoreboard landing={landing} />
      {showGameMedia && <GameHighlights landing={landing} />}
      {errors.boxScore ? <ErrorMessage message={errors.boxScore} /> : <BoxScore boxScore={boxScore} />}
      {showGameMedia && <ScoringSummary landing={landing} />}
      {errors.playByPlay ? <ErrorMessage message={errors.playByPlay} /> : <><PenaltySummary playByPlay={playByPlay} /><PlayByPlay playByPlay={playByPlay} /></>}
    </div>
  )
}

export default GameDetailsPage;
