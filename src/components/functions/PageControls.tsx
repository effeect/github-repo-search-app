// To allow for pagination of the results, can flip through the results for the Code Search and Repo Table
import styles from "../../styles/PageButtons.module.css";

type PageDef = {
  page: number;
  handlePageChange: (newPage: number) => void;
  disableNext: boolean;
};

// Note the following
// Buttons will not be shown if there are no results (look at the routes)
export function PageControls(controls: PageDef) {
  // This is here to allow smooth scrolling to the top when you click the next button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Could change to below in future fyi
    // window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="mt-4"></div>
      <div className="columns is-centered">
        <div className="column is-4">
          <nav
            className="pagination is-centered mt-4"
            role="navigation"
            aria-label="pagination"
          >
            <button
              className="pagination-previous"
              disabled={controls.page === 1}
              onClick={() => {
                controls.handlePageChange(controls.page - 1);
                scrollToTop();
              }}
            >
              Previous
            </button>
            <button
              className="pagination-next"
              disabled={controls.disableNext}
              onClick={() => {
                controls.handlePageChange(controls.page + 1);
                scrollToTop();
              }}
            >
              Next
            </button>
            <ul className="pagination-list">
              <li>
                <span className="pagination-link is-current">
                  {controls.page}
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
