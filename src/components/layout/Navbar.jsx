function Navbar() {
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/">
        <span className="navbar-mark">BL</span>
        <span>BlueLine</span>
      </a>

      <div className="navbar-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/scores">Scores</NavLink>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/standings">Standings</NavLink>
        <NavLink to="/teams">Teams</NavLink>
      </div>

      <div className="navbar-pill">NHL Stats Hub</div>
    </nav>
  );
}

export default Navbar;
