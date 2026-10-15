import { useParams } from "react-router-dom"
import useTeam from "../features/teams/hooks/useTeam"
import TeamHeader from "../features/teams/components/TeamHeader"
import TeamStats from "../features/teams/components/TeamStats"
import TeamRoster from "../features/teams/components/TeamRoster"
import Loading from "../components/ui/Loading"
import ErrorMessage from "../components/ui/ErrorMessage"
import EmptyState from "../components/ui/EmptyState"

function TeamDetailsPage() {
  const { teamAbbrev } = useParams()
  const { team, roster, stats, loading, error, errors, invalid } = useTeam(teamAbbrev)

  if(loading){
    return <Loading />
  }

  if(invalid){
    return <EmptyState title="Team not found" message="That abbreviation is not in the current NHL standings." />
  }

  if(error){
    return <ErrorMessage message={error} />
  }

  return(
    <div className="team-details-page">
      <TeamHeader team={team} />
      {errors.roster && <ErrorMessage message={errors.roster} />}
      {errors.stats && <ErrorMessage message={errors.stats} />}
      {!errors.stats && <TeamStats stats={stats} />}
      {!errors.roster && <TeamRoster roster={roster} />}
    </div>
  )
}

export default TeamDetailsPage;
