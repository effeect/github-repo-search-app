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

import SearchResultsContainer from "../components/functions/wrappers/SearchTable";
import GetResults from "../api/page-handler";

// Keeping everything under AppHeader
export function RepoSearch() {
  // States from React for the App
  const [query, setQuery] = useState<RepoSearchParams>({
    query: "",
    language: "",
  });

  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});
  // For Loading Icon
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchPageData = async (Page: number) => {
    if (cache[Page]) return; // Don't bother if its already there
    setLoading(true);
    try {
      // console.log("FetchPageData", query);
      const data = await GetSearchRepos({
        ...query,
        pageNum: Page,
        quantity: 30,
      });
      // The data being stored is the Repos in this case
      setCache((prev) => ({ ...prev, [Page]: data }));
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  // Please note we are setting the Page to 1 when a new request is triggered
  const handleQuery = async () => {
    setLoading(true);
    try {
      // console.log("Handle Query Result", query);
      const data = await GetSearchRepos({
        ...query,
        pageNum: 1,
        quantity: 30,
      });
      setCache({ 1: data });
      setPage(1);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  // Might trigger this so we can have the next one ready so the user don't notice
  const handlePageChange = async (newPageNumber: number) => {
    setPage(newPageNumber);
    const apiPage = Math.ceil(newPageNumber / 3); //In current setup, should be 15 per page
    // await fetchPageData(apiPage);
    // Prefetch the next chunk if we are on page 2/3
    if (newPageNumber % 3 === 2) {
      await fetchPageData(apiPage + 1);
    }
  };

  const result = GetResults(page, cache);
  return (
    <>
      <div className="section has-text-centered">
        {/* Need to center this  */}
        <h1 className="title">Github Repo Search</h1>
        <p className="subtitle">
          {" "}
          Search for "repositories" on Github, use add rules to get more
          specific
        </p>

        <div className="columns is-centered">
          <div className="column is-10">
            <SearchBar<RepoSearchParams>
              query={query}
              setQuery={setQuery}
              onSearch={handleQuery}
              optionalParams={REPO_OPTIONAL_PARAMS}
              showOrder={true}
              paramConfig={REPO_PARAM_CONFIG}
            />
          </div>
        </div>
        {/* Search Table below, wrapped below*/}
        <SearchResultsContainer
          loading={loading}
          results={result.visibleResults}
          hasSearched={hasSearched}
        >
          <SearchRepoTable results={result.visibleResults} />
        </SearchResultsContainer>

        <div className="mt-4"></div>

        {/* Will hide page controls if there are no visible results*/}
        {result.visibleResults.length > 0 && (
          <div className="columns is-centered">
            <div className="column is-4">
              <PageControls
                page={page}
                handlePageChange={handlePageChange}
                disableNext={result.nextResults.length === 0}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
