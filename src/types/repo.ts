// Setting up types so we can reuse them later
// Only need query to be required, everything else can be defaulted/optional
export type SearchQuery = {
  query: string;
  language?: string;
  pageNum?: number;
  sort?: string;
  order?: string;
  quantity?: number;
};
