import React, { useState } from 'react';
import SearchTemplates from './SearchTemplates';
import { getTemplateFilters } from '../data/searchTemplates';

/**
 * @typedef {import('../types/filters').SearchFilters} SearchFilters
 */

/**
 * FilterPanel Component - Twitter search filters with templates
 * @param {Object} props
 * @param {SearchFilters} props.filters - Current filter values
 * @param {(filters: SearchFilters) => void} props.onFilterChange - Filter change handler
 * @param {(field: string, value: any) => void} props.onUpdate - Legacy update handler for compatibility
 */
const FilterPanel = ({ filters, onFilterChange, onUpdate }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  // Handle input changes - support both new and old handlers
  const handleInputChange = (field, value) => {
    if (onFilterChange) {
      onFilterChange({
        ...filters,
        [field]: value
      });
    } else if (onUpdate) {
      // Fallback to legacy handler
      onUpdate(field, value);
    }
  };

  // Handle number input changes
  const handleNumberChange = (field, value) => {
    const numValue = value === '' ? null : parseInt(value, 10);
    handleInputChange(field, isNaN(numValue) ? null : numValue);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field, checked) => {
    handleInputChange(field, checked);
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplateId(template.id);
    
    // Apply template filters
    const templateFilters = getTemplateFilters(template.id);
    if (templateFilters && onFilterChange) {
      // Merge template filters with existing filters
      const newFilters = {
        ...filters,
        ...templateFilters
      };
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search Filters</h2>
      
      {/* Search Templates */}
      <SearchTemplates 
        onSelectTemplate={handleTemplateSelect}
        selectedTemplateId={selectedTemplateId}
      />
      
      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Özel Filtreler</h3>
      
      {/* Text Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Text
        </label>
        <input
          type="text"
          value={filters.textSearch || ''}
          onChange={(e) => handleInputChange('textSearch', e.target.value)}
          placeholder="Enter keywords..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-xs text-gray-500 mt-2 space-y-1">
          <p><span className="font-mono">#hashtag</span>: Specific hashtag</p>
          <p><span className="font-mono">"exact match"</span>: Exact phrase search</p>
          <p><span className="font-mono">word OR another</span>: OR condition</p>
          <p><span className="font-mono">-exclude</span>: Exclude words</p>
        </div>
      </div>

      {/* User Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From User
          </label>
          <input
            type="text"
            value={filters.from || ''}
            onChange={(e) => handleInputChange('from', e.target.value)}
            placeholder="@username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To User
          </label>
          <input
            type="text"
            value={filters.to || ''}
            onChange={(e) => handleInputChange('to', e.target.value)}
            placeholder="@username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={filters.since || ''}
            onChange={(e) => handleInputChange('since', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Until Date
          </label>
          <input
            type="date"
            value={filters.until || ''}
            onChange={(e) => handleInputChange('until', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Engagement Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Likes: <span className="text-blue-600 font-bold">{filters.likesMin || 0}</span>
          </label>
          <input
            type="range"
            min="0"
            max="10000"
            step="10"
            value={filters.likesMin || 0}
            onChange={(e) => handleNumberChange('likesMin', e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Retweets
          </label>
          <input
            type="number"
            value={filters.retweetsMin || ''}
            onChange={(e) => handleNumberChange('retweetsMin', e.target.value)}
            placeholder="50"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Language and Media Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={filters.language || ''}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Language</option>
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>

      {/* Media Type Filters */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Media Types
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="media-any"
              checked={filters.mediaTypes?.any || false}
              onChange={(e) => handleInputChange('mediaTypes', {
                ...filters.mediaTypes,
                any: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="media-any" className="ml-2 text-sm text-gray-700">
              Any media
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="media-images"
              checked={filters.mediaTypes?.images || false}
              onChange={(e) => handleInputChange('mediaTypes', {
                ...filters.mediaTypes,
                images: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="media-images" className="ml-2 text-sm text-gray-700">
              Images only
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="media-videos"
              checked={filters.mediaTypes?.videos || false}
              onChange={(e) => handleInputChange('mediaTypes', {
                ...filters.mediaTypes,
                videos: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="media-videos" className="ml-2 text-sm text-gray-700">
              Videos only
            </label>
          </div>
        </div>
      </div>

      {/* Exclude Filters */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Exclude
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="exclude-retweets"
              checked={filters.exclude?.retweets || false}
              onChange={(e) => handleInputChange('exclude', {
                ...filters.exclude,
                retweets: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="exclude-retweets" className="ml-2 text-sm text-gray-700">
              Exclude retweets
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="exclude-replies"
              checked={filters.exclude?.replies || false}
              onChange={(e) => handleInputChange('exclude', {
                ...filters.exclude,
                replies: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="exclude-replies" className="ml-2 text-sm text-gray-700">
              Exclude replies
            </label>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-6">
        <button
          onClick={() => {
            setSelectedTemplateId(null);
            if (onFilterChange) {
              onFilterChange({});
            }
          }}
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
