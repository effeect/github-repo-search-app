// Search in Repos
import { Octokit } from "octokit";
import { CodeSearchParams, CodeSearch } from "../types/CodeSearch";

// Setup of the Octokit "kit"
const octokitHandle = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

export async function GetSearchCode(code: CodeSearch) {
  // Function to sort out the query and potenial options
  const createQuery = (input: CodeSearchParams) => {
    // Specials thanks to https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
    let query = `${input.keyword}`;
    for (let [key, value] of Object.entries(input)) {
      console.log(key, value);
      // Will only add the neccessary bit if there is a value for it
      if (value != null) {
        query = query + ` ${key}:${value}`;
      }
    }
    return query;
  };
  try {
    const formattedQuery = createQuery(code.queryParam);
    // Not sure if below is needed :
    const user = await octokitHandle.rest.users.getAuthenticated();
    const result = await octokitHandle.rest.search.code({
      q: formattedQuery,
    });
    console.log(result);
    return result;
  } catch (error: any) {
    console.error("Error in SearchCode: ", error.message || error);
  }
}
