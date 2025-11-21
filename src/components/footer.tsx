// Simple Footer
// Based on https://pure-css.github.io/menus/ horiziontal menu example
export default function AppFooter() {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div>Built with React, Octokit, Pure.css | Oliver Dimes {getYear()} </div>
  );
}
