import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSearchCode } from "../../api/searchCode";
import { CodeSearchParams, CodeSearch } from "../../types/CodeSearch";

import styles from "../../styles/AppHeader.module.css";
import { SearchCodeTable } from "../functions/CodeResults";

export default function RepoSearchPage() {
  // For router
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Basic example of the page
  useEffect(() => {
    async function fetchCodeSearch() {
      // console.log in:file language:ts repo:effeect/LANMAN-Containers
      const result = await GetSearchCode({
        queryParam: {
          keyword: "console.error",
          in: "file",
          language: "ts",
          repo: `${owner}/${name}`,
        },
      });
      if (result?.data?.items) {
        console.log(result);
        setSearchResults(result.data.items);
      }
      console.log(result);
    }

    fetchCodeSearch();
  }, [owner, name]);

  return (
    <>
      <div className={styles.AppHeader}>
        {/* Need to center this  */}
        <h1 className="pure-heading">
          {owner}/{name}
        </h1>
        <div>
          <div className={styles.AppHeader}>
            {/* Need to center this  */}
            <h1 className="pure-heading"></h1>

            {/* */}
            <div className="pure-g">
              {" "}
              <SearchCodeTable results={searchResults} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
