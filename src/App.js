import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import SearchHistory from './components/SearchHistory';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchUserData } from './api/github';
import { saveToSearchHistory } from './utils/storage';
import './App.css';

function App() {
  // State management for the application
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchCount, setSearchCount] = useState(0);

  // Apply dark theme and initialize app
  useEffect(() => {
    document.documentElement.classList.add('dark');
    // Add professional page title
    document.title = 'GitHub Profile Finder | Professional Developer Tool';
  }, []);

  /**
   * Handle user search - fetch GitHub profile and repositories
   * @param {string} username - GitHub username to search for
   */
  const handleSearch = async (username) => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      // Fetch user data from GitHub API
      const data = await fetchUserData(username.trim());
      setUserData(data);
      
      // Save to search history and increment counter
      saveToSearchHistory(username.trim());
      setSearchCount(prev => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  /**
   * Handle search from history
   * @param {string} username - Username from search history
   */
  const handleHistorySearch = (username) => {
    handleSearch(username);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Professional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-black to-brand-800 opacity-95"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Professional accent elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Professional Header */}
        <header className="border-b border-brand-800/50 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Professional logo */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-glow">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                </div>
                
                {/* Brand text */}
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    GitHub Profile Finder
                  </h1>
                  <p className="text-sm text-brand-400 font-medium">
                    Professional Developer Analytics Platform
                  </p>
                </div>
              </div>

              {/* Stats badge */}
              {searchCount > 0 && (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="px-4 py-2 bg-brand-800/50 border border-brand-700/50 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-brand-300 font-medium">
                        {searchCount} searches performed
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Search section */}
            <div className="mb-12">
              <SearchBar onSearch={handleSearch} loading={loading} />
              <SearchHistory onHistorySearch={handleHistorySearch} />
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center mb-12">
                <LoadingSpinner />
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="mb-12 animate-slide-up">
                <div className="bg-error-900/10 border border-error-800/30 rounded-2xl p-6 backdrop-blur-xl">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-error-500/10 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-error-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-error-300 mb-1">Search Error</h3>
                      <p className="text-error-400 text-sm leading-relaxed">{error}</p>
                      <p className="text-brand-500 text-xs mt-2">Please check the username and try again.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User profile and repositories */}
            {userData && !loading && (
              <div className="space-y-8 animate-fade-in">
                <ProfileCard profile={userData.profile} />
                <RepoList repos={userData.repos} />
              </div>
            )}

            {/* Professional welcome section */}
            {!userData && !loading && !error && (
              <div className="text-center py-20 animate-fade-in">
                <div className="max-w-2xl mx-auto">
                  {/* Hero icon */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto shadow-glow-lg">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl blur-xl opacity-20"></div>
                  </div>
                  
                  {/* Hero text */}
                  <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                    Discover GitHub Talent
                  </h2>
                  <p className="text-xl text-brand-300 mb-8 leading-relaxed">
                    Professional developer analytics and profile insights at your fingertips.
                    Search any GitHub username to unlock comprehensive data.
                  </p>
                  
                  {/* Feature highlights */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-brand-800/30 border border-brand-700/30 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Profile Analytics</h3>
                      <p className="text-brand-400 text-sm">Comprehensive developer profiles with statistics and insights</p>
                    </div>
                    
                    <div className="bg-brand-800/30 border border-brand-700/30 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="w-12 h-12 bg-success-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Repository Insights</h3>
                      <p className="text-brand-400 text-sm">Top repositories with detailed metrics and technology stacks</p>
                    </div>
                    
                    <div className="bg-brand-800/30 border border-brand-700/30 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="w-12 h-12 bg-warning-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Smart History</h3>
                      <p className="text-brand-400 text-sm">Intelligent search history with quick access to recent profiles</p>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="text-brand-500 text-sm">
                    Start by searching for popular developers like 
                    <button onClick={() => handleSearch('octocat')} className="text-accent-400 hover:text-accent-300 font-medium mx-1 underline decoration-dotted">octocat</button>,
                    <button onClick={() => handleSearch('torvalds')} className="text-accent-400 hover:text-accent-300 font-medium mx-1 underline decoration-dotted">torvalds</button>, or
                    <button onClick={() => handleSearch('gaearon')} className="text-accent-400 hover:text-accent-300 font-medium mx-1 underline decoration-dotted">gaearon</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        {/* Professional Footer */}
        <footer className="border-t border-brand-800/50 backdrop-blur-xl mt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-6xl mx-auto">
              {/* Main footer content */}
              <div className="grid lg:grid-cols-3 gap-12 mb-8">
                {/* Developer info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-glow">
                      <span className="text-2xl font-bold text-white">W</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Syed Rahman</h3>
                      <p className="text-brand-300 text-lg leading-relaxed">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-brand-400">
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Crafting exceptional digital experiences with modern technologies
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Specialized in React, Node.js, and scalable web applications
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                      </svg>
                      Passionate about clean code, performance optimization, and user experience
                    </p>
                  </div>
                </div>
                
                {/* Quick links */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Connect & Explore</h4>
                  <div className="space-y-3">
                    <a href="https://github.com/syedrahman24" target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-400 hover:text-accent-400 transition-colors duration-200 group">
                      <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      GitHub Portfolio
                    </a>
                    <a href="https://www.linkedin.com/in/syedabdurrahmanuddin/" target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-400 hover:text-accent-400 transition-colors duration-200 group">
                      <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                      </svg>
                      LinkedIn Profile
                    </a>
                    <a href="https://twitter.com/syedrahman24" target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-400 hover:text-accent-400 transition-colors duration-200 group">
                      <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      Twitter Updates
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-brand-800/30 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <p className="text-brand-500 text-sm">
                      © {new Date().getFullYear()} Syed Rahman. Crafted with passion and precision.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2 text-brand-400">
                      <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                      <span>Built with React & TailwindCSS</span>
                    </div>
                    <div className="flex items-center space-x-2 text-brand-400">
                      <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>Made with love</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
