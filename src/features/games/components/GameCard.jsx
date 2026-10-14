import { Link } from "react-router-dom"
import { gameHasStarted, getGameStatusLabel, getScore, getTeamAbbrev } from "../../../utils/games"

function GameCard({ game }){
  const awayTeam = game?.awayTeam
  const homeTeam = game?.homeTeam
  const awayScore = getScore(awayTeam)
  const homeScore = getScore(homeTeam)
  const awayAbbrev = getTeamAbbrev(awayTeam)
  const homeAbbrev = getTeamAbbrev(homeTeam)
  let awayTeamAbbrev = "—"
  let homeTeamAbbrev = "—"
  let awayScoreLabel = "—"
  let homeScoreLabel = "—"

  if(awayAbbrev){
    awayTeamAbbrev = awayAbbrev
  }

  if(homeAbbrev){
    homeTeamAbbrev = homeAbbrev
  }

  if(gameHasStarted(game) && awayScore !== null){
    awayScoreLabel = awayScore
  }

  if(gameHasStarted(game) && homeScore !== null){
    homeScoreLabel = homeScore
  }

  return(
    <article className="game-card">
      <div className="game-card-top">
        <span>{getGameStatusLabel(game)}</span>
      </div>

      <Link to={`/games/${game?.id}`} className="game-card-link">
        <div className="game-card-matchup">
          <div className="game-card-team game-card-away">
            <strong>{awayTeamAbbrev}</strong>
            <span>{awayScoreLabel}</span>
          </div>

          <span className="game-card-at">at</span>

          <div className="game-card-team game-card-home">
            <strong>{homeTeamAbbrev}</strong>
            <span>{homeScoreLabel}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default GameCard
