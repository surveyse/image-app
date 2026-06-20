# Complete Infographic Design Prompt — IMAGE Project

Ready-to-use prompts for design tools (Canva, Figma, Adobe Express) and AI image generators (Midjourney, DALL·E, Ideogram).

---

## Designer Brief

### Subject

Design a **vertical portrait infographic** introducing the **IMAGE** project — a static web app that captures a photo from the browser camera on Play click, uploads it to Cloudinary, then plays a pre-configured video. **No backend, no npm, free hosting on GitHub Pages.**

### Recommended Dimensions

- **Instagram Story / Reels:** 1080 × 1920 px
- **Instagram Post:** 1080 × 1350 px (4:5)
- **LinkedIn:** 1080 × 1350 px
- **A4 Print:** 2480 × 3508 px (300 DPI)

### Visual Style

- **Theme:** Dark mode, minimal, tech/cinematic
- **Mood:** Glassmorphism, cinematic, modern
- **Inspired by project UI:** Frost overlay, film grain, magenta glow
- **Avoid:** Cluttered layout, cartoon style, bright playful colors, outdated clipart

### Color Palette

| Role | Hex |
|------|-----|
| Main background | `#0a0a0a` |
| Card background | `#111111` / `rgba(255,255,255,0.06)` |
| Primary text | `#ffffff` |
| Secondary text | `rgba(255,255,255,0.75)` |
| Accent / Glow | `#ff00ff` at 25% opacity |
| Play button | `#FF0000` (YouTube red) |
| Error state | `#f87171` |
| Frost overlay | `rgba(8,8,12,0.35)` + blur |

### Typography

- **Headings & body:** Inter, SF Pro, or similar clean sans-serif
- **Code / labels:** JetBrains Mono or Fira Code
- **Direction:** LTR (English)
- **Hierarchy:** Large title → subtitle → content blocks → footer

---

## 7-Block Layout (Top to Bottom)

### Block 1 — Header

**Main title:**
```
IMAGE
```

**Subtitle:**
```
Static Web App · No Server · Cloudinary + GitHub Pages
```

**Tagline:**
```
One Play → Hidden Capture → Cloud Upload → Video Playback
```

**Visual elements:** Camera icon + cloud icon + small red Play button

---

### Block 2 — 5-Step Flow (Core of the Infographic)

Display **horizontally** with arrows between steps:

| # | Icon | Title | One-line description |
|---|------|-------|----------------------|
| 1 | ▶ | Play | User taps the button |
| 2 | 📷 | Camera | Front-camera permission |
| 3 | 🎭 | Hidden Capture | JPEG after 2 seconds — no live preview |
| 4 | ☁️ | Upload | POST to Cloudinary · IMAGE folder |
| 5 | 🎬 | Video | CDN playback · loop |

**Design note:** Highlight step 3 with Frost/blur effect — emphasize that capture is **hidden**.

---

### Block 3 — Before / After (Two Columns)

**Left column — "Before Upload"**
- Frost overlay (blur)
- Film grain
- Play button
- Copy: *"User never sees the live feed"*

**Right column — "After Upload"**
- Video playing
- Cloudinary logo
- IMAGE folder
- Copy: *"Photo in the cloud · Video on screen"*

---

### Block 4 — Tech Stack

**Section title:** `Technologies`

**Badge row:**
```
HTML5 · CSS3 · JavaScript · Canvas API · getUserMedia
Cloudinary · GitHub Pages · GitHub Actions · HTTPS
```

**Stats cards (3 numbers):**
```
0 npm          0 Backend        5 core files
```

---

### Block 5 — Architecture (Simple Diagram)

**Section title:** `Architecture`

```
GitHub Pages (index.html + app.js + config.js)
        │
   ┌────┴────┐
   ▼         ▼
getUserMedia   Cloudinary API
   │              │
Canvas → JPEG   IMAGE folder
                  │
            playbackVideoUrl
```

**Style:** Rounded boxes, thin white connector lines, soft magenta glow on Cloudinary node

---

### Block 6 — Metadata + Security (Two Small Columns)

**Metadata:**
```
photo-{timestamp}.jpg
tags: device-iphone · web-capture
context: user_agent
```

**Security:**

| ✓ Do | ✗ Don't |
|------|---------|
| Unsigned Preset | API Secret in frontend |
| HTTPS | Backend server |
| Preset limits | User authentication |

---

### Block 7 — Footer

**Links:**
```
github.com/surveyse/image-app
surveyse.github.io/image-app
```

**Differentiators (3 small bullets):**
- Hidden capture behind Frost overlay
- One session — one photo
- Auto-deploy via GitHub Actions

---

## Full AI Image Generator Prompt

