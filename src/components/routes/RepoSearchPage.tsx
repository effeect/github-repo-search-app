import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSearchCode } from "../../api/searchCode";
import { CodeSearchParams, CodeSearch } from "../../types/CodeSearch";

import styles from "../../styles/AppHeader.module.css";
import { SearchCodeTable } from "../functions/CodeResults";
import { SearchBar } from "../functions/SearchBar";
import { PageControls } from "../functions/PageControls";
import { RepoSearchParams } from "../../types/RepoSearch";

export default function RepoSearchPage() {
  // For router
  const [query, setQuery] = useState<RepoSearchParams>({ query: "" });

  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});

  const fetchPageData = async (Page: number) => {
    if (cache[Page]) return; // Don't bother if its already there
    console.log("FetchPageData", query);
    const data = await GetSearchCode({
      queryParam: {
        keyword: query.query,
        in: "file",
        language: "ts",
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
    console.log("Handle Query Result", query);
    const data = await GetSearchCode({
      queryParam: {
        keyword: query.query,
        in: "file",
        language: "ts",
        repo: `${owner}/${name}`,
      },
    });
    const items = data?.data?.items ?? [];
    setCache({ 1: items });
    setPage(1);
    setSearchResults(items);
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
          {owner}/{name}
        </h1>
        <div>
          <div className={styles.AppHeader}>
            <SearchBar
              query={query}
              setQuery={(q: RepoSearchParams) => setQuery(q)}
              onSearch={handleQuery}
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
