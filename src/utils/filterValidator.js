/**
 * Filter validation utilities for Twitter search URL generation
 * @module utils/filterValidator
 */

import { isValidDate, TWITTER_OPERATORS } from '../types/filters';

/**
 * Validation error structure
 * @typedef {Object} ValidationError
 * @property {string} field - Field that failed validation
 * @property {string} message - Error message
 * @property {string} [code] - Optional error code
 */

/**
 * Validation result structure
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether all validations passed
 * @property {ValidationError[]} errors - List of validation errors
 * @property {Object} [sanitizedFilters] - Sanitized filter values (if valid)
 */

/**
 * Validates minimum likes value
 * @param {number} likes - Minimum likes value to validate
 * @returns {ValidationError|null}
 */
export const validateMinLikes = (likes) => {
  console.debug('[validateMinLikes] START', { likes });
  
  if (likes === undefined || likes === null || likes === '') return null;
  
  if (typeof likes !== 'number' && (typeof likes === 'string' && isNaN(parseInt(likes)))) {
    console.debug('[validateMinLikes] ERROR: not a number', { likes });
    return {
      field: 'likesMin',
      message: 'Minimum beğeni sayısı bir sayı olmalıdır',
      code: 'INVALID_TYPE'
    };
  }
  
  const numericValue = typeof likes === 'number' ? likes : parseInt(likes);
  
  if (!Number.isInteger(numericValue)) {
    console.debug('[validateMinLikes] ERROR: not integer', { numericValue });
    return {
      field: 'likesMin',
      message: 'Minimum beğeni tam sayı olmalıdır',
      code: 'INVALID_NUMBER'
    };
  }
  
  if (numericValue < 0) {
    console.debug('[validateMinLikes] ERROR: negative', { numericValue });
    return {
      field: 'likesMin',
      message: 'Minimum beğeni negatif olamaz',
      code: 'NEGATIVE_VALUE'
    };
  }
  
  if (numericValue > Number.MAX_SAFE_INTEGER) {
    console.debug('[validateMinLikes] ERROR: too large', { numericValue });
    return {
      field: 'likesMin',
      message: 'Sayı çok büyük',
      code: 'VALUE_TOO_HIGH'
    };
  }
  
  console.debug('[validateMinLikes] END', { result: null });
  return null;
};

/**
 * Validates minimum retweets value
 * @param {number} retweets - Minimum retweets value to validate
 * @returns {ValidationError|null}
 */
export const validateMinRetweets = (retweets) => {
  if (retweets === undefined || retweets === null || retweets === 0) return null;
  
  if (!Number.isInteger(retweets)) {
    return {
      field: 'minRetweets',
      message: 'Minimum RT tam sayı olmalıdır',
      code: 'INVALID_NUMBER'
    };
  }
  
  if (retweets < 0) {
    return {
      field: 'minRetweets',
      message: 'Minimum RT negatif olamaz',
      code: 'NEGATIVE_VALUE'
    };
  }
  
  if (retweets > 1000000) {
    return {
      field: 'minRetweets',
      message: 'Minimum RT çok yüksek (maksimum 1.000.000)',
      code: 'VALUE_TOO_HIGH'
    };
  }
  
  return null;
};

/**
 * Validates date range (since and until)
 * @param {string} since - Start date
 * @param {string} until - End date
 * @returns {ValidationError[]}
 */
export const validateDateRange = (since, until) => {
  const errors = [];
  
  if (since && !isValidDate(since)) {
    errors.push({
      field: 'since',
      message: 'Geçersiz başlangıç tarihi formatı (YYYY-MM-DD olmalı)',
      code: 'INVALID_DATE_FORMAT'
    });
  }
  
  if (until && !isValidDate(until)) {
    errors.push({
      field: 'until',
      message: 'Geçersiz bitiş tarihi formatı (YYYY-MM-DD olmalı)',
      code: 'INVALID_DATE_FORMAT'
    });
  }
  
  if (since && until && isValidDate(since) && isValidDate(until)) {
    const startDate = new Date(since);
    const endDate = new Date(until);
    
    if (startDate > endDate) {
      errors.push({
        field: 'dateRange',
        message: 'Başlangıç tarihi bitiş tarihinden sonra olamaz',
        code: 'INVALID_DATE_RANGE'
      });
    }
    
    // Check if date is too far in the future
    const maxFutureDate = new Date();
    maxFutureDate.setFullYear(maxFutureDate.getFullYear() + 1);
    
    if (endDate > maxFutureDate) {
      errors.push({
        field: 'until',
        message: 'Bitiş tarihi en fazla 1 yıl sonrası olabilir',
        code: 'DATE_TOO_FAR_FUTURE'
      });
    }
  }
  
  return errors;
};

/**
 * Validates language code
 * @param {string} lang - Language code to validate
 * @returns {ValidationError|null}
 */
