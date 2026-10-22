function StatCard({ label, value, detail, featured = false }){
  return(
    <article className={`snapshot-card${featured ? " hero-stat" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <p className="stat-card-detail">{detail}</p>}
    </article>
  )
}

export default StatCard
