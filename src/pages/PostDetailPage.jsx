import React, { useEffect, useState } from "react";
import { getPostById, updatePost, deletePost } from "../services/postService";
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentSection from "../components/Comment/CommentSection";

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
    try {
      const updatedPost = await updatePost(id, { upvotes: post.upvotes + 1 });
      console.log("Upvote updated post:", updatedPost);
      setPost(updatedPost);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownvote = async () => {
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
    try {
      await deletePost(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <p>{post.content}</p>
      <div className="meta">
        <span>{new Date(post.created_at).toLocaleString()}</span>{" "}
        <span> • </span> <span>{post.upvotes} Upvotes</span> <span> • </span>{" "}
        <span>{post.downvotes || 0} Downvotes</span>{" "}
        {post.flag && <span> • {post.flag}</span>}
      </div>
      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={handleDownvote}>Downvote</button>
      <button onClick={handleDelete}>Delete Post</button>
      <Link to={`/post/${id}/edit`}>
        <button>Edit Post</button>
      </Link>
      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostDetailPage;
