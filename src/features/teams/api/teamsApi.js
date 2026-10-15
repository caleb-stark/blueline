import { nhlFetch } from "../../../services/nhlApi"

export function getTeamRoster(teamAbbrev, options){
  return nhlFetch(`/roster/${teamAbbrev}/current`, options)
}

export function getTeamStats(teamAbbrev, options){
  return nhlFetch(`/club-stats/${teamAbbrev}/now`, options)
}
