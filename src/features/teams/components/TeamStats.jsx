function collectionCount(value){
  return Array.isArray(value) ? value.length : null
}

function formatStat(value){
  return typeof value === "number" && Number.isFinite(value) ? value : "—"
}

function TeamStats({ team, stats }){
  const teamStats = [
    ["Games played", team?.gamesPlayed],
    ["Wins", team?.wins],
    ["Losses", team?.losses],
    ["OT losses", team?.otLosses],
    ["Points", team?.points],
    ["Goals for", team?.goalFor],
    ["Goals against", team?.goalAgainst]
  ].filter(([, value]) => typeof value === "number" && Number.isFinite(value))
  const collectionStats = [
    ["Skaters listed", collectionCount(stats?.skaters)],
    ["Goalies listed", collectionCount(stats?.goalies)]
  ].filter(([, value]) => value !== null)
  const cards = teamStats.length > 0 ? teamStats : collectionStats

  if(cards.length === 0){
    return <div className="empty-card"><div><strong>No club stats available</strong><p>The NHL did not return club-stat collections for this team.</p></div></div>
  }

  return(
    <section className="panel-card" aria-labelledby="club-stats-heading">
      <div className="section-heading">
        <h2 id="club-stats-heading">Club stats</h2>
        <span>Current season</span>
      </div>
      <div className="team-stat-grid">
        {cards.map(([label, value]) => <div className="snapshot-card team-stat-card" key={label}><span>{label}</span><strong>{formatStat(value)}</strong></div>)}
      </div>
    </section>
  )
}

export default TeamStats
