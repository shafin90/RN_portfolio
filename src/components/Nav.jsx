import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link to="/" className="nav-name">Mashrafi Ahnam Shafin</Link>
        <nav className="nav-links">
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/case-studies">Case Studies</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
