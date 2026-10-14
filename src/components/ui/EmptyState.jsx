function EmptyState({ title, message }){
  return(
    <div className="empty-card">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  )
}

export default EmptyState
