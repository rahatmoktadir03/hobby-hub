import React, { useState } from "react";
import { createPost } from "../services/postService";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaImage, FaGamepad, FaRandom } from "react-icons/fa";
import { validateImageUrl, sampleGamingImages } from "../utils/imageUtils";
import "./CreatePostPage.css";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [flag, setFlag] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);

    // Validate and set preview
    if (validateImageUrl(url)) {
      setImagePreview(url);
    } else {
      setImagePreview("");
    }
  };

  const useRandomImage = () => {
    const randomImage =
      sampleGamingImages[Math.floor(Math.random() * sampleGamingImages.length)];
    setImageUrl(randomImage);
    setImagePreview(randomImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      image_url,
      flag,
    };

    console.log("Create post form submitted with:", newPost);

    try {
      const createdPost = await createPost(newPost);
      console.log("Post created successfully:", createdPost);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="create-post">
      <div className="create-post-header">
        <FaGamepad className="header-icon" />
        <h2>🎮 Share Your Gaming Moment</h2>
      </div>

      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="🏆 Epic Post Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="gaming-input"
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="📝 Share your gaming experience, tips, or epic moments..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="gaming-textarea"
          />
        </div>

        <div className="form-group image-section">
          <div className="image-input-wrapper">
            <FaImage className="input-icon" />
            <input
              type="url"
              placeholder="🖼️ Image URL (screenshots, clips, etc.)"
              value={image_url}
              onChange={handleImageUrlChange}
              className="gaming-input"
            />
            <button
              type="button"
              onClick={useRandomImage}
              className="random-image-btn"
              title="Use random gaming image"
            >
              <FaRandom /> Random
            </button>
          </div>
          {imagePreview && (
            <div className="image-preview">
              <img
                src={imagePreview}
                alt="Preview"
                onError={() => setImagePreview("")}
              />
              <p className="image-status">✅ Image loaded successfully!</p>
            </div>
          )}
          {image_url && !imagePreview && (
            <div className="image-error">
              <p>❌ Invalid image URL. Try a direct link to an image file.</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <select
            onChange={(e) => setFlag(e.target.value)}
            value={flag}
            className="gaming-select"
          >
            <option value="">🏷️ Select Category</option>
            <option value="Question">❓ Question</option>
            <option value="Opinion">💭 Opinion</option>
            <option value="Achievement">🏆 Achievement</option>
            <option value="Tips">💡 Tips & Tricks</option>
            <option value="Review">⭐ Game Review</option>
            <option value="Meme">😂 Gaming Meme</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          <FaUpload /> 🚀 Launch Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
