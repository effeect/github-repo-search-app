import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetSearchCode } from "../../api/searchCode";
import { CodeSearchParams, CodeSearch } from "../../types/CodeSearch";

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
          keyword: "console.log",
          in: "file",
          language: "ts",
          repo: "effeect/LANMAN-Containers",
        },
      });
      if (result?.data?.items) {
        console.log(result);
        setSearchResults(result.data.items);
      }
    }
    fetchCodeSearch();
  }, [owner, name]);

  return (
    <div>
      <h2>
        Code Search for {owner}/{name}
      </h2>
      <ul>
        {searchResults.map((item) => (
          <li key={item.sha}>
            <a href={item.html_url} target="_blank" rel="noopener noreferrer">
              {item.path}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
