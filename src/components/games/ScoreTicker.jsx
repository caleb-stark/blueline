import { getGameStatusLabel, getScore, getTeamAbbrev } from "../../utils/helpers"

function ScoreTicker({ games }){
  if(!games.length){
    return null
  }

  return(
    <section id="scores" className="score-ticker">
      <div className="section-heading compact-heading">
        <div>
          <p className="eyebrow">Scoreboard</p>
          <h2>Live and final scores</h2>
        </div>
      </div>

      <div className="ticker-list">
        {games.map((game) => (
          <div className="ticker-item" key={game.id}>
            <span>{getGameStatusLabel(game)}</span>
            <strong>{getTeamAbbrev(game.awayTeam)} {getScore(game.awayTeam)}</strong>
            <span>at</span>
            <strong>{getTeamAbbrev(game.homeTeam)} {getScore(game.homeTeam)}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ScoreTicker
