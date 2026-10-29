import StandingsTable from "./StandingsTable"
import { groupStandings } from "../utils/standings"

function StandingsSections({ standings, view }){
  const groups = groupStandings(standings, view)

  return(
    <div className={`standings-sections standings-sections-${view}`}>
      {groups.map(group => (
        <section className="standings-section panel-card" key={group.name} aria-labelledby={`standings-${view}-${group.name}`}>
          <div className="section-heading compact-heading">
            <h3 id={`standings-${view}-${group.name}`}>{group.name}</h3>
          </div>
          <StandingsTable standings={group.standings} />
        </section>
      ))}
    </div>
  )
}

export default StandingsSections
