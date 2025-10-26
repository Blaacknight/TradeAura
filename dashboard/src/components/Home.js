// src/components/Home.js (NEW)
import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import GeneralContext from "./GeneralContext";
import { Navigate } from "react-router-dom"; // 1. Import Navigate

const Home = ({ toggleTheme, theme }) => {
  const { authStatus } = useContext(GeneralContext);

  if (authStatus === "PENDING") {
    return <div className="loading-fullscreen">Authenticating...</div>;
  }

  // 2. This is the fix
  if (authStatus === "LOGGED_OUT") {
    return <Navigate to="/login" replace />;
  }

  // Only render the full dashboard UI if authentication is successful.
  return (
    <>
      <TopBar toggleTheme={toggleTheme} theme={theme} />
      <Dashboard />
    </>
  );
};

export default Home;