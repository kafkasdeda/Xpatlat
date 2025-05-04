import { useState } from "react";
import { DEFAULT_FILTERS, createFilterObject } from '../types/filters';

/**
 * Hook for managing search filters
 * @param {import('../types/filters').SearchFilters} [defaultFilters] - Default filter values
 * @returns {{
 *   filters: import('../types/filters').SearchFilters,
 *   updateFilter: (key: string, value: any) => void,
 *   resetFilters: () => void,
 *   setFilters: (filters: import('../types/filters').SearchFilters) => void
 * }}
 */
export default function useFilters(defaultFilters = DEFAULT_FILTERS) {
  const [filters, setFilters] = useState(() => createFilterObject(defaultFilters));

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(createFilterObject(DEFAULT_FILTERS));

  return { filters, updateFilter, resetFilters, setFilters };
}
