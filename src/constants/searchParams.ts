type ParamType = "string" | "number" | "boolean";

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
  "order",
  "quantity",
  "stars",
] as const;

export const REPO_PARAM_CONFIG: Record<
  (typeof REPO_OPTIONAL_PARAMS)[number],
  ParamType
> = {
  in: "string",
  language: "string",
  topic: "string",
  license: "string",
  isPublic: "boolean",
  isPrivate: "boolean",
  mirror: "boolean",
  pageNum: "number",
  template: "boolean",
  archived: "boolean",
  order: "string",
  quantity: "number",
  stars: "number",
};

// Code params
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

export const CODE_PARAM_CONFIG: Record<
  (typeof CODE_OPTIONAL_PARAMS)[number],
  ParamType
> = {
  in: "string",
  language: "string",
  repo: "string",
  user: "string",
  path: "string",
  filename: "string",
  extension: "string",
  size: "number",
  fork: "boolean",
};

// Commit params
export const COMMIT_OPTIONAL_PARAMS = [
  "author",
  "merge",
  "hash",
  "parent",
  "is",
  "commiter",
] as const;

export const COMMIT_PARAM_CONFIG: Record<
  (typeof COMMIT_OPTIONAL_PARAMS)[number],
  ParamType
> = {
  author: "string",
  merge: "boolean",
  hash: "string",
  parent: "string",
  is: "string", // could be enum-like
  commiter: "string",
};

// Issue params
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

export const ISSUE_PARAM_CONFIG: Record<
  (typeof ISSUE_OPTIONAL_PARAMS)[number],
  ParamType
> = {
  in: "string",
  author: "string",
  assignee: "string",
  mentions: "string",
  commenter: "string",
  involves: "string",
  team: "string",
  state: "string", // could be enum-like
  labels: "string",
  no: "number",
  language: "string",
  is: "string",
  created: "string", // date string
  updated: "string", // date string
  merged: "string", // date string
  closed: "string", // date string
  comments: "number",
};
