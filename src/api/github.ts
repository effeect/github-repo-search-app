import { Octokit } from "octokit";

// Setup of the Octokit "kit"
const octokitTest = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Credit to Christian https://stackoverflow.com/questions/76527907/how-can-i-use-octokit-to-list-open-prs-from-all-repos-in-my-org
export async function fetchRepos(
  org: string,
  pageNum: number = 1,
  quantity: number = 20
) {
  const repos = [];

  // Will be true until the result.data.length is empty
  // May add limit functionality
  const result = await octokitTest.request("GET /orgs/{org}/repos", {
    org: org,
    type: "public",
    per_page: quantity,
    page: pageNum,
  });

  repos.push(...result.data);
  return repos;
}
