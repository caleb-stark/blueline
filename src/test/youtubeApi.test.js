import { afterEach, describe, expect, it, vi } from "vitest"
import { clearRecapCache, getGameRecap } from "../features/games/api/youtubeApi"

afterEach(() => {
  clearRecapCache()
  vi.restoreAllMocks()
})

const landing = {
  gameDate:"2026-10-21",
  awayTeam:{ name:{ default:"Boston Bruins" } },
  homeTeam:{ name:{ default:"New York Rangers" } }
}

describe("YouTube recap API", () => {
  it("maps only an official-channel result matching both teams and the game date", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok:true,
      json:async () => ({ items:[
        { id:{ videoId:"wrong" }, snippet:{ title:"Boston Bruins vs New York Rangers | NHL Highlights | Oct 20, 2026" } },
        { id:{ videoId:"right" }, snippet:{
          title:"Boston Bruins vs New York Rangers | NHL Highlights | Oct 21, 2026",
          publishedAt:"2026-10-21T00:00:00Z",
          thumbnails:{ high:{ url:"https://img.youtube.com/right.jpg" } }
        } }
      ] })
    })
    vi.stubGlobal("fetch", fetchMock)

    const recap = await getGameRecap(landing)

    expect(recap).toMatchObject({ id:"youtube-right", videoId:"right", thumbnailUrl:"https://img.youtube.com/right.jpg" })
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toContain("channelId=UCqFMzb-4AUf6WAIbl132QKA")
    expect(fetchMock.mock.calls[0][0]).toContain("q=Boston%20Bruins%20vs%20New%20York%20Rangers%20%7C%20NHL%20Highlights%20%7C%20Oct%2021%2C%202026")
  })

  it("reuses a cached recap lookup", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok:true, json:async () => ({ items:[] }) })
    vi.stubGlobal("fetch", fetchMock)

    await getGameRecap(landing)
    await getGameRecap(landing)

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it("does not cache an aborted in-flight request", async () => {
    let calls = 0
    const fetchMock = vi.fn().mockImplementation((url, options) => {
      calls += 1

      if(calls === 1){
        return new Promise((resolve, reject) => {
          options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")))
        })
      }

      return Promise.resolve({ ok:true, json:async () => ({ items:[] }) })
    })
    vi.stubGlobal("fetch", fetchMock)

    const controller = new AbortController()
    const firstRequest = getGameRecap(landing, { signal:controller.signal })
    controller.abort()

    await expect(firstRequest).rejects.toMatchObject({ name:"AbortError" })
    await getGameRecap(landing)

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
