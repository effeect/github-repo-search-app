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
        <div className="pure-u-1 pure-u-md-1-2">
          <div className={styles.buttonContainer}>
            <input
              type="text"
              className="pure-input pure-input-rounded"
              value={search.query}
              onChange={(e) => search.setQuery(e.target.value)}
              placeholder="Type in your Repo Name Here"
              aria-label="Search"
            />
          </div>
        </div>
        <div className="pure-u-1 pure-u-md-1-4">
          <div className={styles.buttonContainer}>
            <button
              onClick={(e) => {
                search.onSearch();
              }}
              className={`${styles.buttonContainer} pure-button`}
            >
              Search
            </button>
          </div>
        </div>
        <div className="pure-u-1 pure-u-md-1-4">
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={`${styles.buttonContainer} pure-button `}
            >
              Add Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
