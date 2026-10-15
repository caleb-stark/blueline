import { Link } from "react-router-dom"

function name(player){
  return player?.name?.default || [player?.firstName?.default, player?.lastName?.default].filter(Boolean).join(" ") || "Unknown player"
}

function ScoringSummary({ landing }){
  const goals = Array.isArray(landing?.summary?.scoring) ? landing.summary.scoring.flatMap(period => Array.isArray(period?.goals) ? period.goals : []) : []

  return(
    <section className="panel-card" aria-labelledby="scoring-heading">
      <div className="section-heading"><h2 id="scoring-heading">Scoring summary</h2><span>{goals.length} goals</span></div>
      {goals.length === 0 ? <p className="muted-text">No goals recorded.</p> : <ol className="event-list">{goals.map((goal, index) => <li key={goal?.eventId || index}><span>{goal?.timeInPeriod || "—"}</span><strong>{goal?.teamAbbrev?.default || "—"}</strong>{goal?.playerId ? <Link to={`/players/${goal.playerId}`}>{name(goal)}</Link> : <span>{name(goal)}</span>}</li>)}</ol>}
    </section>
  )
}

export default ScoringSummary
