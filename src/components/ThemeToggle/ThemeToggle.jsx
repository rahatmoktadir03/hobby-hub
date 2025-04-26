import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "light-theme";
  }, [darkMode]);

  return (
    <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
