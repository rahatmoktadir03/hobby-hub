import React, { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import PostCard from "../components/Post/PostCard";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import "../styles/HomePage.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("new");

  useEffect(() => {
    getPosts().then((data) => {
      if (data) {
        console.log("Fetched posts:", JSON.stringify(data, null, 2));
        setPosts(data);
      }
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === "new") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortOption === "upvotes") {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  console.log("Sorted posts data:", JSON.stringify(sortedPosts, null, 2));

  return (
    <div className="home-container">
      <section className="controls">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <SortBar value={sortOption} onChange={handleSortChange} />
      </section>

      <section className="post-feed">
        {sortedPosts.length === 0 ? (
          <p className="no-posts">No posts yet. Be the first to post!</p>
        ) : (
          sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </section>
    </div>
  );
};

export default HomePage;
