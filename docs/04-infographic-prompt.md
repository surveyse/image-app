# پرامپت کامل طراحی اینفوگرافیک — پروژه IMAGE

> English version: [04-infographic-prompt-en.md](./04-infographic-prompt-en.md)

این سند شامل پرامپت آماده برای ابزارهای طراحی (Canva، Figma، Adobe Express) و تولید تصویر AI (Midjourney، DALL·E، Ideogram) است.

---

## نسخه فارسی — Brief کامل برای طراح

### موضوع

طراحی یک **اینفوگرافیک عمودی** (Portrait) برای معرفی پروژه **IMAGE** — یک وب‌اپ استاتیک که با کلیک Play از دوربین مرورگر عکس می‌گیرد، به Cloudinary آپلود می‌کند، و ویدیو پخش می‌کند. **بدون بک‌اند، بدون npm، رایگان روی GitHub Pages.**

### ابعاد پیشنهادی

- **اینستاگرام Story / Reels:** 1080 × 1920 px
- **پست اینستاگرام:** 1080 × 1350 px (4:5)
- **LinkedIn:** 1080 × 1350 px
- **A4 چاپ:** 2480 × 3508 px (300 DPI)

### سبک بصری

- **تم:** Dark mode، مینیمال، tech/cinematic
- **حس کلی:** شیشه‌ای (glassmorphism)، سینمایی، مدرن
- **الهام از UI پروژه:** Frost overlay، film grain، glow صورتی
- **نه:** شلوغ، کارتونی، رنگ‌های شاد کودکانه، clipart قدیمی

### پالت رنگ

| نقش | کد |
|-----|-----|
| پس‌زمینه اصلی | `#0a0a0a` |
| پس‌زمینه کارت‌ها | `#111111` / `rgba(255,255,255,0.06)` |
| متن اصلی | `#ffffff` |
| متن ثانویه | `rgba(255,255,255,0.75)` |
| Accent / Glow | `#ff00ff` با opacity 25% |
| دکمه Play | `#FF0000` (قرمز YouTube) |
| خطا | `#f87171` |
| Frost | `rgba(8,8,12,0.35)` + blur |

### تایپوگرافی

- **فارسی:** Vazirmatn (Bold برای تیتر، Regular/Medium برای بدنه)
- **انگلیسی/کد:** Inter یا JetBrains Mono
- **جهت:** RTL برای متن فارسی
- **سلسله‌مراتب:** تیتر بزرگ → زیرتیتر → بلوک‌ها → فوتر

---

## ساختار ۷ بلوکی (از بالا به پایین)

### بلوک ۱ — Header

**تیتر اصلی:**
```
IMAGE
```

**زیرتیتر:**
```
وب‌اپ استاتیک · بدون سرور · Cloudinary + GitHub Pages
```

**Tagline:**
```
یک Play → عکس مخفی → آپلود ابری → پخش ویدیو
```

**عناصر بصری:** آیکون دوربین + ابر (cloud) + دکمه Play قرمز کوچک

---

### بلوک ۲ — فلو ۵ مرحله‌ای (قلب اینفوگرافیک)

نمایش **افقی** با فلش بین مراحل:

| # | آیکون | عنوان | توضیح یک خط |
|---|-------|--------|-------------|
| 1 | ▶ Play | Play | کاربر دکمه را می‌زند |
| 2 | 📷 | دوربین | دسترسی front-camera |
| 3 | 🎭 | Capture مخفی | JPEG بعد از ۲ ثانیه — بدون نمایش زنده |
| 4 | ☁️ | آپلود | POST به Cloudinary · فولدر IMAGE |
| 5 | 🎬 | ویدیو | پخش از CDN · loop |

**نکته طراحی:** مرحله ۳ را با افکت Frost/blur متمایز کن — «مخفی» بودن capture.

---

### بلوک ۳ — قبل / بعد (دو ستون)

**ستون چپ — «قبل از آپلود»**
- Frost overlay (blur)
- Film grain
- دکمه Play
- متن: «کاربر تصویر زنده را نمی‌بیند»

**ستون راست — «بعد از آپلود»**
- ویدیو در حال پخش
- Cloudinary logo
- فولدر IMAGE
- متن: «عکس در cloud · ویدیو روی صفحه»

---

### بلوک ۴ — Tech Stack

**عنوان:** `فناوری‌ها`

**Badgeها (ردیفی):**
```
HTML5 · CSS3 · JavaScript · Canvas API · getUserMedia
Cloudinary · GitHub Pages · GitHub Actions · HTTPS
```

**آمار کوچک (۳ عدد در کارت):**
```
0 npm          0 Backend        5 فایل اصلی
```

---

### بلوک ۵ — معماری (دیاگرام ساده)

**عنوان:** `معماری`

```
GitHub Pages (index.html + app.js + config.js)
        │
   ┌────┴────┐
   ▼         ▼
getUserMedia   Cloudinary API
   │              │
Canvas→JPEG    فولدر IMAGE
                  │
            playbackVideoUrl
```

**استایل:** جعبه‌های گرد، خطوط نازک سفید، glow ملایم صورتی روی Cloudinary

---

