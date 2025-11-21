// Setting up types so we can reuse them later
// Only need query to be required, everything else can be defaulted/optional
export type RepoSearchParams = {
  query: string;
  in?: string;
  language?: string;
  topic?: string;
  license?: string;
  isPublic?: string;
  isPrivate?: string;
  mirror?: boolean;
  pageNum?: number;
  template?: string;
  archived?: string;
  sort?: string;
  order?: string;
  quantity?: number;
};
