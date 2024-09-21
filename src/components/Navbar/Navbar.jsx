import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
    setIsDropdownOpen(false);
    localStorage.setItem("grouping", e.target.value); // Save to localStorage
  };

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
    setIsDropdownOpen(false);
    localStorage.setItem("ordering", e.target.value); // Save to localStorage
  };

  return (
    <nav className="navbar">
      <button className="navbar-btn" onClick={toggleDropdown}>
        <img src="/Display.svg" alt="Display Logo" className="navbar-icon" />
        <span>Display</span>
        <img src="/down.svg" alt="Down Arrow" className="navbar-icon-right" />
      </button>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <span className="dropdown-label">Grouping</span>
            <select value={grouping} onChange={handleGroupingChange} className="dropdown-select">
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="dropdown-section">
            <span className="dropdown-label">Ordering</span>
            <select value={ordering} onChange={handleOrderingChange} className="dropdown-select">
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
