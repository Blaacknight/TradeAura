// src/components/GeneralContext.js

import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance"; // Make sure this path is correct

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  // --- ADDED ---
  const [user, setUser] = useState(null); 
  // --- MODIFIED --- Initialize as PENDING
  const [authStatus, setAuthStatus] = useState("PENDING"); 
  
  // Existing state for watchlist and modals
  const [watchlist, setWatchlist] = useState([]);
  const [buyWindow, setBuyWindow] = useState({
    isOpen: false,
    uid: null,
    mode: null,
  });
  const [chartWindow, setChartWindow] = useState({
    isOpen: false,
    symbol: null,
  });

  // --- MODIFIED --- Function to check auth status and set user
  const checkAuth = async () => {
    try {
      // Assuming /api/auth/profile returns { user: { name: '...', email: '...' } }
      const response = await axios.get("/api/auth/profile"); 
      setUser(response.data.user); // Store user data
      setAuthStatus("LOGGED_IN");
    } catch (error) {
      setUser(null); // Clear user data on error
      setAuthStatus("LOGGED_OUT");
    }
  };

  // --- MODIFIED --- Check auth status only once on initial load
  useEffect(() => {
    checkAuth();
  }, []); // Empty dependency array means run once on mount

  // Watchlist fetching logic (no changes needed)
  const refreshWatchlist = async () => {
    try {
      const res = await axios.get("/api/watchlist");
      setWatchlist(res.data?.stocks || []);
    } catch (err) {
      console.error("Error fetching watchlist:", err);
    }
  };

  useEffect(() => {
    if (authStatus === "LOGGED_IN") {
      refreshWatchlist();
    } else {
      setWatchlist([]); // Clear watchlist if logged out
    }
  }, [authStatus]);

  // --- ADDED --- Function to update state after successful login
  const loginSuccess = (userData) => {
    setUser(userData);
    setAuthStatus("LOGGED_IN");
    // Optionally store user data in localStorage here if needed for persistence
  };
  
  // --- ADDED --- Function to handle logout
  const logoutUser = async () => {
    try {
      await axios.post("/api/auth/logout"); // Call backend logout endpoint
      setUser(null);
      setAuthStatus("LOGGED_OUT");
      // Optionally clear localStorage here
    } catch (error) {
      console.error("Logout failed:", error);
      // Still set state even if backend call fails
      setUser(null);
      setAuthStatus("LOGGED_OUT");
    }
  };

  // Modal functions (no changes needed)
  const openBuyWindow = (symbol, mode) =>
    setBuyWindow({ isOpen: true, uid: symbol, mode: mode });
  const closeBuyWindow = () =>
    setBuyWindow({ isOpen: false, uid: null, mode: null });
  const openChartWindow = (symbol) =>
    setChartWindow({ isOpen: true, symbol: symbol });
  const closeChartWindow = () =>
    setChartWindow({ isOpen: false, symbol: null });

  return (
    <GeneralContext.Provider
      value={{
        user, // Provide user state
        authStatus,
        checkAuth, // Provide checkAuth maybe needed elsewhere
        loginSuccess, // Provide loginSuccess function
        logoutUser, // Provide logoutUser function
        watchlist,
        refreshWatchlist,
        buyWindow,
        openBuyWindow,
        closeBuyWindow,
        chartWindow,
        openChartWindow,
        closeChartWindow,
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;