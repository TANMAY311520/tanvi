# Firebase Real-Time Chat Setup Guide

## Step 1: Create Firebase Project

1. Go to [https://firebase.google.com](https://firebase.google.com)
2. Click **"Get Started"** button
3. Click **"Create a project"**
   - Project name: `tanvi` (or any name)
   - Accept terms
   - Disable Google Analytics (optional)
   - Click **"Create project"**

## Step 2: Enable Realtime Database

1. In Firebase Console, go to **"Build"** → **"Realtime Database"**
2. Click **"Create Database"**
3. Choose region (closest to you)
4. Start in **"Test Mode"** (for development)
5. Click **"Enable"**

## Step 3: Get Your Firebase Config

1. In Firebase Console, go to **"Project Settings"** (gear icon)
2. Click **"Your apps"** section
3. Click **"Web"** icon (or click **"Add app"** if needed)
4. Copy the config object that looks like:

```javascript
{
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789...",
  appId: "1:123456789:web:abc123...",
}
```

## Step 4: Update Config File

1. Open `src/config/firebase.ts`
2. Replace all the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Step 5: Set Database Rules (For Security Later)

Once testing is complete, go to **"Realtime Database"** → **"Rules"** tab and update:

```json
{
  "rules": {
    "chitchat": {
      "messages": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

## Step 6: Redeploy to Vercel

```bash
git add .
git commit -m "Add Firebase real-time chat"
git push
```

Vercel will auto-deploy!

## ✅ Now Both Devices Will Sync Messages Instantly!

- Messages sent on your phone appear instantly on her phone
- Messages she sends appear instantly on your phone
- Reactions sync in real-time
- All completely **FREE** on Firebase's free tier

## Troubleshooting

- **"Firebase not configured" error?** Make sure you've added all the config values correctly
- **Messages not appearing?** Check Firebase Database → "Data" tab to see if messages are being saved
- **Still using localStorage?** If Firebase config is missing, it automatically falls back to localStorage (single device only)
