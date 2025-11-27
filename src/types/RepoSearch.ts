// Setting up types so we can reuse them later
// https://github.com/github/docs/blob/main/content/search-github/searching-on-github/searching-for-repositories.md
// Only need query to be required, everything else can be defaulted/optional
export type RepoSearchParams = {
  query: string;
  in?: string;
  language?: string;
  topic?: string;
  license?: string;
  isPublic?: boolean;
  isPrivate?: boolean;
  mirror?: boolean;
  pageNum?: number;
  template?: boolean;
  archived?: boolean;
  sort?: "stars" | "forks" | "updated";
  order?: "asc" | "desc";
  quantity?: number;
  stars?: number;
  forks?: number;
  followers?: number;
};
