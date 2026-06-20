# راهنمای کامل Cloudinary (برای پروژه IMAGE)

این راهنما از صفر تا آپلود عکس از مرورگر، مخصوص همین پروژه (`image-app`) است.

---

## فهرست

1. Cloudinary چیست؟
2. ایجاد اکانت
3. شناسه‌های مهم (Cloud Name، API Key، Secret)
4. Upload Preset (Unsigned) — ضروری برای این پروژه
5. فولدر IMAGE
6. تنظیم `config.js`
7. متادیتا: tags و context (User-Agent)
8. آپلود ویدیو برای پخش بعد از عکس
9. مشاهده عکس‌ها در پنل
10. خطاهای رایج و رفع آن‌ها
11. امنیت

---

## ۱. Cloudinary چیست؟

Cloudinary سرویس ابری برای:

- ذخیره تصویر و ویدیو
- تبدیل، بهینه‌سازی، CDN
- آپلود مستقیم از مرورگر (بدون سرور خودتان)

در پروژه IMAGE:

- کاربر دکمه Play می‌زند → دوربین → عکس → آپلود به Cloudinary
- بعد از آپلود، ویدیوی از پیش آپلود‌شده در Cloudinary پخش می‌شود

---

## ۲. ایجاد اکانت

### گام‌ها

1. برو به: https://cloudinary.com/users/register_free
2. با ایمیل ثبت‌نام کن (پلن Free برای شروع کافی است).
3. بعد از ورود، به **Dashboard** می‌روی.

### داشبورد

در صفحه اصلی معمولاً می‌بینی:

| فیلد | مثال | توضیح |
|------|------|--------|
| **Cloud name** | `dkxkm2mbo` | شناسه عمومی اکانت — در URL و `config.js` |
| **API Key** | عدد طولانی | برای API از سرور |
| **API Secret** | رشته مخفی | **هرگز در کد فرانت‌اند نگذار** |

برای این پروژه فقط **Cloud name** و **Upload Preset** لازم است؛ API Secret لازم نیست.

---

## ۳. شناسه‌های مهم

### Cloud Name

- عمومی است (در URL عکس‌ها دیده می‌شود).
- در `config.js` → `cloudName`.

مثال URL عکس:

```
https://res.cloudinary.com/dkxkm2mbo/image/upload/v1234567890/IMAGE/photo-123.jpg
```

### API Key و API Secret

- برای حذف فایل، امضای آپلود، عملیات ادمین از **سرور**.
- در **Settings → Security → API Keys** قابل مشاهده است.
- **API Secret** را فقط روی سرور (Node، PHP، …) استفاده کن.
- در `app.js` / `config.js` در GitHub Pages **قرار نده**.

---

## ۴. Upload Preset (Unsigned) — مهم

مرورگر نمی‌تواند با API Secret آپلود کند. باید **Unsigned Upload Preset** بسازی.

### ایجاد Preset

1. Dashboard → **Settings** (آیکون چرخ‌دنده).
2. **Upload** → **Upload presets**.
3. **Add upload preset**.

### تنظیمات پیشنهادی

| فیلد | مقدار |
|------|--------|
| **Preset name** | مثلاً `photo-profile-auto` |
| **Signing Mode** | **Unsigned** (خیلی مهم) |
| **Folder** | `IMAGE` (اختیاری؛ می‌توان از `config.js` هم بفرستیم) |
| **Allowed formats** | image (یا jpg, png) |
| **Max file size** | مثلاً 10MB |

4. **Save**.

نام preset را در `config.js` → `uploadPreset` بگذار.

### چرا Unsigned؟

- مرورگر فقط `upload_preset` + فایل را POST می‌کند.
- بدون Secret؛ امن برای سایت استاتیک.
- محدودیت: هر کسی preset را بشناسد می‌تواند آپلود کند → preset را محدود کن (فرمت، سایز، folder).

---

## ۵. فولدر IMAGE

عکس‌ها در Media Library داخل فولدر **IMAGE** جمع می‌شوند.

دو روش:

1. در Upload Preset فیلد Folder = `IMAGE`
2. در `config.js`: `folder: 'IMAGE'` (پروژه همین کار را می‌کند)

در پنل: **Media Library** → فولدر `IMAGE`.

---

## ۶. تنظیم `config.js`

فایل در ریشه پروژه:

