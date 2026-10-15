function PlayByPlay({ playByPlay }){
  const plays = Array.isArray(playByPlay?.plays) ? playByPlay.plays : []

  if(plays.length === 0){
    return <div className="empty-card"><div><strong>No play-by-play available</strong><p>Play-by-play data is not available for this game.</p></div></div>
  }

  return(
    <section className="panel-card" aria-labelledby="play-by-play-heading">
      <div className="section-heading"><h2 id="play-by-play-heading">Play-by-play</h2><span>{plays.length} events</span></div>
      <ol className="event-list">{plays.map((play, index) => <li key={play?.eventId || index}><span>{play?.timeInPeriod || "—"}</span><strong>{play?.typeDescKey || "Play"}</strong><span>{play?.details?.descKey || "Event details unavailable"}</span></li>)}</ol>
    </section>
  )
}

export default PlayByPlay
