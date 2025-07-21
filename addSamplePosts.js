// Node.js script to add sample gaming posts to the database
//
// INSTRUCTIONS:
// 1. Replace YOUR_SUPABASE_URL_HERE and YOUR_SUPABASE_ANON_KEY_HERE with your actual values
// 2. Run with: npm run add-sample-posts
//
// OR if you have a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY:
// 1. Uncomment the dotenv lines below
// 2. Comment out the hardcoded values
// 3. Run with: npm run add-sample-posts

import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase credentials
// You can find these in your Supabase project settings
const supabaseUrl = "YOUR_SUPABASE_URL_HERE";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY_HERE";

// If you have environment variables set up, uncomment these lines instead:
// import dotenv from "dotenv";
// dotenv.config();
// const supabaseUrl = process.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sample gaming posts to make the forum feel alive
const samplePosts = [
  {
    title: "Just completed Elden Ring after 150 hours!",
    content:
      "What an epic journey! The final boss fight was absolutely insane. Took me 47 attempts but finally got it done. Now onto NG+! 🎮",
    image_url:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
    flag: "Achievement",
    upvotes: 23,
    downvotes: 1,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    title: "Best graphics settings for Cyberpunk 2077?",
    content:
      "I have an RTX 4070 and want to get the best visual experience. What settings do you recommend for 1440p gaming?",
    image_url:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop",
    flag: "Question",
    upvotes: 15,
    downvotes: 2,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    title: "Pro tip: Use the environment to your advantage in Valorant",
    content:
      "Many players forget that you can use smokes, walls, and angles creatively. Here's my guide on positioning that helped me reach Diamond!",
    image_url:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=300&fit=crop",
    flag: "Tips",
    upvotes: 42,
    downvotes: 0,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
  },
  {
    title: "Tears of the Kingdom is a masterpiece",
    content:
      "Nintendo really outdid themselves. The building mechanics, the story, the world... everything is perfect. This might be the best Zelda game ever made.",
    image_url:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&h=300&fit=crop",
    flag: "Opinion",
    upvotes: 67,
    downvotes: 8,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
  {
    title: "When you finally beat that boss you've been stuck on for weeks",
    content:
      "That feeling of pure joy and relief... nothing compares to it! 😅",
    image_url:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=500&h=300&fit=crop",
    flag: "Meme",
    upvotes: 156,
    downvotes: 3,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  },
  {
    title: "Baldur's Gate 3 Review - A D&D Dream Come True",
    content:
      "After 200+ hours, I can confidently say this is one of the best RPGs ever made. The storytelling, character development, and choices that matter make this a must-play.",
    image_url:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    flag: "Review",
    upvotes: 89,
    downvotes: 5,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
  },
];

async function insertSamplePosts() {
  console.log(
    "🎮 Adding sample gaming posts to make the forum more vibrant..."
  );

  for (const post of samplePosts) {
    try {
      const { error } = await supabase.from("posts").insert(post).select();

      if (error) {
        console.error("❌ Error inserting post:", error);
      } else {
        console.log("✅ Successfully added:", post.title);
      }
    } catch (err) {
      console.error("💥 Unexpected error:", err);
    }

    // Add a small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("🚀 All sample posts added! Your forum is now ready to rock!");
}

insertSamplePosts();
