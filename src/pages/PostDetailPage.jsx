import React, { useEffect, useState } from "react";
import { getPostById, updatePost, deletePost } from "../services/postService";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaEdit,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";
import CommentSection from "../components/Comment/CommentSection";
import "./PostDetailPage.css";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setPost(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    // Don't allow voting on demo posts
    if (post.is_demo) {
      alert(
        "🎮 Demo posts are read-only! Create your own post to start earning votes!"
      );
      return;
    }

    try {
      const updatedPost = await updatePost(id, { upvotes: post.upvotes + 1 });
      console.log("Upvote updated post:", updatedPost);
      setPost(updatedPost);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownvote = async () => {
    // Don't allow voting on demo posts
    if (post.is_demo) {
      alert(
        "🎮 Demo posts are read-only! Create your own post to start earning votes!"
      );
      return;
    }

    try {
      const updatedPost = await updatePost(id, {
        downvotes: (post.downvotes || 0) + 1,
      });
      console.log("Downvote updated post:", updatedPost);
      setPost(updatedPost);
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  const handleDelete = async () => {
    // Don't allow deleting demo posts
    if (post.is_demo) {
      alert(
        "🎮 Demo posts cannot be deleted! They're here to show off the forum features."
      );
      return;
    }

    try {
      await deletePost(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!post)
    return (
      <div className="loading-container">
        <div className="loading-spinner">🎮</div>
        <p>Loading epic content...</p>
      </div>
    );

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <button onClick={() => navigate("/")} className="back-btn">
          <FaArrowLeft /> Back to Feed
        </button>

        {post.is_demo && (
          <div className="demo-badge">🎮 Demo Post - Read Only</div>
        )}

        {post.flag && (
          <div className={`post-flag flag-${post.flag.toLowerCase()}`}>
            {post.flag === "Question" && "❓"}
            {post.flag === "Opinion" && "💭"}
            {post.flag === "Achievement" && "🏆"}
            {post.flag === "Tips" && "💡"}
            {post.flag === "Review" && "⭐"}
            {post.flag === "Meme" && "😂"}
            {post.flag}
          </div>
        )}
      </div>

      <div className="post-content">
        <h1 className="post-title">{post.title}</h1>

        {post.image_url && (
          <div className="post-image-container">
            <img src={post.image_url} alt={post.title} className="post-image" />
          </div>
        )}

        {post.content && (
          <div className="post-text">
            <p>{post.content}</p>
          </div>
        )}
      </div>

      <div className="post-stats">
        <span className="post-date">
          📅 {new Date(post.created_at).toLocaleString()}
        </span>
        <div className="vote-section">
          <button
            onClick={handleUpvote}
            className={`vote-btn upvote-btn ${
              post.is_demo ? "demo-disabled" : ""
            }`}
            title={
              post.is_demo ? "Demo posts are read-only" : "Upvote this post"
            }
          >
            <FaThumbsUp /> {post.upvotes}
          </button>
          <button
            onClick={handleDownvote}
            className={`vote-btn downvote-btn ${
              post.is_demo ? "demo-disabled" : ""
            }`}
            title={
              post.is_demo ? "Demo posts are read-only" : "Downvote this post"
            }
          >
            <FaThumbsDown /> {post.downvotes || 0}
          </button>
        </div>
      </div>

      {!post.is_demo && (
        <div className="post-actions">
          <Link to={`/post/${id}/edit`} className="action-btn edit-btn">
            <FaEdit /> Edit Post
          </Link>
          <button onClick={handleDelete} className="action-btn delete-btn">
            <FaTrash /> Delete Post
          </button>
        </div>
      )}

      {post.is_demo && (
        <div className="demo-info">
          <p>
            🎮 This is a demo post to showcase the forum features. Want to join
            the conversation? <Link to="/create">Create your own post!</Link>
          </p>
        </div>
      )}

      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostDetailPage;
