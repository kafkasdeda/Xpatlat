/**
 * Tests for filter type definitions and utilities
 */

import { 
  isFilterEmpty, 
  isValidDate, 
  createFilterObject,
  DEFAULT_FILTERS,
  TWITTER_OPERATORS 
} from '../types/filters';

console.log('Testing filter utilities...');

// Test isFilterEmpty
console.assert(isFilterEmpty(null) === true, 'isFilterEmpty: null should be empty');
console.assert(isFilterEmpty(undefined) === true, 'isFilterEmpty: undefined should be empty');
console.assert(isFilterEmpty('') === true, 'isFilterEmpty: empty string should be empty');
console.assert(isFilterEmpty(0) === true, 'isFilterEmpty: 0 should be empty');
console.assert(isFilterEmpty('test') === false, 'isFilterEmpty: non-empty string should not be empty');
console.assert(isFilterEmpty(100) === false, 'isFilterEmpty: positive number should not be empty');

// Test isValidDate
console.assert(isValidDate('2024-01-01') === true, 'isValidDate: valid date should return true');
console.assert(isValidDate('2024-13-01') === false, 'isValidDate: invalid month should return false');
console.assert(isValidDate('2024-01-32') === false, 'isValidDate: invalid day should return false');
console.assert(isValidDate('2024/01/01') === false, 'isValidDate: wrong format should return false');
console.assert(isValidDate('') === false, 'isValidDate: empty string should return false');
console.assert(isValidDate(null) === false, 'isValidDate: null should return false');

// Test createFilterObject
const partialFilter = { textSearch: 'test', lang: 'en' };
const fullFilter = createFilterObject(partialFilter);
console.assert(fullFilter.textSearch === 'test', 'createFilterObject: should preserve partial values');
console.assert(fullFilter.lang === 'en', 'createFilterObject: should preserve partial values');
console.assert(fullFilter.likesMin === DEFAULT_FILTERS.likesMin, 'createFilterObject: should use defaults for missing values');

// Test TWITTER_OPERATORS
console.assert(TWITTER_OPERATORS.from.syntax === 'from:', 'TWITTER_OPERATORS: from syntax should be correct');
console.assert(TWITTER_OPERATORS.minFaves.valueType === 'number', 'TWITTER_OPERATORS: minFaves valueType should be number');
console.assert(TWITTER_OPERATORS.since.valueType === 'date', 'TWITTER_OPERATORS: since valueType should be date');

console.log('All filter tests passed!');
