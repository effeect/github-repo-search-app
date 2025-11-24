// Similar to TableResults.tsx

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
                  <a
                    href={result.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repoLink}
                  >
                    <div className={styles.repoItem}>
                      <h3 className={styles.repoName}> {result.full_name}</h3>
                      <a
                        href={result.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.path}{" "}
                      </a>
                    </div>
                  </a>
                  <div className={styles.repoLink}>
                    Download link : {result.repository.downloads_url}
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
