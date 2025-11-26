// Similar to TableResults.tsx
// This component shows a list of results for the Code Searching
// Based off TableResults

import styles from "../../styles/RepoTable.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

type TableResultsDef = {
  results: any[];
};

export function SearchCodeTable({ results }: TableResultsDef) {
  // const location = useLocation();
  const [copiedSha, setCopiedSha] = useState<string | null>(null);

  const copyToClipboard = async (sha: string) => {
    try {
      await navigator.clipboard.writeText(sha);
      setCopiedSha(sha);
      setTimeout(() => setCopiedSha(null), 2000);
    } catch (err) {
      console.error("Failed SHA Copy", err);
    }
  };

  return (
    <>
      <h2 className="title is-4">Results</h2>
      <ul className={"is-inline-block"}>
        {results.map((result) => {
          console.log(result);

          const owner = result.repository.owner.login;
          const repo = result.repository.name;
          const filePath = result.path;

          return (
            <li key={result.id} className={`${styles.RepoTable}`}>
              {/* File Path for the file on Github below*/}
              <div className={styles.repoItem}>
                <div className={styles.repoRow}>
                  <div className={styles.repoText}>
                    {/* */}
                    <Link
                      to={`/code/${owner}/${repo}/${filePath}`}
                      className={styles.repoLink}
                    >
                      <h3 className={styles.repoName}>{result.name}</h3>
                    </Link>

                    <p className={styles.repoDescription}>
                      File Path : {result.path}
                    </p>
                    <div className="field is-grouped has-addons">
                      <p className="control">
                        <span className="input is-light">
                          SHA: {result.sha}
                        </span>
                      </p>
                      <p className="control">
                        <button
                          className={`button is-info`}
                          onClick={() => copyToClipboard(result.sha)}
                        >
                          {copiedSha === result.sha ? "Copied!" : "Copy"}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
