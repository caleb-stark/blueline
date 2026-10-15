import { Link } from "react-router-dom"

function getText(value){
  return typeof value?.default === "string" ? value.default : null
}

function TeamHeader({ team }){
  const name = getText(team?.teamName) || "Unknown team"
  const abbrev = getText(team?.teamAbbrev)
  const logo = typeof team?.teamLogo === "string" ? team.teamLogo : null

  return(
    <header className="team-detail-header panel-card">
      {logo && <img src={logo} alt="" width="96" height="96" decoding="async" />}
      <div>
        <p className="eyebrow">Team details</p>
        <h1>{name}</h1>
        {abbrev ? <Link to={`/teams/${abbrev}`} className="team-detail-abbrev">{abbrev}</Link> : <span className="team-detail-abbrev">—</span>}
      </div>
    </header>
  )
}

export default TeamHeader
