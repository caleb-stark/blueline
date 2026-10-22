import { Link } from "react-router-dom"
import EmptyState from "../../../components/ui/EmptyState"
import ErrorMessage from "../../../components/ui/ErrorMessage"
import Loading from "../../../components/ui/Loading"
import Panel from "../../../components/ui/Panel"

function DashboardStandings({ standings, loading, error, onRetry }){
  let content = <Loading />

  if(!loading && error){
    content = <ErrorMessage message={error} onRetry={onRetry} />
  }

  if(!loading && !error){
    const topTeams = standings.slice(0, 5)
    content = topTeams.length
      ? (
        <div className="dashboard-standings-list">
          {topTeams.map((team, index) => (
            <Link className="dashboard-team-row" to={`/teams/${team.teamAbbrev?.default}`} key={team.teamAbbrev?.default || index}>
              <span className="dashboard-team-rank">{index + 1}</span>
              <span>
                <strong>{team.teamName?.default || team.teamAbbrev?.default || "Unknown team"}</strong>
                <small>{team.teamAbbrev?.default || "—"}</small>
              </span>
              <strong>{team.points ?? "—"}<small>PTS</small></strong>
            </Link>
          ))}
        </div>
      )
      : <EmptyState title="No standings available" message="The NHL standings are not available right now." />
  }

  return(
    <Panel
      eyebrow="League table"
      title="Top five teams"
      action={<Link className="panel-link" to="/standings">Full table</Link>}
    >
      {content}
    </Panel>
  )
}

export default DashboardStandings
