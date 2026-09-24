import { getToday } from "./helpers"

const NHL_BASE_URL = "/nhl-api"

async function fetchJson(url){
  const response = await fetch(url)
  const text = await response.text()

  if(!response.ok){
    throw new Error(`${url} failed with status ${response.status}`)
  }

  try{
    return JSON.parse(text)
  }catch(error){
    throw new Error(`${url} returned non-JSON: ${text.slice(0, 80)}`)
  }
}

export async function getNhlSchedule(dateValue){
  let selectedDate = dateValue

  if(!selectedDate){
    selectedDate = getToday()
  }

  return fetchJson(`${NHL_BASE_URL}/v1/schedule/${selectedDate}`)
}

export async function getNhlScores(dateValue){
  let selectedDate = dateValue

  if(!selectedDate){
    selectedDate = getToday()
  }

  return fetchJson(`${NHL_BASE_URL}/v1/score/${selectedDate}`)
}

export async function getNhlStandings(){
  return fetchJson(`${NHL_BASE_URL}/v1/standings/now`)
}
