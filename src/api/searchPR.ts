// Search Commits
// This handler is responsible for searching through Commits
import { Octokit } from "octokit";
import { IssueSearchQuery, issueSearch } from "../types/IssueSearch";

const octokitHandle = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

export async function GetSearchPR(issue: issueSearch): Promise<any> {
  // Creating the query to be sent off, expecting a string
  const createQuery = (input: IssueSearchQuery): string => {
    console.log(input.query);
    let query = `${input.query ?? ""}`;
    for (let [key, value] of Object.entries(input)) {
      if (!value) continue;
      if (key === "query") continue;
      query += ` ${key}:${value}`;
    }
    query += ` is:pr`;
    return query.trim();
  };

  try {
    const formattedQuery = createQuery(issue.q);
    // console.log("Commit search query:", formattedQuery);
    console.log(formattedQuery);
    const result = await octokitHandle.rest.search.issuesAndPullRequests({
      q: formattedQuery,
      sort: "", // This field is closing down
      per_page: Number(issue.per_page) ? Number(issue.per_page) : 30,
      page: Number(issue.page) ? Number(issue.page) : 1,
    });

    return result;
  } catch (error: any) {
    console.error("Error in GetSearchCommits():", error.message || error);
  }
}
