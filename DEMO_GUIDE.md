# 📝 Demo Quick Reference

## Access the Prototype

**URL**: `http://localhost:3000/demo`

---

## 4 Key Views

### 1️⃣ Main Feed
**Route**: `/demo`
- Shows 5 posts from different users
- Hero post: "El voto debería ser obligatorio a partir de los 16 años..."
- Click comment icon to open thread

### 2️⃣ Thread Detail
**Route**: `/demo/thread/hero_post_1`
- Main post at top
- 10 nested replies (2 levels deep)
- Visual indentation with connection lines
- Back button to return

### 3️⃣ Profile
**Route**: `/demo/profile`
- User: Alex Dev (@alex_builder)
- Bio: "Building the future of debate. 🏛️ | Tech & Policy enthusiast."
- **Threads tab**: 1 post
- **Replies tab**: 1 reply

### 4️⃣ Activity (AI Moderation)
**Route**: `/demo/activity`
- **Red notification**: "Post Rechazado: Lenguaje Ofensivo"
  - Snippet: "Es que eres un idiota si piensas..."
  - Feedback: Detected personal attacks

- **Amber notification**: "Post Rechazado: Argumento Insuficiente"
  - Snippet: "...solo hay que imprimir más dinero..."
  - Feedback: Lacks logical foundation

---

## 3-Minute Script Outline

### Opening (0:00-0:30)
*Start at `/demo` (main feed)*
- "Meet Ágora: Where argument quality beats virality"
- Scroll through feed showing diverse discussions

### Core Feature 1: Threaded Debates (0:30-1:15)
*Click hero post comment icon*
- "Unlike traditional social media, Ágora encourages depth"
- Show nested conversation with indentation
- Point out: "10 thoughtful replies, not just reactions"

### Core Feature 2: User Profiles (1:15-1:45)
*Navigate to profile*
- "Every user builds a reputation through quality contributions"
- Switch to Replies tab
- "We track both original threads and thoughtful responses"

### 🎯 **Core Feature 3: AI Judge** (1:45-2:45) **← CRITICAL**
*Navigate to Activity page*
- **"This is what makes Ágora different: The AI Judge"**
- Point to red notification:
  - "Look what happens when someone tries to insult instead of argue"
  - "The AI doesn't just block—it teaches"
- Point to amber notification:
  - "And here, a lazy argument gets constructive feedback"
  - "We're not censoring, we're elevating discourse"

### Closing (2:45-3:00)
*Back to home*
- "Ágora: Where your best argument wins, not your loudest voice"
- Call to action

---

## Mobile View Setup

For best demo aesthetics:
1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or set custom 375px width
4. Record in this view to emphasize mobile-first design

---

## Key Talking Points

### Why Threads Aesthetic?
"We deliberately chose a familiar, trusted design language so users focus on the innovation—the AI moderation—not learning a new interface."

### Why Mobile-First?
"Political discourse happens everywhere. Our bottom navigation makes debate accessible in your pocket."

### The AI Advantage
"Traditional platforms punish bad behavior. Ágora teaches better behavior. That's the difference between a bouncer and a debate coach."

---

## Technical Notes for Video

- **All interactions are instant** (no loading states needed)
- **Like button toggles** when clicked (shows interactivity)
- **Bottom nav highlights** active page
- **No backend** = no crashes during demo
- **Mock data is consistent** across all views

---

## Troubleshooting

### If images don't load:
- Check `next.config.ts` has Unsplash and Dicebear in `remotePatterns`
- Restart dev server: `bun run dev`

### If tabs don't switch:
- Should be fixed, but verify `grid-cols-2` is in TabsList className
- Browser cache: Hard refresh (Ctrl+Shift+R)

---

**You're ready to record! 🎬**

Good luck with your pitch! 🚀
