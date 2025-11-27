import { Link } from "react-router-dom";

interface HeaderWrapper {
  owner?: string;
  repo?: string;
  title?: string;
  description?: string;
}

// Template for the header which contains links and other things
export default function HeaderWrapper(header: HeaderWrapper) {
  return (
    <>
      <div className="field">
        <h3 className="title">
          <Link to={`/repo/${header.owner}/${header.repo}`}>Go Back</Link>
        </h3>
        <h3 className="title">
          <Link to={`/`}>Go Home</Link>
        </h3>
      </div>

      <h1 className="title">{header.title}</h1>
      <p className="subtitle">{header.description}</p>
    </>
  );
}
