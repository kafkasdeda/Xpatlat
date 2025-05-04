/**
 * @file Unit tests for Storage Service
 * @description Tests for localStorage operations and search history management
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { StorageService } from '../services/storageService';

describe('StorageService', () => {
  beforeEach(() => {
    // Clear localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clear localStorage after each test
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('Search History', () => {
    test('should save search to history', () => {
      console.debug('[StorageService] TEST: Save search');
      const search = {
        id: 'test-123',
        filters: { textSearch: 'test' },
        url: 'https://twitter.com/search?q=test',
        timestamp: Date.now()
      };
      
      StorageService.saveSearch(search);
      const history = StorageService.getSearchHistory();
      
      expect(history).toHaveLength(1);
      expect(history[0].id).toBe('test-123');
      expect(history[0].filters.textSearch).toBe('test');
    });

    test('should auto-generate ID if not provided', () => {
      console.debug('[StorageService] TEST: Auto-generate ID');
      const search = {
        filters: { textSearch: 'test' },
        url: 'https://twitter.com/search?q=test'
      };
      
      StorageService.saveSearch(search);
      const history = StorageService.getSearchHistory();
      
      expect(history[0].id).toBeDefined();
      expect(history[0].id).toMatch(/^search-/);
    });

    test('should maintain history limit of 50', () => {
      console.debug('[StorageService] TEST: History limit');
      console.time('[StorageService] Add 51 searches');
      
      // Add 51 searches
      for (let i = 0; i < 51; i++) {
        StorageService.saveSearch({
          id: `search-${i}`,
          filters: { textSearch: `test ${i}` },
          url: `https://twitter.com/search?q=test${i}`,
          timestamp: Date.now() + i
        });
      }
      
      console.timeEnd('[StorageService] Add 51 searches');
      
      const history = StorageService.getSearchHistory();
      
      expect(history).toHaveLength(50);
      expect(history[0].id).toBe('search-50'); // Most recent
      expect(history[49].id).toBe('search-1'); // Oldest kept
    });

    test('should order history by timestamp (newest first)', () => {
      console.debug('[StorageService] TEST: History order');
      const searches = [
        { id: '1', timestamp: 1000 },
        { id: '2', timestamp: 2000 },
        { id: '3', timestamp: 3000 }
      ];
      
      searches.forEach(search => StorageService.saveSearch(search));
      const history = StorageService.getSearchHistory();
      
      expect(history[0].id).toBe('3'); // Newest
      expect(history[2].id).toBe('1'); // Oldest
    });

      test('should handle localStorage errors gracefully', () => {
    console.debug('[StorageService] TEST: Storage error handling');
    // Mock localStorage.setItem to throw error for next call only
    const originalSetItem = localStorage.setItem;
    let callCount = 0;
    
    localStorage.setItem = vi.fn((key, value) => {
      callCount++;
      if (callCount === 1) {
        throw new Error('Storage quota exceeded');
      }
      return originalSetItem(key, value);
    });
    
    console.error = vi.fn(); // Mock console.error
    
    const search = { id: 'test', filters: {} };
    StorageService.saveSearch(search);
    
    expect(console.error).toHaveBeenCalled();
    localStorage.setItem = originalSetItem; // Restore
  });
  });

  describe('Favorites', () => {
    test('should add search to favorites', () => {
      console.debug('[StorageService] TEST: Add favorite');
      const search = {
        id: 'fav-1',
        filters: { textSearch: 'favorite' }
      };
      
      StorageService.addFavorite(search);
      const favorites = StorageService.getFavorites();
      
      expect(favorites).toHaveLength(1);
      expect(favorites[0].id).toBe('fav-1');
      expect(favorites[0].isFavorite).toBe(true);
    });

    test('should not create duplicate favorites', () => {
      console.debug('[StorageService] TEST: Duplicate favorites');
      const search = {
        id: 'fav-1',
        filters: { textSearch: 'favorite' }
      };
      
      StorageService.addFavorite(search);
      StorageService.addFavorite(search);
      
      const favorites = StorageService.getFavorites();
      expect(favorites).toHaveLength(1);
    });

    test('should remove favorite', () => {
      console.debug('[StorageService] TEST: Remove favorite');
      const search = {
        id: 'fav-1',
        filters: { textSearch: 'favorite' }
      };
      
      StorageService.addFavorite(search);
      StorageService.removeFavorite('fav-1');
      
      const favorites = StorageService.getFavorites();
      expect(favorites).toHaveLength(0);
    });

    test('should toggle favorite status', () => {
      console.debug('[StorageService] TEST: Toggle favorite');
      const search = {
        id: 'toggle-1',
        filters: { textSearch: 'toggle' }
      };
      
      // Add to favorites
      const added = StorageService.toggleFavorite(search);
      expect(added).toBe(true);
      expect(StorageService.getFavorites()).toHaveLength(1);
      
      // Remove from favorites
      const removed = StorageService.toggleFavorite(search);
      expect(removed).toBe(false);
      expect(StorageService.getFavorites()).toHaveLength(0);
    });
  });

  describe('Clear History', () => {
    test('should clear all history', () => {
      console.debug('[StorageService] TEST: Clear all history');
      // Add some searches
      StorageService.saveSearch({ id: '1', filters: {} });
      StorageService.saveSearch({ id: '2', filters: {} });
      
      StorageService.clearHistory();
      
      expect(StorageService.getSearchHistory()).toHaveLength(0);
    });

    test('should clear history but keep favorites', () => {
      console.debug('[StorageService] TEST: Keep favorites on clear');
      // Add regular search
      StorageService.saveSearch({ id: '1', filters: {} });
      
      // Add favorite
      const favorite = { id: 'fav-1', filters: {} };
      StorageService.addFavorite(favorite);
      
      StorageService.clearHistory(true); // Keep favorites
      
      const history = StorageService.getSearchHistory();
      expect(history).toHaveLength(1);
      expect(history[0].id).toBe('fav-1');
      expect(history[0].isFavorite).toBe(true);
    });
  });

  describe('Import/Export', () => {
    test('should export search data', () => {
      console.debug('[StorageService] TEST: Export data');
      const search = { id: '1', filters: { textSearch: 'export' } };
      StorageService.saveSearch(search);
      StorageService.addFavorite(search);
      
      const exported = StorageService.exportSearches();
      
      expect(exported.history).toHaveLength(1);
      expect(exported.favorites).toHaveLength(1);
      expect(exported.version).toBe(1);
    });

    test('should import search data', () => {
      console.debug('[StorageService] TEST: Import data');
      const importData = {
        history: [{ id: '1', filters: { textSearch: 'import' } }],
        favorites: [{ id: 'fav-1', filters: { textSearch: 'favorite' } }],
        version: 1
      };
      
      StorageService.importSearches(importData);
      
      expect(StorageService.getSearchHistory()).toHaveLength(1);
      expect(StorageService.getFavorites()).toHaveLength(1);
    });

    test('should validate import data', () => {
      console.debug('[StorageService] TEST: Validate import');
      const invalidData = {
        history: 'not an array',
        favorites: [{ /* missing required fields */ }]
      };
      
      expect(() => {
        StorageService.importSearches(invalidData);
      }).toThrow();
    });
  });

  describe('Storage Version Migration', () => {
    test('should handle different storage versions', () => {
      console.debug('[StorageService] TEST: Version migration');
      // Clear mock storage before test
      localStorage.clear();
      
      // Simulate old version data
      const oldData = {
        searches: [{ id: '1', query: 'old format' }]
      };
      
      localStorage.setItem('twitterSearch_history', JSON.stringify(oldData));
      
      // Access should trigger migration
      const history = StorageService.getSearchHistory();
      
      expect(history).toBeDefined();
      // Migration logic would transform old data to new format
    });
  });

  describe('Edge Cases', () => {
    test('should handle corrupted localStorage data', () => {
      console.debug('[StorageService] TEST: Corrupted data');
      // Clear mock storage before test
      localStorage.clear();
      localStorage.setItem('twitterSearch_history', 'invalid json{');
      
      const history = StorageService.getSearchHistory();
      
      expect(history).toEqual([]); // Should return empty array
    });

    test('should handle missing localStorage keys', () => {
      console.debug('[StorageService] TEST: Missing keys');
      const history = StorageService.getSearchHistory();
      const favorites = StorageService.getFavorites();
      
      expect(history).toEqual([]);
      expect(favorites).toEqual([]);
    });

    test('should handle localStorage disabled', () => {
      console.debug('[StorageService] TEST: Disabled localStorage');
      // Mock localStorage as undefined
      const originalLS = global.localStorage;
      delete global.localStorage;
      delete window.localStorage;
      
      expect(() => {
        StorageService.saveSearch({ id: '1' });
      }).not.toThrow();
      
      // Restore
      global.localStorage = originalLS;
      window.localStorage = originalLS;
    });
  });

  describe('Performance', () => {
    test('should handle large datasets efficiently', () => {
      console.time('[StorageService] Large dataset test');
      
      // Add 1000 searches
      const startTime = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        StorageService.saveSearch({
          id: `perf-${i}`,
          filters: { textSearch: `test ${i}` },
          timestamp: Date.now() + i
        });
      }
      
      const endTime = performance.now();
      console.timeEnd('[StorageService] Large dataset test');
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
      expect(StorageService.getSearchHistory()).toHaveLength(50); // Should maintain limit
    });
  });
});
