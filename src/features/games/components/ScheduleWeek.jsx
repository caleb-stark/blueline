import { Link } from "react-router-dom"
import { formatDate, formatGameTime } from "../../../utils/dates"
import { getGameState, getScore, getTeamAbbrev, getTeamLogo } from "../../../utils/games"

function formatDayLabel(date){
  return new Intl.DateTimeFormat("en-US", { weekday:"short" }).format(new Date(`${date}T12:00:00Z`))
}

function formatDateLabel(date){
  return new Intl.DateTimeFormat("en-US", { month:"short", day:"numeric" }).format(new Date(`${date}T12:00:00Z`))
}

function ScheduleGame({ game }){
  const away = game?.awayTeam
  const home = game?.homeTeam
  const awayAbbrev = getTeamAbbrev(away) || "—"
  const homeAbbrev = getTeamAbbrev(home) || "—"
  const awayLogo = getTeamLogo(away)
  const homeLogo = getTeamLogo(home)
  const gameState = getGameState(game)
  const awayScore = getScore(away)
  const homeScore = getScore(home)
  const showScores = gameState === "live" || gameState === "final"

  return(
    <Link className="schedule-game" to={`/games/${game?.id}`}>
      <span className="schedule-game-time">{formatGameTime(game?.startTimeUTC)}</span>
      <span className="schedule-matchup">
        <span className="schedule-team">
          {awayLogo && <img src={awayLogo} alt="" />}
          <strong>{awayAbbrev}</strong>
          {showScores && awayScore !== null && <b>{awayScore}</b>}
        </span>
        <span className="schedule-vs">vs</span>
        <span className="schedule-team">
          {homeLogo && <img src={homeLogo} alt="" />}
          <strong>{homeAbbrev}</strong>
          {showScores && homeScore !== null && <b>{homeScore}</b>}
        </span>
      </span>
    </Link>
  )
}

function ScheduleWeek({ gameWeek }){
  const today = formatDate()
  const validDays = Array.isArray(gameWeek)
    ? gameWeek.filter(day => typeof day?.date === "string")
    : []

  if(validDays.length === 0){
    return null
  }

  return(
    <div className="schedule-week" aria-label="Weekly NHL schedule">
      {validDays.map((day) => {
        const date = day?.date
        const games = Array.isArray(day?.games) ? day.games : []
        const isToday = date === today

        return(
          <section className={`schedule-day${isToday ? " schedule-day-today" : ""}`} key={date}>
            <header className="schedule-day-header">
              <span>{formatDayLabel(date)}</span>
              <strong>{formatDateLabel(date)}</strong>
            </header>
            <div className="schedule-day-games">
              {games.length > 0
                ? games.map(game => <ScheduleGame key={game.id} game={game} />)
                : <p className="schedule-day-empty">No games</p>}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default ScheduleWeek
