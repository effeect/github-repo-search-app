interface ResultsWrapperProps {
  loading: boolean;
  hasSearched: boolean;
  results: any[];
  children: React.ReactNode;
}

// Wrapper for all the tables to handle loading and what not
export default function SearchResultsContainer({
  loading,
  hasSearched,
  results,
  children,
}: ResultsWrapperProps) {
  return (
    <div className="columns is-centered">
      <div className="column is-10">
        {loading ? (
          <div className="has-text-centered">
            {/* Loading stuff goes here, currently a default bulma button*/}
            <button className="button is-loading is-medium is-white" />
          </div>
        ) : results.length > 0 ? (
          children
        ) : hasSearched ? (
          <div className="notification is-warning has-text-centered">
            No results found.
          </div>
        ) : null}
      </div>
    </div>
  );
}
