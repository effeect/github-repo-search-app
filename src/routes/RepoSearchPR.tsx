import { useParams } from "react-router-dom";
import { useState } from "react";
import { GetSearchPR } from "../api/searchPR";
import { IssueSearchQuery } from "../types/IssueSearch";

import { Link } from "react-router-dom";
import { IssueResultTable } from "../components/functions/IssueResults";
import { SearchBar } from "../components/functions/SearchBar";
import { PageControls } from "../components/functions/PageControls";
import {
  ISSUE_OPTIONAL_PARAMS,
  ISSUE_PARAM_CONFIG,
} from "../constants/searchParams";

import { useEffect } from "react";
import HeaderWrapper from "../components/functions/wrappers/header";
import GetResults from "../api/page-handler";
import SearchResultsContainer from "../components/functions/wrappers/SearchTable";
// Repo Search Page is the overview page to search code among a selected repo
export default function RepoSearchPR() {
  const [query, setQuery] = useState<IssueSearchQuery>({ query: "" });
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});

  // For Loading Icon
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  // A cheeky way of updating meta data, would use something like NextJS to handle this but don't want to install too much stuff
  useEffect(() => {
    document.title = `GitSearch : Pull Requests of ${owner}/${name}`;
  });

  const fetchPageData = async (Page: number) => {
    setLoading(true);
    if (cache[Page]) return;
    try {
      console.log(query);
      const data = await GetSearchPR({
        q: { ...query, repo: `${owner}/${name}` },
        sort: "",
        per_page: 30,
        page: Page,
      });
      const items = data?.data?.items ?? [];
      setCache((prev) => ({ ...prev, [Page]: items }));
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async () => {
    setLoading(true);
    try {
      const data = await GetSearchPR({
        q: { ...query, repo: `${owner}/${name}` },
        sort: "",
        per_page: 30,
        page: 1,
      });
      const items = data?.data?.items ?? [];
      setCache({ 1: items });
      setPage(1);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPageNumber: number) => {
    setPage(newPageNumber);
    const apiPage = Math.ceil(newPageNumber / 3); //In current setup, should be 10 per page
    // Prefetch the next chunk if we are on page 2/3
    if (newPageNumber % 3 === 2) {
      await fetchPageData(apiPage + 1);
    }
  };

  const result = GetResults(page, cache);

  return (
    <>
      <div className="section has-text-centered">
        <HeaderWrapper
          owner={owner}
          repo={name}
          title={`Pull Request Search in ${owner}/${name}`}
          description={`Search for Pull Requests in ${name}, add rules if needed`}
        ></HeaderWrapper>

        <SearchBar<IssueSearchQuery>
          query={query}
          setQuery={(q) => setQuery(q)}
          onSearch={handleQuery}
          optionalParams={ISSUE_OPTIONAL_PARAMS} // you can define commit-specific params
          paramConfig={ISSUE_PARAM_CONFIG}
        />

        {/* Search Table below, wrapped below*/}
        <SearchResultsContainer
          loading={loading}
          results={result.visibleResults}
          hasSearched={hasSearched}
        >
          {/* Using same table layout for PRs/Issues*/}
          <IssueResultTable results={result.visibleResults} />
        </SearchResultsContainer>

        {result.visibleResults.length > 0 && (
          <PageControls
            page={page}
            handlePageChange={handlePageChange}
            disableNext={result.nextResults.length === 0}
          />
        )}
      </div>
    </>
  );
}
