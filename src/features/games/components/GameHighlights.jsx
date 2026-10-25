import { useRef, useState } from "react"
import useGameRecap from "../hooks/useGameRecap"
import { canShowGameMedia, getGoalHighlights } from "../utils/gameMedia"
import { getTeamLogo } from "../../../utils/games"

function goalLabel(goal){
  return goal?.playerName?.default || goal?.name?.default || "Scoring highlight"
}

function periodLabel(goal){
  return `P${goal?.period || "—"}`
}

function goalThumbnail(goal, landing, boxScore){
  const directThumbnail = goal?.highlightClip?.thumbnailUrl || goal?.highlightClip?.thumbnail || goal?.thumbnailUrl

  if(typeof directThumbnail === "string" && directThumbnail){
    return directThumbnail
  }

  const players = ["awayTeam", "homeTeam"].flatMap(teamKey => {
    const team = boxScore?.playerByGameStats?.[teamKey]
    return [...(team?.forwards || []), ...(team?.defense || []), ...(team?.goalies || [])]
  })
  const player = players.find(candidate => candidate?.playerId === goal?.playerId)

  if(typeof player?.headshot === "string" && player.headshot){
    return player.headshot
  }

  const teamAbbrev = goal?.teamAbbrev?.default
  const team = [landing?.awayTeam, landing?.homeTeam].find(candidate => candidate?.abbrev === teamAbbrev)

  return getTeamLogo(team)
}

function getPlaylistItems(landing, boxScore, recap){
  const highlights = getGoalHighlights(landing).map((goal, index) => ({
    id:`nhl-${goal?.eventId || index}`,
    kind:"nhl",
    title:goalLabel(goal),
    subtitle:`${goal?.teamAbbrev?.default || "Goal"} · ${periodLabel(goal)} · ${goal?.timeInPeriod || "Time unavailable"}`,
    url:goal.highlightClipSharingUrl,
    thumbnailUrl:goalThumbnail(goal, landing, boxScore)
  }))

  return recap ? [{ id:recap.id, kind:"youtube", title:"Full Game Recap", subtitle:recap.title, ...recap }, ...highlights] : highlights
}

function VideoPlayer({ item }){
  if(item.kind === "youtube"){
    return <iframe className="game-video-player" src={item.embedUrl} title={item.title} allow="encrypted-media; picture-in-picture" allowFullScreen />
  }

  return(
    <div className="game-video-player game-video-fallback">
      <div>
        <span className="eyebrow">NHL highlight</span>
        <strong>{item.title}</strong>
        <a className="game-media-link" href={item.url} target="_blank" rel="noreferrer">Watch on NHL.com</a>
      </div>
    </div>
  )
}

function GameHighlights({ landing, boxScore }){
  const { recap } = useGameRecap(landing)
  const [selectedId, setSelectedId] = useState(null)
  const playlistRef = useRef(null)
  const items = getPlaylistItems(landing, boxScore, recap)

  if(!canShowGameMedia(landing) || items.length === 0){
    return null
  }

  const activeIndex = Math.max(0, items.findIndex(item => item.id === selectedId))
  const activeItem = items[activeIndex]
  const movePlaylist = direction => {
    if(playlistRef.current){
      playlistRef.current.scrollTop += direction * playlistRef.current.clientHeight
    }
  }

  return(
    <section className="panel-card game-highlights-panel" aria-labelledby="highlights-heading">
      <div className="section-heading">
        <h2 id="highlights-heading">Game Highlights</h2>
        <span>{activeIndex + 1} of {items.length}</span>
      </div>
      <div className="game-video-layout">
        <div className="game-video-stage">
          <VideoPlayer item={activeItem} />
        </div>
        <div className="game-video-playlist-shell">
          <div className="game-video-playlist" aria-label="Game video playlist" ref={playlistRef}>
            {items.map((item, index) => (
              <button
                className={`game-video-playlist-item${index === activeIndex ? " is-selected" : ""}`}
                type="button"
                key={item.id}
                aria-pressed={index === activeIndex}
                onClick={() => setSelectedId(item.id)}
              >
                {item.thumbnailUrl ? <img src={item.thumbnailUrl} alt="" /> : <span className="game-video-thumbnail-fallback">{item.kind === "youtube" ? "RECAP" : "NHL"}</span>}
                <span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
              </button>
            ))}
          </div>
          {items.length > 1 && <div className="game-video-playlist-controls" aria-label="Playlist navigation">
            <button className="date-nav-button" type="button" aria-label="Scroll goals up" onClick={() => movePlaylist(-1)}>↑</button>
            <button className="date-nav-button" type="button" aria-label="Scroll goals down" onClick={() => movePlaylist(1)}>↓</button>
          </div>}
        </div>
      </div>
    </section>
  )
}

export default GameHighlights
