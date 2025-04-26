import { supabase } from "../services/supabaseClient";

// Fetch all comments for a post
export const fetchComments = async (postId) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

// Add a comment to a post
export const addComment = async (postId, content, user_id = null) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, content, user_id }]);

  if (error) throw error;
  return data;
};

// Optionally: Delete a comment (if needed later)
export const deleteComment = async (commentId) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) throw error;
};
