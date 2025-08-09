// Theme utility functions

/**
 * Apply theme to document root
 * @param {string} theme - Theme name ('light' or 'dark')
 */
export const applyTheme = (theme) => {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

/**
 * Toggle between light and dark themes
 * @param {string} currentTheme - Current theme
 * @returns {string} New theme
 */
export const toggleTheme = (currentTheme) => {
  return currentTheme === 'light' ? 'dark' : 'light';
};

/**
 * Get system theme preference
 * @returns {string} System theme preference
 */
export const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
