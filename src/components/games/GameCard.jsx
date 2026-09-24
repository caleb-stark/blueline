import { formatGameTime, getGameStatusLabel, getScore, getTeamAbbrev, getTeamName } from "../../utils/helpers"

function GameCard({ game }){
  const awayScore = getScore(game.awayTeam)
  const homeScore = getScore(game.homeTeam)
  const status = getGameStatusLabel(game)

  return(
    <article className="game-card">
      <div className="game-card-top">
        <span className="status-badge">{status}</span>
        <span>{formatGameTime(game.startTimeUTC)}</span>
      </div>

      <div className="team-row">
        <div>
          <span className="team-abbrev">{getTeamAbbrev(game.awayTeam)}</span>
          <p>{getTeamName(game.awayTeam)}</p>
        </div>
        <strong>{awayScore}</strong>
      </div>

      <div className="team-row home-team">
        <div>
          <span className="team-abbrev">{getTeamAbbrev(game.homeTeam)}</span>
          <p>{getTeamName(game.homeTeam)}</p>
        </div>
        <strong>{homeScore}</strong>
      </div>

      <div className="game-card-footer">
        <span>Matchup ID</span>
        <strong>{game.id}</strong>
      </div>
    </article>
  )
}

export default GameCard
