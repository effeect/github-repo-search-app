// components/functions/CommitResults.tsx
import styles from "../../styles/RepoTable.module.css";
import { Link } from "react-router-dom";

export function CommitResultsTable({ results }: { results: any[] }) {
  return (
    <>
      <div className={styles.RepoTable}>
        <div className="pure-g">
          <div className="pure-u-3-3">
            <ul className={styles.pureList}>
              {results.map((result) => {
                // Uncomment below to see results of everything
                // console.log(result);
                const commit_message = result.commit.message;
                // Using username as bots don't have a full name weirdly
                const author = result.author?.login;
                // Need to format the date probably
                const date = result.commit?.author?.date;
                // Not sure what else to use this for at the moment
                // const commiter = result.commiter;
                return (
                  <li key={result.node_id} className={styles.pureListItem}>
                    <div className={styles.repoItem}>
                      {/* File Path for the file on Github below*/}
                      <Link to={`/code/`} className={styles.repoLink}>
                        <h3 className={styles.repoName}>{author}</h3>
                      </Link>
                      <p className={styles.description}>{commit_message}</p>
                      <p className={styles.repoStars}>{date}</p>
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

/*
            <td>{commit.commit.message}</td>
            <td>{commit.commit.author?.name}</td>
            <td>{commit.commit.author?.date}</td>
            <td>
              <a href={commit.html_url} target="_blank" rel="noreferrer">
                {commit.sha.substring(0, 7)}
              </a>
            </td>
            */
