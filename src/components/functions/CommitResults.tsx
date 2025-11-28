// components/functions/CommitResults.tsx
import styles from "../../styles/RepoTable.module.css";
import { Link } from "react-router-dom";

export function CommitResultsTable({ results }: { results: any[] }) {
  return (
    <>
      <h2 className="title is-4">Results</h2>
      <ul className={"is-block"}>
        {results.map((result) => {
          // console.log(result);
          // Uncomment below to see results of everything
          // console.log(result);
          const commit_message = result.commit.message;
          // Using username as bots don't have a full name weirdly
          const author = result?.author;
          // Need to format the date probably
          const date = result.commit?.author?.date;
          // Not sure what else to use this for at the moment
          // const commiter = result.commiter;
          // console.log(result);
          return (
            <li key={result.node_id} className={`${styles.RepoTable}`}>
              {/* File Path for the file on Github below*/}
              <Link
                to={`${result.html_url}`}
                target="_blank"
                className={styles.repoLink}
              >
                <div className={styles.repoItem}>
                  <div className={styles.repoRow}>
                    {/* Left column: avatar */}
                    <div className={styles.repoAvatarWrapper}>
                      <img
                        src={author?.avatar_url ?? ""}
                        alt={`${author?.login}'s avatar`}
                        className={styles.repoAvatar}
                      />
                    </div>
                    <div className={styles.repoText}>
                      <h3 className={styles.repoName}>{author.login}</h3>
                      <p className={styles.repoDescription}>{commit_message}</p>
                      <p className={styles.repoStars}>Published on : {date}</p>
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
