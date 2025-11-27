// Code Search API Handler
// Many thanks to https://docs2.lfe.io/v3/search/#search-repositories

import { Octokit } from "octokit";
import { CodeSearchParams, CodeSearch } from "../types/CodeSearch";

// Setup of the Octokit "kit"
const octokitHandle = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

export async function GetSearchCode(code: CodeSearch): Promise<any> {
  // Function to sort out the query and potenial options, string return
  const createQuery = (input: CodeSearchParams): string => {
    // Specials thanks to https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
    let query = `${input.query}`;

    for (let [key, value] of Object.entries(input)) {
      if (key === "query") continue;
      // console.log(key, value);
      // Will only add the neccessary bit if there is a value for it
      if (value != null) {
        console.log(query);
        query = query + ` ${key}:${value}`;
      }
    }
    // console.log(query);
    return query;
  };
  try {
    const formattedQuery = createQuery(code.queryParam);
    // Not sure if below is needed :
    // const user = await octokitHandle.rest.users.getAuthenticated();
    // console.log(formattedQuery);
    const result = await octokitHandle.rest.search.code({
      q: formattedQuery,
    });
    // console.log(result);
    return result;
  } catch (error: any) {
    console.error("Error in SearchCode: ", error.message || error);
  }
}
