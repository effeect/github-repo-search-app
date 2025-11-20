export type SearchQueryParams = {
  keyword: string;
  in?: string;
  language?: string;
  repo?: string;
  user?: string;
  org?: string;
  path?: string;
  filename?: string;
  extension?: string;
  size?: string;
  fork?: string;
  is?: string;
};

// in:Restrict search to specific fields (file, path, content)
// language:Filter by programming language
// repo:Limit search to a specific repository
// user:Limit search to repositories owned by a specific user or org
// org:Limit search to repositories in a specific organization
// path:Restrict search to a specific directory path
// filename:Match only files with a specific filename
// extension:Restrict search to files with a given extension
// size:Filter by file size (in bytes)
// fork:Include or exclude forked repos
// is:Filter by repo state (public, private)
