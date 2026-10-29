import { Link } from "react-router-dom"

const groups = [
  ["forwards", "Forwards"],
  ["defensemen", "Defensemen"],
  ["goalies", "Goalies"]
]

function playerName(player){
  const first = typeof player?.firstName?.default === "string" ? player.firstName.default : ""
  const last = typeof player?.lastName?.default === "string" ? player.lastName.default : ""
  return `${first} ${last}`.trim() || "Unnamed player"
}

function playerPosition(player, groupKey){
  if(typeof player?.positionCode === "string" && player.positionCode){
    return player.positionCode
  }

  return groupKey === "defensemen" ? "D" : groupKey === "goalies" ? "G" : "F"
}

function TeamRoster({ roster }){
  const availableGroups = groups.map(([key, label]) => ({ key, label, players:Array.isArray(roster?.[key]) ? roster[key] : [] }))

  if(availableGroups.every((group) => group.players.length === 0)){
    return <div className="empty-card"><div><strong>No roster available</strong><p>The NHL did not return roster groups for this team.</p></div></div>
  }

  return(
    <section className="team-roster panel-card" aria-labelledby="roster-heading">
      <div className="section-heading">
        <h2 id="roster-heading">Roster</h2>
        <span>Current roster</span>
      </div>
      {availableGroups.map((group) => (
        <section className="roster-group" key={group.key} aria-labelledby={`${group.key}-heading`}>
          <div className="section-heading compact-heading"><h3 id={`${group.key}-heading`}>{group.label}</h3><span>{group.players.length}</span></div>
          {group.players.length === 0 ? <p className="muted-text">No players listed.</p> : (
            <ul className="roster-list">
              {group.players.map((player, index) => {
                const playerId = player?.id
                const key = playerId ?? `${group.key}-${index}`
                const content = (
                  <>
                    {player?.headshot && <img src={player.headshot} alt="" width="64" height="64" loading="lazy" decoding="async" />}
                    <span><strong>{playerName(player)}</strong><small>{playerPosition(player, group.key)}</small></span>
                  </>
                )
                return playerId
                  ? <li key={key}><Link className="roster-player-card" to={`/players/${playerId}`}>{content}</Link></li>
                  : <li key={key}><span className="roster-player-card">{content}</span></li>
              })}
            </ul>
          )}
        </section>
      ))}
    </section>
  )
}

export default TeamRoster
