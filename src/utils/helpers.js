export function getToday(){
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function formatGameTime(startTimeUTC){
  if(!startTimeUTC){
    return "TBD"
  }

  const date = new Date(startTimeUTC)
  return date.toLocaleTimeString([], {
    hour:"numeric",
    minute:"2-digit"
  })
}

export function formatDateLabel(dateValue){
  const date = new Date(`${dateValue}T12:00:00`)
  return date.toLocaleDateString([], {
    weekday:"long",
    month:"long",
    day:"numeric"
  })
}

export function getTeamAbbrev(team){
  if(!team){
    return "TBD"
  }

  if(typeof team.abbrev === "string"){
    return team.abbrev
  }

  if(team.abbrev?.default){
    return team.abbrev.default
  }

  return "TBD"
}

export function getTeamName(team){
  if(!team){
    return "Team"
  }

  if(team.placeName?.default && team.commonName?.default){
    return `${team.placeName.default} ${team.commonName.default}`
  }

  if(team.name?.default){
    return team.name.default
  }

  return getTeamAbbrev(team)
}

export function getGameState(game){
  if(game.gameState){
    return game.gameState
  }

  if(game.gameScheduleState){
    return game.gameScheduleState
  }

  return "FUT"
}

export function getGameStatusLabel(game){
  const state = getGameState(game)

  if(state === "LIVE"){
    return "Live"
  }

  if(state === "FINAL" || state === "OFF"){
    return "Final"
  }

  if(state === "PRE"){
    return "Pregame"
  }

  return "Upcoming"
}

export function getScore(team){
  if(typeof team?.score === "number"){
    return team.score
  }

  return 0
}

export function getRecordText(team){
  if(!team){
    return "Record unavailable"
  }

  if(typeof team.wins === "number" && typeof team.losses === "number"){
    const ot = team.otLosses || 0
    return `${team.wins}-${team.losses}-${ot}`
  }

  return "Record unavailable"
}
