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
    frostOverlay: $('frostOverlay'),
    playButton: $('playButton'),
    countdownOverlay: $('countdownOverlay'),
    countdownNumber: $('countdownNumber'),
    cameraLoader: $('cameraLoader'),
    uploadSection: $('uploadSection'),
    uploadBar: $('uploadBar'),
    uploadPercent: $('uploadPercent'),
    resultCard: $('resultCard'),
    resultTitle: $('resultTitle'),
    resultMessage: $('resultMessage'),
    resultLink: $('resultLink'),
    errorCard: $('errorCard'),
    errorMessage: $('errorMessage'),
    permissionCard: $('permissionCard'),
    permissionMessage: $('permissionMessage'),
    configWarning: $('configWarning')
  };

  let stream = null;
  let captured = false;
  let busy = false;

  const PERMISSION_MSG_PROMPT =
    'برای عکس‌برداری، وقتی مرورگر پرسید «اجازه دسترسی به دوربین» را بزنید Allow / اجازه.';
  const PERMISSION_MSG_DENIED =
    'دسترسی به دوربین داده نشده است. از تنظیمات مرورگر (آیکون قفل کنار آدرس) اجازه Camera را فعال کنید، سپس دوباره دکمه پلی را بزنید.';

  const CONSOLE_FOLDER_URL =
    'https://console.cloudinary.com/app/c-f96a9767367eb33249b8855c1d343d/assets/media_library/folders/cf5125957909157162ac18d215d16f5f79?view_mode=mosaic';

  function isConfigured() {
    return Boolean(cfg.cloudName && cfg.uploadPreset);
  }

  function setStatus(text, color) {
    els.statusText.textContent = text;
    els.statusDot.className = 'status-dot ' + (color || 'amber');
  }

  function showPanel(el) {
    el.classList.add('visible');
  }

  function hidePanel(el) {
    el.classList.remove('visible');
  }

  function showError(msg) {
    showPanel(els.errorCard);
    els.errorMessage.textContent = msg;
    setStatus('خطا', 'red');
  }

  function hideError() {
    hidePanel(els.errorCard);
  }

  function showPermissionRequired(state) {
    showPanel(els.permissionCard);
    els.permissionMessage.textContent =
      state === 'denied' ? PERMISSION_MSG_DENIED : PERMISSION_MSG_PROMPT;
    setStatus('نیاز به اجازه دوربین', 'amber');
  }

  function hidePermissionRequired() {
    hidePanel(els.permissionCard);
  }

  function showFrostOverlay() {
    els.frostOverlay.classList.remove('hidden');
    els.playButton.classList.remove('hidden');
  }

  function hideFrostOverlay() {
    els.frostOverlay.classList.add('hidden');
    els.playButton.classList.add('hidden');
  }

  function toPersianNum(n) {
    return String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
  }

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
    hidePanel(els.resultCard);
    els.uploadSection.classList.remove('visible');
    els.preview.classList.add('hidden');
    els.video.classList.remove('hidden');
    captured = false;
    showFrostOverlay();
  }

  async function startCamera() {
    resetView();
    hideError();
    els.cameraLoader.classList.add('visible');
    stopStream();

    if (!navigator.mediaDevices?.getUserMedia) {
      els.cameraLoader.classList.remove('visible');
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

      els.cameraLoader.classList.remove('visible');
      hideFrostOverlay();
      setStatus('دوربین آماده است', 'blue');
      await runCountdown();
      if (!captured) await captureAndUpload();
      return true;
    } catch (err) {
      els.cameraLoader.classList.remove('visible');
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

  async function handleAction(e) {
    if (e) e.stopPropagation();
    if (busy) return;

    busy = true;
    els.playButton.disabled = true;

    try {
      if (!isConfigured()) {
        showPanel(els.configWarning);
        showError('ابتدا config.js را تنظیم کنید.');
        return;
      }

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
        showFrostOverlay();
      }
    } finally {
      busy = false;
      els.playButton.disabled = false;
    }
  }

  function runCountdown() {
    const seconds = Math.max(0, cfg.countdownSeconds ?? 2);
    if (seconds === 0) return Promise.resolve();

    return new Promise((resolve) => {
      els.countdownOverlay.classList.add('visible');
      let left = seconds;

      const tick = () => {
        els.countdownNumber.textContent = toPersianNum(left);
        if (left <= 0) {
          els.countdownOverlay.classList.remove('visible');
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

      els.uploadSection.classList.add('visible');
      els.uploadBar.style.width = '0%';
      setStatus('در حال آپلود...', 'blue');

      const result = await uploadToCloudinary(blob);
      URL.revokeObjectURL(previewUrl);

      els.resultTitle.textContent = 'آپلود موفق';
      els.resultTitle.style.color = '#34d399';
      els.resultMessage.textContent = result.public_id || result.secure_url || '';
      els.resultLink.href = result.secure_url || CONSOLE_FOLDER_URL;
      els.resultLink.textContent = result.secure_url ? 'مشاهده عکس' : 'باز کردن فولدر IMAGE';
      showPanel(els.resultCard);

      setStatus('آپلود شد', 'green');
      showFrostOverlay();
    } catch (err) {
      captured = false;
      showFrostOverlay();
      showError(err.message || 'خطای ناشناخته');
    }
  }

  function bindPlayTriggers() {
    els.playButton.addEventListener('click', handleAction);
    els.frostOverlay.addEventListener('click', (e) => {
      if (e.target === els.frostOverlay) handleAction(e);
    });
    els.frostOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleAction();
      }
    });
  }

  async function init() {
    if (!isConfigured()) {
      showPanel(els.configWarning);
    }

    bindPlayTriggers();

    const perm = await checkCameraPermission();
    if (perm !== 'granted') {
      showPermissionRequired(perm === 'denied' ? 'denied' : 'prompt');
      setStatus('دکمه پلی را بزنید', 'amber');
    } else {
      setStatus('دکمه پلی را بزنید', 'green');
    }
  }

  window.addEventListener('beforeunload', stopStream);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
