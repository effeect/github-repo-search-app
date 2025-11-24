import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Component Imports
import AppNavbar from "./components/navbar";
import AppFooter from "./components/footer";
// Styles
import "./styles/App.module.css";

import RepoSearchPage from "./components/routes/RepoSearchPage";
import { RepoSearch } from "./components/routes/RepoSearch";
function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<RepoSearch />} />
          <Route path="/repo/:owner/:name" element={<RepoSearchPage />} />
        </Routes>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
