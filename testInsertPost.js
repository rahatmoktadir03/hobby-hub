import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsertPost() {
  const postData = {
    title: "Test Post",
    content: "This is a test post content.",
    image_url: "https://example.com/image.png",
    flag: "Test",
    upvotes: 0,
  };

  try {
    const { data, error } = await supabase
      .from("posts")
      .insert(postData)
      .single();
    if (error) {
      console.error("Error inserting post:", error);
    } else {
      console.log("Post inserted successfully:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

testInsertPost();
