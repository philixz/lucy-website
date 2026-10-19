(() => {
  const config = window.LUCY_DOWNLOAD || {};
  let url;
  try { const parsed = new URL(config.url); if (parsed.protocol === 'https:' && !parsed.username && !parsed.password) url = parsed.href; } catch {}
  document.querySelectorAll('[data-download]').forEach(link => {
    link.removeAttribute('download');
    link.textContent = url ? (config.label || '前往网盘下载') + ' ↗' : '下载待开放';
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.removeAttribute('aria-disabled');
    } else {
      link.removeAttribute('href');
      link.setAttribute('role', 'link');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('tabindex', '0');
      link.addEventListener('click', event => event.preventDefault());
    }
  });
  document.querySelectorAll('[data-download-status]').forEach(status => {
    status.textContent = url ? (config.extractionCode ? `网盘提取码：${config.extractionCode} · 点击按钮在新标签页打开网盘` : '点击按钮在新标签页打开网盘下载') : '网页可正常浏览，安装包下载链接稍后开放。';
  });
})();
