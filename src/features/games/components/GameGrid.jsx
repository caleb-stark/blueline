import GameCard from "./GameCard"

function GameGrid({ games }){
  if(!games.length){
    return(
      <div className="empty-card">
        <h3>No games found</h3>
        <p>Try a different date or refresh the dashboard.</p>
      </div>
    )
  }

  return(
    <div className="game-grid">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}

export default GameGrid
