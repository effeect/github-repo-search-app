// To allow for pagination for the table
type PageDef = {
  page: number;
  handlePageChange: (newPage: number) => void;
};

export function PageControls(controls: PageDef) {
  return (
    <>
      <div className="pure-g">
        <button
          disabled={controls.page === 1}
          onClick={() => controls.handlePageChange(controls.page - 1)}
        >
          Prev
        </button>

        <button onClick={() => controls.handlePageChange(controls.page + 1)}>
          Next
        </button>
      </div>
      ;
    </>
  );
}
