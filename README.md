# my-photo-app

وب‌اپ عکس‌برداری خودکار → آپلود به Cloudinary (فولدر IMAGE)

## آدرس سایت

**https://majvaoria12.github.io/my-photo-app/**

---

## فعال‌سازی GitHub Pages (اگر 404 می‌بینی)

### روش ساده (پیشنهادی)

1. باز کن: **https://github.com/majvaoria12/my-photo-app/settings/pages**
2. **Build and deployment** → **Source**:
   - **Deploy from a branch**
3. **Branch**: `main` · **Folder**: `/ (root)`
4. **Save**
5. ۱–۳ دقیقه صبر کن و لینک بالا را باز کن

### روش GitHub Actions (اختیاری)

فقط اگر می‌خواهی از Actions استفاده کنی:

1. همان صفحه Pages → **Source**: **GitHub Actions**
2. برو به **Actions** → **Deploy to GitHub Pages** → **Re-run all jobs**

> اگر خطای `Get Pages site failed` دیدی، یعنی هنوز مرحله ۱ را انجام نداده‌ای.

---

## Cloudinary

در `config.js`:

- `cloudName`: `dkxkm2mbo`
- `uploadPreset`: `photo-profile-auto` (Unsigned)
- `folder`: `IMAGE`
