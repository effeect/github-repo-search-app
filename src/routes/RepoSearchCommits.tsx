import { useParams } from "react-router-dom";
import { useState } from "react";
import { GetSearchCommits } from "../api/searchCommit";
import { SearchCommitParam } from "../types/CommitSearch";
import { SearchBar } from "../components/functions/SearchBar";
import { PageControls } from "../components/functions/PageControls";
import { CommitResultsTable } from "../components/functions/CommitResults";
import { useEffect } from "react";

import SearchResultsContainer from "../components/functions/wrappers/SearchTable";
import GetResults from "../api/page-handler";

import {
  COMMIT_OPTIONAL_PARAMS,
  COMMIT_PARAM_CONFIG,
} from "../constants/searchParams";

import HeaderWrapper from "../components/functions/wrappers/header";

export default function CommitSearchPage() {
  const [query, setQuery] = useState<SearchCommitParam>({ query: "" });
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});

  // For Loading Icon
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchPageData = async (Page: number) => {
    if (cache[Page]) return; // Don't bother if its already there
    setLoading(true);
    try {
      const data = await GetSearchCommits({
        q: { ...query, repo: `${owner}/${name}` },
        sort: "author-date",
        per_page: "30",
        page: String(Page),
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
      const data = await GetSearchCommits({
        q: { ...query, repo: `${owner}/${name}` },
        sort: "author-date",
        per_page: "30",
        page: "1",
      });
      const items = data?.data?.items ?? [];
      setCache({ 1: items });
      setPage(1);
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

  // A cheeky way of updating meta data, would use something like NextJS to handle this but don't want to install too much stuff
  useEffect(() => {
    document.title = `GitSearch : Commits of ${owner}/${name}`;
  });

  const result = GetResults(page, cache);

  return (
    <div className="section has-text-centered">
      <HeaderWrapper
        owner={owner}
        repo={name}
        title={`Commit Search in ${owner}/${name}`}
        description={`Search for commits in ${name}, add rules if needed`}
      ></HeaderWrapper>

      <SearchBar<SearchCommitParam>
        query={query}
        setQuery={(q) => setQuery(q)}
        onSearch={handleQuery}
        optionalParams={COMMIT_OPTIONAL_PARAMS} // you can define commit-specific params
        paramConfig={COMMIT_PARAM_CONFIG}
      />
      {/* Search Table below, wrapped below*/}
      <SearchResultsContainer
        loading={loading}
        results={result.visibleResults}
        hasSearched={hasSearched}
      >
        <CommitResultsTable results={result.visibleResults} />
      </SearchResultsContainer>
      <div className="mt-4"></div>

      {/* Will hide page controls if there are no visible results*/}
      {result.visibleResults.length > 0 && (
        <PageControls
          page={page}
          handlePageChange={handlePageChange}
          disableNext={result.nextResults.length === 0}
        />
      )}
    </div>
  );
}
