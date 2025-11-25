import { useParams } from "react-router-dom";
import { useState } from "react";
import { GetSearchCode } from "../api/searchCode";
import { CodeSearchParams } from "../types/CodeSearch";

import styles from "../styles/AppHeader.module.css";
import { SearchCodeTable } from "../components/functions/CodeResults";
import { SearchBar } from "../components/functions/SearchBar";
import { PageControls } from "../components/functions/PageControls";
import { CODE_OPTIONAL_PARAMS } from "../constants/searchParams";

// Repo Search Page is the overview page to search code among a selected repo
export default function RepoSearchPage() {
  const [query, setQuery] = useState<CodeSearchParams>({ query: "" });
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});

  // Taken from Repo Search, need to make some additonal modifications
  const fetchPageData = async (Page: number) => {
    if (cache[Page]) return; // Don't bother if its already there
    // console.log("FetchPageData", query);
    const data = await GetSearchCode({
      queryParam: {
        query: query.query,
        in: "file",
        language: query.language,
        repo: `${owner}/${name}`,
      },
      page: Page,
      per_page: 30,
    });
    // The data being stored is the Repos in this case
    const items = data?.data?.items ?? [];
    setCache((prev) => ({ ...prev, [Page]: items }));
  };

  const handleQuery = async () => {
    // console.log("Handle Query Result", query);
    const data = await GetSearchCode({
      queryParam: {
        query: query.query,
        in: "file",
        language: query.language,
        repo: `${owner}/${name}`,
      },
    });
    const items = data?.data?.items ?? [];
    setCache({ 1: items });
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

  return (
    <>
      <div className={styles.AppHeader}>
        {/* Need to center this  */}
        <h1 className="pure-heading">
          Code Search for{" "}
          <big>
            {owner}/{name}
          </big>
        </h1>
        <div>
          <div className={styles.AppHeader}>
            <SearchBar<CodeSearchParams>
              query={query}
              setQuery={(q) => setQuery(q)}
              onSearch={handleQuery}
              optionalParams={CODE_OPTIONAL_PARAMS}
            />
            {/* Need to center this  */}
            <h1 className="pure-heading">Results : </h1>

            {/* Search Table below*/}
            <div className="pure-g">
              {" "}
              <SearchCodeTable results={visibleResults} />
            </div>
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
        </div>
      </div>
    </>
  );
}