```
Create a professional vertical tech infographic poster, portrait orientation 9:16, dark cinematic theme.

SUBJECT: "IMAGE" — a static web app that captures a photo from the browser camera, uploads to Cloudinary cloud storage, then plays a video. No backend, no npm, hosted on GitHub Pages.

STYLE:
- Dark mode minimalist tech infographic
- Glassmorphism frost overlay aesthetic
- Subtle film grain texture
- Soft magenta/pink glow accents (#ff00ff at 25% opacity)
- Black background #0a0a0a
- White typography, clean modern sans-serif (Inter)
- YouTube-style red play button #FF0000 as accent
- Professional, not cartoonish, not cluttered
- Flat icons with subtle depth

LAYOUT (top to bottom):
1. HEADER: Large title "IMAGE", subtitle "Static Web App · No Server · Cloudinary + GitHub Pages", tagline "Browser Camera → Hidden Capture → Cloud Upload → Video Playback"
2. FLOW SECTION: 5 horizontal steps with icons and arrows — Play, Camera, Hidden Capture, Cloud Upload, Video Play
3. BEFORE/AFTER: Two columns — left shows frosted blurred glass overlay with play button; right shows video playing from cloud
4. TECH STACK: Badge row — HTML5, CSS3, JavaScript, Canvas API, getUserMedia, Cloudinary, GitHub Pages, GitHub Actions, HTTPS
5. ARCHITECTURE DIAGRAM: Simple flowchart boxes — GitHub Pages splits to getUserMedia and Cloudinary API, then playbackVideoUrl
6. METADATA + SECURITY: Small cards showing photo-{timestamp}.jpg, tags, user_agent context, unsigned preset, no API secret
7. FOOTER: GitHub repo URL and live site URL

VISUAL ELEMENTS:
- Frosted glass blur panels
- Camera icon, cloud icon, play button
- Thin connecting arrows between flow steps
- Rounded rectangle cards with rgba(255,255,255,0.06) background
- Subtle magenta shadow on video frame (3:4 aspect ratio)
- Stats: 0 npm, 0 Backend, 5 core files

MOOD: cinematic, mysterious, modern web technology, privacy-conscious hidden capture

AVOID: bright colors, clipart, 3D characters, stock photo people, busy backgrounds, light theme, watermarks, misspelled text, Persian/RTL text

OUTPUT: High resolution infographic poster, readable text hierarchy, suitable for Instagram story and LinkedIn post.
```

---

## Short Prompt — Midjourney / Ideogram

```
Vertical dark tech infographic poster, 9:16, project "IMAGE" static web app workflow: play button → hidden camera capture behind frosted glass blur → cloud upload to Cloudinary → video playback, glassmorphism, film grain, black #0a0a0a background, magenta glow, red YouTube play button accent, 5-step flowchart with icons, architecture diagram, tech badges HTML JavaScript Cloudinary GitHub Pages, minimalist cinematic, white clean typography, professional infographic layout --ar 9:16 --style raw
```

---

## Canva / Figma AI Prompt

```
Design a vertical infographic (1080x1920) for an English LTR tech project called IMAGE.

Dark theme (#0a0a0a), Inter font, glassmorphism frost effect, magenta glow, red YouTube play button accent.

Sections:
1. Title IMAGE + subtitle "Static Web App · No Server"
2. Tagline: Browser Camera → Hidden Capture → Cloud Upload → Video Playback
3. 5-step horizontal flow with icons and arrows
4. Before/after two columns (frost blur vs video playing)
5. Tech stack badges (HTML5, JavaScript, Cloudinary, GitHub Pages)
6. Simple architecture diagram
7. Metadata and security checklist
8. GitHub links footer

Style: minimal, cinematic, modern, not cluttered. All text in English.
```

---

## Negative Prompt (AI)

```
cartoon, anime, 3d render, bright background, white background, cluttered, messy, low quality, blurry text, illegible text, watermark, logo distortion, stock photo faces, children illustration, gradient overload, neon cyberpunk excess, comic style, hand drawn sketch, pixel art, light mode, pastel colors, generic corporate blue, Persian text, RTL layout, Arabic script
```

---

## Copy-Ready Text Blocks

### Header
```
IMAGE
Static Web App · No Server · Cloudinary + GitHub Pages
Browser Camera → Hidden Capture → Cloud Upload → Video Playback
```

### Flow Steps
```
1. Play        — User taps the button
2. Camera      — Front-camera access granted
3. Hidden      — JPEG captured after 2s, no live preview
4. Upload      — POST to Cloudinary (IMAGE folder)
5. Video       — Playback from CDN, loop enabled
```

### Stats
```
0 npm  ·  0 Backend  ·  5 Core Files  ·  JPEG 92%  ·  1920×1080
```

### Differentiators
```
• Hidden capture — user never sees the live camera feed
• Zero build step — raw HTML/JS deployed directly
• One session — single photo per visit
```

### Footer
```
github.com/surveyse/image-app
surveyse.github.io/image-app
```

---

## Pre-Publish Checklist

- [ ] IMAGE title is large and readable
- [ ] 5-step flow with clear arrows
- [ ] "Hidden Capture" step visually emphasized (frost/blur)
- [ ] Dark palette with magenta/red accents
- [ ] All text in English, LTR layout
- [ ] GitHub repo and live site links included
- [ ] No API Secret or sensitive credentials shown
- [ ] Resolution matches target platform

---

## Reference Links

- Full project review: [03-infographic-review.md](./03-infographic-review.md)
- Persian prompt version: [04-infographic-prompt.md](./04-infographic-prompt.md)
- Repo: https://github.com/surveyse/image-app
- Live site: https://surveyse.github.io/image-app/
