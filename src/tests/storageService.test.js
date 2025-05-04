/**
 * Storage Service test cases
 */

import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { StorageService } from '../services/storageService';

describe('StorageService', () => {
  let storageService;
  
  // Mock localStorage
  const mockLocalStorage = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
  })();

  beforeEach(() => {
    // Setup mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });
    
    // Clear storage before each test
    mockLocalStorage.clear();
    
    // Create new instance
    storageService = new StorageService({
      maxItems: 5,
      prefix: 'test_'
    });
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  describe('initialization', () => {
    test('should initialize storage with default values', () => {
      expect(storageService.getSearchHistory()).toEqual([]);
      expect(storageService.getPreferences()).toEqual({});
    });
  });

  describe('addSearchToHistory', () => {
    test('should add search to history', () => {
      const filters = { textSearch: 'javascript', likesMin: 100 };
      const url = 'https://twitter.com/search?q=javascript%20min_faves:100';
      
      const item = storageService.addSearchToHistory(filters, url);
      
      expect(item).toBeTruthy();
      expect(item.filters).toEqual(filters);
      expect(item.url).toBe(url);
      expect(item.id).toBeDefined();
      expect(item.timestamp).toBeDefined();
      expect(item.isFavorite).toBe(false);
      
      const history = storageService.getSearchHistory();
      expect(history).toHaveLength(1);
      expect(history[0]).toEqual(item);
    });

    test('should auto-generate title if not provided', () => {
      const filters = { textSearch: 'react', from: 'dan_abramov' };
      const url = 'https://twitter.com/search?q=react%20from:dan_abramov';
      
      const item = storageService.addSearchToHistory(filters, url);
      
      expect(item.title).toBe('"react", from @dan_abramov');
    });

    test('should limit history size', () => {
      for (let i = 0; i < 7; i++) {
        storageService.addSearchToHistory(
          { textSearch: `search ${i}` },
          `https://twitter.com/search?q=search%20${i}`
        );
      }
      
      const history = storageService.getSearchHistory();
      expect(history).toHaveLength(5); // Limited to maxItems
      expect(history[0].filters.textSearch).toBe('search 6'); // Most recent
      expect(history[4].filters.textSearch).toBe('search 2'); // Oldest kept
    });

    test('should preserve favorites when limiting size', () => {
      // Add 4 regular searches
      for (let i = 0; i < 4; i++) {
        const item = storageService.addSearchToHistory(
          { textSearch: `search ${i}` },
          `https://twitter.com/search?q=search%20${i}`
        );
        
        // Mark the second one as favorite
        if (i === 1) {
          storageService.toggleFavorite(item.id);
        }
      }
      
      // Add 3 more searches to exceed limit
      for (let i = 4; i < 7; i++) {
        storageService.addSearchToHistory(
          { textSearch: `search ${i}` },
          `https://twitter.com/search?q=search%20${i}`
        );
      }
      
      const history = storageService.getSearchHistory();
      expect(history).toHaveLength(5);
      
      // Check that the favorite is preserved
      const favorite = history.find(item => item.filters.textSearch === 'search 1');
      expect(favorite).toBeDefined();
      expect(favorite.isFavorite).toBe(true);
    });
  });

  describe('getSearchHistory', () => {
    beforeEach(() => {
      // Add some test data
      for (let i = 0; i < 5; i++) {
        const item = storageService.addSearchToHistory(
          { textSearch: `search ${i}` },
          `https://twitter.com/search?q=search%20${i}`
        );
        
        // Mark even numbered searches as favorites
        if (i % 2 === 0) {
          storageService.toggleFavorite(item.id);
        }
      }
    });

    test('should get all history', () => {
      const history = storageService.getSearchHistory();
      expect(history).toHaveLength(5);
    });

    test('should get favorites only', () => {
      const favorites = storageService.getSearchHistory({ favoritesOnly: true });
      expect(favorites).toHaveLength(3);
      expect(favorites.every(item => item.isFavorite)).toBe(true);
    });

    test('should limit results', () => {
      const limited = storageService.getSearchHistory({ limit: 3 });
      expect(limited).toHaveLength(3);
    });
  });

  describe('updateSearch', () => {
    test('should update search item', () => {
      const item = storageService.addSearchToHistory(
        { textSearch: 'javascript' },
        'https://twitter.com/search?q=javascript'
      );
      
      const success = storageService.updateSearch(item.id, {
        title: 'Custom Title',
        isFavorite: true
      });
      
      expect(success).toBe(true);
      
      const updated = storageService.getSearchById(item.id);
      expect(updated.title).toBe('Custom Title');
      expect(updated.isFavorite).toBe(true);
      expect(updated.id).toBe(item.id); // ID should not change
      expect(updated.timestamp).toBe(item.timestamp); // Timestamp should not change
    });
  });

  describe('deleteSearch', () => {
    test('should delete search from history', () => {
      const item = storageService.addSearchToHistory(
        { textSearch: 'javascript' },
        'https://twitter.com/search?q=javascript'
      );
      
      const success = storageService.deleteSearch(item.id);
      expect(success).toBe(true);
      
      const history = storageService.getSearchHistory();
      expect(history).toHaveLength(0);
    });

    test('should return false when deleting non-existent item', () => {
      const success = storageService.deleteSearch('non-existent-id');
      expect(success).toBe(false);
    });
  });

  describe('clearHistory', () => {
    beforeEach(() => {
      // Add some test data with one favorite
      for (let i = 0; i < 3; i++) {
        const item = storageService.addSearchToHistory(
          { textSearch: `search ${i}` },
          `https://twitter.com/search?q=search%20${i}`
        );
        
        if (i === 1) {
          storageService.toggleFavorite(item.id);
        }
      }
    });

    test('should clear history keeping favorites', () => {
      const success = storageService.clearHistory(true);
      expect(success).toBe(true);
      
      const history = storageService.getSearchHistory();
      expect(history).toHaveLength(1);
      expect(history[0].isFavorite).toBe(true);
    });

    test('should clear all history including favorites', () => {
      const success = storageService.clearHistory(false);
      expect(success).toBe(true);
      
      const history = storageService.getSearchHistory();
      expect(history).toHaveLength(0);
    });
  });

  describe('preferences', () => {
    test('should get and update preferences', () => {
      const prefs = storageService.getPreferences();
      expect(prefs).toEqual({});
      
      const success = storageService.updatePreferences({
        theme: 'dark',
        language: 'en'
      });
      
      expect(success).toBe(true);
      
      const updatedPrefs = storageService.getPreferences();
      expect(updatedPrefs).toEqual({
        theme: 'dark',
        language: 'en'
      });
    });

    test('should merge preference updates', () => {
      storageService.updatePreferences({
        theme: 'dark',
        language: 'en'
      });
      
      storageService.updatePreferences({
        language: 'tr',
        notifications: true
      });
      
      const prefs = storageService.getPreferences();
      expect(prefs).toEqual({
        theme: 'dark',
        language: 'tr',
        notifications: true
      });
    });
  });

  describe('export/import', () => {
    test('should export all data', () => {
      // Add some test data
      storageService.addSearchToHistory(
        { textSearch: 'javascript' },
        'https://twitter.com/search?q=javascript'
      );
      
      storageService.updatePreferences({
        theme: 'dark'
      });
      
      const exportedData = storageService.exportData();
      
      expect(exportedData.version).toBeDefined();
      expect(exportedData.searchHistory).toHaveLength(1);
      expect(exportedData.preferences).toEqual({ theme: 'dark' });
      expect(exportedData.exportDate).toBeDefined();
    });

    test('should import data', () => {
      const dataToImport = {
        version: 1,
        searchHistory: [
          {
            id: '123',
            filters: { textSearch: 'imported' },
            url: 'https://twitter.com/search?q=imported',
            timestamp: new Date().toISOString(),
            title: 'Imported Search',
            isFavorite: true
          }
        ],
        preferences: {
          theme: 'light'
        }
      };
      
      const success = storageService.importData(dataToImport);
      expect(success).toBe(true);
      
      const history = storageService.getSearchHistory();
      expect(history).toHaveLength(1);
      expect(history[0].title).toBe('Imported Search');
      
      const prefs = storageService.getPreferences();
      expect(prefs.theme).toBe('light');
    });
  });

  describe('_generateTitle', () => {
    test('should generate title from filters', () => {
      // Access the private method through instance
      const instance = storageService;
      
      // Test various filter combinations
      expect(instance._generateTitle({ textSearch: 'javascript' }))
        .toBe('"javascript"');
      
      expect(instance._generateTitle({ from: 'user123' }))
        .toBe('from @user123');
      
      expect(instance._generateTitle({ 
        textSearch: 'react',
        from: 'dan_abramov',
        likesMin: 100
      })).toBe('"react", from @dan_abramov, 100+ likes');
      
      expect(instance._generateTitle({ 
        since: '2024-01-01',
        until: '2024-12-31'
      })).toBe('2024-01-01 - 2024-12-31');
      
      expect(instance._generateTitle({}))
        .toBe('Custom Search');
    });
  });
});
