import styles from "../../styles/RepoTable.module.css";
import { Link } from "react-router-dom";

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
                  <Link
                    to={`/repo/${result.full_name}`}
                    className={styles.repoLink}
                  >
                    <div className={styles.repoItem}>
                      <h3 className={styles.repoName}>
                        {" "}
                        <a
                          href={result.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.repoLink}
                        >
                          {result.full_name}
                        </a>
                      </h3>

                      <p className={styles.repoDescription}>
                        {result.description}
                      </p>
                      <p className={styles.repoStars}>
                        Stars : {result.stargazers_count} Watchers :{" "}
                        {result.watchers}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
