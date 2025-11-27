import { useParams } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/AppHeader.module.css";
import { GetRepoFile } from "../api/searchFile";
import { useEffect } from "react";

// Repo Search Page is the overview page to search code among a selected repo
export default function FileSearchPage() {
  const { owner: rawOwner, name: rawName, "*": rawPath } = useParams();
  // Make sure it can be all strings to avoid issues
  console.log(rawOwner, rawName, rawPath);
  const path = rawPath ?? "";
  const owner = rawOwner ?? "";
  const repo = rawName ?? "";
  console.log(path);

  // Display loading when its processing a request
  const [content, setContent] = useState<any | null>(null);
  // const [loading, setLoading] = useState(true);
  // Grabbing params from overview
  // A cheeky way of updating meta data, would use something like NextJS to handle this but don't want to install too much stuff
  useEffect(() => {
    document.title = `GitSearch : File from ${owner}/${repo}`;
  });
  // Upon page load, do the following
  useEffect(() => {
    if (!owner || !repo) {
      console.log("Running this");
      return;
    }

    async function load() {
      // setLoading(true);
      const result = await GetRepoFile({ owner, repo, path });
      setContent(result);
      // setLoading(false);
    }

    load();
  }, [owner, repo, path]);
  return (
    <>
      <div className={styles.AppHeader}>
        {/* Need to center this */}
        <h1 className="pure-heading">
          File Details for{" "}
          <big>
            {owner}/{repo}/{path}
          </big>
        </h1>
        <div>
          <div className={styles.AppHeader}>
            <p>File contents: </p>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
