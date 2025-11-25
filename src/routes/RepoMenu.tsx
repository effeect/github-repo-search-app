// This page is responsible for the Repo Menu that gives some repo details and next steps
import { useState, useEffect } from "react";
// Import Styles
import styles from "../styles/AppHeader.module.css";
import { useParams } from "react-router-dom";
import { GetRepoDetails } from "../api/searchRepo";
import { Link } from "react-router-dom";

// Variables we are going to use in the GUI
type RepoDetails = {
  name: string;
  description?: string;
  stargazers_count?: number;
  forks_count?: number;
  html_url?: string;
  watchers: string;
  //Issue related things
  open_issues: string;
  // Archived
  archived: boolean;
  allow_forking: boolean;
  // Topics Array
  topics: String[];
};

export function RepoMenuPage() {
  // States from React for the App
  const { owner: rawOwner, name: rawName } = useParams();
  const owner = rawOwner ?? "";
  const repo = rawName ?? "";

  const [details, setDetails] = useState<RepoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const result = await GetRepoDetails({ owner, repo });
        setDetails(result);
      } catch (err) {
        setError("Failed to load repo details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [owner, repo]);
  return (
    <div className={styles.AppHeader}>
      {/* <img></img> */}
      <h1 className="pure-heading">
        {owner}/{repo}
      </h1>
      <small>List details of the repository here</small>
      {/* Buttons to navigate to the seperate routes*/}
      <div className="pure-g">
        {" "}
        <Link to={`/code/${owner}/${repo}`} className={styles.repoLink}>
          Link to the Code Search{" "}
        </Link>
      </div>
      <div className="pure-g">
        <Link to={`/commit/${owner}/${repo}`} className={styles.repoLink}>
          Link to the Commit Search
        </Link>
      </div>
      <div className="pure-g">
        <Link to={`/issue/${owner}/${repo}`} className={styles.repoLink}>
          Link to the Issue Search
        </Link>
      </div>
      <div className="pure-g">
        <Link to={`/pr/${owner}/${repo}`} className={styles.repoLink}>
          Link to PRs search
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {/* Details of the Repo */}
      {details && (
        <div className={styles.repoDetails}>
          <h2>{details.name}</h2>
          <p>{details.description ?? "No description provided."}</p>
          <p> Star Count: {details.stargazers_count}</p>
          <p> Fork Count: {details.forks_count}</p>
          <p> Watcher Count: {details.watchers}</p>
          <a href={details.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
}
