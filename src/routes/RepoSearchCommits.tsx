import { useParams } from "react-router-dom";
import { useState } from "react";
import { GetSearchCommits } from "../api/searchCommit";
import { SearchCommitParam } from "../types/CommitSearch";

import styles from "../styles/AppHeader.module.css";
import { SearchBar } from "../components/functions/SearchBar";
import { PageControls } from "../components/functions/PageControls";
import { CommitResultsTable } from "../components/functions/CommitResults";

import { COMMIT_OPTIONAL_PARAMS } from "../constants/searchParams";

export default function CommitSearchPage() {
  const [query, setQuery] = useState<SearchCommitParam>({ query: "" });
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});

  const fetchPageData = async (Page: number) => {
    if (cache[Page]) return;
    const data = await GetSearchCommits({
      q: { ...query, repo: `${owner}/${name}` },
      sort: "author-date",
      per_page: "30",
      page: String(Page),
    });
    const items = data?.data?.items ?? [];
    setCache((prev) => ({ ...prev, [Page]: items }));
  };

  const handleQuery = async () => {
    const data = await GetSearchCommits({
      q: { ...query, repo: `${owner}/${name}` },
      sort: "author-date",
      per_page: "30",
      page: "1",
    });
    const items = data?.data?.items ?? [];
    setCache({ 1: items });
    setPage(1);
  };

  const handlePageChange = async (newPageNumber: number) => {
    setPage(newPageNumber);
    await fetchPageData(newPageNumber);
  };

  const visibleResults = cache[page] || [];

  return (
    <div className={styles.AppHeader}>
      <h1 className="pure-heading">
        Commits in {owner}/{name}
      </h1>
      <SearchBar<SearchCommitParam>
        query={query}
        setQuery={(q) => setQuery(q)}
        onSearch={handleQuery}
        optionalParams={COMMIT_OPTIONAL_PARAMS} // you can define commit-specific params
      />
      <h1 className="pure-heading">Results:</h1>
      <CommitResultsTable results={visibleResults} />
      {visibleResults.length > 0 && (
        <PageControls
          page={page}
          handlePageChange={handlePageChange}
          disableNext={visibleResults.length === 0}
        />
      )}
    </div>
  );
}
