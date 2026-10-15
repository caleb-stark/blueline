import useStandings from "../features/standings/hooks/useStandings"
import { getTeamsFromStandings } from "../utils/teams"
import TeamGrid from "../features/teams/components/TeamGrid"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"
import { formatDate } from "../utils/dates"

function TeamsPage(){
  const { standings, loading, error } = useStandings(formatDate())
  const teams = getTeamsFromStandings(standings)
  let content = <TeamGrid teams={teams} />

  if(loading){
    content = <Loading />
  }

  if(error){
    content = <ErrorMessage message={error} />
  }

  if(!loading && !error && teams.length === 0){
    content = <EmptyState title="No teams available" message="The NHL team list is not available right now." />
  }

  return (
    <div>
      <h1 className="page-title">Teams</h1>
      {content}
    </div>
  )
}

export default TeamsPage;
