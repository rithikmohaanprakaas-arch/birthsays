// ============================================
// 🎂 BIRTHDAY CONFIG — Edit these values!
// ============================================
// Change these placeholders to personalize the website.
// This is the ONLY file you need to edit to customize everything.

// Her name — displayed throughout the site
export const FRIEND_NAME = "OVEKA";

// Timeline memories — each item has a year, title, and description
// You can also add an optional `image` field with a URL to a photo
export const TIMELINE_MEMORIES = [
  {
    year: "Day 1",
    title: "First Conversation",
    description: "That random convo that started it all. Who knew it'd turn into an actual friendship? 😄",
    // image: "/photos/first-convo.jpg",  // ← uncomment & add your photo path
  },
  {
    year: "Week 3",
    title: "Funny Moment",
    description: "Remember when we couldn't stop laughing over literally nothing? Classic us. 😂",
    // image: "/photos/funny-moment.jpg",
  },
  {
    year: "Month 2",
    title: "Best Memory",
    description: "That one time everything just clicked and we had the best day ever. No cap. 🔥",
    // image: "/photos/best-memory.jpg",
  },
  {
    year: "Month 5",
    title: "Random Adventure",
    description: "We weren't even planning to do anything and ended up having the most random adventure. 🗺️",
    // image: "/photos/adventure.jpg",
  },
  {
    year: "Today",
    title: "Today 🎂",
    description: "And here we are. Another year of you being awesome. Happy Birthday! 🎉",
    // image: "/photos/today.jpg",
  },
];

// Friendship compliment cards — displayed on the Friendship screen
export const COMPLIMENTS = [
  { text: "Your sense of humor", emoji: "😂" },
  { text: "Your confidence", emoji: "✨" },
  { text: "Your random conversations", emoji: "💬" },
  { text: "Your ability to make boring moments fun", emoji: "🎭" },
  { text: "You're genuinely a great friend", emoji: "🤝" },
];

// Final birthday message — shown after confetti
export const FINAL_MESSAGE = `Here's to another year of random plans, chaotic conversations, 
and moments that make zero sense but are somehow the best. 
You deserve all the good stuff. Seriously. 🎂✨`;

// Memory box messages — revealed during Challenge 3
export const MEMORY_BOX_MESSAGES = [
  "Remember that time we laughed so hard we couldn't breathe? Good times. 😂",
  "You're the friend who makes ordinary days feel like an adventure. 🌟",
  "The world is better with your chaotic energy in it. Never change. 🔥",
];

// Riddle for Challenge 1
export const RIDDLE = {
  question: "When did we first talk? 💬",
  options: ["15.03.2024 📅", "22.07.2024 💫", "08.11.2024 🗓️", "01.05.2024 📆"],
  correctIndex: 1, // "22.07.2024" is the answer (0-indexed)
};

// Emoji challenge for Challenge 2
export const EMOJI_CHALLENGE = {
  emojis: ["🎂", "🎈", "🎁"],
  question: "What event do these emojis represent?",
  options: ["A wedding", "A birthday party", "A graduation", "New Year's Eve"],
  correctIndex: 1, // "A birthday party"
};
