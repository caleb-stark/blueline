import { nhlFetch } from "../../../services/nhlApi"

export function getSchedule(date){
  return nhlFetch(`/schedule/${date}`)
}

export function getScores(date){
  return nhlFetch(`/score/${date}`)
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