import StatCard from "../../../components/ui/StatCard"

function DashboardStats({ games, scores, standings, loading }){
  const completedGames = scores.filter(game => game?.gameState === "OFF").length
  const leader = standings[0]
  const leaderName = leader?.teamAbbrev?.default || leader?.teamName?.default || "—"
  const value = currentValue => loading ? "—" : currentValue

  return(
    <section className="snapshot-grid" aria-label="League snapshot">
      <StatCard label="Today&apos;s games" value={value(games.length)} detail="Scheduled across the league" featured />
      <StatCard label="Final scores" value={value(completedGames)} detail="Completed today" />
      <StatCard label="Points leader" value={value(leaderName)} detail={loading ? "Loading standings" : leader ? `${leader.points ?? "—"} points` : "Standings unavailable"} />
    </section>
  )
}

export default DashboardStats
