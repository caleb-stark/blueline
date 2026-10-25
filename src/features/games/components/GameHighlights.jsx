import { useState } from "react"
import { canShowGameMedia, getGoalHighlights } from "../utils/gameMedia"

function goalLabel(goal){
  return goal?.playerName?.default || goal?.name?.default || "Scoring highlight"
}

function GameHighlights({ landing }){
  const highlights = getGoalHighlights(landing)
  const [selectedIndex, setSelectedIndex] = useState(0)

  if(!canShowGameMedia(landing) || highlights.length === 0){
    return null
  }

  const activeIndex = Math.min(selectedIndex, highlights.length - 1)
  const highlight = highlights[activeIndex]

  return(
    <section className="panel-card game-highlights-panel" aria-labelledby="highlights-heading">
      <div className="section-heading">
        <h2 id="highlights-heading">Highlights</h2>
        <span>{activeIndex + 1} of {highlights.length}</span>
      </div>
      <div className="game-highlight-card">
        <div>
          <p className="eyebrow">{highlight?.teamAbbrev?.default || "Goal"} · {highlight?.timeInPeriod || ""}</p>
          <h3>{goalLabel(highlight)}</h3>
          <p className="muted-text">Watch the official NHL goal highlight.</p>
        </div>
        <a className="game-media-link" href={highlight.highlightClipSharingUrl} target="_blank" rel="noreferrer">
          Watch highlight
        </a>
      </div>
      {(activeIndex > 0 || activeIndex < highlights.length - 1) && (
        <div className="game-media-controls" aria-label="Highlight navigation">
          {activeIndex > 0 && <button className="date-nav-button" type="button" aria-label="Previous highlight" onClick={() => setSelectedIndex(index => index - 1)}>←</button>}
          {activeIndex < highlights.length - 1 && <button className="date-nav-button" type="button" aria-label="Next highlight" onClick={() => setSelectedIndex(index => index + 1)}>→</button>}
        </div>
      )}
    </section>
  )
}

export default GameHighlights
