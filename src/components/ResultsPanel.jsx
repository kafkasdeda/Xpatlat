import React, { useState } from 'react';

/**
 * @typedef {import('../types/filters').SearchFilters} SearchFilters
 */

/**
 * ResultsPanel Component - Shows generated Twitter search URL
 * @param {Object} props
 * @param {string} props.searchUrl - Generated search URL
 * @param {SearchFilters} props.filters - Current filters for display
 * @param {import('../utils/filterValidator').ValidationError[]} props.errors - Validation errors
 * @param {Function} [props.onSearchGenerated] - Callback when URL is generated
 */
const ResultsPanel = ({ searchUrl, filters, errors = [], onSearchGenerated }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(searchUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenTwitter = () => {
    if (onSearchGenerated) {
      onSearchGenerated();
    }
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  // Format filters for display
  const activeFilters = Object.entries(filters).filter(([_, value]) => {
    return value !== '' && value !== null && value !== false;
  });

  const hasErrors = errors && errors.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Generated URL</h2>
      
      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(([key, value]) => (
              <span 
                key={key}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
              >
                {key}: {value.toString()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* URL Preview */}
      <div className="mb-4">
        <div className="bg-gray-100 p-3 rounded-md break-all text-sm text-gray-700">
          {searchUrl}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCopyUrl}
          disabled={hasErrors}
          className={`flex-1 px-4 py-2 ${hasErrors ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md transition-colors duration-200 flex items-center justify-center gap-2`}
        >
          {copied ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy URL
            </>
          )}
        </button>
        <button
          onClick={handleOpenTwitter}
          disabled={hasErrors}
          className={`flex-1 px-4 py-2 ${hasErrors ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'} text-white rounded-md transition-colors duration-200 flex items-center justify-center gap-2`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Open in Twitter
        </button>
      </div>
    </div>
  );
};

export default ResultsPanel;
