import { Link } from "react-router-dom"
import GameCard from "../../games/components/GameCard"
import EmptyState from "../../../components/ui/EmptyState"
import ErrorMessage from "../../../components/ui/ErrorMessage"
import Loading from "../../../components/ui/Loading"
import Panel from "../../../components/ui/Panel"

function mergeGames(games, scores){
  const scoresById = new Map(scores.map(game => [game?.id, game]))
  return games.map(game => scoresById.get(game?.id) || game).slice(0, 3)
}

function DashboardGames({ games, scores, loading, error, onRetry }){
  let content = <Loading />

  if(!loading && error){
    content = <ErrorMessage message={error} onRetry={onRetry} />
  }

  if(!loading && !error){
    const topGames = mergeGames(games, scores)
    content = topGames.length
      ? <div className="game-grid dashboard-game-grid">{topGames.map(game => <GameCard key={game.id} game={game} variant="dashboard" />)}</div>
      : <EmptyState title="No games scheduled" message="There are no NHL games on today&apos;s schedule." />
  }

  return(
    <Panel
      title="Today&apos;s games"
      action={<Link className="panel-link" to="/games">View schedule</Link>}
    >
      {content}
    </Panel>
  )
}

export default DashboardGames