export const validateLanguage = (lang) => {
  console.debug('[validateLanguage] START', { lang });
  
  if (!lang || lang === '') return null;
  
  // Common Twitter language codes
  const validLanguages = [
    'ar', 'bg', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fa', 'fi', 
    'fr', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'lv', 'ms', 
    'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'th', 'tr', 
    'uk', 'ur', 'vi', 'zh-cn', 'zh-tw'
  ];
  
  // Check format first
  if (lang.length !== 2) {
    console.debug('[validateLanguage] ERROR: invalid format', { lang });
    return {
      field: 'language',
      message: 'Dil kodu 2 karakter olmalıdır (örn: en, tr)',
      code: 'INVALID_FORMAT'
    };
  }
  
  if (!validLanguages.includes(lang.toLowerCase())) {
    console.debug('[validateLanguage] ERROR: unknown language', { lang });
    return {
      field: 'language',
      message: 'Bilinmeyen dil kodu',
      code: 'INVALID_LANGUAGE'
    };
  }
  
  console.debug('[validateLanguage] END', { result: null });
  return null;
};

/**
 * Validates username (from/to)
 * @param {string} username - Username to validate
 * @param {'from'|'to'} field - Field name
 * @returns {ValidationError|null}
 */
export const validateUsername = (username, field) => {
  console.debug(`[validateUsername] START`, { username, field });
  
  if (!username || username === '') return null;
  
  // Check for @ symbol
  if (username.includes('@')) {
    console.debug(`[validateUsername] ERROR: @ in username`, { username });
    return {
      field,
      message: 'Kullanıcı adını @ işareti olmadan yazın',
      code: 'INVALID_USERNAME_AT'
    };
  }
  
  // Remove @ if present
  const cleanUsername = username.startsWith('@') ? username.substring(1) : username;
  
  // Twitter username rules
  const usernameRegex = /^[A-Za-z0-9_]{1,15}$/;
  
  if (cleanUsername.length > 15) {
    console.debug(`[validateUsername] ERROR: too long`, { username });
    return {
      field,
      message: 'Kullanıcı adı en fazla 15 karakter olabilir',
      code: 'USERNAME_TOO_LONG'
    };
  }
  
  if (!usernameRegex.test(cleanUsername)) {
    console.debug(`[validateUsername] ERROR: invalid characters`, { username });
    return {
      field,
      message: 'Geçersiz kullanıcı adı (sadece harf, rakam ve alt çizgi kullanılabilir)',
      code: 'INVALID_USERNAME'
    };
  }
  
  console.debug(`[validateUsername] END`, { result: null });
  return null;
};

/**
 * Validates text search query
 * @param {string} text - Text search query
 * @returns {ValidationError|null}
 */
