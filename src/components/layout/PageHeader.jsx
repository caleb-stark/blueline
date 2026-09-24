import { formatDateLabel } from "../../utils/helpers"

function PageHeader({ selectedDate }){
  return(
    <header className="page-header">
      <div>
        <p className="eyebrow">Today around the league</p>
        <h1>NHL Stats Dashboard</h1>
        <p className="page-subtitle">track games, scores, team records, and standings in the NHL.</p>
      </div>

      <div className="date-card">
        <span>Selected date</span>
        <strong>{formatDateLabel(selectedDate)}</strong>
      </div>
    </header>
  )
}

export default PageHeader
