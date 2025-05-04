/**
 * Twitter URL Generator test cases
 */

import { describe, test, expect } from 'vitest';
import { createTwitterSearchUrl, SORT_OPTIONS } from '../utils/twitterUrlGenerator';

describe('Twitter URL Generator', () => {
  describe('createTwitterSearchUrl', () => {
    test('should return empty URL for invalid filters', () => {
      const result = createTwitterSearchUrl({
        likesMin: -10,
        since: 'invalid-date'
      });
      expect(result.url).toBe('');
      expect(result.errors).toHaveLength(2);
    });

    test('should generate basic search URL', () => {
      const result = createTwitterSearchUrl({
        textSearch: 'javascript'
      });
      expect(result.url).toContain('https://twitter.com/search');
      expect(result.url).toContain('q=javascript');
      expect(result.url).toContain('f=live');
      expect(result.errors).toHaveLength(0);
    });

    test('should handle user filters', () => {
      const result = createTwitterSearchUrl({
        from: 'nasa',
        to: 'spacex'
      });
      expect(result.url).toContain('from:nasa');
      expect(result.url).toContain('to:spacex');
    });

    test('should handle date filters', () => {
      const result = createTwitterSearchUrl({
        since: '2024-01-01',
        until: '2024-12-31'
      });
      expect(result.url).toContain('since:2024-01-01');
      expect(result.url).toContain('until:2024-12-31');
    });

    test('should handle engagement filters', () => {
      const result = createTwitterSearchUrl({
        likesMin: 100,
        minRetweets: 50
      });
      expect(result.url).toContain('min_faves:100');
      expect(result.url).toContain('min_retweets:50');
    });

    test('should handle language filter', () => {
      const result = createTwitterSearchUrl({
        lang: 'en'
      });
      expect(result.url).toContain('lang:en');
    });

    test('should handle media filters', () => {
      const result = createTwitterSearchUrl({
        media: true,
        hasImages: true,
        hasVideos: true
      });
      expect(result.url).toContain('filter:media');
      expect(result.url).toContain('filter:images');
      expect(result.url).toContain('filter:videos');
    });

    test('should handle tweet type filters', () => {
      const result = createTwitterSearchUrl({
        isQuestion: true,
        isReply: true
      });
      expect(result.url).toContain('?');
      expect(result.url).toContain('is:reply');
    });

    test('should handle hashtags', () => {
      const result = createTwitterSearchUrl({
        hashtags: ['javascript', 'react']
      });
      expect(result.url).toContain('#javascript');
      expect(result.url).toContain('#react');
    });

    test('should handle exclude words', () => {
      const result = createTwitterSearchUrl({
        excludeWords: ['spam', 'bot']
      });
      expect(result.url).toContain('-spam');
      expect(result.url).toContain('-bot');
    });

    test('should combine multiple filters', () => {
      const result = createTwitterSearchUrl({
        textSearch: 'javascript react',
        from: 'github',
        likesMin: 100,
        lang: 'en',
        media: true,
        hashtags: ['webdev']
      });
      expect(result.url).toContain('javascript react');
      expect(result.url).toContain('from:github');
      expect(result.url).toContain('min_faves:100');
      expect(result.url).toContain('lang:en');
      expect(result.url).toContain('filter:media');
      expect(result.url).toContain('#webdev');
    });

    test('should handle empty filters', () => {
      const result = createTwitterSearchUrl({});
      expect(result.url).toBe('https://twitter.com/search?q=&f=live');
      expect(result.errors).toHaveLength(0);
    });

    test('should sanitize input values', () => {
      const result = createTwitterSearchUrl({
        textSearch: '  javascript  ',
        from: '  nasa  ',
        lang: 'EN'
      });
      expect(result.url).toContain('javascript');
      expect(result.url).toContain('from:nasa');
      expect(result.url).toContain('lang:en');
    });
  });

  describe('SORT_OPTIONS', () => {
    test('should have correct sort options', () => {
      expect(SORT_OPTIONS.TOP).toBe('top');
      expect(SORT_OPTIONS.LATEST).toBe('live');
      expect(SORT_OPTIONS.PEOPLE).toBe('user');
      expect(SORT_OPTIONS.PHOTOS).toBe('image');
      expect(SORT_OPTIONS.VIDEOS).toBe('video');
    });
  });
});
