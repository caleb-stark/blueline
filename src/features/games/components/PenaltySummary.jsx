function PenaltySummary({ playByPlay }){
  const penalties = Array.isArray(playByPlay?.plays) ? playByPlay.plays.filter(play => play?.typeDescKey === "penalty") : []

  return(
    <section className="panel-card" aria-labelledby="penalty-heading">
      <div className="section-heading"><h2 id="penalty-heading">Penalty summary</h2><span>{penalties.length} penalties</span></div>
      {penalties.length === 0 ? <p className="muted-text">No penalties recorded.</p> : <ol className="event-list">{penalties.map((penalty, index) => <li key={penalty?.eventId || index}><span>{penalty?.timeInPeriod || "—"}</span><strong>{penalty?.details?.duration ?? "—"} min</strong><span>{penalty?.details?.descKey || "Penalty"}</span></li>)}</ol>}
    </section>
  )
}

export default PenaltySummary
