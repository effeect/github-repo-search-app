export const REPO_OPTIONAL_PARAMS = [
  "in",
  "language",
  "topic",
  "license",
  "isPublic",
  "isPrivate",
  "mirror",
  "pageNum",
  "template",
  "archived",
  "sort",
  "order",
  "quantity",
  "stars",
] as const;

export const CODE_OPTIONAL_PARAMS = [
  "in",
  "language",
  "repo",
  "user",
  "path",
  "filename",
  "extension",
  "size",
  "fork",
] as const;

export const COMMIT_OPTIONAL_PARAMS = [
  "author",
  "merge",
  "hash",
  "parent",
  "is",
  "commiter",
] as const;

export const ISSUE_OPTIONAL_PARAMS = [
  "in",
  "author",
  "assignee",
  "mentions",
  "commenter",
  "involves",
  "team",
  "state",
  "labels",
  "no",
  "language",
  "is",
  "created",
  "updated",
  "merged",
  "closed",
  "comments",
] as const;
