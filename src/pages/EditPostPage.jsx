import React, { useState, useEffect } from "react";
import { getPostById, updatePost } from "../services/postService";
import { useParams, useNavigate } from "react-router-dom";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [flag, setFlag] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setPost(post);
        setTitle(post.title);
        setContent(post.content);
        setImageUrl(post.image_url || "");
        setFlag(post.flag || "");
      } catch (error) {
        console.error("Error fetching post for editing:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="url"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <select value={flag} onChange={(e) => setFlag(e.target.value)}>
          <option value="">Select Flag</option>
          <option value="Question">Question</option>
          <option value="Opinion">Opinion</option>
        </select>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPostPage;
