import React, { useState, useEffect } from 'react';
import FilterPanel from '../components/FilterPanel';
import ResultsPanel from '../components/ResultsPanel';
import SearchHistory from '../components/SearchHistory';
import { createTwitterSearchUrl, getErrorMessages } from '../utils/twitterUrlGenerator';
import { useSearchHistory } from '../hooks/useSearchHistory';

/**
 * @typedef {import('../types/filters').SearchFilters} SearchFilters
 */

const SearchPage = () => {
  // Filter state
  const [filters, setFilters] = useState(/** @type {SearchFilters} */ ({}));
  const [searchUrl, setSearchUrl] = useState('https://twitter.com/search');
  const [errors, setErrors] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Search history hook
  const { addSearch } = useSearchHistory({ autoLoad: false });

  // Update search URL whenever filters change
  useEffect(() => {
    const result = createTwitterSearchUrl(filters);
    setSearchUrl(result.url || 'https://twitter.com/search');
    setErrors(result.errors || []);
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Legacy handler for backward compatibility
  const updateFilter = (key, value) => {
    if (key === null && value === {}) {
      // Reset filters
      setFilters({});
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  // Handle search generation (save to history)
  const handleSearchGeneration = async () => {
    if (errors.length === 0 && searchUrl) {
      await addSearch(filters, searchUrl);
    }
  };

  // Load search from history
  const handleLoadSearch = (savedFilters) => {
    setFilters(savedFilters);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Xpatlat - Twitter Search URL Generator</h1>
          <p className="mt-2 text-sm text-gray-600">Create advanced Twitter search URLs with custom filters</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* History Toggle Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg 
              className="-ml-1 mr-2 h-5 w-5 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            {showHistory ? 'Hide History' : 'Search History'}
          </button>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-red-800 font-semibold mb-2">Validation Errors:</h3>
            <ul className="list-disc list-inside text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}
        
        {showHistory ? (
          <SearchHistory 
            onLoadSearch={handleLoadSearch} 
            limit={20}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Filter Panel */}
            <div>
              <FilterPanel 
                filters={filters} 
                onFilterChange={handleFilterChange}
                onUpdate={updateFilter}  // For backward compatibility
              />
            </div>

            {/* Results Panel */}
            <div>
              <ResultsPanel 
                searchUrl={searchUrl} 
                filters={filters} 
                errors={errors}
                onSearchGenerated={handleSearchGeneration}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Xpatlat - Ethical Twitter Search URL Generator | No data scraping, just smart queries
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
