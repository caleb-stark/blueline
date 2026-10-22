import { Link } from "react-router-dom"
import { gameHasStarted, getGameState, getGameStatusLabel, getScore, getTeamAbbrev, getTeamLogo } from "../../../utils/games"

function GameCard({ game, variant }){
  const awayTeam = game?.awayTeam
  const homeTeam = game?.homeTeam
  const awayScore = getScore(awayTeam)
  const homeScore = getScore(homeTeam)
  const awayAbbrev = getTeamAbbrev(awayTeam)
  const homeAbbrev = getTeamAbbrev(homeTeam)
  const awayLogo = getTeamLogo(awayTeam)
  const homeLogo = getTeamLogo(homeTeam)
  const gameState = getGameState(game)
  const isScoreCard = variant === "scores"
  const isUpcoming = isScoreCard && gameState === "scheduled"
  const isLive = isScoreCard && gameState === "live"
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
    <article className={`game-card${isUpcoming ? " game-card-upcoming" : ""}${isLive ? " game-card-live" : ""}`}>
      <div className="game-card-top">
        <span>{getGameStatusLabel(game)}</span>
      </div>

      <Link to={`/games/${game?.id}`} className="game-card-link">
        <div className="game-card-matchup">
          <div className="game-card-team game-card-away">
            {awayLogo && <img className="game-card-logo" src={awayLogo} alt={`${awayAbbrev || "Away team"} logo`} />}
            <strong>{awayTeamAbbrev}</strong>
            {!isUpcoming && <span>{awayScoreLabel}</span>}
          </div>

          <span className={isUpcoming ? "game-card-vs" : "game-card-at"}>{isUpcoming ? "VS" : "at"}</span>

          <div className="game-card-team game-card-home">
            {homeLogo && <img className="game-card-logo" src={homeLogo} alt={`${homeAbbrev || "Home team"} logo`} />}
            <strong>{homeTeamAbbrev}</strong>
            {!isUpcoming && <span>{homeScoreLabel}</span>}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default GameCard
