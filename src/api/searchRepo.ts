import { Octokit } from "octokit";
// Importing Interfaces
import { RepoSearchParams } from "../types/RepoSearch";

// Setup of the Octokit "kit"
const octokitHandle = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

// Based on https://octokit.github.io/rest.js/v18/#search-repos
export async function GetSearchRepos(repo: RepoSearchParams) {
  // Following this q=tetris+language:assembly&sort=stars&order=desc
  const queryHandle = (query: string, language: string) => {
    if (language !== "") {
      const result = `${query}+language:${language}`;
      return result;
    } else {
      const result = `${query}`;
      return result;
    }
  };
  try {
    // Uncomment below for complete object
    console.log(repo);
    if (!repo.language) {
      console.log(repo.query);
      repo.language = "";
    }
    console.log(queryHandle(repo.query, repo.language));
    const result = await octokitHandle.rest.search.repos({
      q: queryHandle(repo.query, repo.language),
      per_page: repo.quantity,
      page: repo.pageNum,
    });
    return result.data.items;
  } catch (error: any) {
    console.error("Error in searchRepos:", error.message || error);
  }
}

// ==============================================================
// Below is old examples, won't be used
// Credit to Christian https://stackoverflow.com/questions/76527907/how-can-i-use-octokit-to-list-open-prs-from-all-repos-in-my-org
export async function fetchRepos(
  org: string,
  pageNum: number = 1,
  quantity: number = 20
) {
  const repos = [];

  // Try/Catch block that should take into account if the API breaks
  try {
    const result = await octokitHandle.request("GET /orgs/{org}/repos", {
      org: org,
      type: "public",
      per_page: quantity,
      page: pageNum,
    });
    repos.push(...result.data);
    return repos;
  } catch (error: any) {
    console.error("Error in fetchRepos:", error.message || error);
    //Returning an empty array is the best for now, although we could try putting in an error message or something later
    return [];
  }
}

// DEBUG ONLY
export async function getRateLimit() {
  try {
    const rate = await octokitHandle.rest.rateLimit.get();
    return rate;
  } catch (error: any) {
    console.error("Error in fetchUser:", error.message || error);
  }
}
