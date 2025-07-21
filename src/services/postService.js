import { supabase } from "./supabaseClient";

// Permanent demo posts that are always available
const DEMO_POSTS = [
  {
    id: "demo-1",
    title: "Just completed Elden Ring after 150 hours!",
    content:
      "What an epic journey! The final boss fight was absolutely insane. Took me 47 attempts but finally got it done. Now onto NG+! 🎮\n\nThe game's design is incredible - every boss feels like a puzzle to solve. My favorite moment was discovering the hidden areas in Caelid. Pure nightmare fuel but so rewarding!",
    image_url:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
    flag: "Achievement",
    upvotes: 142,
    downvotes: 3,
    comments: [],
    created_at: "2025-07-18T10:30:00.000Z",
    is_demo: true,
  },
  {
    id: "demo-2",
    title: "Best graphics settings for Cyberpunk 2077?",
    content:
      "I have an RTX 4070 and want to get the best visual experience. What settings do you recommend for 1440p gaming?\n\nI'm torn between maxing out ray tracing or going for higher fps. What's the sweet spot for both visual quality and performance?",
    image_url:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop",
    flag: "Question",
    upvotes: 89,
    downvotes: 5,
    comments: [],
    created_at: "2025-07-19T14:15:00.000Z",
    is_demo: true,
  },
  {
    id: "demo-3",
    title: "Pro tip: Use the environment to your advantage in Valorant",
    content:
      "Many players forget that you can use smokes, walls, and angles creatively. Here's my guide on positioning that helped me reach Diamond!\n\n1. Always check corners with utility first\n2. Use sound cues to your advantage\n3. Master crosshair placement\n4. Learn the economy system\n\nThese fundamentals will carry you far!",
    image_url:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=300&fit=crop",
    flag: "Tips",
    upvotes: 267,
    downvotes: 12,
    comments: [],
    created_at: "2025-07-19T09:45:00.000Z",
    is_demo: true,
  },
  {
    id: "demo-4",
    title: "Tears of the Kingdom is a masterpiece",
    content:
      "Nintendo really outdid themselves. The building mechanics, the story, the world... everything is perfect. This might be the best Zelda game ever made.\n\nThe creativity this game allows is unmatched. I spent 20 hours just building vehicles and contraptions. The physics engine is incredible!",
    image_url:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&h=300&fit=crop",
    flag: "Opinion",
    upvotes: 324,
    downvotes: 18,
    comments: [],
    created_at: "2025-07-17T16:20:00.000Z",
    is_demo: true,
  },
  {
    id: "demo-5",
    title: "When you finally beat that boss you've been stuck on for weeks",
    content:
      "That feeling of pure joy and relief... nothing compares to it! 😅\n\nJust spent 3 weeks on Malenia in Elden Ring. Finally got her today and I literally screamed. My neighbors probably think I'm crazy but I don't care!",
    image_url:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=500&h=300&fit=crop",
    flag: "Meme",
    upvotes: 892,
    downvotes: 7,
    comments: [],
    created_at: "2025-07-18T20:30:00.000Z",
    is_demo: true,
  },
  {
    id: "demo-6",
    title: "Baldur's Gate 3 Review - A D&D Dream Come True",
    content:
      "After 200+ hours, I can confidently say this is one of the best RPGs ever made. The storytelling, character development, and choices that matter make this a must-play.\n\nEvery conversation feels meaningful, every choice has weight. This is how RPGs should be made. Larian Studios knocked it out of the park!",
    image_url:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    flag: "Review",
    upvotes: 456,
    downvotes: 23,
    comments: [],
    created_at: "2025-07-16T12:10:00.000Z",
    is_demo: true,
  },
];

export async function getPosts() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Combine real posts with demo posts
    const realPosts = data || [];
    const allPosts = [...DEMO_POSTS, ...realPosts];

    // Sort all posts by created_at
    return allPosts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    // If database fails, return demo posts only
    return DEMO_POSTS;
  }
}

export async function getPostById(id) {
  // Check if it's a demo post first
  const demoPost = DEMO_POSTS.find((post) => post.id === id);
  if (demoPost) {
    return demoPost;
  }

  // Otherwise fetch from database
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
  // Check if it's a demo post - demo posts cannot be updated
  const demoPost = DEMO_POSTS.find((post) => post.id === id);
  if (demoPost) {
    throw new Error("Demo posts are read-only and cannot be updated.");
  }

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
  // Check if it's a demo post - demo posts cannot be deleted
  const demoPost = DEMO_POSTS.find((post) => post.id === id);
  if (demoPost) {
    throw new Error("Demo posts cannot be deleted.");
  }

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

// Function to add sample posts for testing
export async function addSamplePosts() {
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
    },
  ];

  const results = [];
  for (const post of samplePosts) {
    try {
      const result = await createPost(post);
      results.push(result);
      console.log("✅ Added sample post:", post.title);
    } catch (error) {
      console.error("❌ Failed to add:", post.title, error);
    }
  }

  return results;
}
