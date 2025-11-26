// Similar to TableResults.tsx
// This component shows a list of results for the Code Searching
// Based off TableResults

import styles from "../../styles/RepoTable.module.css";
import { Link } from "react-router-dom";

type TableResultsDef = {
  results: any[];
};

export function SearchCodeTable({ results }: TableResultsDef) {
  // const location = useLocation();
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-10">
              <ul className="menu-list">
                {results.map((result) => {
                  // console.log(result);
                  const owner = result.repository.owner.login;
                  const repo = result.repository.name;
                  const filePath = result.path;

                  return (
                    <li key={result.id} className="mb-4">
                      <div className="box">
                        {/* File Path for the file on Github below*/}
                        <Link
                          to={`/code/${owner}/${repo}/${filePath}`}
                          className="has-text-weight-semibold is-size-5"
                        >
                          <h3 className="title is-5">{result.name}</h3>
                        </Link>
                        <p className="subtitle is-6">Path : {result.path}</p>
                        <p className="subtitle is-6">
                          {" "}
                          Download link : {result.repository.downloads_url}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
