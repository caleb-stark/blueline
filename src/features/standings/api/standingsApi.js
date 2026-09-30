import { nhlFetch } from "../../../services/nhlApi"

export function getStandings(date){
  let selectedDate = date

  if(!selectedDate){
    selectedDate = "now"
  }

  return nhlFetch(`/standings/${selectedDate}`)
}