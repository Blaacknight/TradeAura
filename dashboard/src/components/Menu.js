import React, { useState, useContext } from "react"; // Add useContext
import { Link, useLocation, useNavigate } from "react-router-dom"; // Add useNavigate
import GeneralContext from "./GeneralContext"; // Import context
import "./Menu.css";

const Menu = () => {
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // --- ADDED --- Get context values
  const { logoutUser, user } = useContext(GeneralContext); 
  const navigate = useNavigate(); // For redirecting after logout

  const menuItems = [
    { to: "", label: "Dashboard" },          
    { to: "orders", label: "Orders" },       
    { to: "holdings", label: "Holdings" },   
    { to: "positions", label: "Positions" }, 
    { to: "funds", label: "Funds" },         
    { to: "apps", label: "Apps" },           
  ];

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // --- MODIFIED --- Implement logout
  const handleLogout = async () => {
    await logoutUser(); // Call context logout function
    navigate("/login"); // Redirect to login page after logout
    setIsProfileDropdownOpen(false); // Close dropdown
  };

  // Helper function to get initials from user name
  const getInitials = (name) => {
    if (!name) return 'ZU'; // Default/fallback if user isn't loaded yet
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    // Use first letter of first name and first letter of last name
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <nav className="menu-container">
      <ul className="menu-list">
        {menuItems.map((item) => {
           // --- MODIFIED --- Correct active link check for nested routes
          const isActive = 
            (item.to === "" && location.pathname === "/dashboard") || // Base dashboard route
            (item.to !== "" && location.pathname === `/dashboard/${item.to}`); // Other nested routes

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`menu-link ${isActive ? "active" : ""}`}> 
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="profile-container">
        {/* --- MODIFIED --- Display user info from context if available */}
        {user ? (
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">{getInitials(user.name)}</div>
            <p className="username">{user.name}</p> 
          </div>
        ) : (
          // Optional: Show a placeholder or loading state if user is null
          <div className="profile" onClick={handleProfileClick}>
             <div className="avatar">ZU</div>
             <p className="username">USERID</p>
          </div>
        )}
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Menu;