/**
 * @file Unit tests for Twitter URL Generator
 * @description Tests for URL generation with various filter combinations
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { createTwitterSearchUrl } from '../utils/twitterUrlGenerator';

describe('createTwitterSearchUrl', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    vi.clearAllMocks();
  });

  describe('Basic URL Generation', () => {
    test('should return empty search URL for empty filters', () => {
      console.debug('[createTwitterSearchUrl] TEST: Empty filters');
      const result = createTwitterSearchUrl({});
      
      expect(result.url).toBe('https://twitter.com/search?q=');
      expect(result.errors).toBeUndefined();
    });

    test('should handle text search only', () => {
      console.debug('[createTwitterSearchUrl] TEST: Text search only');
      const filters = {
        textSearch: 'javascript'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=javascript');
      expect(result.errors).toBeUndefined();
    });

    test('should encode special characters in text search', () => {
      console.debug('[createTwitterSearchUrl] TEST: Special characters encoding');
      const filters = {
        textSearch: 'hello world #coding'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=hello%20world%20%23coding');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('User Filters', () => {
    test('should handle from user filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: From user filter');
      const filters = {
        from: 'elonmusk'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=from%3Aelonmusk');
      expect(result.errors).toBeUndefined();
    });

    test('should handle to user filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: To user filter');
      const filters = {
        to: 'nasa'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=to%3Anasa');
      expect(result.errors).toBeUndefined();
    });

    test('should combine text and user filters', () => {
      console.debug('[createTwitterSearchUrl] TEST: Combined text and user filters');
      const filters = {
        textSearch: 'space',
        from: 'SpaceX',
        to: 'nasa'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=space%20from%3ASpaceX%20to%3Anasa');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Date Filters', () => {
    test('should handle since date filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: Since date filter');
      const filters = {
        since: '2024-01-01'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=since%3A2024-01-01');
      expect(result.errors).toBeUndefined();
    });

    test('should handle until date filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: Until date filter');
      const filters = {
        until: '2024-12-31'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=until%3A2024-12-31');
      expect(result.errors).toBeUndefined();
    });

    test('should combine date range filters', () => {
      console.debug('[createTwitterSearchUrl] TEST: Date range filters');
      const filters = {
        since: '2024-01-01',
        until: '2024-12-31'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=since%3A2024-01-01%20until%3A2024-12-31');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Engagement Filters', () => {
    test('should handle minimum likes filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: Minimum likes filter');
      const filters = {
        likesMin: 100
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=min_faves%3A100');
      expect(result.errors).toBeUndefined();
    });

    test('should handle minimum retweets filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: Minimum retweets filter');
      const filters = {
        retweetsMin: 50
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=min_retweets%3A50');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Language and Media Filters', () => {
    test('should handle language filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: Language filter');
      const filters = {
        language: 'en'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=lang%3Aen');
      expect(result.errors).toBeUndefined();
    });

    test('should handle media filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: Media filter');
      const filters = {
        hasMedia: true
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=filter%3Amedia');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Complex Combinations', () => {
    test('should combine all filter types', () => {
      console.debug('[createTwitterSearchUrl] TEST: All filter types');
      const filters = {
        textSearch: 'AI technology',
        from: 'OpenAI',
        since: '2024-01-01',
        until: '2024-12-31',
        likesMin: 100,
        language: 'en',
        hasMedia: true
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toContain('AI%20technology');
      expect(result.url).toContain('from%3AOpenAI');
      expect(result.url).toContain('since%3A2024-01-01');
      expect(result.url).toContain('until%3A2024-12-31');
      expect(result.url).toContain('min_faves%3A100');
      expect(result.url).toContain('lang%3Aen');
      expect(result.url).toContain('filter%3Amedia');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Error Handling', () => {
    test('should return errors for invalid date format', () => {
      console.debug('[createTwitterSearchUrl] TEST: Invalid date format');
      const filters = {
        since: '01/01/2024' // Invalid format
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('');
      expect(result.errors).toBeDefined();
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].field).toBe('since');
    });

    test('should return errors for negative likes', () => {
      console.debug('[createTwitterSearchUrl] TEST: Negative likes');
      const filters = {
        likesMin: -10
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('');
      expect(result.errors).toBeDefined();
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].field).toBe('likesMin');
    });
  });

  describe('Edge Cases', () => {
    test('should handle undefined filter values', () => {
      console.debug('[createTwitterSearchUrl] TEST: Undefined values');
      const filters = {
        textSearch: undefined,
        from: undefined,
        likesMin: undefined
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=');
      expect(result.errors).toBeUndefined();
    });

    test('should handle null filter values', () => {
      console.debug('[createTwitterSearchUrl] TEST: Null values');
      const filters = {
        textSearch: null,
        from: null,
        likesMin: null
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=');
      expect(result.errors).toBeUndefined();
    });

    test('should handle empty string values', () => {
      console.debug('[createTwitterSearchUrl] TEST: Empty string values');
      const filters = {
        textSearch: '',
        from: '',
        language: ''
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Performance', () => {
    test('should generate URL within acceptable time', () => {
      console.time('[createTwitterSearchUrl] Performance test');
      
      const filters = {
        textSearch: 'performance test',
        from: 'testuser',
        since: '2024-01-01',
        until: '2024-12-31',
        likesMin: 100,
        retweetsMin: 50,
        language: 'en',
        hasMedia: true
      };
      
      const startTime = performance.now();
      const result = createTwitterSearchUrl(filters);
      const endTime = performance.now();
      
      console.timeEnd('[createTwitterSearchUrl] Performance test');
      
      expect(endTime - startTime).toBeLessThan(10); // Should complete within 10ms
      expect(result.url).toBeDefined();
    });
  });
});
