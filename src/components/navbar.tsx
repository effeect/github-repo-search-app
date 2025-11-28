// Simple Navbar
import { useState } from "react";
import { Link } from "react-router-dom";
// Based on https://bulma.io/documentation/components/navbar/ example
export default function AppNavbar() {
  const [isActive, setIsActive] = useState(false);
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <h3 className="title is-4">GitSearch</h3>
        </Link>

        <button
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive}
          data-target="navbarBasicExample"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        {/* Navbar items can go here */}
        <div className="navbar-end">
          <a
            href="https://github.com/effeect/github-repo-search-app"
            className="navbar-item"
          >
            Github Repository
          </a>
        </div>
      </div>
    </nav>
  );
}
