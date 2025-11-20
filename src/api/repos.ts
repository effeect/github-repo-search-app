import { Octokit } from "octokit";

// Setup of the Octokit "kit"
const octokitHandle = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/*
  For this "api", we are taking advantage of Octokit https://octokit.github.io/rest.js

*/

// Based on https://octokit.github.io/rest.js/v18/#search-repos
export async function searchRepos(
  query: string,
  pageNum: number = 1,
  quantity: number = 20
) {
  try {
    const result = await octokitHandle.rest.search.repos({
      q: query,
      per_page: quantity,
      page: pageNum,
    });
    return result.data.items;
  } catch (error: any) {
    console.error("Error in searchRepos:", error.message || error);
  }
}

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
