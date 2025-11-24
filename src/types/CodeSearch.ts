// Many thanks to https://docs2.lfe.io/v3/search/, sped up the search for qualifiers massively
export type CodeSearchParams = {
  keyword: string;
  in?: string;
  language?: string;
  repo?: string;
  user?: string;
  path?: string;
  filename?: string;
  extension?: string;
  size?: string;
  fork?: string;
};

export type CodeSearch = {
  queryParam: CodeSearchParams;
  per_page?: number;
  page?: number;
  sort?: string;
  order?: string;
};

/* 
  in: Qualifies which fields are searched. With this qualifier you can restrict the search to just the file contents, the file path, or both.
  language: Searches code based on the language it’s written in.
  fork: Specifies that code from forked repositories should be searched. Repository forks will not be searchable unless the fork has more stars than the parent repository.
  size: Finds files that match a certain size (in bytes).
  path: Specifies the path that the resulting file must be at.
  filename: Matches files by their filename.
  extension: Matches files with a certain extension.
  user:/repo: Limits searches to a specific user or repository.
*/
