import styles from "../../styles/SearchBar.module.css";

import { RepoSearchParams } from "../../types/RepoSearch";

import { useState } from "react";

import { AddRule } from "../rules/AddRule";

// Generic Type to extend on
type SearchBarDefinition<T> = {
  query: T;
  setQuery: (q: T) => void;
  onSearch: () => void;
};

type SearchBarProps<T> = SearchBarDefinition<T> & {
  optionalParams: readonly (keyof Omit<T, "query">)[];
};

// Component will need a type input of some sorts
export function SearchBar<T extends { query: string }>({
  query,
  setQuery,
  onSearch,
  optionalParams,
}: SearchBarProps<T>) {
  const [params, setParams] = useState<Partial<T>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Active Params is effectively what "rules" might be in use at any given point
  const [activeParams, setActiveParams] = useState<(keyof Omit<T, "query">)[]>(
    []
  );

  const handleChange = (key: keyof T, value: string) => {
    setParams({ ...params, [key]: value }); // Sets the Optional Params

    setQuery({ ...query, [key]: value } as T); // Set the main query
  }; //Remove Handler

  const handleRemoveParam = (param: keyof Omit<T, "query">) => {
    setActiveParams(activeParams.filter((p) => p !== param));
    const newParams = { ...params };
    delete newParams[param];
    setParams(newParams);
    const newQuery = { ...query };
    delete (newQuery as any)[param];
    setQuery(newQuery);
  }; // To store Whichever params are active

  const handleAddParam = (param: string) => {
    setActiveParams([...activeParams, param as keyof Omit<T, "query">]);
    setIsModalOpen(false);
  };
  // Button Search
  const onSearchClick = () => {
    console.log("Params", params);
    const fullParams = { query: query.query, ...params } as T;
    // console.log("Full Params", fullParams);
    setQuery(fullParams);
    onSearch();
  };

  return (
    <div className={styles.searchform}>
      <div className="pure-g">
        {" "}
        <div className="pure-u-1-3">
          {" "}
          <div className={styles.buttonContainer}>
            {" "}
            <input
              type="text"
              className="pure-input pure-input-rounded"
              value={query.query}
              onChange={(e) => {
                setQuery({ ...query, query: e.target.value });
              }}
              placeholder="Type in your Repo Name Here"
              aria-label="Search"
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="pure-u-1-3">
          {" "}
          <div className={styles.buttonContainer}>
            {" "}
            <button
              onClick={onSearchClick}
              className={`${styles.buttonContainer} pure-button`}
            >
              Search {" "}
            </button>
             {" "}
          </div>{" "}
        </div>{" "}
        <div className="pure-u-3-3">
          {" "}
          <div className={styles.buttonContainer}>
            {" "}
            <button
              type="button"
              className={`${styles.buttonContainer} pure-button`}
              onClick={() => setIsModalOpen(true)}
            >
              Add Rule{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <AddRule
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddParam}
        availableParams={
          optionalParams.filter((p) => !activeParams.includes(p)) as string[]
        }
      />
      {/* Below is the for loop for parameters */}{" "}
      {/* Render only active params */}{" "}
      {activeParams.map((key) => (
        <div key={String(key)} className={styles.centerContent}>
          {" "}
          <div className={styles.buttonContainer}>
            {" "}
            <label>
              {String(key)} :{" "}
              <input
                type="text"
                value={String(query[key] ?? "")}
                onChange={(e) => handleChange(key, e.target.value)}
              />{" "}
            </label>{" "}
            <button
              type="button"
              className="pure-button"
              onClick={() => handleRemoveParam(key)}
            >
              ✖ Remove{" "}
            </button>{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </div>
  );
}
