document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Function to set theme
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Initial setup
  let savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    savedTheme = prefersDark.matches ? 'dark' : 'light';
  }
  setTheme(savedTheme);

  // Listen for system changes
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Toggle on click
  toggleButton.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
});