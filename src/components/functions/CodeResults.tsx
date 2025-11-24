// Similar to TableResults.tsx
// This component shows a list of results for the Code Searching

import styles from "../../styles/RepoTable.module.css";

type TableResultsDef = {
  results: any[];
};

export function SearchCodeTable({ results }: TableResultsDef) {
  return (
    <>
      <div className={styles.RepoTable}>
        <div className="pure-g">
          <div className="pure-u-3-3">
            <ul className={styles.pureList}>
              {results.map((result) => (
                <li key={result.id} className={styles.pureListItem}>
                  <div className={styles.repoItem}>
                    {/* File Path for the file on Github below*/}
                    <a
                      href={result.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoLink}
                    >
                      <h3 className={styles.repoName}>{result.name}</h3>
                    </a>
                    <p className={styles.description}>Path : {result.path}</p>
                    <p className={styles.repoStars}>
                      {" "}
                      Download link : {result.repository.downloads_url}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
