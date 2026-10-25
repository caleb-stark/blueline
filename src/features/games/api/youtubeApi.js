import { getRecapQuery } from "../utils/gameMedia"

export const NHL_YOUTUBE_CHANNEL_ID = "UCqFMzb-4AUf6WAIbl132QKA"
const recapCache = new Map()

function message(error){
  return error?.message || "Unable to load the full-game recap"
}

function normalizeResult(item){
  const videoId = item?.id?.videoId

  if(!videoId || !item?.snippet?.title){
    return null
  }

  return {
    id:`youtube-${videoId}`,
    videoId,
    title:item.snippet.title,
    thumbnailUrl:item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || null,
    embedUrl:`https://www.youtube.com/embed/${videoId}`,
    publishedAt:item.snippet.publishedAt || null
  }
}

function matchesGame(item, landing){
  const title = item.title.toLowerCase()
  const query = getRecapQuery(landing).toLowerCase()
  const [queryMatchup] = query.split(" | ")
  const [away, home] = queryMatchup.split(" vs ")
  const date = query.split(" | ").at(-1)
  const teamMatches = (team, queryName) => [
    queryName,
    team?.commonName?.default,
    team?.abbrev,
    team?.name?.default
  ].filter(Boolean).some(value => title.includes(value.toLowerCase()))

  return Boolean(away && home && teamMatches(landing?.awayTeam, away) && teamMatches(landing?.homeTeam, home) && (!date || title.includes(date)))
}

export async function getGameRecap(landing, options = {}){
  const query = getRecapQuery(landing)
  if(recapCache.has(query)){
    return Promise.resolve(recapCache.get(query))
  }

  const request = fetch(`/youtube-api/youtube/v3/search?part=snippet&type=video&channelId=${NHL_YOUTUBE_CHANNEL_ID}&maxResults=10&order=date&q=${encodeURIComponent(query)}`, options)
    .then(async response => {
      if(!response.ok){
        throw new Error(`YouTube recap search failed with status ${response.status}`)
      }

      const data = await response.json()
      const recap = (Array.isArray(data?.items) ? data.items.map(normalizeResult).filter(Boolean) : [])
        .find(item => matchesGame(item, landing)) || null

      return recap
    })
    .catch(error => {
      if(error?.name === "AbortError"){
        throw error
      }

      throw new Error(message(error), { cause:error })
    })

  const recap = await request
  recapCache.set(query, recap)
  return recap
}

export function clearRecapCache(){
  recapCache.clear()
}
