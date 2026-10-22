import { formatDate, getWeekStart, shiftDate } from "../../../utils/dates"

function formatWeekRange(date){
  const start = new Date(`${date}T12:00:00Z`)
  const end = new Date(`${shiftDate(date, 6)}T12:00:00Z`)
  const format = value => new Intl.DateTimeFormat("en-US", { month:"short", day:"numeric" }).format(value)

  return `${format(start)} – ${format(end)}`
}

function WeekControls({ selectedDate, onDateChange }){
  const isCurrentWeek = selectedDate === getWeekStart(formatDate())

  return(
    <div className="schedule-controls week-controls">
      <button className="week-nav-button" aria-label="Previous week" onClick={() => onDateChange(shiftDate(selectedDate, -7))}>←</button>
      <div className="week-summary">
        <strong>{formatWeekRange(selectedDate)}</strong>
        <span>{isCurrentWeek ? "This Week" : "Selected Week"}</span>
      </div>
      <button className="week-nav-button" aria-label="Next week" onClick={() => onDateChange(shiftDate(selectedDate, 7))}>→</button>
    </div>
  )
}

export default WeekControls
