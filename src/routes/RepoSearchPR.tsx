import { useParams } from "react-router-dom";
import { useState } from "react";
import { GetSearchIssues } from "../api/searchIssues";
import { IssueSearchQuery } from "../types/IssueSearch";

import styles from "../styles/AppHeader.module.css";
import { IssueResultTable } from "../components/functions/IssueResults";
import { SearchBar } from "../components/functions/SearchBar";
import { PageControls } from "../components/functions/PageControls";
import { ISSUE_OPTIONAL_PARAMS } from "../constants/searchParams";

// Repo Search Page is the overview page to search code among a selected repo
export default function RepoSearchPR() {
  const [query, setQuery] = useState<IssueSearchQuery>({ query: "" });
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});

  const fetchPageData = async (Page: number) => {
    if (cache[Page]) return;
    const data = await GetSearchIssues({
      q: { ...query, repo: `${owner}/${name}` },
      sort: "",
      per_page: 30,
      page: Page,
    });
    const items = data?.data?.items ?? [];
    setCache((prev) => ({ ...prev, [Page]: items }));
  };

  const handleQuery = async () => {
    const data = await GetSearchIssues({
      q: { ...query, repo: `${owner}/${name}` },
      sort: "",
      per_page: 30,
      page: 1,
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
        Issues in {owner}/{name}
      </h1>
      <SearchBar<IssueSearchQuery>
        query={query}
        setQuery={(q) => setQuery(q)}
        onSearch={handleQuery}
        optionalParams={ISSUE_OPTIONAL_PARAMS} // you can define commit-specific params
      />
      <h1 className="pure-heading">Results:</h1>
      <IssueResultTable results={visibleResults} />
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
