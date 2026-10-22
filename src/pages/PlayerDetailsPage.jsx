import { useState } from "react"
import { useParams } from "react-router-dom"
import usePlayer from "../features/players/hooks/usePlayer"
import usePlayerGameLog from "../features/players/hooks/usePlayerGameLog"
import { getCurrentNhlSeason } from "../utils/dates"
import PlayerHeader from "../features/players/components/PlayerHeader"
import PlayerSeasonStats from "../features/players/components/PlayerSeasonStats"
import PlayerGameLog from "../features/players/components/PlayerGameLog"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"

function PlayerDetailsPage() {
  const { playerId } = useParams()
  const [gameType, setGameType] = useState("2")
  const playerState = usePlayer(playerId)
  const season = getCurrentNhlSeason()
  const logState = usePlayerGameLog(playerId, season, gameType)

  if(playerState.loading) return <Loading />
  if(playerState.invalid) return <EmptyState title="Player not found" message="That route does not contain a valid NHL player ID." />
  if(playerState.error) return <ErrorMessage message={playerState.error} />

  return(
    <div className="player-details-page">
      <PlayerHeader player={playerState.player} />
      <PlayerSeasonStats player={playerState.player} />
      <PlayerGameLog gameLog={logState.gameLog} gameType={gameType} season={season} loading={logState.loading} error={logState.error} onGameTypeChange={setGameType} />
    </div>
  )
}

export default PlayerDetailsPage;
