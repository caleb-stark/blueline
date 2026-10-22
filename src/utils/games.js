export function getTeamAbbrev(team){
  if(typeof team?.abbrev === "string" && team.abbrev){
    return team.abbrev
  }

  if(typeof team?.teamAbbrev?.default === "string" && team.teamAbbrev.default){
    return team.teamAbbrev.default
  }

  return null
}

export function getTeamName(team){
  if(typeof team?.name?.default === "string" && team.name.default){
    return team.name.default
  }

  if(typeof team?.commonName?.default === "string" && team.commonName.default){
    return team.commonName.default
  }

  if(typeof team?.teamName?.default === "string" && team.teamName.default){
    return team.teamName.default
  }

  return getTeamAbbrev(team)
}

export function getTeamLogo(team){
  if(typeof team?.logo === "string" && team.logo){
    return team.logo
  }

  if(typeof team?.teamLogo === "string" && team.teamLogo){
    return team.teamLogo
  }

  return null
}

export function getScore(team){
  if(typeof team?.score === "number" && Number.isFinite(team.score)){
    return team.score
  }

  return null
}

export function getGameState(game){
  if(game?.gameScheduleState === "PPD" || game?.gameState === "PPD"){
    return "postponed"
  }

  if(game?.gameState === "FUT" || game?.gameState === "PRE"){
    return "scheduled"
  }

  if(game?.gameState === "LIVE" || game?.gameState === "CRIT"){
    return "live"
  }

  if(game?.gameState === "OFF" || game?.gameState === "FINAL"){
    return "final"
  }

  return "unknown"
}

export function getGameStatusLabel(game){
  const state = getGameState(game)

  if(state === "scheduled"){
    return "Scheduled"
  }

  if(state === "live"){
    return "Live"
  }

  if(state === "final"){
    return "Final"
  }

  if(state === "postponed"){
    return "Postponed"
  }

  return "Status unavailable"
}

export function gameHasStarted(game){
  const state = getGameState(game)

  return state === "live" || state === "final"
}
