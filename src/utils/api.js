const NHL_BASE_URL = "/nhl-api"

function getToday(){
  const date = new Date()
  return date.toISOString().split("T")[0]
}

async function fetchJson(url){
  const response = await fetch(url)

  if(!response.ok){
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json()
}

export async function getNhlSchedule(){
  const today = getToday()
  return fetchJson(`${NHL_BASE_URL}/v1/schedule/${today}`)
}

export async function getNhlScores(){
  const today = getToday()
  return fetchJson(`${NHL_BASE_URL}/v1/score/${today}`)
}