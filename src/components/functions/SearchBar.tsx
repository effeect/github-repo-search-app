import styles from "../../styles/SearchBar.module.css";
import { RepoSearchParams } from "../../types/RepoSearch";
import { useState } from "react";

import { AddRule } from "../rules/AddRule";

type SearchBarDef = {
  query: RepoSearchParams;
  setQuery: (q: RepoSearchParams) => void;
  onSearch: () => void;
};

export function SearchBar(search: SearchBarDef) {
  const [params, setParams] = useState<Partial<RepoSearchParams>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = (key: keyof RepoSearchParams, value: string) => {
    setParams({ ...params, [key]: value }); // Sets the Optional Params
    search.setQuery({ ...search.query, [key]: value }); // Set the main query
  };

  // To store which "rules are active"
  const [activeParams, setActiveParams] = useState<
    (keyof Omit<RepoSearchParams, "query">)[]
  >([]);

  const handleAddParam = (param: string) => {
    setActiveParams([
      ...activeParams,
      param as keyof Omit<RepoSearchParams, "query">,
    ]);
    setIsModalOpen(false);
  };

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
    "stars",
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
      <div className="pure-g">
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
              type="button"
              className={`${styles.buttonContainer} pure-button`}
              onClick={() => setIsModalOpen(true)}
            >
              Add Rule
            </button>
          </div>
        </div>
      </div>
      <AddRule
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddParam}
        availableParams={optionalParams.filter(
          (p) => !activeParams.includes(p)
        )}
      />
      {/* Below is the for loop for parameters */}

      {/* Render only active params */}
      {activeParams.map((key) => (
        <div key={key} className={styles.centerContent}>
          <div className={styles.buttonContainer}>
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
