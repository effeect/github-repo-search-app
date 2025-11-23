import styles from "../../styles/SearchBar.module.css";
import { RepoSearchParams } from "../../types/RepoSearch";
import { useState } from "react";

type SearchBarDef = {
  query: RepoSearchParams;
  setQuery: (q: RepoSearchParams) => void;
  onSearch: () => void;
};

export function SearchBar(search: SearchBarDef) {
  const [params, setParams] = useState<Partial<RepoSearchParams>>({});

  const handleChange = (key: keyof RepoSearchParams, value: string) => {
    search.setQuery({ ...search.query, [key]: value });
  };
  // Keys of RepoSearchParams except "query"
  const optionalParams: (keyof Omit<RepoSearchParams, "query">)[] = [
    "in",
    "language",
    "topic",
    "license",
    "isPublic",
    "isPrivate",
    "mirror",
    "pageNum",
    "template",
    "archived",
    "sort",
    "order",
    "quantity",
  ];

  const onSearchClick = () => {
    // Button Search
    console.log("Params", params);
    const fullParams: RepoSearchParams = {
      query: search.query.query,
      ...params,
    };
    console.log("Full Params", fullParams);
    search.setQuery(fullParams);
    search.onSearch();
  };

  return (
    <div className={styles.searchform}>
      <div className={styles.centerContent}>
        <div className="pure-u-1-3">
          <div className={styles.buttonContainer}>
            <input
              type="text"
              className="pure-input pure-input-rounded"
              value={search.query.query}
              onChange={(e) => {
                search.setQuery({ ...search.query, query: e.target.value });
              }}
              placeholder="Type in your Repo Name Here"
              aria-label="Search"
            />
          </div>
        </div>
        <div className="pure-u-1-3">
          <div className={styles.buttonContainer}>
            <button
              onClick={onSearchClick}
              className={`${styles.buttonContainer} pure-button`}
            >
              Search
            </button>
          </div>
        </div>
        <div className="pure-u-3-3">
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
      {/* Below is the for loop */}

      {optionalParams.map((key) => (
        <div className={styles.centerContent}>
          <div key={key} className={styles.buttonContainer}>
            <label>
              {key} :
              <input
                type="text"
                value={String(search.query[key] ?? "")}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
