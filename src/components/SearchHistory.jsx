import React, { useState, useEffect } from 'react';
import { getSearchHistory, clearSearchHistory } from '../utils/storage';

/**
 * SearchHistory component to display and manage recent searches
 * @param {Function} onHistorySearch - Callback function when a history item is clicked
 */
const SearchHistory = ({ onHistorySearch }) => {
  const [history, setHistory] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Load search history on component mount
  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = getSearchHistory();
      setHistory(savedHistory);
    };

    loadHistory();
    
    // Listen for storage changes to update history in real-time
    const handleStorageChange = (e) => {
      if (e.key === 'github-search-history') {
        loadHistory();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for same-tab updates
    const handleHistoryUpdate = () => {
      loadHistory();
    };
    
    window.addEventListener('historyUpdated', handleHistoryUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('historyUpdated', handleHistoryUpdate);
    };
  }, []);

  // Update history when localStorage changes (for same-tab updates)
  useEffect(() => {
    const updateHistory = () => {
      const savedHistory = getSearchHistory();
      setHistory(savedHistory);
    };

    // Check for updates periodically
    const interval = setInterval(updateHistory, 1000);
    
    return () => clearInterval(interval);
  }, []);

  /**
   * Handle clicking on a history item
   * @param {string} username - Username from history
   */
  const handleHistoryClick = (username) => {
    onHistorySearch(username);
  };

  /**
   * Handle clearing search history
   */
  const handleClearHistory = () => {
    clearSearchHistory();
    setHistory([]);
    setIsExpanded(false);
  };

  /**
   * Toggle expanded view
   */
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Don't render if no history
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-700/30 p-4 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={toggleExpanded}
            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Searches ({history.length})
            <svg 
              className={`w-4 h-4 ml-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <button
              onClick={handleClearHistory}
              className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 flex items-center"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
          )}
        </div>

        {/* History Items */}
        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-12'}`}>
          {isExpanded ? (
            // Expanded view - show all items vertically
            <div className="space-y-2">
              {history.map((username, index) => (
                <button
                  key={`${username}-${index}`}
                  onClick={() => handleHistoryClick(username)}
                  className="w-full text-left px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 text-sm text-gray-700 dark:text-gray-300 flex items-center justify-between group"
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {username}
                  </span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              ))}
            </div>
          ) : (
            // Collapsed view - show items horizontally
            <div className="flex flex-wrap gap-2">
              {history.slice(0, 3).map((username, index) => (
                <button
                  key={`${username}-${index}`}
                  onClick={() => handleHistoryClick(username)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200 text-sm text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {username}
                </button>
              ))}
              {history.length > 3 && (
                <button
                  onClick={toggleExpanded}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-md transition-colors duration-200 text-sm text-blue-700 dark:text-blue-300"
                >
                  +{history.length - 3} more
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
