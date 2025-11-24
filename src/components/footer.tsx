// Simple Footer
// Based on https://pure-css.github.io/menus/ horiziontal menu example
import styles from "../styles/Footer.module.css";

export default function AppFooter() {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className={styles.footer}>
      <div className="pure-u-1">
        Built with <a href="https://react.dev/">React</a>,{" "}
        <a href="https://github.com/octokit/octokit.js">Octokit</a>,{" "}
        <a href="https://pure-css.github.io/">Pure.css </a>| Oliver Dimes{" "}
        {getYear()}{" "}
      </div>
    </div>
  );
}
