import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient.js";
import { FaPaperPlane } from "react-icons/fa";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("content")
      .eq("post_id", postId);

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data || []);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!postId) {
      console.error("postId is missing.");
      return;
    }

    const trimmed = newComment.trim();
    if (!trimmed) return;

    const { error } = await supabase.from("comments").insert([
      {
        post_id: postId,
        content: trimmed,
      },
    ]);

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setNewComment("");
      fetchComments();
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" aria-label="Post Comment">
          <FaPaperPlane />
        </button>
      </form>

      <ul>
        {comments.length === 0 ? (
          <li>No comments yet.</li>
        ) : (
          comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CommentSection;
