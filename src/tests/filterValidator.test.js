/**
 * Filter Validator test cases
 */

import { describe, test, expect } from 'vitest';
import { 
  validateFilters, 
  validateField, 
  getErrorMessages 
} from '../utils/filterValidator';

describe('Filter Validator', () => {
  describe('validateFilters', () => {
    test('should return valid for empty filters', () => {
      const result = validateFilters({});
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should return valid for correct filters', () => {
      const result = validateFilters({
        textSearch: 'javascript',
        likesMin: 100,
        minRetweets: 50,
        lang: 'en',
        from: 'user123',
        to: 'recipient',
        since: '2024-01-01',
        until: '2024-12-31'
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should validate minimum likes', () => {
      const result = validateFilters({ likesMin: -10 });
      expect(result.isValid).toBe(false);
      expect(result.errors[0].field).toBe('likesMin');
      expect(result.errors[0].code).toBe('NEGATIVE_VALUE');
    });

    test('should validate date format', () => {
      const result = validateFilters({ since: '2024/01/01' });
      expect(result.isValid).toBe(false);
      expect(result.errors[0].field).toBe('since');
      expect(result.errors[0].code).toBe('INVALID_DATE_FORMAT');
    });

    test('should validate date range', () => {
      const result = validateFilters({ 
        since: '2024-12-31', 
        until: '2024-01-01' 
      });
      expect(result.isValid).toBe(false);
      expect(result.errors[0].field).toBe('dateRange');
      expect(result.errors[0].code).toBe('INVALID_DATE_RANGE');
    });

    test('should validate username format', () => {
      const result = validateFilters({ from: 'user@name' });
      expect(result.isValid).toBe(false);
      expect(result.errors[0].field).toBe('from');
      expect(result.errors[0].code).toBe('INVALID_USERNAME');
    });

    test('should validate language code', () => {
      const result = validateFilters({ lang: 'invalid' });
      expect(result.isValid).toBe(false);
      expect(result.errors[0].field).toBe('lang');
      expect(result.errors[0].code).toBe('INVALID_LANGUAGE');
    });

    test('should validate text search length', () => {
      const longText = 'a'.repeat(501);
      const result = validateFilters({ textSearch: longText });
      expect(result.isValid).toBe(false);
      expect(result.errors[0].field).toBe('textSearch');
      expect(result.errors[0].code).toBe('TEXT_TOO_LONG');
    });

    test('should validate unbalanced quotes', () => {
      const result = validateFilters({ textSearch: 'unbalanced " quote' });
      expect(result.isValid).toBe(false);
      expect(result.errors[0].field).toBe('textSearch');
      expect(result.errors[0].code).toBe('UNBALANCED_QUOTES');
    });

    test('should sanitize valid filters', () => {
      const result = validateFilters({
        textSearch: '  javascript  ',
        from: '  user123  ',
        lang: 'EN',
        likesMin: '100',
        minRetweets: '50'
      });
      expect(result.isValid).toBe(true);
      expect(result.sanitizedFilters.textSearch).toBe('javascript');
      expect(result.sanitizedFilters.from).toBe('user123');
      expect(result.sanitizedFilters.lang).toBe('en');
      expect(result.sanitizedFilters.likesMin).toBe(100);
      expect(result.sanitizedFilters.minRetweets).toBe(50);
    });
  });

  describe('validateField', () => {
    test('should validate individual field', () => {
      const result = validateField('likesMin', -10);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].field).toBe('likesMin');
    });

    test('should return valid for unknown field', () => {
      const result = validateField('unknownField', 'value');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('getErrorMessages', () => {
    test('should extract error messages', () => {
      const errors = [
        { field: 'likesMin', message: 'Minimum beğeni negatif olamaz', code: 'NEGATIVE_VALUE' },
        { field: 'since', message: 'Geçersiz tarih formatı', code: 'INVALID_DATE_FORMAT' }
      ];
      const messages = getErrorMessages(errors);
      expect(messages).toEqual([
        'Minimum beğeni negatif olamaz',
        'Geçersiz tarih formatı'
      ]);
    });
  });
});
