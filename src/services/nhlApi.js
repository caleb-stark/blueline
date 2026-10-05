export async function nhlFetch(path){
  const response = await fetch(`/nhl-api/v1${path}`)
  const text = await response.text()

  if(!response.ok){
    throw new Error(`${path} failed with status ${response.status}`)
  }

  try{
    return JSON.parse(text)
  }catch(error){
    throw new Error(`${path} returned invalid JSON`)
  }
}