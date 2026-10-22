import { formatDate, shiftDate } from "../../../utils/dates"

function formatSelectedDate(dateString){
  const date = new Date(`${dateString}T12:00:00`)

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date)
}

function DateControls({ selectedDate, onDateChange }){
  const isToday = selectedDate === formatDate()

  return(
    <div className="schedule-controls date-controls">
      <button
        className="date-nav-button"
        type="button"
        aria-label="Previous day"
        onClick={() => onDateChange(shiftDate(selectedDate, -1))}
      >
        ←
      </button>
      <div className="date-summary">
        <strong>{formatSelectedDate(selectedDate)}</strong>
        <span>{isToday ? "Today" : "Selected Date"}</span>
      </div>
      <button
        className="date-nav-button"
        type="button"
        aria-label="Next day"
        onClick={() => onDateChange(shiftDate(selectedDate, 1))}
      >
        →
      </button>
    </div>
  )
}

export default DateControls
