// Similar to TableResults.tsx
// This component shows a list of results for the Code Searching
// Based off TableResults

import styles from "../../styles/RepoTable.module.css";
import { Link } from "react-router-dom";

type TableResultsDef = {
  results: any[];
};

export function IssueResultTable({ results }: TableResultsDef) {
  // const location = useLocation();
  return (
    <>
      <div className={styles.RepoTable}>
        <div className="pure-g">
          <div className="pure-u-3-3">
            <ul className={styles.pureList}>
              {results.map((result) => {
                console.log(result);
                const title = result.title;
                //const repo = result.repository.name;
                //const filePath = result.path;

                return (
                  <li key={result.id} className={styles.pureListItem}>
                    <div className={styles.repoItem}>
                      {/* File Path for the file on Github below*/}
                      <Link to={`/code/`} className={styles.repoLink}>
                        <h3 className={styles.repoName}>{title}</h3>
                      </Link>
                      <p className={styles.description}>Path : {result.path}</p>
                      <p className={styles.repoStars}>
                        {" "}
                        Testing Testing Testing
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
