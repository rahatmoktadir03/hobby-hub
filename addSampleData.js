// Simple script to add sample posts using your existing environment
// This uses the same supabase client as your React app

import { supabase } from "./src/services/supabaseClient.js";

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
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
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
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
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
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
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
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
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
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
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
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

async function addSamplePosts() {
  console.log("🎮 Adding sample gaming posts...");

  for (const post of samplePosts) {
    try {
      const { error } = await supabase.from("posts").insert(post);

      if (error) {
        console.error("❌ Error:", post.title, error.message);
      } else {
        console.log("✅ Added:", post.title);
      }
    } catch (err) {
      console.error("💥 Error:", err.message);
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log("🚀 Done! Check your forum for the new posts!");
}

// Run the function
addSamplePosts().catch(console.error);
