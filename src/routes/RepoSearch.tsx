// Main Header

import { useState } from "react";
// Import Styles
import styles from "../styles/AppHeader.module.css";

import { GetSearchRepos } from "../api/searchRepo";

import { SearchBar } from "../components/functions/SearchBar";
import { SearchRepoTable } from "../components/functions/TableResults";
import { PageControls } from "../components/functions/PageControls";
import { RepoSearchParams } from "../types/RepoSearch";
import {
  REPO_OPTIONAL_PARAMS,
  REPO_PARAM_CONFIG,
} from "../constants/searchParams";

// Keeping everything under AppHeader
export function RepoSearch() {
  // States from React for the App
  const [query, setQuery] = useState<RepoSearchParams>({
    query: "",
    language: "",
  });

  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});
  // Cache Stuff for the Table Design
  // Scary Use State below...

  /*    
    To keep it snappy, we will load in 45 repos
    However, we will only display 15,
    When we are browsing to 30-45, we will load the next 45 in prep
    Keeps the UI snappy
    Also caching the result so its quick and easy 
  */

  // This will handle the query,

  const fetchPageData = async (Page: number) => {
    if (cache[Page]) return; // Don't bother if its already there
    // console.log("FetchPageData", query);
    const data = await GetSearchRepos({
      ...query,
      pageNum: Page,
      quantity: 30,
    });
    // The data being stored is the Repos in this case
    setCache((prev) => ({ ...prev, [Page]: data }));
  };

  // Please note we are setting the Page to 1 when a new request is triggered
  const handleQuery = async () => {
    // console.log("Handle Query Result", query);
    const data = await GetSearchRepos({
      ...query,
      pageNum: 1,
      quantity: 30,
    });
    setCache({ 1: data });
    setPage(1);
  };

  // Might trigger this so we can have the next one ready so the user don't notice
  const handlePageChange = async (newPageNumber: number) => {
    setPage(newPageNumber);
    const apiPage = Math.ceil(newPageNumber / 3); //In current setup, should be 15 per page
    await fetchPageData(apiPage);
    // Prefetch the next chunk if we are on page 2/3
    if (newPageNumber % 3 === 2) {
      await fetchPageData(apiPage + 1);
    }
  };
  //============================
  // Tidy this area up
  const apiPage = Math.ceil(page / 3);
  const chunk = cache[apiPage] || [];
  const startIndex = ((page - 1) % 3) * 10;
  const visibleResults = chunk.slice(startIndex, startIndex + 10);

  // Look ahead to next page
  const nextPage = page + 1;
  const nextApiPage = Math.ceil(nextPage / 3);
  const nextChunk = cache[nextApiPage] || [];
  const nextStartIndex = ((nextPage - 1) % 3) * 10;
  const nextResults = nextChunk.slice(nextStartIndex, nextStartIndex + 10);

  //=============================
  return (
    <>
      <div className={styles.AppHeader}>
        {/* Need to center this  */}
        <h1 className="pure-heading">Github Repo Search</h1>
        <small>
          Search for "repositories" on Github, use add rules to get more
          specific
        </small>
        <div className="pure-g">
          <SearchBar<RepoSearchParams>
            query={query}
            setQuery={setQuery}
            onSearch={handleQuery}
            optionalParams={REPO_OPTIONAL_PARAMS}
            showOrder={true}
            paramConfig={REPO_PARAM_CONFIG}
          />
        </div>
        <div className="pure-g">
          <SearchRepoTable results={visibleResults} />
        </div>
        <div className="padding">{page}</div>

        {/* Will hide page controls if there are no visible results*/}
        {visibleResults.length > 0 && (
          <div>
            <PageControls
              page={page}
              handlePageChange={handlePageChange}
              disableNext={nextResults.length === 0}
            />
          </div>
        )}
      </div>
    </>
  );
}
