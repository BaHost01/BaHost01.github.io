(() => {
  const root = document.body;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const storedTheme = localStorage.getItem('xexecutor_theme');

  if (storedTheme === 'light') {
    root.classList.add('light');
  }

  if (themeButton) {
    const syncButton = () => {
      themeButton.textContent = root.classList.contains('light') ? '🌙 Escuro' : '☀️ Claro';
    };

    themeButton.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem('xexecutor_theme', root.classList.contains('light') ? 'light' : 'dark');
      syncButton();
    });

    syncButton();
  }

  const downloadCount = document.querySelector('[data-download-count]');
  const triggerDownload = document.querySelector('[data-download-trigger]');

  if (downloadCount) {
    const key = 'xexecutor_download_count';
    let count = Number(localStorage.getItem(key) || 1842);
    downloadCount.textContent = count.toLocaleString('pt-BR');

    if (triggerDownload) {
      triggerDownload.addEventListener('click', () => {
        count += 1;
        localStorage.setItem(key, String(count));
        downloadCount.textContent = count.toLocaleString('pt-BR');
      });
    }
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = document.createElement('p');
      message.style.color = 'var(--accent)';
      message.style.fontWeight = '600';
      message.textContent = 'Mensagem enviada com sucesso! Nossa equipe responderá em breve.';
      contactForm.append(message);
      contactForm.reset();
      setTimeout(() => message.remove(), 5000);
    });
  }
})();
