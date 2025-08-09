import React from 'react';

/**
 * LoadingSpinner component to show loading state during API calls
 */
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Main spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-pulse"></div>
        
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading text */}
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Searching GitHub...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Fetching profile and repository data
        </p>
      </div>
      
      {/* Loading dots animation */}
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
