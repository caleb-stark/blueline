function ScheduleControls({ selectedDate, onDateChange, onRefresh }){
  function handleDateChange(event){
    onDateChange(event.target.value)
  }

  return(
    <div className="schedule-controls">
      <label>
        Game date
        <input value={selectedDate} type="date" onChange={handleDateChange} />
      </label>

      <button onClick={onRefresh}>Refresh data</button>
    </div>
  )
}

export default ScheduleControls
