(function () {
  'use strict';

  const cfg = window.CLOUDINARY_CONFIG || {};
  const $ = (id) => document.getElementById(id);

  const els = {
    video: $('video'),
    canvas: $('canvas'),
    preview: $('preview'),
    statusDot: $('statusDot'),
    statusText: $('statusText'),
    countdownOverlay: $('countdownOverlay'),
    countdownNumber: $('countdownNumber'),
    faceGuide: $('faceGuide'),
    cameraLoader: $('cameraLoader'),
    uploadSection: $('uploadSection'),
    uploadBar: $('uploadBar'),
    uploadPercent: $('uploadPercent'),
    resultCard: $('resultCard'),
    resultTitle: $('resultTitle'),
    resultMessage: $('resultMessage'),
    resultLink: $('resultLink'),
    resultIcon: $('resultIcon'),
    errorCard: $('errorCard'),
    errorMessage: $('errorMessage'),
    permissionCard: $('permissionCard'),
    permissionMessage: $('permissionMessage'),
    configWarning: $('configWarning'),
    actionBtn: $('actionBtn')
  };

  let stream = null;
  let captured = false;
  let busy = false;

  const PERMISSION_MSG_PROMPT =
    'برای عکس‌برداری، وقتی مرورگر پرسید «اجازه دسترسی به دوربین» را بزنید Allow / اجازه.';
  const PERMISSION_MSG_DENIED =
    'دسترسی به دوربین داده نشده است. از تنظیمات مرورگر (آیکون قفل کنار آدرس) اجازه Camera را فعال کنید، سپس دوباره این دکمه را بزنید.';

  const CONSOLE_FOLDER_URL =
    'https://console.cloudinary.com/app/c-f96a9767367eb33249b8855c1d343d/assets/media_library/folders/cf5125957909157162ac18d215d16f5f79?view_mode=mosaic';

  function isConfigured() {
    return Boolean(cfg.cloudName && cfg.uploadPreset);
  }

  function setStatus(text, color) {
    els.statusText.textContent = text;
    const colors = {
      amber: 'bg-amber-400',
      blue: 'bg-brand-500',
      green: 'bg-emerald-400',
      red: 'bg-red-400'
    };
    els.statusDot.className = 'h-2 w-2 rounded-full ' + (colors[color] || colors.amber);
  }

  function showError(msg) {
    els.errorCard.classList.remove('hidden');
    els.errorMessage.textContent = msg;
    setStatus('خطا', 'red');
  }

  function hideError() {
    els.errorCard.classList.add('hidden');
  }

  function showPermissionRequired(state) {
    els.permissionCard.classList.remove('hidden');
    els.permissionMessage.textContent =
      state === 'denied' ? PERMISSION_MSG_DENIED : PERMISSION_MSG_PROMPT;
    setStatus('نیاز به اجازه دوربین', 'amber');
  }

  function hidePermissionRequired() {
    els.permissionCard.classList.add('hidden');
  }

  function toPersianNum(n) {
    return String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
  }

  /** هر بار از نو وضعیت دسترسی را می‌خواند — بدون cache */
  async function checkCameraPermission() {
    if (!navigator.permissions?.query) return 'unknown';
    try {
      const result = await navigator.permissions.query({ name: 'camera' });
      return result.state;
    } catch {
      return 'unknown';
    }
  }

  function stopStream() {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }

  function resetView() {
    els.resultCard.classList.add('hidden');
    els.uploadSection.classList.add('hidden');
    els.preview.classList.add('hidden');
    els.video.classList.remove('hidden');
    els.faceGuide.classList.remove('hidden');
    captured = false;
  }

  async function startCamera() {
    resetView();
    hideError();
    els.cameraLoader.classList.remove('hidden');
    stopStream();

    if (!navigator.mediaDevices?.getUserMedia) {
      els.cameraLoader.classList.add('hidden');
      showError('مرورگر شما از دوربین پشتیبانی نمی‌کند. از Chrome یا Safari روی HTTPS استفاده کنید.');
      return false;
    }

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'user' },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      hidePermissionRequired();
      els.video.srcObject = stream;
      await els.video.play();

      els.cameraLoader.classList.add('hidden');
      setStatus('دوربین آماده است', 'blue');
      await runCountdown();
      if (!captured) await captureAndUpload();
      return true;
    } catch (err) {
      els.cameraLoader.classList.add('hidden');
      const name = err?.name || '';

      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        const perm = await checkCameraPermission();
        showPermissionRequired(perm === 'denied' ? 'denied' : 'prompt');
        showError(PERMISSION_MSG_DENIED);
      } else if (name === 'NotFoundError') {
        showError('دوربین جلو یافت نشد.');
      } else {
        showError('خطا در فعال‌سازی دوربین: ' + (err.message || name));
      }
      return false;
    }
  }

  async function handleAction() {
    if (busy) return;
    busy = true;
    els.actionBtn.disabled = true;
    els.actionBtn.classList.add('opacity-60');

    try {
      if (!isConfigured()) {
        els.configWarning.classList.remove('hidden');
        showError('ابتدا config.js را تنظیم کنید.');
        return;
      }

      // هر کلیک: بررسی تازه دسترسی — بدون حالت موقتی
      const perm = await checkCameraPermission();

      if (perm === 'denied') {
        showPermissionRequired('denied');
        showError(PERMISSION_MSG_DENIED);
        return;
      }

      if (perm === 'prompt' || perm === 'unknown') {
        showPermissionRequired('prompt');
      }

      const ok = await startCamera();

      if (!ok) {
        const permAfter = await checkCameraPermission();
        if (permAfter !== 'granted') {
          showPermissionRequired(permAfter === 'denied' ? 'denied' : 'prompt');
        }
      } else {
        els.actionBtn.textContent = 'عکس‌برداری مجدد';
      }
    } finally {
      busy = false;
      els.actionBtn.disabled = false;
      els.actionBtn.classList.remove('opacity-60');
    }
  }

  function runCountdown() {
    const seconds = Math.max(0, cfg.countdownSeconds ?? 2);
    if (seconds === 0) return Promise.resolve();

    return new Promise((resolve) => {
      els.countdownOverlay.classList.remove('hidden');
      els.countdownOverlay.classList.add('flex');
      let left = seconds;

      const tick = () => {
        els.countdownNumber.textContent = toPersianNum(left);
        if (left <= 0) {
          els.countdownOverlay.classList.add('hidden');
          els.countdownOverlay.classList.remove('flex');
          resolve();
          return;
        }
        left -= 1;
        setTimeout(tick, 1000);
      };

      els.countdownNumber.textContent = toPersianNum(left);
      setTimeout(tick, 1000);
    });
  }

  function captureFrame() {
    const video = els.video;
    const canvas = els.canvas;
    const w = video.videoWidth;
    const h = video.videoHeight;

    if (!w || !h) throw new Error('ابعاد ویدیو نامعتبر است');

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('ساخت فایل عکس ناموفق بود'));
        },
        'image/jpeg',
        cfg.jpegQuality ?? 0.92
      );
    });
  }

  function uploadToCloudinary(blob) {
    const url = `https://api.cloudinary.com/v1_1/${cfg.cloudName}/image/upload`;
    const form = new FormData();
    form.append('file', blob, `photo-${Date.now()}.jpg`);
    form.append('upload_preset', cfg.uploadPreset);
    if (cfg.folder) form.append('folder', cfg.folder);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);

      xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return;
        const pct = Math.round((e.loaded / e.total) * 100);
        els.uploadBar.style.width = pct + '%';
        els.uploadPercent.textContent = toPersianNum(pct) + '٪';
      };

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) resolve(data);
          else reject(new Error(data.error?.message || 'آپلود ناموفق'));
        } catch {
          reject(new Error('پاسخ سرور نامعتبر'));
        }
      };

      xhr.onerror = () => reject(new Error('خطای شبکه در آپلود'));
      xhr.send(form);
    });
  }

  async function captureAndUpload() {
    if (captured) return;
    captured = true;

    try {
      setStatus('در حال عکس‌برداری...', 'blue');
      const blob = await captureFrame();
      stopStream();

      const previewUrl = URL.createObjectURL(blob);
      els.preview.src = previewUrl;
      els.preview.classList.remove('hidden');
      els.video.classList.add('hidden');
      els.faceGuide.classList.add('hidden');

      els.uploadSection.classList.remove('hidden');
      els.uploadBar.style.width = '0%';
      setStatus('در حال آپلود...', 'blue');

      const result = await uploadToCloudinary(blob);
      URL.revokeObjectURL(previewUrl);

      els.resultCard.classList.remove('hidden');
      els.resultTitle.textContent = 'آپلود موفق';
      els.resultTitle.className = 'font-semibold text-emerald-400';
      els.resultIcon.className =
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400';
      els.resultMessage.textContent = result.public_id || result.secure_url || '';
      els.resultLink.href = result.secure_url || CONSOLE_FOLDER_URL;
      els.resultLink.textContent = result.secure_url ? 'مشاهده عکس' : 'باز کردن فولدر IMAGE';

      setStatus('آپلود شد', 'green');
    } catch (err) {
      showError(err.message || 'خطای ناشناخته');
    }
  }

  async function init() {
    if (!isConfigured()) {
      els.configWarning.classList.remove('hidden');
    }

    els.actionBtn.addEventListener('click', handleAction);

    // بارگذاری صفحه: فقط وضعیت دسترسی را چک کن، خودکار دوربین باز نکن
    const perm = await checkCameraPermission();
    if (perm !== 'granted') {
      showPermissionRequired(perm === 'denied' ? 'denied' : 'prompt');
      setStatus('منتظر اجازه دوربین', 'amber');
    } else {
      setStatus('آماده — دکمه را بزنید', 'green');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
