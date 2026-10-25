import { canShowGameMedia, getRecapSearchUrl } from "../utils/gameMedia"
import { getGameState } from "../../../utils/games"

function GameRecap({ landing }){
  if(getGameState(landing) !== "final" || !canShowGameMedia(landing)){
    return null
  }

  return(
    <section className="panel-card game-recap-panel" aria-labelledby="recap-heading">
      <div className="section-heading">
        <h2 id="recap-heading">Game recap</h2>
        <span>Final</span>
      </div>
      <div className="game-recap-content">
        <div>
          <p className="eyebrow">Full game highlights</p>
          <h3>Watch the official NHL recap</h3>
          <p className="muted-text">Find the full-game recap for this matchup on the official NHL YouTube channel.</p>
        </div>
        <a className="game-media-link" href={getRecapSearchUrl(landing)} target="_blank" rel="noreferrer">
          Find recap
        </a>
      </div>
    </section>
  )
}

export default GameRecap
