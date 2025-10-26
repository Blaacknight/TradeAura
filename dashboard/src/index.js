import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GeneralContextProvider } from "./components/GeneralContext";
import Home from "./components/Home";

import NavBar from "./landing_page/NavBar";
import Footer from "./landing_page/Footer";
import HomePage from "./landing_page/home/HomePage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import LearnPage from "./landing_page/learn/LearnPage";
import NotFound from "./landing_page/NotFound";
import Login from "./landing_page/signup/Login";
import Signup from "./landing_page/signup/Signup";

import "./index.css";
import "./landing_page/NavBar.css";
import "./landing_page/Footer.css";
import "./landing_page/signup/Auth.css";

const PublicLayout = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <NavBar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralContextProvider>
        <Routes>
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><ProductsPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
          <Route path="/learn" element={<PublicLayout><LearnPage /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />

          <Route path="/dashboard" element={<Home />} />
          <Route path="/*" element={<Home />} />

          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </GeneralContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);