export const validateTextSearch = (text) => {
  console.debug('[validateTextSearch] START', { text });
  
  if (!text || text === '') return null;
  
  if (text.length > 500) {
    console.debug('[validateTextSearch] ERROR: too long', { length: text.length });
    return {
      field: 'textSearch',
      message: 'Arama metni çok uzun (maksimum 500 karakter)',
      code: 'TEXT_TOO_LONG'
    };
  }
  
  // Check for balanced quotes
  const doubleQuotes = (text.match(/"/g) || []).length;
  if (doubleQuotes % 2 !== 0) {
    console.debug('[validateTextSearch] ERROR: unbalanced quotes', { doubleQuotes });
    return {
      field: 'textSearch',
      message: 'Tırnak işaretleri dengeli değil',
      code: 'UNBALANCED_QUOTES'
    };
  }
  
  console.debug('[validateTextSearch] END', { result: null });
  return null;
};

/**
 * Validates all filter parameters
 * @param {import('../types/filters').SearchFilters} filters - Filters to validate
 * @returns {ValidationResult}
 */
export const validateFilters = (filters) => {
  // Handle null, undefined or non-object inputs
  if (!filters || typeof filters !== 'object') {
    return {
      isValid: true,
      errors: [],
      sanitizedFilters: {}
    };
  }
  
  // Handle string input (convert to object)
  if (typeof filters === 'string') {
    return {
      isValid: true,
      errors: [],
      sanitizedFilters: {}
    };
  }
  
  const errors = [];
  
  // Validate text search
  const textError = validateTextSearch(filters.textSearch);
  if (textError) errors.push(textError);
  
  // Validate minimum likes
  const likesError = validateMinLikes(filters.likesMin);
  if (likesError) errors.push(likesError);
  
  // Validate minimum retweets
  const retweetsError = validateMinRetweets(filters.minRetweets);
  if (retweetsError) errors.push(retweetsError);
  
  // Validate date range
  const dateErrors = validateDateRange(filters.since, filters.until);
  errors.push(...dateErrors);
  
  // Validate language
  const langError = validateLanguage(filters.lang);
  if (langError) errors.push(langError);
  
  // Validate usernames
  const fromError = validateUsername(filters.from || filters.fromUser, 'from');
  if (fromError) errors.push(fromError);
  
  const toError = validateUsername(filters.to || filters.toUser, 'to');
  if (toError) errors.push(toError);
  
  // Return validation result
  if (errors.length > 0) {
    return {
      isValid: false,
      errors
    };
  }
  
  // Sanitize filters if valid - now returns completely sanitized object
  const sanitizedFilters = sanitizeFilters(filters);
  
  return {
    isValid: true,
    errors: [],
    sanitizedFilters
  };
};

/**
 * Validates if a date string is valid
 * @param {string} date - Date string to validate
 * @returns {ValidationError|null}
 */
const validateDate = (date) => {
  if (!date) return null;
  
  if (!isValidDate(date)) {
    return {
      field: date.includes('-') && date.split('-')[0].length === 4 ? 'date' : 'date',
      message: 'Geçersiz tarih formatı (YYYY-MM-DD olmalı)',
      code: 'INVALID_DATE_FORMAT'
    };
  }
  
  // Check if date is a valid date (not something like 2024-13-01)
  const dateObj = new Date(date);
  const parts = date.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  if (dateObj.getFullYear() !== year || 
      dateObj.getMonth() + 1 !== month || 
      dateObj.getDate() !== day) {
    return {
      field: 'date',
      message: 'Invalid date',
      code: 'INVALID_DATE_VALUE'
    };
  }
  
  return null;
};

/**
 * Sanitizes filter values
 * @param {import('../types/filters').SearchFilters} filters
 * @returns {import('../types/filters').SearchFilters}
 */
const sanitizeFilters = (filters) => {
  if (!filters || typeof filters !== 'object') {
    return {};
  }
  
  const sanitized = {};
  
  // Text fields - trim and skip empty
  const textFields = ['textSearch'];
  textFields.forEach(field => {
    const value = filters[field];
    if (value && typeof value === 'string' && value.trim()) {
      sanitized[field] = value.trim();
    }
  });
  
  // Handle username fields (remove @ symbol) - check both field names
  const userFields = [
    { field: 'from', altField: 'fromUser' },
    { field: 'to', altField: 'toUser' }
  ];
  
  userFields.forEach(({ field, altField }) => {
    const value = filters[field] || filters[altField];
    if (value && typeof value === 'string' && value.trim()) {
      sanitized[field] = value.replace('@', '').trim();
    }
  });
  
  // Number fields - only include if > 0
  const numberFields = ['likesMin', 'retweetsMin'];
  numberFields.forEach(field => {
    const value = filters[field];
    if (value !== undefined && value !== null && value !== '') {
      const numericValue = typeof value === 'number' ? value : parseInt(value);
      if (!isNaN(numericValue) && numericValue > 0) {
        sanitized[field] = numericValue;
      }
    }
  });
  
  // Date fields - only include if valid
  const dateFields = ['since', 'until'];
  dateFields.forEach(field => {
    const value = filters[field];
    if (value && isValidDate(value)) {
      sanitized[field] = value;
    }
  });
  
  // Language field - check both field names
  const langValue = filters.lang || filters.language;
  if (langValue && langValue !== 'tr') {
    sanitized.language = langValue.toLowerCase();
  }
  
  // Boolean fields - only include if true
  const booleanFields = ['hasMedia', 'hasImages', 'hasVideos', 'isQuestion', 'isReply'];
  booleanFields.forEach(field => {
    if (filters[field] === true) {
      sanitized[field] = true;
    }
  });
  
  return sanitized;
};

/**
 * Validates a single field
 * @param {string} fieldName - Field name to validate
 * @param {*} value - Field value
 * @returns {ValidationResult}
 */
export const validateField = (fieldName, value) => {
  const filters = { [fieldName]: value };
  
  switch (fieldName) {
    case 'textSearch':
      const textError = validateTextSearch(value);
      return {
        isValid: !textError,
        errors: textError ? [textError] : []
      };
    
    case 'likesMin':
      const likesError = validateMinLikes(value);
      return {
        isValid: !likesError,
        errors: likesError ? [likesError] : []
      };
    
    case 'minRetweets':
      const retweetsError = validateMinRetweets(value);
      return {
        isValid: !retweetsError,
        errors: retweetsError ? [retweetsError] : []
      };
    
    case 'since':
    case 'until':
      const dateError = value && !isValidDate(value) ? [{
        field: fieldName,
        message: 'Geçersiz tarih formatı (YYYY-MM-DD olmalı)',
        code: 'INVALID_DATE_FORMAT'
      }] : [];
      return {
        isValid: dateError.length === 0,
        errors: dateError
      };
    
    case 'lang':
      const langError = validateLanguage(value);
      return {
        isValid: !langError,
        errors: langError ? [langError] : []
      };
    
    case 'from':
    case 'to':
      const usernameError = validateUsername(value, fieldName);
      return {
        isValid: !usernameError,
        errors: usernameError ? [usernameError] : []
      };
    
    default:
      return {
        isValid: true,
        errors: []
      };
  }
};

// Export validation utilities
export { validateDate, sanitizeFilters };

// REMOVED DUPLICATE EXPORTS
