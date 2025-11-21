import styles from "../../styles/RepoTable.module.css";

type TableResultsDef = {
  results: any[];
};

export function SearchRepoTable({ results }: TableResultsDef) {
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
                      <h3 className={styles.repoName}>{result.full_name}</h3>
                      <p className={styles.repoDescription}>
                        {result.description}
                      </p>
                      <p className={styles.repoStars}>
                        Stars : {result.stargazers_count} Watchers :{" "}
                        {result.watchers}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
