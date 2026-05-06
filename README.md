# Tanvi - A Universe Built For Us 💜

A premium, emotionally immersive romantic web app for Tanmay and Vidhi built with Next.js 14, Tailwind CSS, and Framer Motion.

## Features

✨ **Cinematic Intro** - Animated Tanvi logo reveal with starfield background
🔐 **Secure Login** - Separate logins for Tanmay and Vidhi
📱 **Beautiful UI** - Glassmorphism cards with lavender dream aesthetic
💌 **Love Letters** - Share and read handwritten letters with typewriter animation
📸 **Memory Timeline** - Scroll through your story together with parallax effects
🖼️ **Photo Gallery** - Categorized gallery with lightbox viewer
💬 **Chit Chat** - Shared message board for daily conversations
👗 **Her World** - Food preferences, travel goals, and style showcase
💭 **Dreams** - Track your dreams together and celebrate achievements
✨ **Special Moments** - Cinematic reveals for key moments
🎉 **Surprise** - Password-protected special message with confetti
🎵 **Music Player** - Persistent floating music player
⭐ **Starfield** - Animated background across all pages

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Storage:** localStorage (no backend required)
- **Language:** TypeScript

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Login Credentials

- **Tanmay**: username: `tanmay`, password: `tanvi`
- **Vidhi**: username: `vidhi`, password: `tanvi`

## Configuration

Edit `src/config/love.config.ts` to customize:

- Your names and start date
- Food preferences and places
- Dreams and special moments
- Love letters
- Surprise password and message
- Music playlist

## Features Overview

### Pages

- **Home** - Love dashboard with countdown timer
- **Timeline** - Your story with scroll animations
- **Gallery** - Photo collection with categories
- **Letters** - Love letters with typewriter animation
- **Chit Chat** - Shared message board
- **Her World** - Vidhi's universe (food, places, style)
- **Dreams** - Track shared dreams
- **Special** - Key moments in your relationship
- **Surprise** - Password-protected special reveal
- **Profile** - User stats and app info

### Customization

All data is stored in `localStorage` - no backend needed. Customize colors in `tailwind.config.ts`:

```typescript
colors: {
  lavender: {
    50: '#F5F3FF',
    200: '#E6E6FA',
    600: '#9B72AA',
    800: '#4B0082',
  },
  // ... and more
}
```

## Real-time Chat with Firebase (Optional)

To enable real-time chat, add the Firebase integration code in `src/components/ChitChat.tsx`:

```typescript
// Replace localStorage with Firestore
import { db } from "@/firebase/config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

// Subscribe to messages in real-time
onSnapshot(collection(db, "messages"), (snapshot) => {
  setMessages(snapshot.docs.map((doc) => doc.data()));
});

// Send message
await addDoc(collection(db, "messages"), { sender, text, timestamp });
```

## Customization Tips

1. **Colors** - Update lavender palette in `tailwind.config.ts`
2. **Images** - Replace picsum.photos with your own images
3. **Music** - Add MP3 files to `/public/music/` and update config
4. **Start Date** - Change `startDate` in `love.config.ts`
5. **Messages** - Edit pre-loaded content in config file

## Browser Support

Works on modern browsers (Chrome, Firefox, Safari, Edge)

## Privacy

All data is stored locally in your browser. Nothing is sent to servers.

## License

Made with 💜 for love

---

**Created for Tanmay & Vidhi** 💜
