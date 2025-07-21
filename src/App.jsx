import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailPage from "./pages/PostDetailPage";
import EditPostPage from "./pages/EditPostPage";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./styles/main.css";

function App() {
  return (
    <div className="app">
      <Router basename="/">
        <header className="app-header">
          <h1>🎲 PixelQuest</h1>
          <ThemeToggle />
        </header>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/post/:id/edit" element={<EditPostPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;
