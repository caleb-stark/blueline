const GROUP_ORDER = {
  division:["Atlantic", "Metropolitan", "Central", "Pacific"],
  conference:["Eastern", "Western"]
}

function groupName(team, view){
  const value = view === "conference" ? team?.conferenceName : team?.divisionName

  return typeof value === "string" && value ? value : "Unassigned"
}

export function groupStandings(standings, view = "division"){
  if(!Array.isArray(standings)){
    return []
  }

  const groups = new Map()

  standings.forEach(team => {
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

  return orderedNames.map(name => ({ name, standings:groups.get(name) }))
}
