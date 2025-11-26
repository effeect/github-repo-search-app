import styles from "../../styles/RepoTable.module.css";
import { Link } from "react-router-dom";

type TableResultsDef = {
  results: any[];
};

export function SearchRepoTable({ results }: TableResultsDef) {
  return (
    <>
      <h2 className="title is-4">Results</h2>
      <ul className={"is-inline-block"}>
        {results.map((result) => (
          <li key={result.id} className={`${styles.RepoTable}`}>
            <Link to={`/repo/${result.full_name}`} className={styles.repoLink}>
              <div className={styles.repoItem}>
                <div className={styles.repoRow}>
                  {/* Left column: avatar */}
                  <div className={styles.repoAvatarWrapper}>
                    <img
                      src={result.owner.avatar_url}
                      alt={`${result.owner.login}'s avatar`}
                      className={styles.repoAvatar}
                    />
                  </div>
                  <div className={styles.repoText}>
                    <h3 className={styles.repoName}>{result.full_name}</h3>

                    <p className={styles.repoDescription}>
                      {result.description}
                    </p>
                    <p className={styles.repoStars}>
                      Stars : {result.stargazers_count} Watchers :{" "}
                      {result.watchers}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
