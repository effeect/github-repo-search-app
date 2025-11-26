// Handler for Page Stuff
export default function GetResults(page: number, cache: Record<number, any[]>) {
  const apiPage = Math.ceil(page / 3);
  const chunk = cache[apiPage] || [];
  const startIndex = ((page - 1) % 3) * 10;
  const visibleResults = chunk.slice(startIndex, startIndex + 10);

  // Look ahead to next page
  const nextPage = page + 1;
  const nextApiPage = Math.ceil(nextPage / 3);
  const nextChunk = cache[nextApiPage] || [];
  const nextStartIndex = ((nextPage - 1) % 3) * 10;
  const nextResults = nextChunk.slice(nextStartIndex, nextStartIndex + 10);
  return { visibleResults, nextResults };
}
