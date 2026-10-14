import { nhlFetch } from "../../../services/nhlApi"

export function getStandings(date, options){
  let selectedDate = date

  if(!selectedDate){
    selectedDate = "now"
  }

  return nhlFetch(`/standings/${selectedDate}`, options)
}
