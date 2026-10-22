import { nhlFetch } from "../../../services/nhlApi"

export function getPlayer(playerId, options){
  return nhlFetch(`/player/${playerId}/landing`, options)
}

export function getPlayerGameLog(playerId, season, gameType, options){
  return nhlFetch(`/player/${playerId}/game-log/${season}/${gameType}`, options)
}
