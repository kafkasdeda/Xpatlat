import React from "react";

const FilterItem = ({ config, value, onChange }) => {
  const { type, label, key } = config;

  switch (type) {
    case "text":
      return (
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{label}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            placeholder={config.placeholder}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      );

    case "range":
      return (
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            {label}: <span className="text-blue-600">{value}</span>
          </label>
          <input
            type="range"
            value={value}
            onChange={(e) => onChange(key, parseInt(e.target.value))}
            min={config.min}
            max={config.max}
            step={config.step || 1}
            className="w-full"
          />
        </div>
      );

    case "select":
      return (
        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-semibold">{label}</label>
          <select
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
            className="border rounded px-2 py-1"
          >
            {config.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(key, e.target.checked)}
            className="accent-blue-600"
          />
          <label className="text-gray-700">{label}</label>
        </div>
      );

    default:
      return null;
  }
};

export default FilterItem;
