import React, { useState, useEffect } from 'react';
import FilterPanel from '../components/FilterPanel';
import ResultsPanel from '../components/ResultsPanel';
import { createTwitterSearchUrl } from '../utils/twitterUrlGenerator';

/**
 * @typedef {import('../types/filters').SearchFilters} SearchFilters
 */

const SearchPage = () => {
  // Filter state
  const [filters, setFilters] = useState(/** @type {SearchFilters} */ ({}));
  const [searchUrl, setSearchUrl] = useState('https://twitter.com/search');

  // Update search URL whenever filters change
  useEffect(() => {
    const newUrl = createTwitterSearchUrl(filters);
    setSearchUrl(newUrl);
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
            />
          </div>
        </div>
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
