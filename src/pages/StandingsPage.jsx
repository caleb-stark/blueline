import useStandings from "../features/standings/hooks/useStandings"
import { useState } from "react"
import StandingsSections from "../features/standings/components/StandingsSections"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"
import { formatDate } from "../utils/dates"

function StandingsPage(){
  const { standings, loading, error } = useStandings(formatDate())
  const [view, setView] = useState("division")
  let content = <StandingsSections standings={standings} view={view} />

  if(loading){
    content = <Loading />
  }

  if(error){
    content = <ErrorMessage message={error} />
  }

  if(!loading && !error && standings.length === 0){
    content = <EmptyState title="No standings available" message="The NHL standings are not available right now." />
  }

  return (
    <div>
      <h1 className="page-title">Standings</h1>
      <div className="schedule-controls standings-view-controls">
        <label htmlFor="standings-view">View</label>
        <select id="standings-view" value={view} onChange={event => setView(event.target.value)}>
          <option value="division">Division</option>
          <option value="conference">Conference</option>
        </select>
      </div>
      {!loading && !error && standings.length > 0 && <div className="section-heading standings-content-heading"><h2>{view === "division" ? "Division" : "Conference"}</h2></div>}
      {content}
    </div>
  )
}

export default StandingsPage;
