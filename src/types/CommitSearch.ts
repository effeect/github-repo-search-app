//https://docs.github.com/en/search-github/searching-on-github/searching-commits
// nvm found this : https://github.com/github/docs/blob/main/content/search-github/searching-on-github/searching-commits.md
export type SearchCommitParam = {
  query: string;
  repo?: string;
  author?: string;
  merge?: boolean;
  hash?: string;
  parent?: string;
  is?: string;
  authorName?: string;
  commiterName?: string;
  commiter?: string;
};

export type CommitSearch = {
  q: SearchCommitParam;
  sort: string;
  per_page: string;
  page: string;
};
