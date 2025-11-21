import styles from "../../styles/SearchBar.module.css";

type SearchBarDef = {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
};

export function SearchBar(search: SearchBarDef) {
  return (
    <div className={styles.searchform}>
      <div className={styles.centerContent}>
        <form
          className="pure-form pure-g"
          onSubmit={(e) => {
            // Note that this is needed as the default form behaviour will break the page lol.
            e.preventDefault();
            search.onSearch();
          }}
        >
          <div className="pure-u-1 pure-u-md-18-24">
            <input
              type="text"
              className="pure-input pure-input-rounded"
              value={search.query}
              onChange={(e) => search.setQuery(e.target.value)}
              placeholder="Type in your Repo Name Here"
              aria-label="Search"
            />
          </div>
          <div className="pure-u-1 pure-u-md-6-24">
            <button
              type="submit"
              className="pure-button pure-button-primary pure-input-1"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
