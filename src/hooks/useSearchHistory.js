/**
 * Custom hook for managing search history
 * @module hooks/useSearchHistory
 */

import { useState, useEffect, useCallback } from 'react';
import StorageService from '../services/storageService';

/**
 * @typedef {import('../services/storageService').SearchHistoryItem} SearchHistoryItem
 * @typedef {import('../types/filters').SearchFilters} SearchFilters
 */

/**
 * Hook options
 * @typedef {Object} UseSearchHistoryOptions
 * @property {boolean} [autoLoad=true] - Whether to automatically load history on mount
 * @property {number} [limit] - Limit number of history items
 * @property {boolean} [favoritesOnly=false] - Load only favorites
 */

/**
 * Hook return value
 * @typedef {Object} UseSearchHistoryReturn
 * @property {SearchHistoryItem[]} history - Search history items
 * @property {boolean} loading - Loading state
 * @property {function(SearchFilters, string, string?): Promise<SearchHistoryItem|null>} addSearch - Add search to history
 * @property {function(string): Promise<boolean>} deleteSearch - Delete search from history
 * @property {function(string): Promise<boolean>} toggleFavorite - Toggle favorite status
 * @property {function(boolean?): Promise<boolean>} clearHistory - Clear search history
 * @property {function(): void} refreshHistory - Manually refresh history
 * @property {function(string, Partial<SearchHistoryItem>): Promise<boolean>} updateSearch - Update search item
 */

/**
 * Custom hook for managing search history
 * @param {UseSearchHistoryOptions} [options] - Hook options
 * @returns {UseSearchHistoryReturn} Search history operations
 */
export const useSearchHistory = (options = {}) => {
  const {
    autoLoad = true,
    limit,
    favoritesOnly = false
  } = options;

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(autoLoad);

  /**
   * Load search history from storage
   */
  const loadHistory = useCallback(() => {
    try {
      const items = StorageService.getSearchHistory();
      const filteredItems = favoritesOnly 
        ? items.filter(item => item.isFavorite)
        : items;
      const limitedItems = limit 
        ? filteredItems.slice(0, limit)
        : filteredItems;
      setHistory(limitedItems);
    } catch (error) {
      console.error('Failed to load search history:', error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [favoritesOnly, limit]);

  // Auto-load history on mount if enabled
  useEffect(() => {
    if (autoLoad) {
      loadHistory();
    }
  }, [autoLoad, loadHistory]);

  /**
   * Add search to history
   * @param {SearchFilters} filters - Search filters
   * @param {string} url - Generated search URL
   * @param {string} [title] - Optional custom title
   * @returns {Promise<SearchHistoryItem|null>} Created history item
   */
  const addSearch = useCallback(async (filters, url, title) => {
    try {
      // Create search item
      const searchItem = {
        id: `search-${Date.now()}`,
        filters,
        url,
        title: title || 'Twitter Search',
        timestamp: Date.now()
      };
      
      StorageService.saveSearch(searchItem);
      loadHistory();
      return searchItem;
    } catch (error) {
      console.error('Failed to add search to history:', error);
      return null;
    }
  }, [loadHistory]);

  /**
   * Delete search from history
   * @param {string} id - Search ID
   * @returns {Promise<boolean>} Success status
   */
  const deleteSearch = useCallback(async (id) => {
    try {
      const history = StorageService.getSearchHistory();
      const updatedHistory = history.filter(item => item.id !== id);
      localStorage.setItem('twitterSearch_history', JSON.stringify(updatedHistory));
      loadHistory();
      return true;
    } catch (error) {
      console.error('Failed to delete search:', error);
      return false;
    }
  }, [loadHistory]);

  /**
   * Toggle favorite status
   * @param {string} id - Search ID
   * @returns {Promise<boolean>} Success status
   */
  const toggleFavorite = useCallback(async (id) => {
    try {
      const history = StorageService.getSearchHistory();
      const searchItem = history.find(item => item.id === id);
      if (!searchItem) return false;
      
      const result = StorageService.toggleFavorite(searchItem);
      loadHistory();
      return result;
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      return false;
    }
  }, [loadHistory]);

  /**
   * Clear search history
   * @param {boolean} [keepFavorites=true] - Whether to keep favorites
   * @returns {Promise<boolean>} Success status
   */
  const clearHistory = useCallback(async (keepFavorites = true) => {
    try {
      StorageService.clearHistory(keepFavorites);
      loadHistory();
      return true;
    } catch (error) {
      console.error('Failed to clear history:', error);
      return false;
    }
  }, [loadHistory]);

  /**
   * Update search item
   * @param {string} id - Search ID
   * @param {Partial<SearchHistoryItem>} updates - Updates to apply
   * @returns {Promise<boolean>} Success status
   */
  const updateSearch = useCallback(async (id, updates) => {
    try {
      const history = StorageService.getSearchHistory();
      const index = history.findIndex(item => item.id === id);
      if (index === -1) return false;
      
      const updatedItem = { ...history[index], ...updates };
      history[index] = updatedItem;
      
      localStorage.setItem('twitterSearch_history', JSON.stringify(history));
      loadHistory();
      return true;
    } catch (error) {
      console.error('Failed to update search:', error);
      return false;
    }
  }, [loadHistory]);

  return {
    history,
    loading,
    addSearch,
    deleteSearch,
    toggleFavorite,
    clearHistory,
    refreshHistory: loadHistory,
    updateSearch
  };
};
