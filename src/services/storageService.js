/**
 * Storage service for managing search history and user preferences
 * @module services/storageService
 */

/**
 * Search history item structure
 * @typedef {Object} SearchHistoryItem
 * @property {string} id - Unique identifier
 * @property {import('../types/filters').SearchFilters} filters - Search filters
 * @property {string} url - Generated search URL
 * @property {string} timestamp - ISO date string when search was created
 * @property {string} [title] - Optional custom title for the search
 * @property {boolean} [isFavorite] - Whether this search is marked as favorite
 */

/**
 * Storage configuration
 * @typedef {Object} StorageConfig
 * @property {number} maxItems - Maximum number of items to store
 * @property {string} prefix - Prefix for storage keys
 * @property {number} version - Storage schema version
 */

/**
 * Default storage configuration
 * @type {StorageConfig}
 */
const DEFAULT_CONFIG = {
  maxItems: 50,
  prefix: 'xpatlat_',
  version: 1
};

/**
 * Storage service class for managing local storage operations
 */
class StorageService {
  constructor(config = DEFAULT_CONFIG) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.KEYS = {
      SEARCH_HISTORY: `${this.config.prefix}search_history`,
      FAVORITES: `${this.config.prefix}favorites`,
      PREFERENCES: `${this.config.prefix}preferences`,
      VERSION: `${this.config.prefix}version`
    };
    
