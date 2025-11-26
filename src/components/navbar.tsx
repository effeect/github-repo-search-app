// Simple Navbar
import React, { useState } from "react";
// import styles from "../styles/Navbar.module.css";
// Based on https://bulma.io/documentation/components/navbar/ example
export default function AppNavbar() {
  const [isActive, setIsActive] = useState(false);
  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h3 className="">GitSearch</h3>
        </a>

        <a
          role="button"
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
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        {/* Navbar items can go here */}
        <div className="navbar-end">
          <a className="navbar-item">Home</a>
          <a className="navbar-item">About</a>
          <a
            href="https://github.com/effeect/github-repo-search-app"
            className="navbar-item"
          >
            Github
          </a>
        </div>
      </div>
    </nav>
  );
}
