import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { FaRegClock, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./PostCard.css";

const PostCard = ({ post }) => {
  const {
    id,
    title,
    created_at,
    upvotes,
    downvotes,
    image_url,
    flag,
    is_demo,
  } = post;
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div
      className={`post-card ${is_demo ? "demo-post" : ""}`}
      onClick={handlePostClick}
    >
      {is_demo && <div className="demo-badge">🎮 Demo Post</div>}

      {flag && (
        <div className={`post-flag flag-${flag.toLowerCase()}`}>
          {flag === "Question" && "❓"}
          {flag === "Opinion" && "💭"}
          {flag === "Achievement" && "🏆"}
          {flag === "Tips" && "💡"}
          {flag === "Review" && "⭐"}
          {flag === "Meme" && "😂"}
          {flag}
        </div>
      )}

      {image_url && (
        <div className="post-image">
          <img src={image_url} alt={title} />
        </div>
      )}

      <h3 className="post-title">{title}</h3>
      <div className="post-meta">
        <span>
          <FaRegClock /> {formatDate(created_at)}
        </span>
        <div className="post-votes">
          <span className="vote-count upvote">
            <FaThumbsUp /> {upvotes}
          </span>
          <span className="vote-count downvote">
            <FaThumbsDown /> {downvotes || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
