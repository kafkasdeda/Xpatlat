/**
 * Tests for filter type definitions and utilities
 */

import { describe, test, expect } from 'vitest';
import { 
  isFilterEmpty, 
  isValidDate, 
  createFilterObject,
  DEFAULT_FILTERS,
  TWITTER_OPERATORS 
} from '../types/filters';

describe('Filter utilities', () => {
  describe('isFilterEmpty', () => {
    test('should return true for null', () => {
      expect(isFilterEmpty(null)).toBe(true);
    });
    
    test('should return true for undefined', () => {
      expect(isFilterEmpty(undefined)).toBe(true);
    });
    
    test('should return true for empty string', () => {
      expect(isFilterEmpty('')).toBe(true);
    });
    
    test('should return true for 0', () => {
      expect(isFilterEmpty(0)).toBe(true);
    });
    
    test('should return false for non-empty string', () => {
      expect(isFilterEmpty('test')).toBe(false);
    });
    
    test('should return false for positive number', () => {
      expect(isFilterEmpty(100)).toBe(false);
    });
  });

  describe('isValidDate', () => {
    test('should return true for valid date', () => {
      expect(isValidDate('2024-01-01')).toBe(true);
    });
    
    test('should return false for invalid month', () => {
      expect(isValidDate('2024-13-01')).toBe(false);
    });
    
    test('should return false for invalid day', () => {
      expect(isValidDate('2024-01-32')).toBe(false);
    });
    
    test('should return false for wrong format', () => {
      expect(isValidDate('2024/01/01')).toBe(false);
    });
    
    test('should return false for empty string', () => {
      expect(isValidDate('')).toBe(false);
    });
    
    test('should return false for null', () => {
      expect(isValidDate(null)).toBe(false);
    });
  });

  describe('createFilterObject', () => {
    test('should preserve partial values', () => {
      const partialFilter = { textSearch: 'test', lang: 'en' };
      const fullFilter = createFilterObject(partialFilter);
      
      expect(fullFilter.textSearch).toBe('test');
      expect(fullFilter.lang).toBe('en');
    });
    
    test('should use defaults for missing values', () => {
      const partialFilter = { textSearch: 'test' };
      const fullFilter = createFilterObject(partialFilter);
      
      expect(fullFilter.likesMin).toBe(DEFAULT_FILTERS.likesMin);
      expect(fullFilter.lang).toBe(DEFAULT_FILTERS.lang);
    });
  });

  describe('TWITTER_OPERATORS', () => {
    test('from syntax should be correct', () => {
      expect(TWITTER_OPERATORS.from.syntax).toBe('from:');
    });
    
    test('minFaves valueType should be number', () => {
      expect(TWITTER_OPERATORS.minFaves.valueType).toBe('number');
    });
    
    test('since valueType should be date', () => {
      expect(TWITTER_OPERATORS.since.valueType).toBe('date');
    });
  });
});
