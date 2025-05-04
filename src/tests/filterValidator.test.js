/**
 * @file Unit tests for Filter Validator
 * @description Tests for input validation and sanitization
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { 
  validateFilters,
  validateTextSearch,
  validateMinLikes,
  validateDate,
  validateUsername,
  validateLanguage,
  sanitizeFilters
} from '../utils/filterValidator';

describe('filterValidator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('validateTextSearch', () => {
    test('should accept valid text search', () => {
      console.debug('[validateTextSearch] TEST: Valid text');
      const result = validateTextSearch('javascript react');
      expect(result).toBeNull();
    });

    test('should reject too long text search', () => {
      console.debug('[validateTextSearch] TEST: Too long text');
      const longText = 'a'.repeat(501);
      const result = validateTextSearch(longText);
      expect(result).not.toBeNull();
      expect(result.message).toContain('500 karakter');
    });

    test('should reject unbalanced quotes', () => {
      console.debug('[validateTextSearch] TEST: Unbalanced quotes');
      const result = validateTextSearch('"unbalanced quote');
      expect(result).not.toBeNull();
      expect(result.message).toContain('tırnak');
    });

    test('should accept balanced quotes', () => {
      console.debug('[validateTextSearch] TEST: Balanced quotes');
      const result = validateTextSearch('"balanced quotes"');
      expect(result).toBeNull();
    });
  });

  describe('validateMinLikes', () => {
    test('should accept valid positive number', () => {
      console.debug('[validateMinLikes] TEST: Valid positive number');
      const result = validateMinLikes(100);
      expect(result).toBeNull();
    });

    test('should accept zero', () => {
      console.debug('[validateMinLikes] TEST: Zero');
      const result = validateMinLikes(0);
      expect(result).toBeNull();
    });

    test('should reject negative number', () => {
      console.debug('[validateMinLikes] TEST: Negative number');
      const result = validateMinLikes(-10);
      expect(result).not.toBeNull();
      expect(result.message).toContain('negatif');
    });

    test('should reject non-number values', () => {
      console.debug('[validateMinLikes] TEST: Non-number');
      const result = validateMinLikes('not a number');
      expect(result).not.toBeNull();
      expect(result.message).toContain('sayı');
    });

    test('should reject extremely large numbers', () => {
      console.debug('[validateMinLikes] TEST: Large number');
      const result = validateMinLikes(Number.MAX_SAFE_INTEGER + 1);
      expect(result).not.toBeNull();
      expect(result.message).toContain('büyük');
    });
  });

  describe('validateDate', () => {
    test('should accept valid date format', () => {
      console.debug('[validateDate] TEST: Valid date');
      const result = validateDate('2024-01-01');
      expect(result).toBeNull();
    });

    test('should reject invalid date format', () => {
      console.debug('[validateDate] TEST: Invalid format');
      const result = validateDate('01/01/2024');
      expect(result).not.toBeNull();
      expect(result.message).toContain('YYYY-MM-DD');
    });

    test('should reject invalid date values', () => {
      console.debug('[validateDate] TEST: Invalid date');
      const result = validateDate('2024-13-01'); // Invalid month
      expect(result).not.toBeNull();
      expect(result.message).toContain('Invalid date');
    });

    test('should handle edge dates', () => {
      console.debug('[validateDate] TEST: Edge dates');
      expect(validateDate('2024-02-29')).toBeNull(); // Leap year
      expect(validateDate('2023-02-29')).not.toBeNull(); // Not leap year
    });
  });

  describe('validateUsername', () => {
    test('should accept valid username', () => {
      console.debug('[validateUsername] TEST: Valid username');
      const result = validateUsername('user_name123');
      expect(result).toBeNull();
    });

    test('should reject username with @ symbol', () => {
      console.debug('[validateUsername] TEST: Username with @');
      const result = validateUsername('@username');
      expect(result).not.toBeNull();
      expect(result.message).toContain('@ işareti olmadan');
    });

    test('should reject too long username', () => {
      console.debug('[validateUsername] TEST: Too long username');
      const longUsername = 'a'.repeat(16);
      const result = validateUsername(longUsername);
      expect(result).not.toBeNull();
      expect(result.message).toContain('15 karakter');
    });

    test('should reject invalid characters', () => {
      console.debug('[validateUsername] TEST: Invalid characters');
      const result = validateUsername('user name!');
      expect(result).not.toBeNull();
      expect(result.message).toContain('kullanıcı adı');
    });
  });

  describe('validateLanguage', () => {
    test('should accept valid language code', () => {
      console.debug('[validateLanguage] TEST: Valid language');
      const result = validateLanguage('en');
      expect(result).toBeNull();
    });

    test('should reject invalid language code format', () => {
      console.debug('[validateLanguage] TEST: Invalid format');
      const result = validateLanguage('eng');
      expect(result).not.toBeNull();
      expect(result.message).toContain('2 karakter');
    });

    test('should reject unknown language code', () => {
      console.debug('[validateLanguage] TEST: Unknown language');
      const result = validateLanguage('zz');
      expect(result).not.toBeNull();
      expect(result.message).toContain('bilinmeyen');
    });
  });

  describe('validateFilters (integration)', () => {
    test('should validate all filters successfully', () => {
      console.debug('[validateFilters] TEST: All valid filters');
      const filters = {
        textSearch: 'test search',
        from: 'testuser',
        to: 'recipient',
        since: '2024-01-01',
        until: '2024-12-31',
        likesMin: 100,
        retweetsMin: 50,
        language: 'en',
        hasMedia: true
      };
      
      const result = validateFilters(filters);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.sanitizedFilters).toBeDefined();
    });

    test('should collect multiple errors', () => {
      console.debug('[validateFilters] TEST: Multiple errors');
      const filters = {
        textSearch: 'a'.repeat(501), // Too long
        from: '@invalid_too_long_username', // Has @ symbol and too long
        since: '01/01/2024', // Wrong format
        likesMin: -10 // Negative
      };
      
      const result = validateFilters(filters);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(3);
      expect(result.sanitizedFilters).toBeNull();
    });

    test('should handle empty filters', () => {
      console.debug('[validateFilters] TEST: Empty filters');
      const result = validateFilters({});
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.sanitizedFilters).toEqual({});
    });
  });

  describe('sanitizeFilters', () => {
    test('should remove empty values', () => {
      console.debug('[sanitizeFilters] TEST: Remove empty values');
      const filters = {
        textSearch: '',
        from: 'user',
        to: null,
        likesMin: undefined
      };
      
      const result = sanitizeFilters(filters);
      
      expect(result).toEqual({ from: 'user' });
    });

    test('should trim string values', () => {
      console.debug('[sanitizeFilters] TEST: Trim strings');
      const filters = {
        textSearch: '  test  ',
        from: ' user ',
        language: ' en '
      };
      
      const result = sanitizeFilters(filters);
      
      expect(result.textSearch).toBe('test');
      expect(result.from).toBe('user');
      expect(result.language).toBe('en');
    });

    test('should remove @ from usernames', () => {
      console.debug('[sanitizeFilters] TEST: Remove @ from usernames');
      const filters = {
        from: '@username',
        to: '@recipient'
      };
      
      const result = sanitizeFilters(filters);
      
      expect(result.from).toBe('username');
      expect(result.to).toBe('recipient');
    });
  });

  describe('Edge Cases', () => {
    test('should handle undefined input', () => {
      console.debug('[validateFilters] TEST: Undefined input');
      const result = validateFilters(undefined);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.sanitizedFilters).toEqual({});
    });

    test('should handle null input', () => {
      console.debug('[validateFilters] TEST: Null input');
      const result = validateFilters(null);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.sanitizedFilters).toEqual({});
    });

    test('should handle non-object input', () => {
      console.debug('[validateFilters] TEST: Non-object input');
      const result = validateFilters('not an object');
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.sanitizedFilters).toEqual({});
    });
  });

  describe('Performance', () => {
    test('should validate within acceptable time', () => {
      console.time('[validateFilters] Performance test');
      
      const filters = {
        textSearch: 'performance test',
        fromUser: 'testuser',
        since: '2024-01-01',
        until: '2024-12-31',
        likesMin: 100,
        retweetsMin: 50,
        language: 'en',
        hasMedia: true
      };
      
      const startTime = performance.now();
      const result = validateFilters(filters);
      const endTime = performance.now();
      
      console.timeEnd('[validateFilters] Performance test');
      
      expect(endTime - startTime).toBeLessThan(5); // Should complete within 5ms
      expect(result.isValid).toBe(true);
    });
  });
});
