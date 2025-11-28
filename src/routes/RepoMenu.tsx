// This page is responsible for the Repo Menu that gives some repo details and next steps
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetRepoDetails } from "../api/searchRepo";
import { Link } from "react-router-dom";
import stylesTable from "../styles/RepoTable.module.css";

// Import SVG Files, could wrap into a export function for future use
// import { ReactComponent as GithubIcon } from "../svg/github.svg";
// import { ReactComponent as ForkIcon } from "../svg/fork.svg";
import { ReactComponent as CodeIcon } from "../svg/code.svg";
import { ReactComponent as CommitIcon } from "../svg/commit.svg";
import { ReactComponent as PRIcon } from "../svg/pr.svg";
import { ReactComponent as IssueIcon } from "../svg/issue.svg";

// Variables we are going to use in the GUI
type RepoDetails = {
  name: string;
  description?: string;
  stargazers_count?: number;
  stargazers?: number;
  forks_count?: number;
  html_url?: string;
  watchers?: string;
  open_issues?: number;
  archived?: boolean;
  allow_forking?: boolean;
  created_at?: string;
  topics?: string[];
  owner?: {
    avatar_url: string;
    login: string;
  };
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

  const [results, setResults] = useState<RepoDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const result = await GetRepoDetails({ owner, repo });
        setResults(result);
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
      <section className="hero is-large is-dark">
        <div className="hero-body">
          <div className="subtitle">
            <Link to={`/`}>Back Home</Link>
          </div>
          <div className="mt-4"></div>

          {/* If there is no image, don't bother showing anything */}
          {results?.owner?.avatar_url && (
            <div className={`${stylesTable.repoAvatarWrapper}`}>
              <img
                src={results?.owner?.avatar_url}
                alt={`${results?.owner?.login}'s avatar`}
                className={stylesTable.repoAvatar}
              />
            </div>
          )}

          <div className="mt-4"></div>
          <Link className="title" to={`https://github.com/${owner}/${repo}`}>
            {owner}/{repo}
          </Link>
          <div className="mt-4"></div>

          <div className="columns is-centered">
            <div className="column is-narrow">
              <div className="field is-grouped is-grouped-multiline is-centered is-justify-content-center">
                <div className="control">
                  {" "}
                  <Link
                    to={`/code/${owner}/${repo}`}
                    className="button is-light"
                  >
                    <span className="icon is-small">
                      <CodeIcon></CodeIcon>
                    </span>
                    {/* https://www.svgrepo.com/svg/533324/code */}
                    <span>Search Code</span>
                  </Link>
                </div>
                <div className="control ">
                  {" "}
                  <Link
                    to={`/commit/${owner}/${repo}`}
                    className="button is-light"
                  >
                    <span className="icon is-small">
                      <CommitIcon></CommitIcon>
                    </span>
                    <span>Search Commits</span>
                  </Link>
                </div>
                <div className="control ">
                  {" "}
                  <Link
                    to={`/issue/${owner}/${repo}`}
                    className="button is-light"
                  >
                    <span className="icon is-small">
                      <IssueIcon></IssueIcon>
                    </span>
                    <span>Search Issues</span>
                  </Link>
                </div>
                <div className="control ">
                  {" "}
                  <Link to={`/pr/${owner}/${repo}`} className="button is-light">
                    <span className="icon is-small">
                      <PRIcon></PRIcon>
                    </span>
                    <span>Search PRs</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Add Links to the individual tags maybe?*/}
          {results?.topics?.length ? (
            <div className="tags mt-3 is-centered">
              {results?.topics?.map((topic) => (
                <span key={topic} className="tag is-rounded">
                  <Link to={`https://github.com/topics/${topic}`}>
                    <h3>{topic}</h3>
                  </Link>
                </span>
              ))}
            </div>
          ) : null}

          {!loading && (
            <>
              <p className="subtitle">
                {results?.description ?? "No description provided."}
              </p>
              <p className="subtitle">
                Created on{" "}
                {results?.created_at
                  ? new Date(results.created_at).toLocaleString("en-US", {
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

          {results && (
            <div className="columns is-centered mt-4">
              <div className="column is-narrow">
                <div className="field has-addons is-centered is-justify-content-center">
                  <p className="control">
                    <span className="input is-light">Forks : </span>
                  </p>
                  <p className="control">
                    <Link
                      to={`https://github.com/${owner}/${repo}/forks`}
                      className={`button is-info`}
                    >
                      {results.forks_count}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="column is-narrow">
                <div className="field has-addons is-centered is-justify-content-center">
                  <p className="control">
                    <span className="input is-light">Stars :</span>
                  </p>
                  <p className="control">
                    <Link
                      to={`https://github.com/${owner}/${repo}/watchers`}
                      className={`button is-info`}
                    >
                      {results.stargazers_count}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="column is-narrow">
                {/* Stars Symbol and Links */}
                <div className="field has-addons is-centered is-justify-content-center">
                  <p className="control">
                    <span className="input is-light">Open Issues :</span>
                  </p>
                  <p className="control">
                    <Link
                      to={`https://github.com/${owner}/${repo}/issues`}
                      className={`button is-info `}
                    >
                      {results.open_issues}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
}
