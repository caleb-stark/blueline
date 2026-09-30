import { nhlFetch } from "../../../services/nhlApi"

export function getTeamRoster(teamAbbrev){
  return nhlFetch(`/roster/${teamAbbrev}/current`)
}

export function getTeamStats(teamAbbrev){
  return nhlFetch(`/club-stats/${teamAbbrev}/now`)
}