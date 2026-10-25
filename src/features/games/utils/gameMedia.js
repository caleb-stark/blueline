import { getGameState, getTeamName } from "../../../utils/games"

export function getScoringGoals(landing){
  return Array.isArray(landing?.summary?.scoring)
    ? landing.summary.scoring.flatMap((period, periodIndex) => Array.isArray(period?.goals)
      ? period.goals.map(goal => ({
        ...goal,
        period:goal?.periodDescriptor?.number || period?.period || periodIndex + 1
      }))
      : [])
    : []
}

export function getGoalHighlights(landing){
  return getScoringGoals(landing).filter(goal => typeof goal?.highlightClipSharingUrl === "string" && goal.highlightClipSharingUrl)
}

export function getRecapQuery(landing){
  const away = getTeamName(landing?.awayTeam) || "Away team"
  const home = getTeamName(landing?.homeTeam) || "Home team"
  const date = landing?.gameDate
    ? new Intl.DateTimeFormat("en-US", { month:"short", day:"numeric", year:"numeric", timeZone:"UTC" }).format(new Date(`${landing.gameDate}T12:00:00Z`))
    : ""

  return `${away} vs ${home} | NHL Highlights | ${date}`
}

export function canShowGameMedia(landing){
  return getGameState(landing) !== "scheduled" && getScoringGoals(landing).length > 0
}
