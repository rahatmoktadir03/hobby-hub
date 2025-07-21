// Simple browser console script to add sample posts
// Just copy-paste this into your browser console when on the PixelQuest forum

// You can run this from the browser console to quickly add sample posts
async function addSamplePostsFromConsole() {
  const samplePosts = [
    {
      title: "Just completed Elden Ring after 150 hours!",
      content:
        "What an epic journey! The final boss fight was absolutely insane. Took me 47 attempts but finally got it done. Now onto NG+! 🎮",
      image_url:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
      flag: "Achievement",
    },
    {
      title: "Best graphics settings for Cyberpunk 2077?",
      content:
        "I have an RTX 4070 and want to get the best visual experience. What settings do you recommend for 1440p gaming?",
      image_url:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop",
      flag: "Question",
    },
    {
      title: "Pro tip: Use the environment to your advantage in Valorant",
      content:
        "Many players forget that you can use smokes, walls, and angles creatively. Here's my guide on positioning that helped me reach Diamond!",
      image_url:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=300&fit=crop",
      flag: "Tips",
    },
    {
      title: "Tears of the Kingdom is a masterpiece",
      content:
        "Nintendo really outdid themselves. The building mechanics, the story, the world... everything is perfect. This might be the best Zelda game ever made.",
      image_url:
        "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&h=300&fit=crop",
      flag: "Opinion",
    },
    {
      title: "When you finally beat that boss you've been stuck on for weeks",
      content:
        "That feeling of pure joy and relief... nothing compares to it! 😅",
      image_url:
        "https://images.unsplash.com/photo-1556438064-2d7646166914?w=500&h=300&fit=crop",
      flag: "Meme",
    },
    {
      title: "Baldur's Gate 3 Review - A D&D Dream Come True",
      content:
        "After 200+ hours, I can confidently say this is one of the best RPGs ever made. The storytelling, character development, and choices that matter make this a must-play.",
      image_url:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      flag: "Review",
    },
  ];

  console.log("🎮 Adding sample gaming posts...");

  for (const post of samplePosts) {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        console.log("✅ Added:", post.title);
      } else {
        console.error("❌ Failed to add:", post.title);
      }
    } catch (error) {
      console.error("💥 Error:", error);
    }

    // Small delay
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log("🚀 Done! Refresh the page to see new posts!");
}

// Instructions to display in console
console.log(`
🎮 PixelQuest Sample Posts Helper 🎮

To add sample posts to your forum, run:
addSamplePostsFromConsole()

This will add 6 gaming posts with different categories.
`);
