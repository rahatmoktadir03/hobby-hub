// Simple utility to validate and test image URLs
export const validateImageUrl = (url) => {
  if (!url) return false;

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return false;
  }

  // Check if URL ends with common image extensions
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  const urlLower = url.toLowerCase();

  return (
    imageExtensions.some((ext) => urlLower.includes(ext)) ||
    urlLower.includes("unsplash.com") ||
    urlLower.includes("imgur.com") ||
    urlLower.includes("images.") ||
    urlLower.includes("cdn.")
  );
};

export const getPlaceholderImage = () => {
  return "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop";
};

// Sample gaming image URLs for testing
export const sampleGamingImages = [
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1556438064-2d7646166914?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
];
