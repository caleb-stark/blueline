function GameCard({ game }){
  return(
    <article>
      <p>{game.awayTeam.abbrev}</p>
      <p>{game.homeTeam.abbrev}</p>
    </article>
  )
}

export default GameCard