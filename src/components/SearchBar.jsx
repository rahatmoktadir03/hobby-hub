import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search posts by title..."
        className="search-bar"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
