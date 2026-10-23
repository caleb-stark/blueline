import { getGameStatusLabel, getTeamLogo } from "../../../utils/games"

function teamLabel(team){
  return team?.abbrev || team?.commonName?.default || "—"
}

function score(team){
  return typeof team?.score === "number" ? team.score : "—"
}

function TeamScore({ team, side }){
  const logo = getTeamLogo(team)

  return(
    <div className={`game-detail-team game-detail-team-${side}`}>
      <div className="game-detail-team-copy">
        <span>{teamLabel(team)}</span>
        <strong>{score(team)}</strong>
      </div>
      {logo && <img className="game-detail-team-logo" src={logo} alt={`${teamLabel(team)} logo`} />}
    </div>
  )
}

function GameScoreboard({ landing }){
  return(
    <section className="panel-card game-scoreboard" aria-labelledby="scoreboard-heading">
      <div className="section-heading"><h2 id="scoreboard-heading">Scoreboard</h2><span>{getGameStatusLabel(landing)}</span></div>
      <div className="game-detail-score">
        <TeamScore team={landing?.awayTeam} side="away" />
        <b>at</b>
        <TeamScore team={landing?.homeTeam} side="home" />
      </div>
    </section>
  )
}

export default GameScoreboard
