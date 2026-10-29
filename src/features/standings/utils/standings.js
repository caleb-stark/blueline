const GROUP_ORDER = {
  division:["Atlantic", "Metropolitan", "Central", "Pacific"],
  conference:["Eastern", "Western"],
  wildcard:["Eastern Wild Card", "Western Wild Card"]
}

function groupName(team, view){
  if(view === "wildcard"){
    const conference = typeof team?.conferenceName === "string" && team.conferenceName ? team.conferenceName : "Unassigned"
    return `${conference} Wild Card`
  }

  const value = view === "conference" ? team?.conferenceName : team?.divisionName

  return typeof value === "string" && value ? value : "Unassigned"
}

export function groupStandings(standings, view = "division"){
  if(!Array.isArray(standings)){
    return []
  }

  const groups = new Map()

  standings.forEach(team => {
    if(view === "wildcard" && (!Number.isInteger(team?.wildcardSequence) || team.wildcardSequence < 1 || team.wildcardSequence > 2)){
      return
    }

    const name = groupName(team, view)
    const rows = groups.get(name) || []
    rows.push(team)
    groups.set(name, rows)
  })

  const preferredOrder = GROUP_ORDER[view] || []
  const orderedNames = [
    ...preferredOrder.filter(name => groups.has(name)),
    ...Array.from(groups.keys()).filter(name => !preferredOrder.includes(name))
  ]

  return orderedNames.map(name => ({
    name,
    standings:view === "wildcard"
      ? groups.get(name).sort((left, right) => left.wildcardSequence - right.wildcardSequence)
      : groups.get(name)
  }))
}
