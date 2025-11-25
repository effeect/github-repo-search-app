// Not in use at the moment, not sure if it needs to be used in the final UI but worth keeping for futures sakes

import { Octokit } from "octokit";
import { UserSearchQuery, SearchUsers } from "../types/UserSearch";
// Setup of the Octokit "kit"
const octokitHandle = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GetSearchUsers(users: SearchUsers) {
  const createQuery = (input: UserSearchQuery) => {
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
    const formattedQuery = createQuery(users.q);
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
