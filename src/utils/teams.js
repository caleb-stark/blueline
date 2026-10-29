export function getTeamsFromStandings(standings){
  let rows = []

  if(Array.isArray(standings?.standings)){
    rows = standings.standings
  }

  if(Array.isArray(standings)){
    rows = standings
  }

  return rows.map((team) => {
    let abbrev = null
    let name = "Unknown team"

    if(typeof team?.teamAbbrev?.default === "string" && team.teamAbbrev.default){
      abbrev = team.teamAbbrev.default
    }

    if(typeof team?.teamName?.default === "string" && team.teamName.default){
      name = team.teamName.default
    }

    let logo = null

    if(typeof team?.teamLogo === "string" && team.teamLogo){
      logo = team.teamLogo
    }

    return {
      abbrev,
      name,
      logo,
      standingsRow:team
    }
  }).sort((left, right) => left.name.localeCompare(right.name))
}
