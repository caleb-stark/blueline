import { nhlFetch } from "../../../services/nhlApi"
import { formatDate } from "../../../utils/dates"

export function getStandings(date, options){
  let selectedDate = date

  if(!selectedDate){
    selectedDate = formatDate()
  }

  return nhlFetch(`/standings/${selectedDate}`, options)
}
