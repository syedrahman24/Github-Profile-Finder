import React from 'react';

/**
 * RepoList component to display user's top repositories
 * @param {Array} repos - Array of repository objects from GitHub API
 */
const RepoList = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return (
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 text-center animate-slide-up">
        <div className="text-gray-500 dark:text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-lg font-medium">No public repositories found</p>
        </div>
      </div>
    );
  }

  /**
   * Format number with commas for better readability
   * @param {number} num - Number to format
   * @returns {string} Formatted number string
   */
  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  /**
   * Get language color for visual indication
   * @param {string} language - Programming language name
   * @returns {string} Tailwind color class
   */
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-orange-500',
      'C++': 'bg-blue-600',
      C: 'bg-gray-600',
      'C#': 'bg-purple-500',
      PHP: 'bg-indigo-500',
      Ruby: 'bg-red-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-600',
      Swift: 'bg-orange-400',
      Kotlin: 'bg-purple-600',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-400',
      Shell: 'bg-gray-500',
      Vue: 'bg-green-400',
      React: 'bg-blue-400',
    };
    return colors[language] || 'bg-gray-400';
  };

  /**
   * Format date to relative time
   * @param {string} dateString - ISO date string
   * @returns {string} Relative time string
   */
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
          </svg>
          Top Repositories
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          {repos.length} {repos.length === 1 ? 'repo' : 'repos'}
        </span>
      </div>

      {/* Repository List */}
      <div className="space-y-4">
        {repos.map((repo, index) => (
          <div
            key={repo.id}
            className="group p-6 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/30 dark:border-gray-600/30 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                {/* Repository Name and Link */}
                <div className="flex items-center mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 flex items-center group-hover:underline"
                  >
                    {repo.name}
                    <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  {repo.fork && (
                    <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-md">
                      Fork
                    </span>
                  )}
                </div>

                {/* Description */}
                {repo.description && (
                  <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                )}

                {/* Repository Stats and Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {/* Language */}
                  {repo.language && (
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${getLanguageColor(repo.language)}`}></div>
                      <span>{repo.language}</span>
                    </div>
                  )}

                  {/* Stars */}
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{formatNumber(repo.stargazers_count)}</span>
                  </div>

                  {/* Forks */}
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>{formatNumber(repo.forks_count)}</span>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Updated {formatRelativeTime(repo.updated_at)}</span>
                  </div>
                </div>
              </div>

              {/* Repository Rank Badge */}
              <div className="flex-shrink-0 ml-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing top {repos.length} repositories sorted by stars
        </p>
      </div>
    </div>
  );
};

export default RepoList;
