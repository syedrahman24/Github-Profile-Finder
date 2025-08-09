// GitHub API helper functions
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch user profile data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User profile data
 */
export const fetchUserProfile = async (username) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Fetch user's public repositories
 * @param {string} username - GitHub username
 * @param {number} limit - Number of repos to fetch (default: 5)
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchUserRepos = async (username, limit = 5) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=stars&order=desc&per_page=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status}`);
    }
    
    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    throw error;
  }
};

/**
 * Fetch both user profile and repositories in parallel
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} Object containing user data and repos
 */
export const fetchUserData = async (username) => {
  try {
    const [userProfile, userRepos] = await Promise.all([
      fetchUserProfile(username),
      fetchUserRepos(username, 5)
    ]);
    
    return {
      profile: userProfile,
      repos: userRepos
    };
  } catch (error) {
    throw error;
  }
};
