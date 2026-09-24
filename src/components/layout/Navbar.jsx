import "./Navbar.css"

function Navbar(){
  return(
    <nav className="navbar">
      <a className="navbar-brand" href="/">
        <span className="navbar-mark">BL</span>
        <span>BlueLine</span>
      </a>

      <div className="navbar-links">
        <a href="/">Dashboard</a>
        <a href="#scores">Scores</a>
        <a href="#games">Games</a>
        <a href="#standings">Standings</a>
      </div>

      <div className="navbar-pill">NHL Stats Hub</div>
    </nav>
  )
}

export default Navbar
