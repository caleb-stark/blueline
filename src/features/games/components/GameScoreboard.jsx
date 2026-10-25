import { getGameState, getGameStatusLabel, getTeamLogo } from "../../../utils/games"

function teamLabel(team){
  return team?.abbrev || team?.commonName?.default || "—"
}

function score(team){
  return typeof team?.score === "number" ? team.score : "—"
}

function TeamScore({ team, side, isScheduled }){
  const logo = getTeamLogo(team)

  return(
    <div className={`game-detail-team game-detail-team-${side}`}>
      <div className="game-detail-team-identity">
        {logo && <img className="game-detail-team-logo" src={logo} alt={`${teamLabel(team)} logo`} />}
        <div className="game-detail-team-copy">
          <span>{teamLabel(team)}</span>
          {!isScheduled && <strong>{score(team)}</strong>}
        </div>
      </div>
    </div>
  )
}

function GameScoreboard({ landing }){
  const isScheduled = getGameState(landing) === "scheduled"
  const isLive = getGameState(landing) === "live"

  return(
    <section className={`panel-card game-scoreboard${isScheduled ? " game-scoreboard-scheduled" : ""}${isLive ? " game-scoreboard-live" : ""}`} aria-labelledby="scoreboard-heading">
      <div className="section-heading"><h2 id="scoreboard-heading">Scoreboard</h2><span className={isLive ? "game-scoreboard-status-live" : ""}>{getGameStatusLabel(landing)}</span></div>
      <div className="game-detail-score">
        <TeamScore team={landing?.awayTeam} side="away" isScheduled={isScheduled} />
        <b>at</b>
        <TeamScore team={landing?.homeTeam} side="home" isScheduled={isScheduled} />
      </div>
    </section>
  )
}

export default GameScoreboard
