import React from "react";
import "./App.css";

// Component Imports
import AppNavbar from "./components/navbar";
import { RepoTable } from "./components/RepoTable";

function App() {
  return (
    <div className="App">
      <AppNavbar></AppNavbar>
      <RepoTable></RepoTable>
      {/* UNCOMMENT BELOW FOR DEFAULT REACT OUTPUT*/}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello world, this is a test!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
