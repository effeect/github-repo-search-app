// Not sure what we want to do atm but this is just placeholder at the moment
import { useState } from "react";

import { fetchRepos } from "../api/repos";

export function RepoTable() {
  // Declaring React States for this simple example
  const [orgQuery, setOrgQuery] = useState<string>("");
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState(1); // initin it to 1, may allow the number to be set elsewhere

  // handle for organisation Querys
  // TODO: We are expecting a return for an array!
  const handleOrgQuery = async () => {
    const data = await fetchRepos(orgQuery);
    setRepos(data);
  };

  // Might trigger this so we can have the next one ready so the user don't notice
  const handlePageChange = async (newPageNumber: number) => {
    setPage(newPageNumber);
    // And we will request to get the next page data
    const data = await fetchRepos(orgQuery, newPageNumber);
    setRepos(data);
  };

  return (
    <>
      {/* Need to center this */}
      <div className="pure-g">
        <div className="pure-u-1-3">
          <input
            type="text"
            className="pure-input-rounded"
            value={orgQuery}
            onChange={(e) => setOrgQuery(e.target.value)}
            placeholder="Org Name Here"
          />
          <button onClick={handleOrgQuery} className="pure-button">
            Search
          </button>
        </div>
      </div>
      <div className="pure-g">
        <div className="pure-u-3-3">
          <hr></hr>
          <table className="pure-table pure-table-horizontal">
            <thead>
              <tr>
                <th>Entry</th>
                <th>Repo Name</th>
                <th>Description</th>
                <th>Star Count</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo) => (
                <tr>
                  <td>{repo.id}</td>
                  <td>{repo.full_name}</td>
                  <td>{repo.description}</td>
                  <td>{repo.stargazers_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Buttons to change the page over
        Note that there is no caching which is a waste 
      */}
      <div className="pure-g">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>

        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </>
  );
}
