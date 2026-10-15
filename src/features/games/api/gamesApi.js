import { nhlFetch } from "../../../services/nhlApi"

export function getSchedule(date, options){
  return nhlFetch(`/schedule/${date}`, options)
}

export function getScores(date, options){
  return nhlFetch(`/score/${date}`, options)
}

export function getGameLanding(gameId, options){
  return nhlFetch(`/gamecenter/${gameId}/landing`, options)
}

export function getGameBoxScore(gameId, options){
  return nhlFetch(`/gamecenter/${gameId}/boxscore`, options)
}

export function getGamePlayByPlay(gameId, options){
  return nhlFetch(`/gamecenter/${gameId}/play-by-play`, options)
}
