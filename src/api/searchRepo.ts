import { Octokit } from "octokit";
// Importing Interfaces
import { RepoSearchParams } from "../types/RepoSearch";

// Setup of the Octokit "kit"
const octokitHandle = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

// https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
type repoDetails = {
  owner: string;
  repo: string;
};

// Based on https://octokit.github.io/rest.js/v18/#search-repos
export async function GetSearchRepos(repo: RepoSearchParams) {
  // Function to sort out the query and potenial options
  const createQuery = (input: RepoSearchParams) => {
    let query = "";
    // Sort out the weird language filter first
    if (input.language !== "") {
      query = `${input.query}+language:${input.language}`;
    } else {
      query = `${input.query}`;
    }
    // console.log(query);

    // Specials thanks to https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
    for (let [key, value] of Object.entries(input)) {
      if (
        key === "query" ||
        key === "language" ||
        key === "quantity" ||
        key === "pageNum" ||
        key === "sort" ||
        key === "order"
      )
        continue;
      // Will only add the neccessary bit if there is a value for it
      if (value != null) {
        query = query + ` ${key}:${value}`;
      }
      // console.log(`${key}:${value}`);
    }
    //
    /* Note from https://docs2.lfe.io/v3/search/#search-repositories
    sort	string	The sort field. One of stars, forks, or updated. Default: results are sorted by best match.
    order	string	The sort order if sort parameter is provided. One of asc or desc. Default: desc
    */
    // Now handle sort + order explicitly
    if (input.sort) {
      query += ` sort:${input.sort}`;
      if (input.order) {
        // Order doesn't appear to be working, will investigate later
        // query += ` order:${input.order}`;
      }
    }

    // console.log("Create Query Status", query);
    return query;
  };

  // Following this q=tetris+language:assembly&sort=stars&order=desc
  // const queryHandle = (query: string, language: string) => {
  //   if (language !== "") {
  //     const result = `${query}+language:${language}`;
  //     return result;
  //   } else {
  //     const result = `${query}`;
  //     return result;
  //   }
  // };

  try {
    if (!repo.language) {
      repo.language = "";
    }
    // console.log(queryHandle(repo.query, repo.language));
    const result = await octokitHandle.rest.search.repos({
      q: createQuery(repo),
      per_page: repo.quantity,
      page: repo.pageNum,
    });
    return result.data.items;
  } catch (error: any) {
    console.error("Error in searchRepos:", error.message || error);
  }
}

// Function to grab a specific details about a repo, meant for the repo menu table
export async function GetRepoDetails(repo: repoDetails) {
  try {
    // console.log(queryHandle(repo.query, repo.language));
    const result = await octokitHandle.rest.repos.get({
      owner: repo.owner,
      repo: repo.repo,
    });
    console.log(result);
    return result.data;
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
