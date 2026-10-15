function teamLabel(team){
  return team?.abbrev || team?.commonName?.default || "—"
}

function score(team){
  return typeof team?.score === "number" ? team.score : "—"
}

function GameScoreboard({ landing }){
  return(
    <section className="panel-card game-scoreboard" aria-labelledby="scoreboard-heading">
      <div className="section-heading"><h2 id="scoreboard-heading">Scoreboard</h2><span>{landing?.gameState || "Unknown"}</span></div>
      <div className="game-detail-score">
        <div><span>{teamLabel(landing?.awayTeam)}</span><strong>{score(landing?.awayTeam)}</strong></div>
        <b>at</b>
        <div><span>{teamLabel(landing?.homeTeam)}</span><strong>{score(landing?.homeTeam)}</strong></div>
      </div>
    </section>
  )
}

export default GameScoreboard
