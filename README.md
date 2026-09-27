# 🎂 Birthday Mission — Interactive Birthday Surprise

A simple interactive birthday website built with **React + Vite**.
No backend, no database — just pure frontend fun.

> Coded as a personal project for a friend's birthday.

---

## 🚀 How to Run

Make sure you have **Node.js** (v16+) installed on your computer.

```bash
# 1. Open terminal in the project folder

# 2. Install dependencies (only needed once)
npm install

# 3. Start the development server
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

---

## 📁 Project Structure

```
src/
├── config.js              ← ⭐ EDIT THIS FILE to personalize everything
├── main.jsx               ← Entry point (don't touch)
├── App.jsx                ← Main component — controls which screen shows
├── index.css              ← Global styles & design system
└── components/
    ├── Particles.jsx      ← Floating background particles
    ├── Confetti.jsx       ← Confetti animation (final screen)
    ├── Confetti.css
    ├── WelcomeScreen.jsx  ← Page 1: Loading + greeting
    ├── WelcomeScreen.css
    ├── MissionScreen.jsx  ← Page 2: 3 interactive challenges
    ├── MissionScreen.css
    ├── FriendshipScreen.jsx ← Page 3: Compliment cards
    ├── FriendshipScreen.css
    ├── Timeline.jsx       ← Page 4: Memory timeline
    ├── Timeline.css
    ├── FinalScreen.jsx    ← Page 5: Countdown + birthday reveal
    └── FinalScreen.css
```

---

## ✏️ How to Customize

Open `src/config.js` — everything you need to change is there:

| What to Change | Variable |
|----------------|----------|
| Her name | `FRIEND_NAME` |
| Timeline memories | `TIMELINE_MEMORIES` |
| Compliment cards | `COMPLIMENTS` |
| Final birthday message | `FINAL_MESSAGE` |
| Memory box messages | `MEMORY_BOX_MESSAGES` |
| Riddle question | `RIDDLE` |
| Emoji challenge | `EMOJI_CHALLENGE` |

### Adding Photos

1. Put your photos in the `public/photos/` folder
2. In `config.js`, uncomment the `image` field in `TIMELINE_MEMORIES`
3. Set the path like: `image: "/photos/my-photo.jpg"`

---

## 🛠️ Tech Stack

- **React** — UI components
- **Vite** — Fast development server
- **Vanilla CSS** — All styling (no Tailwind)
- **No backend** — Everything runs in the browser

---

## 📱 Responsive

Works on both desktop and mobile — tested at:
- Desktop (1920px+)
- Tablet (768px)
- Mobile (375px)

---

## 💡 Flow

```
Welcome Screen → Mission Screen → Friendship Screen → Timeline → Final Surprise
     (loading)     (3 challenges)   (compliment cards)  (memories)  (countdown + confetti)
```

Built with ☕ and friendship.
