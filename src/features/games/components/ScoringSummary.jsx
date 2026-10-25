import { Link } from "react-router-dom"
import { getScoringGoals } from "../utils/gameMedia"

function name(player){
  return player?.name?.default || [player?.firstName?.default, player?.lastName?.default].filter(Boolean).join(" ") || "Unknown player"
}

function ScoringSummary({ landing }){
  const goals = getScoringGoals(landing)

  if(goals.length === 0){
    return null
  }

  return(
    <section className="panel-card" aria-labelledby="scoring-heading">
      <div className="section-heading"><h2 id="scoring-heading">Scoring summary</h2><span>{goals.length} goals</span></div>
      <ol className="event-list">{goals.map((goal, index) => <li key={goal?.eventId || index}><span>{goal?.timeInPeriod || "—"}</span><strong>{goal?.teamAbbrev?.default || "—"}</strong>{goal?.playerId ? <Link to={`/players/${goal.playerId}`}>{name(goal)}</Link> : <span>{name(goal)}</span>}</li>)}</ol>
    </section>
  )
}

export default ScoringSummary
