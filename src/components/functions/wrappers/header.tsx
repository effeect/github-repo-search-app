import { Link } from "react-router-dom";

type HeaderWrapperType = {
  owner?: string;
  repo?: string;
  title?: string;
  description?: string;
};

// Template for the header which contains links and other things
export default function HeaderWrapper(header: HeaderWrapperType) {
  return (
    <>
      {/* If we don't supply a owner/repo, just ignore the links,
        This is mostly for the main home page for searching
    */}
      {header.owner && header.repo ? (
        <div className="field">
          <h3 className="title">
            <Link to={`/repo/${header.owner}/${header.repo}`} className="mr-4">
              Go Back
            </Link>
            <Link to={`/`}>Go Home</Link>
          </h3>
        </div>
      ) : null}

      <h1 className="title">{header.title}</h1>
      <p className="subtitle">{header.description}</p>
    </>
  );
}
