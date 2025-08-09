// Local storage utility functions

/**
 * Save search history to localStorage
 * @param {string} username - Username to add to history
 */
export const saveToSearchHistory = (username) => {
  try {
    const history = getSearchHistory();
    
    // Remove username if it already exists to avoid duplicates
    const filteredHistory = history.filter(item => item !== username);
    
    // Add new username to the beginning and limit to 5 items
    const newHistory = [username, ...filteredHistory].slice(0, 5);
    
    localStorage.setItem('github-search-history', JSON.stringify(newHistory));
  } catch (error) {
    console.error('Error saving to search history:', error);
  }
};

/**
 * Get search history from localStorage
 * @returns {Array} Array of previously searched usernames
 */
export const getSearchHistory = () => {
  try {
    const history = localStorage.getItem('github-search-history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

/**
 * Clear search history from localStorage
 */
export const clearSearchHistory = () => {
  try {
    localStorage.removeItem('github-search-history');
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
};

/**
 * Save theme preference to localStorage
 * @param {string} theme - Theme name ('light' or 'dark')
 */
export const saveTheme = (theme) => {
  try {
    localStorage.setItem('github-finder-theme', theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

/**
 * Get theme preference from localStorage
 * @returns {string} Theme name ('light' or 'dark')
 */
export const getTheme = () => {
  try {
    const savedTheme = localStorage.getItem('github-finder-theme');
    
    // If no saved theme, detect system preference
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return savedTheme;
  } catch (error) {
    console.error('Error getting theme:', error);
    return 'light';
  }
};
