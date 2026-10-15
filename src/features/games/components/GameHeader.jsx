import { Link } from "react-router-dom"

function teamName(team){
  return team?.placeName?.default && team?.commonName?.default ? `${team.placeName.default} ${team.commonName.default}` : team?.commonName?.default || team?.abbrev || "Unknown team"
}

function GameHeader({ landing }){
  const date = landing?.gameDate || "Date unavailable"
  const venue = landing?.venue?.default || landing?.venueLocation?.default || "Venue unavailable"

  return(
    <header className="panel-card game-detail-header">
      <p className="eyebrow">Game details</p>
      <h1 className="page-title">{teamName(landing?.awayTeam)} at {teamName(landing?.homeTeam)}</h1>
      <p className="page-subtitle">{date} · {venue}</p>
      <Link to="/scores" className="game-detail-back">Back to scores</Link>
    </header>
  )
}

export default GameHeader
