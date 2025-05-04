/**
 * @file Storage service for managing search history and favorites
 * @module services/storageService
 */

// Storage keys
const STORAGE_KEYS = {
  SEARCH_HISTORY: 'twitterSearch_history',
  FAVORITES: 'twitterSearch_favorites',
  VERSION: 'twitterSearch_version'
};

// Current storage version
const CURRENT_VERSION = 1;

// Maximum items to store
const MAX_HISTORY_ITEMS = 50;

/**
 * @typedef {Object} SearchEntry
 * @property {string} id - Unique identifier
 * @property {Object} filters - Search filters
 * @property {string} url - Generated search URL
 * @property {number} timestamp - Creation timestamp
 * @property {boolean} [isFavorite] - Whether this search is favorited
 */

/**
 * StorageService class for managing localStorage operations
 */
export class StorageService {
  /**
   * Save a search to history
   * @param {Partial<SearchEntry>} searchData - Search data to save
   * @returns {void}
   */
  static saveSearch(searchData) {
    console.debug('[StorageService] saveSearch START', { searchData });
    
    if (!this.isStorageAvailable()) {
      console.warn('[StorageService] localStorage not available');
      return;
    }
    
    try {
      const history = this.getSearchHistory();
      
      // Generate ID if not provided
      const search = {
        id: searchData.id || `search-${Date.now()}`,
        filters: searchData.filters || {},
        url: searchData.url || '',
        timestamp: searchData.timestamp || Date.now(),
        isFavorite: searchData.isFavorite || false
      };
      
      // Remove existing entry with same ID (if any)
      const filteredHistory = history.filter(item => item.id !== search.id);
      
      // Add new search at the beginning
      const updatedHistory = [search, ...filteredHistory];
      
      // Limit to maximum items (excluding favorites)
      const nonFavorites = updatedHistory.filter(item => !item.isFavorite);
      const favorites = updatedHistory.filter(item => item.isFavorite);
      
      let finalHistory = [...favorites];
      if (nonFavorites.length > MAX_HISTORY_ITEMS) {
        finalHistory = [...favorites, ...nonFavorites.slice(0, MAX_HISTORY_ITEMS)];
      } else {
        finalHistory = updatedHistory;
      }
      
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(finalHistory));
      console.debug('[StorageService] saveSearch END', { saved: search });
    } catch (error) {
      console.error('[StorageService] Error saving search:', error);
    }
  }

  /**
   * Get search history
   * @returns {SearchEntry[]}
   */
  static getSearchHistory() {
    console.debug('[StorageService] getSearchHistory START');
    
    if (!this.isStorageAvailable()) {
      console.warn('[StorageService] localStorage not available');
      return [];
    }
    
    try {
      const historyJson = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      if (!historyJson) return [];
      
      const history = JSON.parse(historyJson);
      console.debug('[StorageService] getSearchHistory END', { count: history.length });
      
      // Sort by timestamp (newest first)
      return history.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('[StorageService] Error getting search history:', error);
      return [];
    }
  }

  /**
   * Add search to favorites
   * @param {SearchEntry} search - Search to favorite
   * @returns {void}
   */
  static addFavorite(search) {
    console.debug('[StorageService] addFavorite START', { search });
    
    if (!this.isStorageAvailable()) {
      console.warn('[StorageService] localStorage not available');
      return;
    }
    
    try {
      const favorites = this.getFavorites();
      
      // Check if already favorited
      if (favorites.some(fav => fav.id === search.id)) {
        console.debug('[StorageService] Already favorited', { id: search.id });
        return;
      }
      
      // Mark as favorite
      const favoriteSearch = { ...search, isFavorite: true };
      
      // Update in history as well
      const history = this.getSearchHistory();
      const updatedHistory = history.map(item => 
        item.id === search.id ? favoriteSearch : item
      );
      
      // If not in history, add it
      if (!updatedHistory.some(item => item.id === search.id)) {
        updatedHistory.unshift(favoriteSearch);
      }
      
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updatedHistory));
      
      // Also save to separate favorites key for backward compatibility
      const updatedFavorites = [...favorites, favoriteSearch];
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
      
      console.debug('[StorageService] addFavorite END');
    } catch (error) {
      console.error('[StorageService] Error adding favorite:', error);
    }
  }

  /**
   * Remove search from favorites
   * @param {string} searchId - ID of search to unfavorite
   * @returns {void}
   */
  static removeFavorite(searchId) {
    console.debug('[StorageService] removeFavorite START', { searchId });
    
    try {
      // Update history
      const history = this.getSearchHistory();
      const updatedHistory = history.map(item => 
        item.id === searchId ? { ...item, isFavorite: false } : item
      );
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updatedHistory));
      
      // Update favorites
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.filter(fav => fav.id !== searchId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
      
      console.debug('[StorageService] removeFavorite END');
    } catch (error) {
      console.error('[StorageService] Error removing favorite:', error);
    }
  }

  /**
   * Get favorites
   * @returns {SearchEntry[]}
   */
  static getFavorites() {
    console.debug('[StorageService] getFavorites START');
    
    if (!this.isStorageAvailable()) {
      console.warn('[StorageService] localStorage not available');
      return [];
    }
    
    try {
      // Try to get from dedicated favorites key first
      const favoritesJson = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (favoritesJson) {
        const favorites = JSON.parse(favoritesJson);
        console.debug('[StorageService] getFavorites END', { count: favorites.length });
        return favorites;
      }
      
      // Fallback: get from history
      const history = this.getSearchHistory();
      const favorites = history.filter(item => item.isFavorite);
      console.debug('[StorageService] getFavorites END (from history)', { count: favorites.length });
      return favorites;
    } catch (error) {
      console.error('[StorageService] Error getting favorites:', error);
      return [];
    }
  }

  /**
   * Toggle favorite status
   * @param {SearchEntry} search - Search to toggle
   * @returns {boolean} New favorite status
   */
  static toggleFavorite(search) {
    console.debug('[StorageService] toggleFavorite START', { search });
    
    const favorites = this.getFavorites();
    const isFavorite = favorites.some(fav => fav.id === search.id);
    
    if (isFavorite) {
      this.removeFavorite(search.id);
      console.debug('[StorageService] toggleFavorite END', { result: false });
      return false;
    } else {
      this.addFavorite(search);
      console.debug('[StorageService] toggleFavorite END', { result: true });
      return true;
    }
  }

  /**
   * Clear all search history
   * @param {boolean} keepFavorites - Whether to keep favorites
   * @returns {void}
   */
  static clearHistory(keepFavorites = false) {
    console.debug('[StorageService] clearHistory START', { keepFavorites });
    
    try {
      if (keepFavorites) {
        const favorites = this.getFavorites();
        localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(favorites));
      } else {
        localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
        localStorage.removeItem(STORAGE_KEYS.FAVORITES);
      }
      
      console.debug('[StorageService] clearHistory END');
    } catch (error) {
      console.error('[StorageService] Error clearing history:', error);
    }
  }

  /**
   * Export search data
   * @returns {Object} Exported data
   */
  static exportSearches() {
    console.debug('[StorageService] exportSearches START');
    
    try {
      const history = this.getSearchHistory();
      const favorites = this.getFavorites();
      
      const exportData = {
        version: CURRENT_VERSION,
        history,
        favorites,
        exportDate: new Date().toISOString()
      };
      
      console.debug('[StorageService] exportSearches END', { 
        historyCount: history.length,
        favoritesCount: favorites.length 
      });
      
      return exportData;
    } catch (error) {
      console.error('[StorageService] Error exporting searches:', error);
      return null;
    }
  }

  /**
   * Import search data
   * @param {Object} data - Data to import
   * @returns {void}
   */
  static importSearches(data) {
    console.debug('[StorageService] importSearches START', { data });
    
    try {
      // Validate import data
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid import data');
      }
      
      if (!Array.isArray(data.history) || !Array.isArray(data.favorites)) {
        throw new Error('Invalid import data structure');
      }
      
      // Validate entries
      const isValidEntry = (entry) => {
        return entry && typeof entry === 'object' && 
               typeof entry.id === 'string' &&
               typeof entry.filters === 'object';
      };
      
      if (!data.history.every(isValidEntry) || !data.favorites.every(isValidEntry)) {
        throw new Error('Invalid search entries in import data');
      }
      
      // Import data
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(data.history));
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(data.favorites));
      localStorage.setItem(STORAGE_KEYS.VERSION, data.version?.toString() || CURRENT_VERSION.toString());
      
      console.debug('[StorageService] importSearches END');
    } catch (error) {
      console.error('[StorageService] Error importing searches:', error);
      throw error;
    }
  }

  /**
   * Check if storage is available
   * @returns {boolean}
   */
  static isStorageAvailable() {
    try {
      if (typeof localStorage === 'undefined') {
        return false;
      }
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Default export
export default StorageService;
