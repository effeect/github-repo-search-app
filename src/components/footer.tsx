// Basic Footer powered with Bulma
export default function AppFooter() {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>GitSearch</strong> by Oliver Dimes {getYear()}. Built with{" "}
            <a href="https://reactjs.org/">React</a> and{" "}
            <a href="https://bulma.io/">Bulma</a>.
          </p>
        </div>
      </footer>
    </>
  );
}
