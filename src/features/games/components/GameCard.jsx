import { Link } from "react-router-dom"
import { gameHasStarted, getGameStatusLabel, getScore, getTeamAbbrev, getTeamName } from "../../../utils/games"

function GameCard({ game }){
  const awayTeam = game?.awayTeam
  const homeTeam = game?.homeTeam
  const awayScore = getScore(awayTeam)
  const homeScore = getScore(homeTeam)
  const awayName = getTeamName(awayTeam)
  const homeName = getTeamName(homeTeam)
  const awayAbbrev = getTeamAbbrev(awayTeam)
  const homeAbbrev = getTeamAbbrev(homeTeam)
  const showScores = gameHasStarted(game)
  let awayTeamName = "Unknown team"
  let homeTeamName = "Unknown team"
  let awayTeamAbbrev = "—"
  let homeTeamAbbrev = "—"
  let scoreContent = null

  if(awayName){
    awayTeamName = awayName
  }

  if(homeName){
    homeTeamName = homeName
  }

  if(awayAbbrev){
    awayTeamAbbrev = awayAbbrev
  }

  if(homeAbbrev){
    homeTeamAbbrev = homeAbbrev
  }

  if(showScores){
    scoreContent = (
      <div className="game-card-score">
        <span>{awayScore === null ? "—" : awayScore}</span>
        <span>{homeScore === null ? "—" : homeScore}</span>
      </div>
    )
  }

  return(
    <article className="game-card">
      <div className="game-card-top">
        <span>{getGameStatusLabel(game)}</span>
      </div>

      <Link to={`/games/${game?.id}`} className="game-card-link">
        <div className="game-card-teams">
          <div>
            <span>{awayTeamName}</span>
            <strong>{awayTeamAbbrev}</strong>
          </div>

          <div>
            <span>{homeTeamName}</span>
            <strong>{homeTeamAbbrev}</strong>
          </div>
        </div>

        {scoreContent}
      </Link>
    </article>
  )
}

export default GameCard
