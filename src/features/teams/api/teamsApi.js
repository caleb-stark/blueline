import { nhlFetch } from "../../../services/nhlApi"
import { getCurrentNhlSeason } from "../../../utils/dates"

export function getTeamRoster(teamAbbrev, options){
  const season = getCurrentNhlSeason()
  return nhlFetch(`/roster/${teamAbbrev}/${season}`, options)
}

export function getTeamStats(teamAbbrev, options){
  const season = getCurrentNhlSeason()
  return nhlFetch(`/club-stats/${teamAbbrev}/${season}/2`, options)
}
