(function () {
  'use strict';

  const STORAGE_KEY = 'image-upload-records';
  const grid = document.getElementById('recordsGrid');
  const emptyState = document.getElementById('emptyState');

  function readRecords() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const records = raw ? JSON.parse(raw) : [];
      return Array.isArray(records) ? records : [];
    } catch {
      return [];
    }
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDate(value) {
    try {
      return new Date(value).toLocaleString('fa-IR', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return value || '-';
    }
  }

  function formatLocation(record) {
    if (record.latitude == null || record.longitude == null) return 'GPS ثبت نشده';
    return `${Number(record.latitude).toFixed(4)}, ${Number(record.longitude).toFixed(4)}`;
  }

  function inferDevice(userAgent) {
    const ua = String(userAgent || '');
    if (/iPhone/i.test(ua)) return 'iPhone';
    if (/iPad/i.test(ua)) return 'iPad';
    if (/Android/i.test(ua)) return 'Android';
    if (/Windows/i.test(ua)) return 'Windows';
    if (/Macintosh|Mac OS X/i.test(ua)) return 'Mac';
    if (/Linux/i.test(ua)) return 'Linux';
    return 'Unknown';
  }

  function render() {
    const records = readRecords();
    if (!records.length) {
      emptyState.hidden = false;
      grid.innerHTML = '';
      return;
    }

    emptyState.hidden = true;
    grid.innerHTML = records
      .map(
        (record, index) => `
          <a class="card" href="response-detail.html?id=${encodeURIComponent(record.id)}">
            <div class="thumb-wrap">
              <img class="thumb" src="${escapeHtml(record.photoUrl)}" alt="Photo ${index + 1}" loading="lazy">
            </div>
            <div class="content">
              <h2 class="title">فرد ${index + 1}</h2>
              <span class="meta">زمان: ${escapeHtml(formatDate(record.uploadedAt))}</span>
              <span class="meta">GPS: ${escapeHtml(formatLocation(record))}</span>
              <span class="meta">دستگاه: ${escapeHtml(inferDevice(record.userAgent))}</span>
            </div>
          </a>
        `
      )
      .join('');
  }

  render();
})();
