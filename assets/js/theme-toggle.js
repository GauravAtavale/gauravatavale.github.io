// Theme Toggle Functionality
(function() {
  'use strict';

  // Get theme from localStorage or default to 'light'
  function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // Set theme
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Toggle between themes
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // Initialize theme on page load (before page renders to avoid flash)
  function initTheme() {
    const theme = getTheme();
    setTheme(theme);
  }

  // Call initTheme immediately to prevent flash
  initTheme();

  // Wait for DOM to be ready before adding event listener
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      const toggleButton = document.getElementById('theme-toggle');
      if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
      }
    });
  } else {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();