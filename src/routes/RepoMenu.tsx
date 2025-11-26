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
  topics?: string[];
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
        console.log(result);
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
    <>
      {/* Taken from https://bulma.io/documentation/layout/hero/*/}
      <section className="hero is-medium is-link">
        <div className="hero-body">
          <div className="subtitle">
            <Link to={`/`}>
              <small className="link">Back</small>
            </Link>
          </div>
          <div className="mt-4"></div>
          <p className="title">
            {owner}/{repo}
          </p>

          {!loading && (
            <p className="subtitle">
              {details?.description ?? "No description provided."}
            </p>
          )}
          {/* Add Links to the individual tags maybe?*/}
          {details?.topics?.length ? (
            <div className="tags mt-3 is-centered">
              {details?.topics?.map((topic) => (
                <span key={topic} className="tag is-info is-light">
                  {topic}
                </span>
              ))}
            </div>
          ) : null}

          <div className="columns is-centered mt-4">
            <div className="column is-narrow">
              <div className="field is-grouped is-grouped-multiline is-centered">
                <div className="control">
                  {" "}
                  <Link
                    to={`/code/${owner}/${repo}`}
                    className="button is-light"
                  >
                    Search Code
                  </Link>
                </div>
                <div className="control ">
                  {" "}
                  <Link
                    to={`/commit/${owner}/${repo}`}
                    className="button is-light"
                  >
                    Search Commits
                  </Link>
                </div>
                <div className="control ">
                  {" "}
                  <Link
                    to={`/issue/${owner}/${repo}`}
                    className="button is-light"
                  >
                    Search Issues
                  </Link>
                </div>
                <div className="control ">
                  {" "}
                  <Link to={`/pr/${owner}/${repo}`} className="button is-light">
                    Search PRs
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {details && (
            <div className="columns is-centered mt-4">
              <div className="column is-narrow">Things</div>
              <div className="column is-narrow">
                Forks : {details.forks_count}
              </div>
              <div className="column is-narrow">
                Stars : {details.stargazers_count}
              </div>
              <div className="column is-narrow">
                Watchers : {details.watchers}
              </div>
            </div>
          )}
        </div>
      </section>
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
    </>
  );
}
