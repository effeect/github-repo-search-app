import styles from "../../styles/RepoTable.module.css";
import { Link } from "react-router-dom";

type TableResultsDef = {
  results: any[];
};

export function SearchRepoTable({ results }: TableResultsDef) {
  return (
    <>
      <h2 className="title is-4">Results</h2>
      <ul className={"is-block"}>
        {results.map((result) => {
          console.log(result);
          return (
            <li key={result.id} className={`${styles.RepoTable}`}>
              <Link
                to={`/repo/${result.full_name}`}
                className={styles.repoLink}
              >
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
                      {result?.topics?.length ? (
                        <div className="tags mt-4">
                          {result?.topics?.map((topic: string) => (
                            <span key={topic} className="tag is-rounded ">
                              <Link
                                className={styles.repoLink}
                                to={`https://github.com/topics/${topic}`}
                              >
                                <h3>{topic}</h3>
                              </Link>
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <p className={styles.repoStars}>
                        Stars : {result.stargazers_count} Forks : {result.forks}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
