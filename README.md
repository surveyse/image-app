# my-photo-app

وب‌اپ عکس‌برداری خودکار با دوربین جلو + آپلود به Cloudinary (فولدر IMAGE).

## آدرس عمومی (GitHub Pages)

بعد از deploy:

**https://majvaoria12.github.io/my-photo-app/**

## Deploy روی GitHub Pages

### روش ۱ — آپلود از مرورگر (ساده‌ترین)

1. برو به [github.com/majvaoria12/my-photo-app](https://github.com/majvaoria12/my-photo-app)
2. **Add file** → **Upload files**
3. این فایل‌ها را بکش و رها کن:
   - `index.html`
   - `app.js`
   - `config.js`
   - `README.md`
4. **Commit changes**
5. **Settings** → **Pages** → Source: **Deploy from a branch**
6. Branch: **main** / Folder: **/ (root)** → **Save**
7. ۱–۲ دقیقه صبر کن؛ سایت روی لینک بالا فعال می‌شود.

### روش ۲ — Git (خط فرمان)

```bash
cd d:\IMAGE
git init
git add index.html app.js config.js README.md .gitignore
git commit -m "Add photo capture web app with Cloudinary upload"
git branch -M main
git remote add origin https://github.com/majvaoria12/my-photo-app.git
git push -u origin main
```

سپس در GitHub: **Settings → Pages → main / root**

## تنظیم Cloudinary

در `config.js` مقدار `YOUR_CLOUD_NAME` را با cloud name واقعی جایگزین کن.

Upload Preset از قبل تنظیم شده: `photo-profile-auto` (Unsigned، فولدر IMAGE)

## رفتار برنامه

1. باز کردن لینک → نمایش وضعیت دسترسی دوربین
2. کلیک «شروع عکس‌برداری» → بررسی مجدد permission
3. دوربین جلو → شمارش معکوس → عکس خودکار
4. آپلود مستقیم به Cloudinary فولدر IMAGE
