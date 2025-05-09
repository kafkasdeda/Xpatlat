import React from 'react';
import { searchTemplates } from '../data/searchTemplates';

/**
 * SearchTemplates Component - Predefined search templates
 * @param {Object} props
 * @param {Function} props.onSelectTemplate - Template selection handler
 * @param {string} props.selectedTemplateId - Currently selected template ID
 */
const SearchTemplates = ({ onSelectTemplate, selectedTemplateId }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Hazır Arama Şablonları</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {searchTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`flex items-start p-3 rounded-lg border transition-all duration-200 ${
              selectedTemplateId === template.id
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl mr-3" role="img" aria-label={template.name}>
              {template.icon}
            </span>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchTemplates;
