type ParamType = "string" | "number" | "boolean";

export const REPO_OPTIONAL_PARAMS = [
  "language",
  "topic",
  "license",
  "template",
  "archived",
  "stars",
  "forks",
  "followers",
] as const;

export const REPO_PARAM_CONFIG: Record<
  (typeof REPO_OPTIONAL_PARAMS)[number],
  ParamType
> = {
  language: "string",
  topic: "string",
  license: "string",
  template: "boolean",
  archived: "boolean",
  stars: "number",
  forks: "number",
  followers: "number",
};

// Code params
export const CODE_OPTIONAL_PARAMS = [
  "language",
  "filename",
  "extension",
  "size",
] as const;

export const CODE_PARAM_CONFIG: Record<
  (typeof CODE_OPTIONAL_PARAMS)[number],
  ParamType
> = {
  language: "string",
  filename: "string",
  extension: "string",
  size: "number",
};

// Commit params
export const COMMIT_OPTIONAL_PARAMS = ["author", "merge"] as const;

export const COMMIT_PARAM_CONFIG: Record<
  (typeof COMMIT_OPTIONAL_PARAMS)[number],
  ParamType
> = {
  author: "string",
  merge: "boolean",
};

// Issue params
export const ISSUE_OPTIONAL_PARAMS = [
  "in",
  "author",
  "assignee",
  "mentions",
  "state",
  "labels",

  "language",
] as const;

export const ISSUE_PARAM_CONFIG: Record<
  (typeof ISSUE_OPTIONAL_PARAMS)[number],
  ParamType
> = {
  in: "string",
  author: "string",
  assignee: "string",
  mentions: "string",
  state: "string",
  labels: "string",
  language: "string",
};
