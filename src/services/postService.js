import { supabase } from "./supabaseClient";

export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPostById(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createPost(post) {
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        flag: post.flag,
        upvotes: 0,
        downvotes: 0,
        comments: [],
        created_at: new Date().toISOString(),
      },
    ])
    .select("*");

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }

  return data[0];
}

export async function updatePost(id, updates) {
  const { data, error } = await supabase
    .from("posts")
    .update(updates)
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}