    this._initializeStorage();
  }

  /**
   * Initialize storage and handle migrations if needed
   * @private
   */
  _initializeStorage() {
    try {
      const currentVersion = this._getItem(this.KEYS.VERSION);
      
      if (!currentVersion) {
        // First time initialization
        this._setItem(this.KEYS.VERSION, this.config.version);
        this._setItem(this.KEYS.SEARCH_HISTORY, []);
        this._setItem(this.KEYS.FAVORITES, []);
        this._setItem(this.KEYS.PREFERENCES, {});
      } else if (currentVersion < this.config.version) {
        // Handle migrations for future versions
        this._migrateData(currentVersion, this.config.version);
      }
    } catch (error) {
      console.error('Storage initialization failed:', error);
    }
  }

  /**
   * Migrate data between storage versions
   * @private
   * @param {number} fromVersion - Current version
   * @param {number} toVersion - Target version
   */
  _migrateData(fromVersion, toVersion) {
    console.log(`Migrating storage from version ${fromVersion} to ${toVersion}`);
    // Add migration logic here for future versions
    this._setItem(this.KEYS.VERSION, toVersion);
  }

  /**
   * Get item from localStorage
   * @private
   * @param {string} key - Storage key
   * @returns {*} Parsed value or null if not found
   */
  _getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage [${key}]:`, error);
      return null;
    }
  }

  /**
   * Set item in localStorage
   * @private
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean} Success status
   */
  _setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage [${key}]:`, error);
      return false;
    }
  }

  /**
   * Add a search to history
   * @param {import('../types/filters').SearchFilters} filters - Search filters
   * @param {string} url - Generated search URL
   * @param {string} [title] - Optional custom title
   * @returns {SearchHistoryItem|null} Created history item or null if failed
   */
  addSearchToHistory(filters, url, title = '') {
    try {
      const history = this.getSearchHistory();
      
      // Create new history item
      const newItem = {
        id: Date.now().toString(),
        filters,
        url,
        timestamp: new Date().toISOString(),
        title: title || this._generateTitle(filters),
        isFavorite: false
      };

      // Add to beginning of history
      const updatedHistory = [newItem, ...history];

      // Limit history size
      if (updatedHistory.length > this.config.maxItems) {
        // Keep favorites even if they exceed the limit
        const favorites = updatedHistory.filter(item => item.isFavorite);
        const nonFavorites = updatedHistory.filter(item => !item.isFavorite);
        
        updatedHistory.length = 0;
        updatedHistory.push(...favorites, ...nonFavorites.slice(0, this.config.maxItems - favorites.length));
      }

      this._setItem(this.KEYS.SEARCH_HISTORY, updatedHistory);
      return newItem;
    } catch (error) {
      console.error('Failed to add search to history:', error);
      return null;
    }
  }

  /**
   * Get search history
   * @param {Object} options - Query options
   * @param {boolean} [options.favoritesOnly=false] - Return only favorites
   * @param {number} [options.limit] - Limit number of results
   * @returns {SearchHistoryItem[]} Search history items
   */
  getSearchHistory({ favoritesOnly = false, limit } = {}) {
    try {
      let history = this._getItem(this.KEYS.SEARCH_HISTORY) || [];
      
      if (favoritesOnly) {
        history = history.filter(item => item.isFavorite);
      }
      
      if (limit && limit > 0) {
        history = history.slice(0, limit);
      }
      
      return history;
    } catch (error) {
      console.error('Failed to get search history:', error);
      return [];
    }
  }

  /**
   * Get search by ID
   * @param {string} id - Search ID
   * @returns {SearchHistoryItem|null} Search history item or null if not found
   */
  getSearchById(id) {
    const history = this.getSearchHistory();
    return history.find(item => item.id === id) || null;
  }

  /**
   * Update search in history
   * @param {string} id - Search ID
   * @param {Partial<SearchHistoryItem>} updates - Fields to update
   * @returns {boolean} Success status
   */
  updateSearch(id, updates) {
    try {
      const history = this.getSearchHistory();
      const index = history.findIndex(item => item.id === id);
      
      if (index === -1) return false;
      
      history[index] = {
        ...history[index],
        ...updates,
        id: history[index].id, // Ensure ID doesn't change
        timestamp: history[index].timestamp // Ensure timestamp doesn't change
      };
      
      return this._setItem(this.KEYS.SEARCH_HISTORY, history);
    } catch (error) {
      console.error('Failed to update search:', error);
      return false;
    }
  }

  /**
   * Toggle favorite status
   * @param {string} id - Search ID
   * @returns {boolean} Success status
   */
  toggleFavorite(id) {
    const search = this.getSearchById(id);
    if (!search) return false;
    
    return this.updateSearch(id, { isFavorite: !search.isFavorite });
  }

  /**
   * Delete search from history
   * @param {string} id - Search ID
   * @returns {boolean} Success status
   */
  deleteSearch(id) {
    try {
      const history = this.getSearchHistory();
      const filteredHistory = history.filter(item => item.id !== id);
      
      if (filteredHistory.length === history.length) return false; // Item not found
      
      return this._setItem(this.KEYS.SEARCH_HISTORY, filteredHistory);
    } catch (error) {
      console.error('Failed to delete search:', error);
      return false;
    }
  }

  /**
   * Clear all search history
   * @param {boolean} [keepFavorites=true] - Whether to keep favorites
   * @returns {boolean} Success status
   */
  clearHistory(keepFavorites = true) {
    try {
      if (keepFavorites) {
        const favorites = this.getSearchHistory({ favoritesOnly: true });
        return this._setItem(this.KEYS.SEARCH_HISTORY, favorites);
      } else {
        return this._setItem(this.KEYS.SEARCH_HISTORY, []);
      }
    } catch (error) {
      console.error('Failed to clear history:', error);
      return false;
    }
  }

  /**
   * Get user preferences
   * @returns {Object} User preferences
   */
  getPreferences() {
    return this._getItem(this.KEYS.PREFERENCES) || {};
  }

  /**
   * Update user preferences
   * @param {Object} updates - Preference updates
   * @returns {boolean} Success status
   */
  updatePreferences(updates) {
    try {
      const currentPreferences = this.getPreferences();
      const updatedPreferences = {
        ...currentPreferences,
        ...updates
      };
      return this._setItem(this.KEYS.PREFERENCES, updatedPreferences);
    } catch (error) {
      console.error('Failed to update preferences:', error);
      return false;
    }
  }

  /**
   * Generate title from filters
   * @private
   * @param {import('../types/filters').SearchFilters} filters
   * @returns {string} Generated title
   */
  _generateTitle(filters) {
    const parts = [];
    
    if (filters.textSearch) {
      parts.push(`"${filters.textSearch}"`);
    }
    
    if (filters.from) {
      parts.push(`from @${filters.from}`);
    }
    
    if (filters.to) {
      parts.push(`to @${filters.to}`);
    }
    
    if (filters.since || filters.until) {
      const dateRange = [];
      if (filters.since) dateRange.push(filters.since);
      if (filters.until) dateRange.push(filters.until);
      parts.push(dateRange.join(' - '));
    }
    
    if (filters.likesMin > 0) {
      parts.push(`${filters.likesMin}+ likes`);
    }
    
    if (filters.minRetweets > 0) {
      parts.push(`${filters.minRetweets}+ RTs`);
    }
    
    return parts.length > 0 ? parts.join(', ') : 'Custom Search';
  }

  /**
   * Export all data
   * @returns {Object} All stored data
   */
  exportData() {
    return {
      version: this._getItem(this.KEYS.VERSION),
      searchHistory: this.getSearchHistory(),
      preferences: this.getPreferences(),
      exportDate: new Date().toISOString()
    };
  }

  /**
   * Import data
   * @param {Object} data - Data to import
   * @returns {boolean} Success status
   */
  importData(data) {
    try {
      if (data.version && data.version > this.config.version) {
        console.warn('Importing data from newer version');
      }
      
      if (data.searchHistory) {
        this._setItem(this.KEYS.SEARCH_HISTORY, data.searchHistory);
      }
      
      if (data.preferences) {
        this._setItem(this.KEYS.PREFERENCES, data.preferences);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}

// Create singleton instance
export const storageService = new StorageService();

// Export the class for testing purposes
export { StorageService };
