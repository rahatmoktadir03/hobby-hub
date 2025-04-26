import React from "react";
import { formatDate } from "../../utils/formatDate";
import { FaRegClock, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./PostCard.css";

const PostCard = ({ post }) => {
  const { id, title, created_at, upvotes, downvotes } = post;

  return (
    <div
      className="post-card"
      onClick={() => (window.location.href = `/post/${id}`)}
    >
      <h3 className="post-title">{title}</h3>
      <div className="post-meta">
        <span>
          <FaRegClock /> {formatDate(created_at)}
        </span>
        <span style={{ marginLeft: "1rem" }}>
          <FaThumbsUp /> {upvotes}{" "}
          <FaThumbsDown style={{ marginLeft: "0.5rem" }} /> {downvotes || 0}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
