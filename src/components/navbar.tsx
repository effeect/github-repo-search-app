// Simple Navbar
import styles from "../styles/Navbar.module.css";
// Based on https://pure-css.github.io/menus/ horiziontal menu example
export default function AppNavbar() {
  return (
    <div className={`${styles.NavbarFormat} pure-menu pure-menu-horizontal`}>
      <a href="/" className="pure-menu-heading pure-menu-link">
        Home
      </a>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <a href="https://www.google.com" className="pure-menu-link">
            Test Link
          </a>
        </li>
      </ul>
    </div>
  );
}
