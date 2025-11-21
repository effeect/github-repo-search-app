// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits--parameters
// Not sure about this one as there isn't an easy list of potenial search queries
export type SearchLabelParam = {
  keyword: string;
  repo: string;
};

export type LabelSearch = {
  q: SearchLabelParam;
  sort: string;
  per_page: string;
  page: string;
};
