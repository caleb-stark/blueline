function value(stats, key){
  const result = stats?.[key]
  return result === null || result === undefined ? "—" : result
}

function StatTable({ title, stats, goalie }){
  const fields = goalie ? [["GP", "gamesPlayed"], ["W", "wins"], ["L", "losses"], ["SV%", "savePctg"], ["GAA", "goalsAgainstAvg"], ["SO", "shutouts"]] : [["GP", "gamesPlayed"], ["G", "goals"], ["A", "assists"], ["PTS", "points"], ["+/-", "plusMinus"], ["PIM", "pim"]]

  return(
    <div className="player-stat-block">
      <h3>{title}</h3>
      <div className="player-stat-grid">{fields.map(([label, key]) => <div className="snapshot-card" key={key}><span>{label}</span><strong>{value(stats, key)}</strong></div>)}</div>
    </div>
  )
}

function PlayerSeasonStats({ player }){
  const goalie = player?.position === "G"
  const regularSeason = player?.featuredStats?.regularSeason?.subSeason
  const career = player?.featuredStats?.regularSeason?.career

  if(!regularSeason && !career){
    return <div className="empty-card"><div><strong>No season stats available</strong><p>The NHL did not return featured season or career stats.</p></div></div>
  }

  return(
    <section className="panel-card" aria-labelledby="player-stats-heading">
      <div className="section-heading"><h2 id="player-stats-heading">Player stats</h2><span>{goalie ? "Goalie" : "Skater"}</span></div>
      {regularSeason && <StatTable title="Current season" stats={regularSeason} goalie={goalie} />}
      {career && <StatTable title="Career" stats={career} goalie={goalie} />}
    </section>
  )
}

export default PlayerSeasonStats
