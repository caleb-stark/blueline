function ErrorMessage({ message, onRetry }){
  return(
    <div className="error-card">
      <div>
        <strong>Data request failed</strong>
        <p>{message}</p>
      </div>

      <button onClick={onRetry}>Try again</button>
    </div>
  )
}

export default ErrorMessage
