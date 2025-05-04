/**
 * @file Unit tests for Twitter URL Generator
 * @description Tests for URL generation with various filter combinations
 */

/**
 * @file Unit tests for Twitter URL Generator
 * @description Tests for URL generation with various filter combinations
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { createTwitterSearchUrl, SORT_OPTIONS } from '../utils/twitterUrlGenerator';

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

    test('should handle images filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: Images filter');
      const filters = {
        hasImages: true
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=filter%3Aimages');
      expect(result.errors).toBeUndefined();
    });

    test('should handle videos filter', () => {
      console.debug('[createTwitterSearchUrl] TEST: Videos filter');
      const filters = {
        hasVideos: true
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=filter%3Avideos');
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

    test('should handle hashtags and exclude words', () => {
      console.debug('[createTwitterSearchUrl] TEST: Hashtags and exclude words');
      const filters = {
        textSearch: 'crypto news',
        hashtags: ['bitcoin', 'ethereum'],
        excludeWords: ['scam', 'fake']
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toContain('crypto%20news');
      expect(result.url).toContain('%23bitcoin');
      expect(result.url).toContain('%23ethereum');
      expect(result.url).toContain('-scam');
      expect(result.url).toContain('-fake');
      expect(result.errors).toBeUndefined();
    });

    test('should handle question and reply filters', () => {
      console.debug('[createTwitterSearchUrl] TEST: Question and reply filters');
      const filters = {
        textSearch: 'help',
        isQuestion: true,
        isReply: true
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toContain('help');
      expect(result.url).toContain('%3F');
      expect(result.url).toContain('filter%3Areplies');
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

    test('should handle filters with only false boolean values', () => {
      console.debug('[createTwitterSearchUrl] TEST: False boolean values');
      const filters = {
        hasMedia: false,
        hasImages: false,
        hasVideos: false,
        isQuestion: false,
        isReply: false
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

  describe('Default Turkish Language', () => {
    test('should not add language filter for default Turkish', () => {
      console.debug('[createTwitterSearchUrl] TEST: Default Turkish language');
      const filters = {
        textSearch: 'merhaba',
        language: 'tr'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toBe('https://twitter.com/search?q=merhaba');
      expect(result.url).not.toContain('lang%3Atr');
      expect(result.errors).toBeUndefined();
    });

    test('should add language filter for non-Turkish languages', () => {
      console.debug('[createTwitterSearchUrl] TEST: Non-Turkish language');
      const filters = {
        textSearch: 'hello',
        language: 'en'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toContain('hello');
      expect(result.url).toContain('lang%3Aen');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Backward Compatibility', () => {
    test('should support old field names for from/to filters', () => {
      console.debug('[createTwitterSearchUrl] TEST: Backward compatibility');
      const filters = {
        from: 'legacyuser'  // Note: using non-sanitized field name
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toContain('from%3Alegacyuser');
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Hashtag Handling', () => {
    test('should handle hashtags with and without # prefix', () => {
      console.debug('[createTwitterSearchUrl] TEST: Hashtag prefix handling');
      const filters = {
        hashtags: ['#bitcoin', 'ethereum', '#crypto']
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toContain('%23bitcoin');
      expect(result.url).toContain('%23ethereum');
      expect(result.url).toContain('%23crypto');
      expect(result.url).not.toContain('%23%23');  // Should not double the # symbol
    });
  });

  describe('URL Encoding', () => {
    test('should properly encode complex search queries', () => {
      console.debug('[createTwitterSearchUrl] TEST: Complex URL encoding');
      const filters = {
        textSearch: 'C# & Java || Python / Ruby',
        from: 'user@domain.com'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      // Check that URL is properly encoded
      expect(result.url).toContain('C%23%20%26%20Java%20%7C%7C%20Python%20%2F%20Ruby');
      expect(result.url).toContain('from%3Auser%40domain.com');
    });

    test('should handle multiple spaces in search text', () => {
      console.debug('[createTwitterSearchUrl] TEST: Multiple spaces handling');
      const filters = {
        textSearch: 'hello    world    test'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      // Multiple spaces should be preserved in encoding
      expect(result.url).toContain('hello%20%20%20%20world%20%20%20%20test');
    });
  });

  describe('Real-world Scenarios', () => {
    test('should handle viral content search pattern', () => {
      console.debug('[createTwitterSearchUrl] TEST: Viral content pattern');
      const filters = {
        likesMin: 1000,
        retweetsMin: 500,
        hasMedia: true,
        language: 'en',
        since: '2024-01-01'
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toContain('min_faves%3A1000');
      expect(result.url).toContain('min_retweets%3A500');
      expect(result.url).toContain('filter%3Amedia');
      expect(result.url).toContain('lang%3Aen');
      expect(result.url).toContain('since%3A2024-01-01');
    });

    test('should handle customer service search pattern', () => {
      console.debug('[createTwitterSearchUrl] TEST: Customer service pattern');
      const filters = {
        to: 'amazon_help',
        textSearch: 'order problem',
        isQuestion: true
      };
      
      const result = createTwitterSearchUrl(filters);
      
      expect(result.url).toContain('order%20problem');
      expect(result.url).toContain('to%3Aamazon_help');
      expect(result.url).toContain('%3F');
    });
  });
});

describe('SORT_OPTIONS', () => {
  test('should export correct sort options', () => {
    expect(SORT_OPTIONS.TOP).toBe('top');
    expect(SORT_OPTIONS.LATEST).toBe('live');
    expect(SORT_OPTIONS.PEOPLE).toBe('user');
    expect(SORT_OPTIONS.PHOTOS).toBe('image');
    expect(SORT_OPTIONS.VIDEOS).toBe('video');
  });
});

describe('Error Recovery', () => {
  test('should handle validation function throwing error', () => {
    console.debug('[createTwitterSearchUrl] TEST: Validation error handling');
    // Mock a failing validation
    const originalValidation = vi.spyOn(console, 'error');
    
    const filters = {
      likesMin: 'invalid_number'  // This should trigger a validation error
    };
    
    const result = createTwitterSearchUrl(filters);
    
    expect(result.errors).toBeDefined();
    expect(result.url).toBe('');
    
    originalValidation.mockRestore();
  });
});

describe('Integration Tests', () => {
  test('should work with filterValidator integration', async () => {
    console.debug('[createTwitterSearchUrl] TEST: FilterValidator integration');
    // This tests the actual integration with filterValidator
    const filters = {
      textSearch: 'test',
      likesMin: 100,
      since: '2024-01-01',
      language: 'en'
    };
    
    const result = createTwitterSearchUrl(filters);
    
    expect(result.errors).toBeUndefined();
    expect(result.url).toContain('test');
    expect(result.url).toContain('min_faves%3A100');
    expect(result.url).toContain('since%3A2024-01-01');
    expect(result.url).toContain('lang%3Aen');
  });

  test('should handle sanitized filters', () => {
    console.debug('[createTwitterSearchUrl] TEST: Sanitized filters');
    const filters = {
      textSearch: '   test   ',  // Should be trimmed
      from: '@username',         // Should remove @
      likesMin: '100',          // Should convert to number
      hasMedia: 'true'          // Should convert to boolean
    };
    
    const result = createTwitterSearchUrl(filters);
    
    expect(result.url).toContain('test');  // Trimmed
    expect(result.url).toContain('from%3Ausername');  // @ removed
    expect(result.url).toContain('min_faves%3A100');  // Converted to number
    expect(result.url).toContain('filter%3Amedia');   // Converted to boolean
  });
});

describe('URL Structure Validation', () => {
  test('should always return a complete URL structure', () => {
    const scenarios = [
      {},  // Empty filters
      { invalidField: 'value' },  // Unknown field
      { likesMin: -100 },  // Invalid value
      { from: null, to: undefined }  // Null/undefined values
    ];
    
    scenarios.forEach(filters => {
      const result = createTwitterSearchUrl(filters);
      
      // Should always have base URL structure
      expect(result.url).toMatch(/^https:\/\/twitter\.com\/search\?q=/i);
      
      // Result should always have url property
      expect(result).toHaveProperty('url');
    });
  });
});
