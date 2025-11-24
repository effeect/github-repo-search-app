// To allow for pagination for the table
import styles from "../../styles/PageButtons.module.css";

type PageDef = {
  page: number;
  handlePageChange: (newPage: number) => void;
  disableNext: boolean;
};

export function PageControls(controls: PageDef) {
  return (
    <>
      <div className={styles.buttonContainer}>
        <button
          disabled={controls.page === 1}
          onClick={() => controls.handlePageChange(controls.page - 1)}
        >
          Prev
        </button>

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
