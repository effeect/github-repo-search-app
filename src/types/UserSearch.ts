export type UserSearchQuery = {
  keyword: string;
  type?: string;
  in?: string;
  repos?: string;
  location?: string;
  language?: string;
  created?: string;
  followers?: string;
};

export type SearchUsers = {
  q: UserSearchQuery;
  sort?: string;
  order?: string;
};

/*
type With this qualifier you can restrict the search to just personal accounts or just organization accounts.
in Qualifies which fields are searched. With this qualifier you can restrict the search to just the username, public email, full name, or any combination of these.
repos Filters users based on the number of repositories they have.
location Filter users by the location indicated in their profile.
language Search for users that have repositories that match a certain language.
created Filter users based on when they joined.
followers Filter users based on the number of followers they have.
*/
