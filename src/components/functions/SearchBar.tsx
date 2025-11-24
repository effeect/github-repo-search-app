import styles from "../../styles/SearchBar.module.css";
import { useState } from "react";
import { AddRule } from "../rules/AddRule";

// Generic Type to extend on
type SearchBarDefinition<T> = {
  query: T;
  setQuery: (q: T) => void;
  onSearch: () => void;
};

// Extended to add the parameter of Optional Params
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
  // State of the modal, which is allowed to add "Rules"
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
    <form
      className={styles.searchform}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearchClick();
      }}
    >
      <label htmlFor="search">Search for stuff</label>
      <input
        id="search"
        type="search"
        placeholder="Search..."
        value={query.query}
        onChange={(e) => setQuery({ ...query, query: e.target.value })}
        required
        autoFocus
      />
      <button type="submit">Go</button>

      {/* Add Rule button */}
      <button type="button" onClick={() => setIsModalOpen(true)}>
        Add Rule
      </button>

      <AddRule
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddParam}
        availableParams={
          optionalParams.filter((p) => !activeParams.includes(p)) as string[]
        }
      />

      {/* Render active params */}
      {activeParams.map((key) => (
        <div key={String(key)} className={styles.centerContent}>
          <div className={styles.buttonContainer}>
            <input
              type="search"
              placeholder={`Enter ${String(key)}...`}
              value={String(query[key] ?? "")}
              onChange={(e) => handleChange(key, e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveParam(key)}>
              ✖ Remove
            </button>
          </div>
        </div>
      ))}
    </form>
  );
}
