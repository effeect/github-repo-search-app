// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits--parameters
// Not sure about this one as there isn't an easy list of potenial search queries

// nvm found this : https://github.com/github/docs/blob/main/content/search-github/searching-on-github/searching-commits.md
export type SearchCommitParam = {
  keyword: string;
  user: string;
  org: string;
  repo: string;
  merge: boolean;
  hash: string;
  parent: string;
  is: string;
  authorName: string;
  commiterName: string;
  author: string;
  commiter: string;
};

export type CommitSearch = {
  q: SearchCommitParam;
  sort: string;
  per_page: string;
  page: string;
};
