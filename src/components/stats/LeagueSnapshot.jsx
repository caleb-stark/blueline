function LeagueSnapshot({ games, standings }){
  const liveGames = games.filter((game) => game.gameState === "LIVE").length
  const finalGames = games.filter((game) => game.gameState === "FINAL" || game.gameState === "OFF").length
  const scheduledGames = games.length
  const teamsTracked = standings.length

  return(
    <section className="snapshot-grid">
      <div className="snapshot-card hero-stat">
        <span>Games today</span>
        <strong>{scheduledGames}</strong>
      </div>

      <div className="snapshot-card">
        <span>Live games</span>
        <strong>{liveGames}</strong>
      </div>

      <div className="snapshot-card">
        <span>Finals</span>
        <strong>{finalGames}</strong>
      </div>

      <div className="snapshot-card">
        <span>Teams tracked</span>
        <strong>{teamsTracked}</strong>
      </div>
    </section>
  )
}

export default LeagueSnapshot
