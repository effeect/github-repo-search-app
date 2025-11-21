// Main Header

import { useState } from "react";
import { fetchRepos } from "../api/searchRepo";
// Import Styles
import styles from "../styles/AppHeader.module.css";

import { GetSearchRepos } from "../api/searchRepo";

import { SearchBar } from "./functions/SearchBar";
import { SearchRepoTable } from "./functions/TableResults";
import { PageControls } from "./functions/PageControls";

// Keeping everything under AppHeader
export function AppHeader() {
  // States from React for the App
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  // handle for organisation Querys
  const handleQuery = async () => {
    const data = await GetSearchRepos({ query: query, language: "javascript" });
    // console.log(data);
    setResults(data);
  };

  // Might trigger this so we can have the next one ready so the user don't notice
  const handlePageChange = async (newPageNumber: number) => {
    setPage(newPageNumber);
    // And we will request to get the next page data
    const data = await GetSearchRepos({
      query: query,
      language: "assembly",
      pageNum: page,
    });
    // console.log(data);
    setResults(data);
  };

  return (
    <>
      <div className={styles.AppHeader}>
        {/* Need to center this */}
        <h1 className="pure-heading">Search Your Things Here!</h1>
        <div className="pure-g">
          <SearchBar query={query} setQuery={setQuery} onSearch={handleQuery} />
        </div>
        <div className="pure-g">
          <SearchRepoTable results={results} />
        </div>
        <div className="pure-g">
          <PageControls page={page} handlePageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}
