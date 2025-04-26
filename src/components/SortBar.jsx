import React from "react";
import { FaSortAmountDown } from "react-icons/fa";
import "./SortBar.css";

const SortBar = ({ value, onChange }) => {
  return (
    <div className="sort-bar-container">
      <FaSortAmountDown className="sort-icon" />
      <select className="sort-bar" value={value} onChange={onChange}>
        <option value="new">Newest</option>
        <option value="upvotes">Most Upvoted</option>
      </select>
    </div>
  );
};

export default SortBar;
