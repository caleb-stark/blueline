function StatCard({ label, value, detail }){
  return(
    <article className="snapshot-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <p className="stat-card-detail">{detail}</p>}
    </article>
  )
}

export default StatCard
