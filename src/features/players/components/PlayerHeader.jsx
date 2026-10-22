function text(value){
  return typeof value?.default === "string" ? value.default : null
}

function PlayerHeader({ player }){
  const firstName = text(player?.firstName) || ""
  const lastName = text(player?.lastName) || "Unknown player"
  const team = text(player?.fullTeamName) || player?.currentTeamAbbrev || "Team unavailable"
  const position = player?.position || "Position unavailable"

  return(
    <header className="panel-card player-detail-header">
      {player?.headshot && <img src={player.headshot} alt="" width="128" height="128" decoding="async" />}
      <div>
        <p className="eyebrow">Player details</p>
        <h1 className="page-title">{firstName} {lastName}</h1>
        <p className="player-detail-meta">{team} · {position}{player?.sweaterNumber ? ` · #${player.sweaterNumber}` : ""}</p>
      </div>
    </header>
  )
}

export default PlayerHeader
