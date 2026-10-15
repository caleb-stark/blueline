import { Link } from "react-router-dom"

function playerLabel(player){
  return player?.name?.default || "Unknown player"
}

function BoxScore({ boxScore }){
  const teams = ["awayTeam", "homeTeam"].filter(key => Array.isArray(boxScore?.playerByGameStats?.[key]))

  if(teams.length === 0){
    return <div className="empty-card"><div><strong>No box score available</strong><p>Box-score data is not available for this game.</p></div></div>
  }

  return(
    <section className="panel-card" aria-labelledby="box-score-heading">
      <div className="section-heading"><h2 id="box-score-heading">Box score</h2></div>
      {teams.map(teamKey => (
        <div className="box-score-team" key={teamKey}>
          <h3>{teamKey === "awayTeam" ? "Away" : "Home"}</h3>
          <div className="box-score-list">
            {boxScore.playerByGameStats[teamKey].map((player, index) => (
              <div className="box-score-row" key={player?.playerId || `${teamKey}-${index}`}>
                {player?.playerId ? <Link to={`/players/${player.playerId}`}>{playerLabel(player)}</Link> : <span>{playerLabel(player)}</span>}
                <span>{player?.goals ?? 0} G · {player?.assists ?? 0} A · {player?.points ?? 0} P</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default BoxScore
