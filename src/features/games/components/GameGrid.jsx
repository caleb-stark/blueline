import GameCard from "./GameCard"

function GameGrid({ games }){
  if(!Array.isArray(games)){
    return null
  }

  return(
    <div className="game-grid">
      {games.map(game => (
        <GameCard
          key={game.id}
          game={game}
        />
      ))}
    </div>
  )
}

export default GameGrid
