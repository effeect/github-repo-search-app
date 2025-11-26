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
      <div className="content">
        <h2 className="title is-4">Results</h2>
        <ul className={"is-inline-block"}>
          {results.map((result) => {
            console.log(result);
            const title = result.title;
            //const repo = result.repository.name;
            //const filePath = result.path;

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
                          src={result.user.avatar_url}
                          alt={`${result.user.avatar_url}s avatar`}
                          className={styles.repoAvatar}
                        />
                      </div>
                      <div className={styles.repoText}>
                        <h3 className={styles.repoName}>{result.title}</h3>
                        <p className={styles.repoDescription}>{result.body}</p>
                        <p className={styles.repoStars}>
                          Published on : {result.created_at}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
