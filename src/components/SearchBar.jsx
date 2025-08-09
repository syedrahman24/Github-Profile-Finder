import React, { useState } from 'react';

/**
 * SearchBar component for entering GitHub username
 * @param {Function} onSearch - Callback function when search is submitted
 * @param {boolean} loading - Loading state to disable input during search
 */
const SearchBar = ({ onSearch, loading }) => {
  const [username, setUsername] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && !loading) {
      onSearch(username.trim());
    }
  };

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  /**
   * Handle Enter key press
   * @param {Event} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          {/* Professional search input */}
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search GitHub profiles... (e.g., octocat, torvalds, gaearon)"
            disabled={loading}
            className="w-full px-8 py-6 pl-16 pr-40 text-xl bg-brand-800/40 backdrop-blur-xl border border-brand-700/50 rounded-3xl shadow-hard focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 focus:shadow-glow transition-all duration-500 placeholder-brand-500 text-white disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-glow-lg group-hover:border-brand-600/50"
          />
          
          {/* Clean search icon */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
            <svg 
              className="w-6 h-6 text-brand-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          {/* Professional search button */}
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-500/50 shadow-medium hover:shadow-glow hover:scale-105 active:scale-95"
          >
            {loading ? (
              <div className="flex items-center space-x-3">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Search</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Professional quick suggestions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="text-brand-400 text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Start:
          </span>
          {[
            { name: 'octocat', desc: 'GitHub Mascot' },
            { name: 'torvalds', desc: 'Linux Creator' },
            { name: 'gaearon', desc: 'React Core' },
            { name: 'sindresorhus', desc: 'Open Source' },
          ].map((user) => (
            <button
              key={user.name}
              type="button"
              onClick={() => !loading && onSearch(user.name)}
              disabled={loading}
              className="group px-4 py-2 bg-brand-800/30 border border-brand-700/30 hover:border-accent-500/50 rounded-xl transition-all duration-300 disabled:opacity-50 hover:bg-brand-700/30 hover:shadow-medium"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-accent-500/10 rounded-lg flex items-center justify-center group-hover:bg-accent-500/20 transition-colors">
                  <svg className="w-3 h-3 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white group-hover:text-accent-300 transition-colors">{user.name}</div>
                  <div className="text-xs text-brand-500 group-hover:text-brand-400 transition-colors">{user.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Professional search tips */}
        <div className="mt-4 text-center">
          <p className="text-brand-500 text-sm">
            💡 <span className="font-medium">Pro tip:</span> Search for any GitHub username to get comprehensive analytics and insights
          </p>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
