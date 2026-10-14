import useStandings from "../features/standings/hooks/useStandings"
import StandingsTable from "../features/standings/components/StandingsTable"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"
import { formatDate } from "../utils/dates"

function StandingsPage(){
  const { standings, loading, error } = useStandings(formatDate())
  let content = <StandingsTable standings={standings} />

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
      <h1>Standings</h1>
      {content}
    </div>
  )
}

export default StandingsPage;
