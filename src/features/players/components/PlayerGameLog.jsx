function PlayerGameLog({ gameLog, gameType, season, loading, error, onGameTypeChange }){
  return(
    <section className="panel-card" aria-labelledby="player-game-log-heading">
      <div className="section-heading"><h2 id="player-game-log-heading">Game log</h2><span>{season}</span></div>
      <div className="player-log-controls">
        <label>Season <span>{season}</span></label>
        <label>Game type<select value={gameType} onChange={event => onGameTypeChange(event.target.value)}><option value="2">Regular season</option><option value="3">Playoffs</option></select></label>
      </div>
      {loading && <p className="muted-text">Loading game log...</p>}
      {!loading && error && <p className="error-text">{error}</p>}
      {!loading && !error && gameLog.length === 0 && <p className="muted-text">No games available for this selection.</p>}
      {!loading && !error && gameLog.length > 0 && <div className="player-log-list">{gameLog.map((game, index) => <div className="player-log-row" key={game?.gameId || index}><span>{game?.gameDate || "—"}</span><strong>{game?.opponentAbbrev || "—"}</strong><span>{game?.goals ?? 0} G · {game?.assists ?? 0} A · {game?.points ?? 0} P</span></div>)}</div>}
    </section>
  )
}

export default PlayerGameLog
