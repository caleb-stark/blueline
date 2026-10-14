import { Link } from "react-router-dom"

function TeamCard({ team }){
  let content = <strong>{team.name}</strong>
  let logoContent = null
  let abbrev = "—"

  if(team.abbrev){
    content = <Link to={`/teams/${team.abbrev}`}>{team.name}</Link>
  }

  if(team.logo){
    logoContent = <img src={team.logo} alt="" />
  }

  if(team.abbrev){
    abbrev = team.abbrev
  }

  return(
    <article className="panel-card team-card">
      {logoContent}
      <span>{abbrev}</span>
      {content}
    </article>
  )
}

export default TeamCard
