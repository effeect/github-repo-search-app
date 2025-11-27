import styles from "../../styles/SearchBar.module.css";
import { useState } from "react";
import { AddRule } from "../rules/AddRule";

type BaseQuery = {
  query: string;
  sort?: "stars" | "forks" | "updated";
  order?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
};

type NumericFilter = {
  op: ">" | "<" | "=";
  value: number;
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
  // For number filtering if you want more/less/equal operators
  const [operators, setOperators] = useState<Partial<Record<keyof T, string>>>(
    {}
  );
  const handleChange = (
    key: keyof T,
    value: string | number | boolean,
    operator?: string
  ) => {
    if (operator) {
      value = operator + String(value);
    }
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

    // If we are dealing with numbers, need to handle the operators
    Object.keys(operators).forEach((k) => {
      const key = k as keyof T;
      const op = operators[key];
      if (op && fullParams[key]) {
        fullParams[key] = `${op}${fullParams[key]}` as unknown as T[keyof T];
      }
    });

    setQuery(fullParams);
    onSearch();
  };

  return (
    <>
      <div className="columns is-centered">
        <div className="column is-10">
          <form
            className="box"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              onSearchClick();
            }}
          >
            {/* Search input */}
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  id="search"
                  type="search"
                  className="input"
                  placeholder="Search for Repository here..."
                  value={query.query}
                  onChange={(e) =>
                    setQuery({ ...query, query: e.target.value })
                  }
                  required
                  autoFocus
                />
              </div>

              <div className="control">
                <button type="submit" className="button is-primary">
                  Go
                </button>
              </div>

              {showOrder && (
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      id="sort"
                      value={query.sort ?? ""}
                      onChange={(e) =>
                        setQuery({ ...query, sort: e.target.value })
                      }
                    >
                      <option value="">Best Match (default)</option>
                      <option value="stars">Stars</option>
                      <option value="forks">Forks</option>
                      <option value="updated">Updated</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Modal for adding rules */}
            <div className="control">
              <button
                type="button"
                className="button is-link"
                onClick={() => setIsModalOpen(true)}
              >
                Add Rule
              </button>
            </div>
            <AddRule
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAdd={handleAddParam}
              availableParams={
                optionalParams.filter(
                  (p) => !activeParams.includes(p)
                ) as string[]
              }
            />
            <div className="mt-4"></div>

            {/* Active Params */}
            {activeParams.map((key) => {
              const type = paramConfig[key];
              const value = query[key] ?? "";

              return (
                <div key={String(key)} className="field">
                  <div className="field has-addons">
                    {/* Doing a static button as had an issue with the Label object*/}
                    <div className="control">
                      <a className="button is-static">
                        {/* Thanks to https://www.geeksforgeeks.org/javascript/how-to-make-first-letter-of-a-string-uppercase-in-javascript/*/}
                        {String(key).replace(/^./, (char) =>
                          char.toUpperCase()
                        )}
                      </a>
                    </div>

                    <div className="control is-expanded">
                      {type === "string" && (
                        <input
                          type="text"
                          className="input"
                          value={String(value) ?? ""}
                          onChange={(e) => handleChange(key, e.target.value)}
                        />
                      )}
                      {/* Number Operations */}
                      {type === "number" && (
                        <div className="field has-addons">
                          <div className="control">
                            <div className="select">
                              <select
                                value={operators[String(key)] ?? ""}
                                onChange={(e) => {
                                  const nextOp = e.target.value;
                                  setOperators({ ...operators, [key]: nextOp });
                                  const rawNumber = params[key];
                                  if (
                                    rawNumber !== undefined &&
                                    rawNumber !== ""
                                  ) {
                                    setQuery({
                                      ...query,
                                      [key]: `${nextOp}${rawNumber}`,
                                    } as T);
                                  }
                                }}
                              >
                                <option value="">Equal to </option>
                                <option value=">">More Than (&gt;)</option>
                                <option value="<">Less Than (&lt;)</option>
                              </select>
                            </div>
                          </div>
                          <div className="control is-expanded">
                            <input
                              type="number"
                              className="input"
                              value={(params[key] as number) ?? 0}
                              onChange={(e) => {
                                const rawNumber = e.target.value;
                                setParams({
                                  ...params,
                                  [key]: rawNumber as any,
                                });
                                const op = operators[key] ?? "";
                                setQuery({
                                  ...query,
                                  [key]: `${op}${rawNumber}`,
                                } as T);
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {/* With the design of the handler, if there is no value selected it shouldn't "break" the query*/}
                      {type === "boolean" && (
                        <div className="select is-fullwidth">
                          <select
                            value={String(value)}
                            onChange={(e) =>
                              handleChange(key, e.target.value === "true")
                            }
                          >
                            <option value="">Select...</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Remove button beside optional input field */}
                    <div className="control">
                      <button
                        type="button"
                        className="button is-danger"
                        onClick={() => handleRemoveParam(key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </div>
    </>
  );
}
