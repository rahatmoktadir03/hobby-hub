import React, { useState, useEffect } from "react";
import { getPostById, updatePost } from "../services/postService";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaSave, FaGamepad } from "react-icons/fa";
import "./EditPostPage.css";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);

        // Check if it's a demo post
        if (post.is_demo) {
          setError("Demo posts cannot be edited! They're read-only examples.");
          setLoading(false);
          return;
        }

        setTitle(post.title);
        setContent(post.content);
        setImageUrl(post.image_url || "");
        setFlag(post.flag || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post for editing:", error);
        setError("Failed to load post for editing.");
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedPost = await updatePost(id, {
        title,
        content,
        image_url,
        flag,
      });
      navigate(`/post/${updatedPost.id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-post-container">
        <div className="loading-container">
          <div className="loading-spinner">🎮</div>
          <p>Loading post data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-post-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Edit Not Available</h2>
          <p>{error}</p>
          <Link to={`/post/${id}`} className="back-btn">
            <FaArrowLeft /> Back to Post
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-post-container">
      <div className="edit-post-header">
        <Link to={`/post/${id}`} className="back-btn">
          <FaArrowLeft /> Back to Post
        </Link>
        <h1 className="page-title">
          <FaGamepad /> Edit Epic Post
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your epic post title..."
            required
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Post Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your gaming thoughts and experiences..."
            rows={10}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL (Optional)</label>
          <input
            id="image_url"
            type="url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {image_url && (
            <div className="image-preview">
              <img
                src={image_url}
                alt="Preview"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="flag">Post Category</label>
          <select
            id="flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            required
          >
            <option value="">🎯 Select Category</option>
            <option value="Question">❓ Question</option>
            <option value="Opinion">💭 Opinion</option>
            <option value="Achievement">🏆 Achievement</option>
            <option value="Tips">💡 Tips</option>
            <option value="Review">⭐ Review</option>
            <option value="Meme">😂 Meme</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={loading}>
            <FaSave /> {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
