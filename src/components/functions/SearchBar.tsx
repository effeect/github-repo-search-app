import styles from "../../styles/SearchBar.module.css";
import { useState } from "react";
import { AddRule } from "../rules/AddRule";

type BaseQuery = {
  query: string;
  sort?: "stars" | "forks" | "updated";
  order?: "asc" | "desc";
};

type SearchBarDefinition<T> = {
  query: T;
  setQuery: (q: T) => void;
  onSearch: () => void;
};

type ParamType = "string" | "number" | "boolean";

type ParamConfig<T> = {
  [K in keyof Omit<T, "query">]?: ParamType;
};

type SearchBarProps<T> = SearchBarDefinition<T> & {
  optionalParams: readonly (keyof Omit<T, "query">)[];
  showOrder?: boolean;
  paramConfig: ParamConfig<T>;
};

// Component will need a type input of some sorts
export function SearchBar<T extends BaseQuery>({
  query,
  setQuery,
  onSearch,
  optionalParams,
  showOrder,
  paramConfig = {},
}: SearchBarProps<T>) {
  const [params, setParams] = useState<Partial<T>>({});
  // State of the modal, which is allowed to add "Rules"
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Active Params is effectively what "rules" might be in use at any given point
  const [activeParams, setActiveParams] = useState<(keyof Omit<T, "query">)[]>(
    []
  );

  const handleChange = (key: keyof T, value: string | number | boolean) => {
    setParams({ ...params, [key]: value });
    setQuery({ ...query, [key]: value } as T);
  };

  // If the remove button is clicked, this will occur
  const handleRemoveParam = (param: keyof Omit<T, "query">) => {
    setActiveParams(activeParams.filter((p) => p !== param));
    const newParams = { ...params };
    delete newParams[param];
    setParams(newParams);
    const newQuery = { ...query };
    delete (newQuery as any)[param];
    setQuery(newQuery);
  };

  // Add an optional param
  const handleAddParam = (param: string) => {
    setActiveParams([...activeParams, param as keyof Omit<T, "query">]);
    setIsModalOpen(false);
  };

  // Button Search here
  const onSearchClick = () => {
    const fullParams = { ...query, ...params } as T;
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
      <label htmlFor="search">Search</label>
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
      <div className={styles.centerContent}>
        {activeParams.map((key) => {
          const type = paramConfig[key];

          const value = query[key] ?? "";
          return (
            <div key={String(key)} className={styles.centerContent}>
              {/* Some basic input validation abliet would like to do something a bit tidier*/}
              {type === "string" && (
                <input
                  type="text"
                  value={String(value)}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              )}
              {type === "number" && (
                <input
                  type="number"
                  value={value as number | ""}
                  onChange={(e) => handleChange(key, Number(e.target.value))}
                />
              )}
              {type === "boolean" && (
                <select
                  value={String(value)}
                  onChange={(e) => handleChange(key, e.target.value === "true")}
                >
                  <option value="">Select...</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              )}
            </div>
          );
        })}
      </div>
      {/* Sort Dropdown for search*/}
      {showOrder && (
        <div className={styles.centerContent}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            // Best Match by default
            value={query.sort ?? ""}
            onChange={(e) => setQuery({ ...query, sort: e.target.value })}
          >
            <option value="">Best Match (default)</option>
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="updated">Updated</option>
          </select>
        </div>
      )}

      {/* Order dropdown */}
      {/* <div className={styles.centerContent}>
        <label htmlFor="order">Order:</label>
        <select
          id="order"
          // Descending by default
          value={query.order ?? "desc"}
          onChange={(e) => setQuery({ ...query, order: e.target.value })}
        >
          <option value="desc">Descending (default)</option>
          <option value="asc">Ascending</option>
        </select>
      </div> */}
    </form>
  );
}