### بلوک ۶ — متادیتا + امنیت (دو ستون کوچک)

**متادیتا:**
```
photo-{timestamp}.jpg
tags: device-iphone · web-capture
context: user_agent
```

**امنیت:**

| ✓ | ✗ |
|---|---|
| Unsigned Preset | API Secret |
| HTTPS | Backend |
| محدودیت preset | Auth |

---

### بلوک ۷ — Footer

**لینک‌ها:**
```
github.com/surveyse/image-app
surveyse.github.io/image-app
```

**نکات تمایز (۳ bullet کوچک):**
- Capture مخفی پشت Frost
- یک session — یک عکس
- Deploy خودکار با GitHub Actions

---

## پرامپت انگلیسی — برای AI Image Generator

```
Create a professional vertical tech infographic poster, portrait orientation 9:16, dark cinematic theme.

SUBJECT: "IMAGE" — a static web app that captures a photo from browser camera, uploads to Cloudinary cloud, then plays a video. No backend, no npm, hosted on GitHub Pages.

STYLE:
- Dark mode minimalist tech infographic
- Glassmorphism frost overlay aesthetic
- Subtle film grain texture
- Soft magenta/pink glow accents (#ff00ff at 25% opacity)
- Black background #0a0a0a
- White typography, clean modern sans-serif
- YouTube-style red play button #FF0000 as accent
- Professional, not cartoonish, not cluttered
- Flat icons with subtle depth
- RTL-friendly layout option for Persian text areas

LAYOUT (top to bottom):
1. HEADER: Large title "IMAGE", subtitle about static web app, tagline "Browser Camera → Hidden Capture → Cloud Upload → Video Playback"
2. FLOW SECTION: 5 horizontal steps with icons and arrows — Play, Camera, Hidden Capture, Cloud Upload, Video Play
3. BEFORE/AFTER: Two columns — left shows frosted blurred glass overlay with play button; right shows video playing from cloud
4. TECH STACK: Badge row — HTML5, JavaScript, Canvas API, getUserMedia, Cloudinary, GitHub Pages
5. ARCHITECTURE DIAGRAM: Simple flowchart boxes — GitHub Pages splits to getUserMedia and Cloudinary API
6. METADATA + SECURITY: Small cards showing tags, user_agent, unsigned preset, no API secret
7. FOOTER: GitHub repo URL and live site URL

VISUAL ELEMENTS:
- Frosted glass blur panels
- Camera icon, cloud icon, play button
- Thin connecting arrows between flow steps
- Rounded rectangle cards with rgba(255,255,255,0.06) background
- Subtle magenta shadow on video frame (3:4 aspect ratio)

MOOD: cinematic, mysterious, modern web technology, privacy-conscious hidden capture

AVOID: bright colors, clipart, 3D characters, stock photo people, busy backgrounds, light theme, watermarks, misspelled text

OUTPUT: High resolution infographic poster, readable text hierarchy, suitable for Instagram story and LinkedIn post.
```

---

## پرامپت کوتاه — Midjourney / Ideogram

```
Vertical dark tech infographic poster, 9:16, project "IMAGE" static web app workflow: play button → hidden camera capture behind frosted glass blur → cloud upload to Cloudinary → video playback, glassmorphism, film grain, black #0a0a0a background, magenta glow, red YouTube play button accent, 5-step flowchart with icons, architecture diagram, tech badges HTML JavaScript Cloudinary GitHub Pages, minimalist cinematic, white clean typography, professional infographic layout --ar 9:16 --style raw
```

---

## پرامپت Canva / Figma AI

```
Design a vertical infographic (1080x1920) for a Persian RTL tech project called IMAGE.

Dark theme (#0a0a0a), Vazirmatn font, glassmorphism frost effect, magenta glow.

Sections:
1. Title IMAGE + tagline in Persian
2. 5-step horizontal flow with icons
3. Before/after two columns (frost vs video)
4. Tech stack badges
5. Simple architecture diagram
6. Metadata and security checklist
7. GitHub links footer

Style: minimal, cinematic, modern, not cluttered. Use red play button as accent.
```

---

## پرامپت Negative (برای AI)

```
cartoon, anime, 3d render, bright background, white background, cluttered, messy, low quality, blurry text, illegible text, watermark, logo distortion, stock photo faces, children illustration, gradient overload, neon cyberpunk excess, comic style, hand drawn sketch, pixel art, light mode, pastel colors, generic corporate blue
```

---

## چک‌لیست قبل از انتشار

- [ ] تیتر IMAGE خوانا و بزرگ
- [ ] ۵ مرحله فلو با فلش واضح
- [ ] «Capture مخفی» برجسته شده
- [ ] پالت تیره + accent صورتی/قرمز
- [ ] متن فارسی RTL درست
- [ ] لینک GitHub و سایت live
- [ ] بدون API Secret یا اطلاعات حساس
- [ ] رزولوشن مناسب پلتفرم هدف

---

## لینک‌های مرجع

- بررسی کامل: [03-infographic-review.md](./03-infographic-review.md)
- Repo: https://github.com/surveyse/image-app
- Live: https://surveyse.github.io/image-app/
