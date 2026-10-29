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
  const viewOptions = [
    { value:"division", label:"Division" },
    { value:"conference", label:"Conference" },
    { value:"wildcard", label:"Wild Card" }
  ]
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
      <div className="schedule-controls standings-view-controls" role="group" aria-label="Standings view">
        {viewOptions.map(option => (
          <button
            className={`standings-view-button${view === option.value ? " is-selected" : ""}`}
            type="button"
            key={option.value}
            aria-pressed={view === option.value}
            onClick={() => setView(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {content}
    </div>
  )
}

export default StandingsPage;
