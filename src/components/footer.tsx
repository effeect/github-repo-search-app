// Simple Footer
// Based on https://pure-css.github.io/menus/ horiziontal menu example
import styles from "../styles/Footer.module.css";

export default function AppFooter() {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Github Repo Search App </strong> by Oliver Dimes {getYear()}
            . Built with <a href="https://reactjs.org/">React</a> and{" "}
            <a href="https://bulma.io/">Bulma</a>.
          </p>
        </div>
      </footer>
    </>
  );
}
