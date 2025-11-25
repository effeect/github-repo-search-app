import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Component Imports
import AppNavbar from "./components/navbar";
import AppFooter from "./components/footer";
// Styles
import "./styles/App.module.css";

import RepoSearchPage from "./routes/RepoSearchPage";
import { RepoSearch } from "./routes/RepoSearch";
import FileSearchPage from "./routes/FileSearchPage";
import CommitSearchPage from "./routes/RepoSearchCommits";
import { RepoMenuPage } from "./routes/RepoMenu";
// For this app we are taking advantage of the app routes
/*
  Following route details :

  
*/
function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<RepoSearch />} />
          {/* This is the Repository menu page, allowing you to do navigate to Code/Commit Search abilities */}
          <Route path="/repo/:owner/:name" element={<RepoMenuPage />} />
          {/* Do a code search on a repo */}
          <Route path="/code/:owner/:name" element={<RepoSearchPage />} />
          {/* Allow viewing of content of the file without needing to go to Github */}
          <Route path="/code/:owner/:name/*" element={<FileSearchPage />} />
          {/* Do a search on Commits*/}
          <Route path="/commit/:owner/:name" element={<CommitSearchPage />} />
        </Routes>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
