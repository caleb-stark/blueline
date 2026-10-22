import { useCallback, useMemo } from "react"
import DashboardGames from "../features/dashboard/components/DashboardGames"
import DashboardHeader from "../features/dashboard/components/DashboardHeader"
import DashboardStandings from "../features/dashboard/components/DashboardStandings"
import DashboardStats from "../features/dashboard/components/DashboardStats"
import useDashboardData from "../features/dashboard/hooks/useDashboardData"
import { formatDate } from "../utils/dates"

function DashboardPage(){
  const date = useMemo(() => formatDate(), [])
  const { games, scores, standings, loading, error, refetch } = useDashboardData(date)
  const handleRefresh = useCallback(() => refetch(), [refetch])

  return (
    <div className="dashboard-container">
      <DashboardHeader date={date} onRefresh={handleRefresh} />
      <DashboardStats games={games} scores={scores} standings={standings} loading={loading} />
      <div className="dashboard-content-grid">
        <DashboardGames games={games} scores={scores} loading={loading} error={error} onRetry={handleRefresh} />
        <DashboardStandings standings={standings} loading={loading} error={error} onRetry={handleRefresh} />
      </div>
    </div>
  )
}

export default DashboardPage;