```javascript
window.CLOUDINARY_CONFIG = {
  cloudName: 'dkxkm2mbo',           // از Dashboard
  uploadPreset: 'photo-profile-auto', // نام Unsigned preset
  folder: 'IMAGE',
  countdownSeconds: 2,              // تأخیر قبل از عکس (ثانیه، بدون UI)
  jpegQuality: 0.92,                // کیفیت JPEG (0 تا 1)
  playbackVideoUrl:                 // ویدیو بعد از آپلود
    'https://res.cloudinary.com/dkxkm2mbo/video/upload/v1781074193/vedio_kf8fct.mp4'
};
```

| کلید | الزامی | توضیح |
|------|--------|--------|
| `cloudName` | بله | نام کلود |
| `uploadPreset` | بله | preset unsigned |
| `folder` | خیر | مسیر در Media Library |
| `countdownSeconds` | خیر | زمان آماده‌سازی دوربین قبل از capture |
| `jpegQuality` | خیر | کیفیت عکس |
| `playbackVideoUrl` | بله برای پخش | URL کامل ویدیو روی Cloudinary |

---

## ۷. متادیتا: tags و context (User-Agent)

پروژه هنگام آپلود این‌ها را می‌فرستد:

### نام فایل

```
photo-{timestamp}.jpg
```

مثال: `photo-1718012345678.jpg`

### tags

```
device-iphone,web-capture
```

یا `device-android`, `device-windows`, …

### context

```
user_agent={User-Agent کامل مرورگر، encode شده}
```

در پنل Cloudinary:

- عکس را باز کن → **Summary** → **Tags**
- **Context** → فیلد `user_agent`

**نکته:** User-Agent در **نام فایل** نیست (طبق طراحی پروژه)؛ در context ذخیره می‌شود.

---

## ۸. آپلود ویدیو برای پخش بعد از عکس

1. Media Library → **Upload**.
2. ویدیو را آپلود کن (مثلاً `vedio_kf8fct.mp4`).
3. روی فایل کلیک → **Copy URL**.
4. URL را در `playbackVideoUrl` در `config.js` بگذار.

فرمت URL:

```
https://res.cloudinary.com/{cloudName}/video/upload/v{version}/{public_id}.mp4
```

---

## ۹. API آپلود (همان چیزی که `app.js` می‌فرستد)

**Endpoint:**

```
POST https://api.cloudinary.com/v1_1/{cloudName}/image/upload
```

**Body (FormData):**

| فیلد | مقدار |
|------|--------|
| `file` | blob عکس JPEG |
| `upload_preset` | از config |
| `folder` | IMAGE (اختیاری) |
| `tags` | device-…, web-capture |
| `context` | user_agent=… |

**پاسخ موفق (خلاصه):**

```json
{
  "public_id": "IMAGE/photo-123",
  "secure_url": "https://res.cloudinary.com/...",
  ...
}
```

---

## ۱۰. مشاهده عکس‌ها

1. https://console.cloudinary.com
2. **Media Library**
3. فولدر **IMAGE**
4. برای context/tags هر عکس را باز کن

---

## ۱۱. خطاهای رایج

| خطا | علت | راه‌حل |
|-----|------|--------|
| Upload preset not found | نام preset اشتباه | Dashboard → Upload presets |
| Invalid image file | فرمت غیرمجاز | در preset فرمت image/jpg مجاز کن |
| File size too large | عکس بزرگ | max size در preset |
| 401 / Unauthorized | preset Signed است | Signing Mode = Unsigned |
| CORS / شبکه | اینترنت یا فیلتر | اتصال را چک کن |
| عکس در Cloudinary نیست | مجوز دوربین رد شده | Permission not granted در سایت |

---

## ۱۲. امنیت

| انجام بده | انجام نده |
|-----------|-----------|
| Unsigned preset با محدودیت folder/format/size | API Secret در `config.js` |
| فقط cloudName + preset در فرانت | preset با دسترسی حذف/تبدیل زیاد |
| بررسی دوره‌ای Media Library | اشتراک preset در سایت‌های عمومی |

---

## چک‌لیست قبل از انتشار

- [ ] اکانت Cloudinary فعال
- [ ] Upload preset **Unsigned** ساخته شده
- [ ] `cloudName` و `uploadPreset` در `config.js`
- [ ] فولدر IMAGE (در preset یا config)
- [ ] `playbackVideoUrl` معتبر
- [ ] یک بار از سایت HTTPS تست آپلود

---

**لینک‌های مفید**

- ثبت‌نام: https://cloudinary.com/users/register_free
- مستندات آپلود: https://cloudinary.com/documentation/image_upload_api_reference
- Upload presets: https://cloudinary.com/documentation/upload_presets
