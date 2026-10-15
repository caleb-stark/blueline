function collectionCount(value){
  return Array.isArray(value) ? value.length : null
}

function TeamStats({ stats }){
  const skaters = collectionCount(stats?.skaters)
  const goalies = collectionCount(stats?.goalies)

  if(skaters === null && goalies === null){
    return <div className="empty-card"><div><strong>No club stats available</strong><p>The NHL did not return club-stat collections for this team.</p></div></div>
  }

  return(
    <section className="panel-card" aria-labelledby="club-stats-heading">
      <div className="section-heading">
        <h2 id="club-stats-heading">Club stats</h2>
        <span>Current season</span>
      </div>
      <div className="team-stat-grid">
        {skaters !== null && <div className="snapshot-card"><span>Skaters listed</span><strong>{skaters}</strong></div>}
        {goalies !== null && <div className="snapshot-card"><span>Goalies listed</span><strong>{goalies}</strong></div>}
      </div>
    </section>
  )
}

export default TeamStats
