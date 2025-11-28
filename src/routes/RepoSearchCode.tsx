import { useParams } from "react-router-dom";
import { useState } from "react";
import { GetSearchCode } from "../api/searchCode";
import { CodeSearchParams } from "../types/CodeSearch";
import { SearchCodeTable } from "../components/functions/CodeResults";
import { SearchBar } from "../components/functions/SearchBar";
import { PageControls } from "../components/functions/PageControls";
import {
  CODE_OPTIONAL_PARAMS,
  CODE_PARAM_CONFIG,
} from "../constants/searchParams";

import SearchResultsContainer from "../components/functions/wrappers/SearchTable";
import GetResults from "../api/page-handler";

import { useEffect } from "react";
import HeaderWrapper from "../components/functions/wrappers/header";
// Repo Search Page is the overview page to search code among a selected repo
export default function RepoSearchCode() {
  const [query, setQuery] = useState<CodeSearchParams>({ query: "" });
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});

  // For Loading Icon
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // A cheeky way of updating meta data, would use something like NextJS to handle this but don't want to install too much stuff
  useEffect(() => {
    document.title = `GitSearch : Code of ${owner}/${name}`;
  });

  // Taken from Repo Search, need to make some additonal modifications
  const fetchPageData = async (Page: number) => {
    if (cache[Page]) return; // Don't bother if its already there
    setLoading(true);
    try {
      // Uncomment below to get the complete query
      // console.log("FetchPageData", query);
      const data = await GetSearchCode({
        queryParam: {
          query: query.query,
          in: "file",
          language: query.language,
          repo: `${owner}/${name}`,
          extension: query.extension,
          filename: query.filename,
        },
        page: Page,
        per_page: 30,
      });
      // The data being stored is the Repos in this case
      const items = data?.data?.items ?? [];
      setCache((prev) => ({ ...prev, [Page]: items }));
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async () => {
    setLoading(true);
    // console.log("Handle Query Result", query);
    try {
      const data = await GetSearchCode({
        queryParam: {
          query: query.query,
          in: "file",
          language: query.language,
          repo: `${owner}/${name}`,
          extension: query.extension,
          filename: query.filename,
          size: query.size,
        },
      });
      const items = data?.data?.items ?? [];
      setCache({ 1: items });
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
      <div className="hero is-fullheight">
        <div className="section has-text-centered">
          <HeaderWrapper
            owner={owner}
            repo={name}
            title={`Code Search in ${owner}/${name}`}
            description={`Search for Code Files in ${name}, add rules if needed`}
          ></HeaderWrapper>

          <SearchBar<CodeSearchParams>
            query={query}
            setQuery={(q) => setQuery(q)}
            onSearch={handleQuery}
            optionalParams={CODE_OPTIONAL_PARAMS}
            paramConfig={CODE_PARAM_CONFIG}
          />

          {/* Search Table below, wrapped below*/}
          <SearchResultsContainer
            loading={loading}
            results={result.visibleResults}
            hasSearched={hasSearched}
          >
            <SearchCodeTable results={result.visibleResults} />
          </SearchResultsContainer>
          {/* Will hide page controls if there are no visible results*/}
          {result.visibleResults.length > 0 && (
            <PageControls
              page={page}
              handlePageChange={handlePageChange}
              disableNext={result.nextResults.length === 0}
            />
          )}
        </div>
      </div>
    </>
  );
}
