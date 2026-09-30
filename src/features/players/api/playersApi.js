import { nhlFetch } from "../../../services/nhlApi"

export function getPlayer(playerId){
  return nhlFetch(`/player/${playerId}/landing`)
}

export function getPlayerGameLog(playerId, season, gameType){
  return nhlFetch(`/player/${playerId}/game-log/${season}/${gameType}`)
}