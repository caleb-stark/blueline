import { Link } from "react-router-dom"
import { formatDate } from "../../../utils/dates"

function DashboardHeader({ date, onRefresh }){
  return(
    <header className="page-header dashboard-header">
      <div>
        <p className="eyebrow">Today around the league</p>
        <h1 className="page-title">NHL Stats Dashboard</h1>
        <p className="page-subtitle">
          Track today&apos;s games, the latest scores, and the teams setting the pace.
        </p>
      </div>

      <div className="dashboard-header-actions">
        <div className="date-card">
          <span>League snapshot</span>
          <strong>{formatDate(date, "America/New_York")}</strong>
        </div>
        <button className="text-button" onClick={onRefresh}>Refresh data</button>
        <Link className="text-button" to="/standings">Full standings</Link>
      </div>
    </header>
  )
}

export default DashboardHeader
