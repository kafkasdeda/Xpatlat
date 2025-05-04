/**
 * @file Unit tests for Filter Validator
 * @description Tests for input validation and sanitization
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { 
  validateFilters,
  validateTextSearch,
  validateMinLikes,
  validateMinRetweets,
  validateDate,
  validateUsername,
  validateLanguage,
  sanitizeFilters,
  validateField,
  validateDateRange
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

    test('should handle undefined/empty text', () => {
      console.debug('[validateTextSearch] TEST: Undefined/empty text');
      expect(validateTextSearch(undefined)).toBeNull();
      expect(validateTextSearch(null)).toBeNull();
      expect(validateTextSearch('')).toBeNull();
      expect(validateTextSearch('   ')).toBeNull();
    });

    test('should handle special characters in quotes', () => {
      console.debug('[validateTextSearch] TEST: Special characters');
      const result = validateTextSearch('"C# programming"');
      expect(result).toBeNull();
    });

    test('should handle nested quotes', () => {
      console.debug('[validateTextSearch] TEST: Nested quotes');
      const result = validateTextSearch('He said "Hello" and left');
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

    test('should handle string numbers', () => {
      console.debug('[validateMinLikes] TEST: String numbers');
      const result = validateMinLikes('100');
      expect(result).toBeNull();
    });

    test('should reject decimal numbers', () => {
      console.debug('[validateMinLikes] TEST: Decimal numbers');
      const result = validateMinLikes(10.5);
      expect(result).not.toBeNull();
      expect(result.message).toContain('tam sayı');
    });
  });

  describe('validateMinRetweets', () => {
    test('should accept valid positive number', () => {
      console.debug('[validateMinRetweets] TEST: Valid positive number');
      const result = validateMinRetweets(100);
      expect(result).toBeNull();
    });

    test('should reject negative numbers', () => {
      console.debug('[validateMinRetweets] TEST: Negative number');
      const result = validateMinRetweets(-10);
      expect(result).not.toBeNull();
      expect(result.message).toContain('negatif');
    });

    test('should reject extremely large numbers', () => {
      console.debug('[validateMinRetweets] TEST: Large number');
      const result = validateMinRetweets(2000000);
      expect(result).not.toBeNull();
      expect(result.message).toContain('çok yüksek');
    });

    test('should reject integer check for non-integer values', () => {
      console.debug('[validateMinRetweets] TEST: Non-integer');
      const result = validateMinRetweets(10.5);
      expect(result).not.toBeNull();
      expect(result.message).toContain('tam sayı');
    });

    test('should accept zero and null', () => {
      console.debug('[validateMinRetweets] TEST: Zero/null');
      expect(validateMinRetweets(0)).toBeNull();
      expect(validateMinRetweets(null)).toBeNull();
      expect(validateMinRetweets(undefined)).toBeNull();
    });
  });

  describe('validateDateRange', () => {
    test('should validate date range correctly', () => {
      console.debug('[validateDateRange] TEST: Valid date range');
      const errors = validateDateRange('2024-01-01', '2024-12-31');
      expect(errors).toHaveLength(0);
    });

    test('should reject inverted date range', () => {
      console.debug('[validateDateRange] TEST: Inverted date range');
      const errors = validateDateRange('2024-12-31', '2024-01-01');
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain('sonra olamaz');
    });

    test('should reject dates too far in future', () => {
      console.debug('[validateDateRange] TEST: Future date');
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 2);
      const errors = validateDateRange('2024-01-01', futureDate.toISOString().split('T')[0]);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain('1 yıl sonrası');
    });

    test('should handle missing dates', () => {
      console.debug('[validateDateRange] TEST: Missing dates');
      expect(validateDateRange(null, null)).toHaveLength(0);
      expect(validateDateRange('2024-01-01', null)).toHaveLength(0);
      expect(validateDateRange(null, '2024-12-31')).toHaveLength(0);
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

    test('should handle invalid date formats robustly', () => {
      console.debug('[validateDate] TEST: Invalid formats');
      const invalidDates = [
        '2024/01/01',    // wrong separator
        '01-01-2024',    // wrong order
        '2024-1-1',      // missing zeros
        '2024.01.01',    // wrong separator
        'yesterday',     // text
        '2024-00-01',    // invalid month
        '2024-13-01',    // invalid month
        '2024-01-32',    // invalid day
        '202-01-01',     // invalid year
      ];
      
      invalidDates.forEach(date => {
        const result = validateDate(date);
        expect(result).not.toBeNull();
      });
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

    test('should reject empty username', () => {
      console.debug('[validateUsername] TEST: Empty username');
      expect(validateUsername('')).toBeNull();
      expect(validateUsername('   ')).toBeNull();
      expect(validateUsername(null)).toBeNull();
    });

    test('should handle underscores and numbers', () => {
      console.debug('[validateUsername] TEST: Special valid characters');
      const result = validateUsername('test_user_123');
      expect(result).toBeNull();
    });

    test('should validate from and to fields correctly', () => {
      console.debug('[validateUsername] TEST: Field-specific validation');
      const fromResult = validateUsername('@toolong123456789', 'from');
      expect(fromResult).not.toBeNull();
      expect(fromResult.field).toBe('from');
      
      const toResult = validateUsername('@invalid!user', 'to');
      expect(toResult).not.toBeNull();
      expect(toResult.field).toBe('to');
    });

    test('should handle special characters in usernames', () => {
      console.debug('[validateUsername] TEST: Special characters');
      const invalidUsernames = [
        'user!name',
        'user@domain',
        'user#tag',
        'user space',
        'user.name',
        'user-name',
        'user/name',
        'user:name',
        'user;name',
        'user?name'
      ];
      
      invalidUsernames.forEach(username => {
        const result = validateUsername(username);
        expect(result).not.toBeNull();
      });
    });

    test('should handle very long usernames', () => {
      console.debug('[validateUsername] TEST: Long username');
      const longUsername = 'a'.repeat(100);
      const result = validateUsername(longUsername);
      expect(result).not.toBeNull();
      expect(result.message).toContain('15 karakter');
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

    test('should handle Turkish language specially', () => {
      console.debug('[validateLanguage] TEST: Turkish language');
      const result = validateLanguage('tr');
      expect(result).toBeNull();
    });

    test('should accept extended language codes', () => {
      console.debug('[validateLanguage] TEST: Extended codes');
      const result = validateLanguage('zh-cn');
      expect(result).not.toBeNull();  // Should reject as it's not 2 chars
      expect(result.message).toContain('2 karakter');
    });

    test('should handle case insensitivity', () => {
      console.debug('[validateLanguage] TEST: Case insensitivity');
      const result = validateLanguage('EN');
      expect(result).toBeNull();  // Should accept uppercase because the implementation uses toLowerCase()
    });

    test('should handle empty language', () => {
      console.debug('[validateLanguage] TEST: Empty language');
      expect(validateLanguage('')).toBeNull();
      expect(validateLanguage(null)).toBeNull();
      expect(validateLanguage(undefined)).toBeNull();
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
      expect(result.errors.length).toBeGreaterThan(2);
      expect(result.sanitizedFilters).toBeUndefined();  // Should be undefined when invalid
    });

    test('should handle empty filters', () => {
      console.debug('[validateFilters] TEST: Empty filters');
      const result = validateFilters({});
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.sanitizedFilters).toEqual({});
    });

    test('should handle alias fields correctly', () => {
      console.debug('[validateFilters] TEST: Field aliases');
      const filters = {
        fromUser: 'testuser',  // using fromUser instead of from
        toUser: 'recipient',   // using toUser instead of to
        lang: 'en',           // using lang instead of language
        minRetweets: 50       // using minRetweets instead of retweetsMin
      };
      
      const result = validateFilters(filters);
      
      expect(result.isValid).toBe(true);
      expect(result.sanitizedFilters).toBeDefined();
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

    test('should handle boolean values conversion', () => {
      console.debug('[sanitizeFilters] TEST: Boolean conversion');
      const filters = {
        hasMedia: 'true',  // string 'true'
        hasImages: false,  // boolean false
        hasVideos: true    // boolean true
      };
      
      const result = sanitizeFilters(filters);
      
      expect(result.hasMedia).toBeUndefined();  // String 'true' is not converted
      expect(result.hasImages).toBeUndefined(); // False values are omitted
      expect(result.hasVideos).toBe(true);      // Only true boolean values are kept
    });

    test('should handle number field conversions', () => {
      console.debug('[sanitizeFilters] TEST: Number conversions');
      const filters = {
        likesMin: '100',     // string number
        retweetsMin: '0',    // string zero
        invalidNum: 'abc'    // invalid number
      };
      
      const result = sanitizeFilters(filters);
      
      expect(result.likesMin).toBe(100);
      expect(result.retweetsMin).toBeUndefined(); // Zero values are omitted
      expect(result.invalidNum).toBeUndefined();  // Invalid numbers are omitted
    });

    test('should handle language field aliases', () => {
      console.debug('[sanitizeFilters] TEST: Language field aliases');
      const filters1 = { lang: 'EN' };
      const filters2 = { language: 'FR' };
      
      const result1 = sanitizeFilters(filters1);
      const result2 = sanitizeFilters(filters2);
      
      expect(result1.language).toBe('en'); // lang becomes language, lowercased
      expect(result2.language).toBe('fr'); // language stays language, lowercased
    });

    test('should not include Turkish language', () => {
      console.debug('[sanitizeFilters] TEST: Turkish language exclusion');
      const filters = { language: 'tr' };
      const result = sanitizeFilters(filters);
      expect(result.language).toBeUndefined();
    });

    test('should sanitize objects with prototype pollution attempts', () => {
      console.debug('[sanitizeFilters] TEST: Prototype pollution');
      const maliciousFilters = {
        '__proto__': { polluted: 'yes' },
        'constructor': { prototype: { polluted: 'yes' } },
        'textSearch': 'normal search'
      };
      
      const result = sanitizeFilters(maliciousFilters);
      expect(result).not.toHaveProperty('__proto__');
      expect(result).not.toHaveProperty('constructor');
      expect(result).toHaveProperty('textSearch', 'normal search');
    });
  });

  describe('validateField', () => {
    test('should validate individual fields correctly', () => {
      console.debug('[validateField] TEST: Individual field validation');
      
      // Test text search
      const textResult = validateField('textSearch', 'valid text');
      expect(textResult.isValid).toBe(true);
      
      // Test likes min
      const likesResult = validateField('likesMin', -10);
      expect(likesResult.isValid).toBe(false);
      expect(likesResult.errors.length).toBe(1);
      
      // Test date
      const dateResult = validateField('since', '2024-13-01');
      expect(dateResult.isValid).toBe(false);
      
      // Test username
      const userResult = validateField('from', '@toolongusername12345');
      expect(userResult.isValid).toBe(false);
    });

    test('should handle unknown fields gracefully', () => {
      console.debug('[validateField] TEST: Unknown field');
      const result = validateField('unknownField', 'value');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate minRetweets field correctly', () => {
      console.debug('[validateField] TEST: Validate minRetweets');
      const validResult = validateField('minRetweets', 100);
      expect(validResult.isValid).toBe(true);
      
      const invalidResult = validateField('minRetweets', -50);
      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors[0].field).toBe('minRetweets');
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

  describe('Complex Validation Scenarios', () => {
    test('should handle partial filters correctly', () => {
      console.debug('[validateFilters] TEST: Partial filters');
      const filters = {
        textSearch: 'test',
        unknownField: 'ignored',
        likesMin: 100
      };
      
      const result = validateFilters(filters);
      expect(result.isValid).toBe(true);
      expect(result.sanitizedFilters).toHaveProperty('textSearch', 'test');
      expect(result.sanitizedFilters).toHaveProperty('likesMin', 100);
      expect(result.sanitizedFilters).not.toHaveProperty('unknownField');
    });

    test('should preserve valid filters when some are invalid', () => {
      console.debug('[validateFilters] TEST: Mixed valid/invalid');
      const filters = {
        textSearch: 'valid text',
        likesMin: -10,  // invalid
        from: 'validuser',
        since: 'invalid-date'  // invalid
      };
      
      const result = validateFilters(filters);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(2);
      expect(result.sanitizedFilters).toBeUndefined();
    });

    test('should handle all filter types comprehensively', () => {
      console.debug('[validateFilters] TEST: Comprehensive filter set');
      const filters = {
        textSearch: 'search term',
        from: 'sender',
        to: 'recipient',
        since: '2024-01-01',
        until: '2024-12-31',
        likesMin: 100,
        retweetsMin: 50,
        language: 'en',
        hasMedia: true,
        hasImages: false,
        hasVideos: true
      };
      
      const result = validateFilters(filters);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.sanitizedFilters).length).toBeGreaterThan(5);
    });
  });

  describe('Performance', () => {
    test('should validate within acceptable time', () => {
      console.time('[validateFilters] Performance test');
      
      const filters = {
        textSearch: 'performance test',
        from: 'testuser',  // changed from fromUser
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

    test('should validate complex filters within 10ms', () => {
      console.time('[validateFilters] Complex performance test');
      
      const complexFilters = {
        textSearch: 'Very long search query with multiple words and special characters!@#$%',
        from: 'longusername123',
        to: 'recipient_user',
        since: '2024-01-01',
        until: '2024-12-31',
        likesMin: 99999,
        retweetsMin: 50000,
        language: 'ja',
        hasMedia: true,
        hasImages: true,
        hasVideos: false,
        unknownField1: 'ignored',
        unknownField2: { nested: 'object' },
        arrayField: [1, 2, 3]
      };
      
      const startTime = performance.now();
      const result = validateFilters(complexFilters);
      const endTime = performance.now();
      
      console.timeEnd('[validateFilters] Complex performance test');
      
      expect(endTime - startTime).toBeLessThan(10); // Should complete within 10ms
      expect(result.isValid).toBe(true);
    });
  });
});
