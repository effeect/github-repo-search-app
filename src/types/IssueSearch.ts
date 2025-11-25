// Many thanks to https://docs2.lfe.io/v3/search/

export type IssueSearchQuery = {
  query: string;
  in?: string;
  author?: string;
  assignee?: string;
  mentions?: string;
  commenter?: string;
  involves?: string;
  team?: string;
  state?: string;
  labels?: string;
  no?: string;
  language?: string;
  is?: string;
  created?: string;
  updated?: string;
  merged?: string;
  closed?: string;
  comments?: string;
  user?: string;
  repo?: string;
};

export type issueSearch = {
  q: IssueSearchQuery;
  sort?: string;
  order?: string;
  per_page?: number;
  page?: number;
};

/* 

he q search term can also contain any combination of the supported issue search qualifiers:

type With this qualifier you can restrict the search to issues or pull request only.
in Qualifies which fields are searched. With this qualifier you can restrict the search to just the title, body, comments, or any combination of these.
author Finds issues or pull requests created by a certain user.
assignee Finds issues or pull requests that are assigned to a certain user.
mentions Finds issues or pull requests that mention a certain user.
commenter Finds issues or pull requests that a certain user commented on.
involves Finds issues or pull requests that were either created by a certain user, assigned to that user, mention that user, or were commented on by that user.
team For organizations you’re a member of, finds issues or pull requests that @mention a team within the organization.
state Filter issues or pull requests based on whether they’re open or closed.
labels Filters issues or pull requests based on their labels.
no Filters items missing certain metadata, such as label, milestone, or assignee
language Searches for issues or pull requests within repositories that match a certain language.
is Searches for items within repositories that match a certain state, such as open, closed, or merged
created or updated Filters issues or pull requests based on date of creation, or when they were last updated.
merged Filters pull requests based on the date when they were merged.
closed Filters issues or pull requests based on the date when they were closed.
comments Filters issues or pull requests based on the quantity of comments.
user or repo Limits searches to a specific user or repository.

*/
