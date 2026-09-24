function StandingsPreview({ standings }){
  const topTeams = standings.slice(0, 8)

  if(!topTeams.length){
    return null
  }

  return(
    <section id="standings" className="panel-card">
      <div className="section-heading compact-heading">
        <div>
          <p className="eyebrow">League table</p>
          <h2>Top standings preview</h2>
        </div>
      </div>

      <div className="standings-table">
        <div className="standings-row standings-head">
          <span>Team</span>
          <span>GP</span>
          <span>W</span>
          <span>L</span>
          <span>PTS</span>
        </div>

        {topTeams.map((team) => (
          <div className="standings-row" key={team.teamAbbrev?.default || team.teamName?.default}>
            <strong>{team.teamAbbrev?.default || team.teamName?.default}</strong>
            <span>{team.gamesPlayed}</span>
            <span>{team.wins}</span>
            <span>{team.losses}</span>
            <span>{team.points}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StandingsPreview
