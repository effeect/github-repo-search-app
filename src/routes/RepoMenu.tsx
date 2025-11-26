// This page is responsible for the Repo Menu that gives some repo details and next steps
import { useState, useEffect } from "react";
// Import Styles
import styles from "../styles/AppHeader.module.css";
import { useParams } from "react-router-dom";
import { GetRepoDetails } from "../api/searchRepo";
import { Link } from "react-router-dom";

import { ReactComponent as GithubIcon } from "../svg/github-mark.svg";

// Variables we are going to use in the GUI
type RepoDetails = {
  name: string;
  description?: string;
  stargazers_count?: number;
  stargazers?: number;
  forks_count?: number;
  html_url?: string;
  watchers: string;
  //Issue related things
  open_issues: string;
  // Archived
  archived: boolean;
  allow_forking: boolean;
  created_at: string;
  // Topics Array
  topics?: string[];
};

export function RepoMenuPage() {
  // States from React for the App
  const { owner: rawOwner, name: rawName } = useParams();
  const owner = rawOwner ?? "";
  const repo = rawName ?? "";

  // A cheeky way of updating meta data, would use something like NextJS to handle this but don't want to install too much stuff
  useEffect(() => {
    document.title = `GitSearch : ${owner}/${repo}`;
  });
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
      <section className="hero is-large is-link">
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
            <>
              <p className="subtitle">
                {details?.description ?? "No description provided."}
              </p>
              <p className="subtitle">
                {details?.created_at
                  ? new Date(details.created_at).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "No creation date provided."}
              </p>
            </>
          )}

          {/* Add Links to the individual tags maybe?*/}
          {details?.topics?.length ? (
            <div className="tags mt-3 is-centered">
              {details?.topics?.map((topic) => (
                <span key={topic} className="tag is-rounded">
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

          <div className="columns is-centered mt-4">
            <div className="column is-narrow">
              <div className="field is-grouped is-grouped-multiline is-centered is-justify-content-center">
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
              <div className="column is-narrow">
                <div className="field has-addons is-centered is-justify-content-center">
                  <p className="control">
                    <span className="input is-light">Forks : </span>
                  </p>
                  <p className="control">
                    <button className="button is-info" onClick={() => {}}>
                      <Link
                        to={`https://github.com/${owner}/${repo}/forks`}
                        className={styles.repoDescription}
                      >
                        {details.forks_count}
                      </Link>
                    </button>
                  </p>
                </div>
              </div>
              <div className="column is-narrow">
                <div className="field has-addons is-centered is-justify-content-center">
                  <p className="control">
                    <span className="input is-light">Watchers :</span>
                  </p>
                  <p className="control">
                    <button className="button is-info" onClick={() => {}}>
                      <Link
                        to={`https://github.com/${owner}/${repo}/watchers`}
                        className={styles.repoDescription}
                      >
                        {details.watchers}
                      </Link>
                    </button>
                  </p>
                </div>
              </div>
              <div className="column is-narrow">
                {/* Stars Symbol and Links */}
                <div className="field has-addons is-centered is-justify-content-center">
                  <p className="control">
                    <span className="input is-light">Stars :</span>
                  </p>
                  <p className="control">
                    <button className="button is-info" onClick={() => {}}>
                      <Link
                        to={`https://github.com/${owner}/${repo}/stargazers`}
                      >
                        {details.stargazers_count}
                      </Link>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}
