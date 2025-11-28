// Search Commits
// This handler is responsible for searching through Commits
import { Octokit } from "octokit";
import { SearchCommitParam, CommitSearch } from "../types/CommitSearch";

const octokitHandle = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

export async function GetSearchCommits(
  commitSearch: CommitSearch
): Promise<any> {
  // Creating the query to be sent off, expecting a string
  const createQuery = (input: SearchCommitParam): string => {
    let query = `${input.query ?? ""}`;
    for (let [key, value] of Object.entries(input)) {
      if (!value) continue;
      if (key === "query") continue;
      query += ` ${key}:${value}`;
    }
    return query.trim();
  };

  try {
    const formattedQuery = createQuery(commitSearch.q);
    // console.log("Commit search query:", formattedQuery);
    // console.log();
    const result = await octokitHandle.rest.search.commits({
      q: formattedQuery,
      sort: "", // This field is closing down
      per_page: Number(commitSearch.per_page)
        ? Number(commitSearch.per_page)
        : 30,
      page: Number(commitSearch.page) ? Number(commitSearch.page) : 1,
    });

    return result;
  } catch (error: any) {
    console.error("Error in GetSearchCommits():", error.message || error);
  }
}
