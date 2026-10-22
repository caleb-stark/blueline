import GameCard from "./GameCard"

function GameGrid({ games, variant }){
  if(!Array.isArray(games)){
    return null
  }

  return(
    <div className="game-grid">
      {games.map(game => (
        <GameCard
          key={game.id}
          game={game}
          variant={variant}
        />
      ))}
    </div>
  )
}

export default GameGrid
