import { useParams } from "react-router-dom";
import { useState } from "react";
import { GetSearchCode } from "../api/searchCode";
import { CodeSearchParams } from "../types/CodeSearch";
import { Link } from "react-router-dom";
import { SearchCodeTable } from "../components/functions/CodeResults";
import { SearchBar } from "../components/functions/SearchBar";
import { PageControls } from "../components/functions/PageControls";
import {
  CODE_OPTIONAL_PARAMS,
  CODE_PARAM_CONFIG,
} from "../constants/searchParams";

import { useEffect } from "react";

// Repo Search Page is the overview page to search code among a selected repo
export default function RepoSearchPage() {
  const [query, setQuery] = useState<CodeSearchParams>({ query: "" });
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState<Record<number, any[]>>({});

  // A cheeky way of updating meta data, would use something like NextJS to handle this but don't want to install too much stuff
  useEffect(() => {
    document.title = `GitSearch : Code of ${owner}/${name}`;
  });
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
      <div className="section has-text-centered">
        <h3 className="title">
          <Link to={`/repo/${owner}/${name}`}>Go Back</Link>
        </h3>
        <h1 className="title">
          Search code in {owner}/{name}
        </h1>
        <p className="subtitle">
          {" "}
          Search for Code in the {name} repository. Add rules if needed.
        </p>
        <div className="columns is-centered">
          <div className="column is-10">
            <SearchBar<CodeSearchParams>
              query={query}
              setQuery={(q) => setQuery(q)}
              onSearch={handleQuery}
              optionalParams={CODE_OPTIONAL_PARAMS}
              paramConfig={CODE_PARAM_CONFIG}
            />
            {/* Search Table below*/}
            <div className="columns is-centered">
              <div className="column is-10">
                <SearchCodeTable results={visibleResults} />
              </div>
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
