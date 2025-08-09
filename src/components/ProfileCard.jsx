import React from 'react';

/**
 * ProfileCard component to display GitHub user profile information
 * @param {Object} profile - User profile data from GitHub API
 */
const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  /**
   * Format number with commas for better readability
   * @param {number} num - Number to format
   * @returns {string} Formatted number string
   */
  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  /**
   * Format date to readable string
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300 animate-slide-up">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Profile Avatar */}
        <div className="flex-shrink-0">
          <div className="relative group">
            <img
              src={profile.avatar_url}
              alt={`${profile.login}'s avatar`}
              className="w-32 h-32 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1 text-center md:text-left">
          {/* Name and Username */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {profile.name || profile.login}
            </h2>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-lg transition-colors duration-200 flex items-center justify-center md:justify-start"
            >
              @{profile.login}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Location and Website */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 text-gray-600 dark:text-gray-400">
            {profile.location && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{profile.location}</span>
              </div>
            )}
            
            {profile.blog && (
              <a
                href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="truncate max-w-xs">{profile.blog}</span>
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatNumber(profile.followers)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Followers
              </div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatNumber(profile.following)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Following
              </div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatNumber(profile.public_repos)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Repositories
              </div>
            </div>
          </div>

          {/* Join Date */}
          {profile.created_at && (
            <div className="mt-6 text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined GitHub on {formatDate(profile.created_at)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
