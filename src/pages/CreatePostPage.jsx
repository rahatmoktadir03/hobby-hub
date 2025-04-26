import React, { useState } from "react";
import { createPost } from "../services/postService";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [flag, setFlag] = useState("");
  const navigate = useNavigate();

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
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <select onChange={(e) => setFlag(e.target.value)} value={flag}>
          <option value="">Select Flag</option>
          <option value="Question">Question</option>
          <option value="Opinion">Opinion</option>
        </select>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
