import { shiftDate } from "../../../utils/dates"

function WeekControls({ selectedDate, onDateChange, onRefresh }){
  return(
    <div className="schedule-controls week-controls">
      <button onClick={() => onDateChange(shiftDate(selectedDate, -7))}>Previous week</button>
      <label>
        Week starting
        <input value={selectedDate} type="date" onChange={event => onDateChange(event.target.value)} />
      </label>
      <button onClick={() => onDateChange(shiftDate(selectedDate, 7))}>Next week</button>
      <button onClick={onRefresh}>Refresh data</button>
    </div>
  )
}

export default WeekControls
