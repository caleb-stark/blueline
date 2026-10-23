function formatLabel(value){
  if(typeof value !== "string" || !value){
    return "Event"
  }

  return value.split("-").join(" ").replace(/\b\w/g, letter => letter.toUpperCase())
}

function playerName(playByPlay, playerId){
  const player = playByPlay?.rosterSpots?.find(spot => spot?.playerId === playerId)
  return player?.firstName?.default && player?.lastName?.default
    ? `${player.firstName.default} ${player.lastName.default}`
    : null
}

function playDetails(play, playByPlay){
  const details = play?.details

  if(details?.descKey){
    return details.descKey
  }

  if(details?.reason){
    return formatLabel(details.reason)
  }

  if(details?.shotType){
    return `${formatLabel(details.shotType)} shot`
  }

  const involvedPlayerId = details?.scoringPlayerId || details?.playerId || details?.shootingPlayerId
  const involvedPlayer = playerName(playByPlay, involvedPlayerId)

  if(involvedPlayer){
    return involvedPlayer
  }

  return formatLabel(play?.typeDescKey)
}

function PlayByPlay({ playByPlay }){
  const plays = Array.isArray(playByPlay?.plays) ? playByPlay.plays : []

  if(plays.length === 0){
    return <div className="empty-card"><div><strong>No play-by-play available</strong><p>Play-by-play data is not available for this game.</p></div></div>
  }

  return(
    <section className="panel-card play-by-play-panel" aria-labelledby="play-by-play-heading">
      <div className="section-heading"><h2 id="play-by-play-heading">Play-by-play</h2><span>{plays.length} events</span></div>
      <ol className="event-list play-by-play-list">{plays.map((play, index) => <li key={play?.eventId || index}><span>{play?.timeInPeriod || "—"}</span><strong>{formatLabel(play?.typeDescKey || "Play")}</strong><span>{playDetails(play, playByPlay)}</span></li>)}</ol>
    </section>
  )
}

export default PlayByPlay
