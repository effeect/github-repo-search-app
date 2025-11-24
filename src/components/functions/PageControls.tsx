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
  return (
    <>
      <div className={styles.buttonContainer}>
        {/* Previous Button*/}
        <button
          disabled={controls.page === 1}
          onClick={() => controls.handlePageChange(controls.page - 1)}
        >
          Prev
        </button>
        {/* Next Button*/}
        <button
          disabled={controls.disableNext}
          onClick={() => controls.handlePageChange(controls.page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
