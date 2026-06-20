# راهنمای کامل Git و Push (برای پروژه IMAGE)

راهنمای گام‌به‌گام: نصب Git، اتصال به GitHub، commit و push، و انتشار روی GitHub Pages.

---

## فهرست

1. Git و GitHub چیست؟
2. نصب Git (Windows)
3. ساخت repository روی GitHub
4. کلون و اتصال پروژه محلی
5. دستورات روزمره: status، add، commit، push
6. سناریوی کامل: تغییر → commit → push
7. GitHub Pages (انتشار سایت)
8. GitHub Actions (دیپلوی خودکار)
9. خطاهای رایج
10. دستورات مرجع

---

## ۱. Git و GitHub چیست؟

| مفهوم | توضیح |
|--------|--------|
| **Git** | سیستم کنترل نسخه روی کامپیوتر شما |
| **Repository (repo)** | پوشه پروژه + تاریخچه تغییرات |
| **Commit** | یک «نسخه ذخیره‌شده» با توضیح |
| **Push** | فرستادن commitها به GitHub |
| **Pull** | گرفتن تغییرات از GitHub |
| **Branch** | خط توسعه (پروژه روی `main` است) |
| **Origin** | آدرس remote (معمولاً GitHub) |

**این پروژه:**

- Repo: `https://github.com/surveyse/image-app`
- Branch: `main`
- سایت: `https://surveyse.github.io/image-app/`

---

## ۲. نصب Git (Windows)

1. https://git-scm.com/download/win
2. نصب با پیش‌فرض‌ها
3. در PowerShell یا CMD:

```powershell
git --version
```

باید شماره نسخه نمایش دهد.

### تنظیم نام و ایمیل (یک بار)

```powershell
git config --global user.name "نام شما"
git config --global user.email "you@example.com"
```

یا برای فقط این repo (بدون global):

```powershell
cd D:\IMAGE
git config user.name "surveyse"
git config user.email "survey.secretfile@protonmail.com"
```

---

## ۳. ساخت repository روی GitHub

1. https://github.com/new
2. **Repository name:** مثلاً `image-app`
3. Public
4. **بدون** README اگر پروژه محلی داری
5. **Create repository**

آدرس clone:

```
https://github.com/surveyse/image-app.git
```

---

## ۴. اتصال پروژه محلی به GitHub

### اگر پروژه از قبل روی کامپیوتر است (مثل `D:\IMAGE`)

```powershell
cd D:\IMAGE
git init
git remote add origin https://github.com/surveyse/image-app.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

### اگر از GitHub clone می‌کنی

```powershell
cd D:\
git clone https://github.com/surveyse/image-app.git
cd image-app
```

---

## ۵. دستورات روزمره

### وضعیت فایل‌ها

```powershell
cd D:\IMAGE
git status
```

- **modified** = تغییر کرده، commit نشده
- **Untracked** = فایل جدید
- **nothing to commit** = همه sync است

### دیدن تفاوت‌ها

```powershell
git diff
git diff app.js
```

### افزودن به staging

```powershell
git add app.js
git add index.html config.js
git add .
```

`git add .` = همه تغییرات (مراقب فایل‌های حساس مثل `.env` باش)

### Commit

```powershell
git commit -m "توضیح کوتاه تغییر"
```

مثال:

```powershell
git commit -m "Add Cloudinary metadata and playback video"
```

### Push

```powershell
git push origin main
```

اولین بار با `-u`:

```powershell
git push -u origin main
```

### Pull (اگر روی GitHub هم تغییر شده)

```powershell
git pull origin main
```

اگر conflict داشت:

```powershell
git pull --rebase origin main
git push origin main
```

---

## ۶. سناریوی کامل (همان کار روزانه)

```powershell
cd D:\IMAGE

# 1. ببین چه عوض شده
git status

# 2. فایل‌ها را stage کن
git add app.js index.html config.js

# 3. commit
git commit -m "Fix camera capture and conceal video until upload"

# 4. push
git push origin main
```

بعد از push، GitHub Pages (اگر فعال باشد) ۱–۳ دقیقه بعد سایت را به‌روز می‌کند.

---

## ۷. GitHub Pages (انتشار سایت)

سایت استاتیک از همان repo — بدون سرور.

### روش A: Deploy from branch

1. Repo → **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` / **Folder:** `/ (root)`
4. **Save**
5. آدرس: `https://surveyse.github.io/image-app/`

### روش B: GitHub Actions (این پروژه)

فایل: `.github/workflows/pages.yml`

- با هر `push` به `main`، Actions سایت را deploy می‌کند.

در Settings → Pages:

- **Source:** GitHub Actions

---

## ۸. فایل workflow (خلاصه)

```yaml
on:
  push:
    branches: [main]
```

یعنی: هر push به `main` → دیپلوی.

مراحل:

1. Checkout کد
2. Upload artifact (کل پوشه `.`)
3. Deploy to GitHub Pages

---

## ۹. خطاهای رایج

### `Author identity unknown`

قبل از commit:

```powershell
git config user.email "you@example.com"
git config user.name "Your Name"
```

### `failed to push — rejected (fetch first)`

کسی (یا Actions) روی GitHub commit زده:

```powershell
git pull --rebase origin main
git push origin main
```

### `Could not connect to github.com`

اینترنت، VPN، یا فیلتر — دوباره `git push` کن.

### `Permission denied (publickey)`

برای HTTPS از Personal Access Token استفاده کن یا SSH setup کن.

**HTTPS با Token:**

1. GitHub → Settings → Developer settings → Personal access tokens
2. Token با scope `repo`
3. هنگام push به‌جای password، token بزن

### صفحه 404 بعد از push

- Pages فعال است؟
- branch `main` و folder root؟
- ۲–۳ دقیقه صبر کن
- Actions → workflow سبز است؟

### `config.js` روی سایت

`config.js` در repo است و روی Pages عمومی است — API Secret نگذار؛ فقط cloudName و preset.

---

## ۱۰. دستورات مرجع

| دستور | کار |
|--------|-----|
| `git status` | وضعیت |
| `git log --oneline -5` | ۵ commit آخر |
| `git diff` | تفاوت unstaged |
| `git add <file>` | stage |
| `git commit -m "msg"` | commit |
| `git push origin main` | push |
| `git pull origin main` | pull |
| `git remote -v` | آدرس remote |
| `git branch` | branch فعلی |
| `git restore <file>` | برگرداندن فایل (قبل از add) |

---

## ساختار فایل‌های مهم در repo

```
IMAGE/
├── index.html      ← صفحه اصلی
├── app.js          ← منطق دوربین و آپلود
├── config.js       ← تنظیمات Cloudinary
├── frost.html      ← ریدایرکت به index
├── docs/           ← راهنماها
├── .github/workflows/pages.yml
└── README.md
```

---

## چک‌لیست push موفق

- [ ] `git status` تمیز یا فقط فایل‌های موردنظر staged
- [ ] commit message واضح
- [ ] `git push origin main` بدون error
- [ ] GitHub → Actions سبز
- [ ] سایت live بعد از ۱–۳ دقیقه

---

**لینک‌های این پروژه**

- Repo: https://github.com/surveyse/image-app
- سایت: https://surveyse.github.io/image-app/
- Pages settings: https://github.com/surveyse/image-app/settings/pages
