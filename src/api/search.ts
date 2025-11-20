// Search in Repos
import { Octokit } from "octokit";
import { SearchQueryParams } from "../types/SearchQueryParams";

// https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-code--parameters
type SearchCode = {
  queryParam: SearchQueryParams;
  sort?: string;
  order?: string;
  per_page?: string;
  page?: string;
};

// Setup of the Octokit "kit"
const octokitHandler = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

export async function SearchCode({
  queryParam,
  sort,
  order,
  per_page,
  page,
}: SearchCode) {
  const createQuery = (input: SearchQueryParams) => {
    // Specials thanks to https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
    let query = `${input.keyword}`;
    for (let [key, value] of Object.entries(input)) {
      console.log(key, value);
      // Will only add the neccessary bit if there is a value for it
      if (value != null) {
        query = query + ` ${key}:${value}`;
      }
    }
  };
  try {
    const formattedQuery = createQuery(queryParam);
    const user = await octokitHandler.rest.users.getAuthenticated();
    const result = await octokitHandler.rest.search.code({
      q: formattedQuery,
    });
    console.log(result);
    return result;
  } catch (error: any) {
    console.error("Error in SearchCode: ", error.message || error);
  }
}

// // Based on https://octokit.github.io/rest.js/v18/#search-repos
// export async function searchRepos({
//   query,
//   language = "",
//   sort = "",
//   order = "",
//   pageNum = 1,
//   quantity = 20,
// }: SearchQuery) {
//   // Following this q=tetris+language:assembly&sort=stars&order=desc
//   const queryHandle = (query: string, language: string) => {
//     if (language !== "") {
//       const result = `${query}+language:${language}`;
//       return result;
//     } else {
//       const result = `${query}`;
//       return result;
//     }
//   };
//   try {
//     const result = await octokitHandle.rest.search.repos({
//       q: queryHandle(query, language),
//       per_page: quantity,
//       page: pageNum,
//     });
//     return result.data.items;
//   } catch (error: any) {
//     console.error("Error in searchRepos:", error.message || error);
//   }
// }
