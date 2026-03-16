(() => {
  const root = document.body;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const storedTheme = localStorage.getItem('xmclib_theme');

  if (storedTheme === 'light') {
    root.classList.add('light');
  }

  if (themeButton) {
    const syncButton = () => {
      themeButton.textContent = root.classList.contains('light') ? '🌙 Escuro' : '☀️ Claro';
    };

    themeButton.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem('xmclib_theme', root.classList.contains('light') ? 'light' : 'dark');
      syncButton();
    });

    syncButton();
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = document.createElement('p');
      message.style.color = 'var(--accent)';
      message.style.fontWeight = '600';
      message.textContent = 'Mensagem enviada! Obrigado pela contribuição na documentação.';
      contactForm.append(message);
      contactForm.reset();
      setTimeout(() => message.remove(), 5000);
    });
  }
})();
