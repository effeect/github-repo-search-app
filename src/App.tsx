import React from "react";
import "./App.css";

// Component Imports
import AppNavbar from "./components/navbar";
import { AppHeader } from "./components/Header";
import AppFooter from "./components/footer";
// Styles
import "./styles/App.module.css";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <AppHeader />
      <AppFooter />
    </div>
  );
}

export default App;
