import { Link } from "react-router-dom"

function playerLabel(player){
  return player?.name?.default || "Unknown player"
}

function playersForTeam(teamStats){
  if(Array.isArray(teamStats)){
    return [{ label:"Skaters", players:teamStats.filter(player => player?.points > 0) }]
  }

  const skaters = [...(teamStats?.forwards || []), ...(teamStats?.defense || [])]
    .filter(player => player?.points > 0)
  const goalies = Array.isArray(teamStats?.goalies)
    ? teamStats.goalies.filter(player => typeof player?.saves === "number" && player.saves > 0)
    : []

  return [
    { label:"Skaters", players:skaters },
    { label:"Goalies", players:goalies }
  ]
    .filter(group => group.players.length > 0)
}

function playerStats(player, groupLabel){
  if(groupLabel === "Goalies"){
    return `${player.saves} SV`
  }

  return `${player?.goals ?? 0} G · ${player?.assists ?? 0} A · ${player?.points ?? 0} P`
}

function BoxScore({ boxScore }){
  const teams = ["awayTeam", "homeTeam"]
    .map(key => ({ key, groups:playersForTeam(boxScore?.playerByGameStats?.[key]) }))
    .filter(team => team.groups.some(group => group.players.length > 0))

  if(teams.length === 0){
    return <div className="empty-card"><div><strong>No box score available</strong><p>Box-score data is not available for this game.</p></div></div>
  }

  return(
    <section className="panel-card" aria-labelledby="box-score-heading">
      <div className="section-heading"><h2 id="box-score-heading">Box score</h2></div>
      {teams.map(({ key, groups }) => (
        <div className="box-score-team" key={key}>
          <h3>{key === "awayTeam" ? "Away" : "Home"}</h3>
          {groups.map(group => (
            <div className="box-score-group" key={group.label || "players"}>
              {group.label && <h4>{group.label}</h4>}
              <div className="box-score-list">
                {group.players.map((player, index) => (
                  <div className="box-score-row" key={player?.playerId || `${key}-${group.label || "players"}-${index}`}>
                    {player?.playerId ? <Link to={`/players/${player.playerId}`}>{playerLabel(player)}</Link> : <span>{playerLabel(player)}</span>}
                    <span>{playerStats(player, group.label)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
      ))}
    </section>
  )
}

export default BoxScore
