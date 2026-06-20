# IMAGE

وب‌اپ استاتیک: با کلیک Play دوربین فعال می‌شود، یک عکس مخفی گرفته و به Cloudinary آپلود می‌شود، سپس ویدیو پخش می‌گردد.

**Live:** https://surveyse.github.io/image-app/

## فایل‌ها

| فایل | نقش |
|------|-----|
| `index.html` | UI (RTL، Frost overlay، film grain) |
| `app.js` | دوربین، capture، آپلود Cloudinary، پخش ویدیو |
| `config.js` | تنظیمات Cloudinary |
| `frost.html` | ریدایرکت به `index.html` |
| `.github/workflows/pages.yml` | Deploy خودکار GitHub Pages |

## راه‌اندازی Cloudinary

1. اکانت بسازید: https://cloudinary.com/users/register_free
2. **Upload preset** با Signing Mode = **Unsigned** بسازید
3. `config.js` را ویرایش کنید:

```javascript
window.CLOUDINARY_CONFIG = {
  cloudName: 'YOUR_CLOUD_NAME',
  uploadPreset: 'YOUR_UNSIGNED_PRESET',
  folder: 'IMAGE',
  countdownSeconds: 2,
  jpegQuality: 0.92,
  playbackVideoUrl: 'https://res.cloudinary.com/.../video/upload/....mp4'
};
```

> API Secret را در فرانت‌اند قرار ندهید — فقط `cloudName` و `uploadPreset` کافی است.

## Deploy

با هر push به `main`، GitHub Actions سایت را روی Pages منتشر می‌کند.

```powershell
git add .
git commit -m "Your message"
git push origin main
```

## مستندات

- [راهنمای Cloudinary](docs/01-cloudinary-guide.md)
- [راهنمای Git و Push](docs/02-git-push-guide.md)
- [گزارش فنی](docs/03-infographic-review.md)

## Repo

https://github.com/surveyse/image-app
