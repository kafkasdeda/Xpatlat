import React, { useState } from 'react';
import { useSearchHistory } from '../hooks/useSearchHistory';

/**
 * @typedef {import('../services/storageService').SearchHistoryItem} SearchHistoryItem
 */

/**
 * SearchHistory Component - Displays and manages search history
 * @param {Object} props
 * @param {Function} props.onLoadSearch - Callback when user clicks to load a search
 * @param {number} [props.limit] - Maximum number of items to display
 * @param {boolean} [props.showFavoritesOnly] - Show only favorite searches
 */
const SearchHistory = ({ 
  onLoadSearch, 
  limit = 10, 
  showFavoritesOnly = false 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  const {
    history,
    loading,
    deleteSearch,
    toggleFavorite,
    clearHistory
  } = useSearchHistory({
    autoLoad: true,
    limit,
    favoritesOnly: showFavoritesOnly
  });

  /**
   * Handle delete action
   * @param {string} id - Search ID to delete
   */
  const handleDelete = async (id) => {
    const success = await deleteSearch(id);
    if (success) {
      setShowDeleteConfirm(null);
    }
  };

  /**
   * Handle clear history action
   */
  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear search history? Favorites will be preserved.')) {
      await clearHistory(true);
    }
  };

  /**
   * Format timestamp for display
   * @param {string} timestamp - ISO date string
   * @returns {string} Formatted date string
   */
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // Less than 1 minute
    if (diff < 60000) {
      return 'Just now';
    }
    
    // Less than 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    
    // Less than 24 hours
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    // Less than 7 days
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    
    // Default to formatted date
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {showFavoritesOnly ? 'Favorite Searches' : 'Search History'}
        </h2>
        {history.length > 0 && !showFavoritesOnly && (
          <button
            onClick={handleClearHistory}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          {showFavoritesOnly ? 'No favorite searches yet' : 'No search history yet'}
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => onLoadSearch(item.filters)}
                    className="text-left w-full"
                  >
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimestamp(item.timestamp)}
                    </p>
                  </button>
                </div>
                
                <div className="ml-4 flex items-center space-x-2">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`p-1 rounded hover:bg-gray-100 ${
                      item.isFavorite ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                    title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill={item.isFavorite ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                  
                  {showDeleteConfirm === item.id ? (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 rounded text-red-600 hover:bg-red-50"
                        title="Confirm delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="p-1 rounded text-gray-600 hover:bg-gray-100"
                        title="Cancel"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(item.id)}
                      className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete search"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Preview of filters */}
              <div className="mt-2 flex flex-wrap gap-1">
                {Object.entries(item.filters).map(([key, value]) => {
                  if (!value || (typeof value === 'boolean' && !value)) return null;
                  
                  return (
                    <span 
                      key={key}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {key}: {typeof value === 'boolean' ? '✓' : value}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
