// Simple React Component to test the API endpoint

// PLACEHOLDER FOR UI
import { useState } from "react";
import { searchRepos, fetchRepos } from "../api/repos";
import { SearchCode } from "../api/search";
// Import Styles
import styles from "../styles/RepoTable.module.css";
// Types
import { SearchQuery } from "../types/RepoSearch";

// 1. Search Repos
export function SearchRepoObject() {
  // Declaring React States for this simple example
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1); // initin it to 1, may allow the number to be set elsewhere

  // handle for organisation Querys
  const handleQuery = async () => {
    const data = await searchRepos({ query: query, language: "javascript" });
    // console.log(data);
    setResults(data);
  };

  // Might trigger this so we can have the next one ready so the user don't notice
  const handlePageChange = async (newPageNumber: number) => {
    setPage(newPageNumber);
    // And we will request to get the next page data
    const data = await searchRepos({
      query: query,
      language: "assembly",
      pageNum: page,
    });
    // console.log(data);
    setResults(data);
  };

  return (
    <>
      <div className={styles.RepoTable}>
        {/* Need to center this */}
        <div className="pure-g">
          <div className="pure-u-1-3">
            <input
              type="text"
              className="pure-input-rounded"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Repo Name here"
            />
            <div className="pure-u-1-3">
              <button onClick={handleQuery} className="pure-button">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-3-3">
            <hr></hr>
            <table className="pure-table pure-table-horizontal">
              <thead>
                <tr>
                  <th>Entry</th>
                  <th>Repo Name</th>
                  <th>Description</th>
                  <th>Star Count</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr>
                    <td>{result.id}</td>
                    <td>{result.full_name}</td>
                    <td>{result.description}</td>
                    <td>{result.stargazers_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Buttons to change the page over
        Note that there is no caching which is a waste 
      */}
        <div className="pure-g">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>

          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        </div>
      </div>
    </>
  );
}

// 2. Search Code Test

export function SearchCodeObject() {
  const handleCodeSearch = async () => {
    // Example Query
    // We will do more advanced ones later
    // console.log in:file language:ts repo:effeect/LANMAN-Containers
    const data = await SearchCode({
      queryParam: {
        keyword: "console.log",
        in: "file",
        language: "ts",
        repo: "effeect/LANMAN-Containers",
      },
    });
    console.log(data);
  };
  return <button onClick={handleCodeSearch}>Code Button</button>;
}
