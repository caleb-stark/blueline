import { nhlFetch } from "../../../services/nhlApi"

export function getSchedule(date, options){
  return nhlFetch(`/schedule/${date}`, options)
}

export function getScores(date, options){
  return nhlFetch(`/score/${date}`, options)
}

export function getGameLanding(gameId){
  return nhlFetch(`/gamecenter/${gameId}/landing`)
}

export function getGameBoxScore(gameId){
  return nhlFetch(`/gamecenter/${gameId}/boxscore`)
}

export function getGamePlayByPlay(gameId){
  return nhlFetch(`/gamecenter/${gameId}/play-by-play`)
}
