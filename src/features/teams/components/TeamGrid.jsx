import TeamCard from "./TeamCard"

function TeamGrid({ teams }){
  if(!Array.isArray(teams) || teams.length === 0){
    return null
  }

  return(
    <div className="game-grid team-grid">
      {teams.map((team, index) => {
        let key = index

        if(team.abbrev){
          key = team.abbrev
        }

        return <TeamCard key={key} team={team} />
      })}
    </div>
  )
}

export default TeamGrid
