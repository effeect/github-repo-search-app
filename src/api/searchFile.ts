// https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
// This one is responsible for showing specific file content
// A little basic but could be useful and keeping people inside the app
// Search in Repos
import { Octokit } from "octokit";

// Setup of the Octokit "kit"
const octokitHandle = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

type FileSearch = {
  owner: string;
  repo: string;
  path: string;
};

// https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
export async function GetRepoFile({ owner, repo, path }: FileSearch) {
  try {
    const response = await octokitHandle.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    // Decode Base 64 in the browser, could do a better way with something like Next.js
    const data = response.data;
    let decodedContent = "";
    if ("content" in data && data.content) {
      const base64Content = data.content.replace(/\n/g, "");
      decodedContent = atob(base64Content);
      // console.log(decodedContent);
    }
    return decodedContent;
  } catch (error: any) {
    // const stringFormatted = `GET /repos/${owner}/${repo}/contents/${path}`;
    // console.log("Formatted String", stringFormatted);
    console.error("Error fetching file:", error.message || error);
  }
}
