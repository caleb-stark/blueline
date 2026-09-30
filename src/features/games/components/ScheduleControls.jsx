function ScheduleControls({ selectedDate, onDateChange, onRefresh }){
  return(
    <div className="schedule-controls">
      <label>
        Game date
        <input value={selectedDate} type="date" onChange={onDateChange} />
      </label>

      <button onClick={onRefresh}>Refresh data</button>
    </div>
  )
}

export default ScheduleControls
