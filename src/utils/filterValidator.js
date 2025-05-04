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
const validateMinLikes = (likes) => {
  if (likes === undefined || likes === null || likes === 0) return null;
  
  if (!Number.isInteger(likes)) {
    return {
      field: 'likesMin',
      message: 'Minimum beğeni tam sayı olmalıdır',
      code: 'INVALID_NUMBER'
    };
  }
  
  if (likes < 0) {
    return {
      field: 'likesMin',
      message: 'Minimum beğeni negatif olamaz',
      code: 'NEGATIVE_VALUE'
    };
  }
  
  if (likes > 1000000) {
    return {
      field: 'likesMin',
      message: 'Minimum beğeni çok yüksek (maksimum 1.000.000)',
      code: 'VALUE_TOO_HIGH'
    };
  }
  
  return null;
};

/**
 * Validates minimum retweets value
 * @param {number} retweets - Minimum retweets value to validate
 * @returns {ValidationError|null}
 */
const validateMinRetweets = (retweets) => {
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
const validateDateRange = (since, until) => {
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
const validateLanguage = (lang) => {
  if (!lang) return null;
  
  // Common Twitter language codes
  const validLanguages = [
    'ar', 'bg', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fa', 'fi', 
    'fr', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'lv', 'ms', 
    'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'th', 'tr', 
    'uk', 'ur', 'vi', 'zh-cn', 'zh-tw'
  ];
  
  if (!validLanguages.includes(lang.toLowerCase())) {
    return {
      field: 'lang',
      message: 'Geçersiz dil kodu',
      code: 'INVALID_LANGUAGE'
    };
  }
  
  return null;
};

/**
 * Validates username (from/to)
 * @param {string} username - Username to validate
 * @param {'from'|'to'} field - Field name
 * @returns {ValidationError|null}
 */
const validateUsername = (username, field) => {
  if (!username) return null;
  
  // Twitter username rules
  const usernameRegex = /^[A-Za-z0-9_]{1,15}$/;
  
  if (!usernameRegex.test(username)) {
    return {
      field,
      message: 'Geçersiz kullanıcı adı (1-15 karakter, sadece harf, rakam ve alt çizgi)',
      code: 'INVALID_USERNAME'
    };
  }
  
  return null;
};

/**
 * Validates text search query
 * @param {string} text - Text search query
 * @returns {ValidationError|null}
 */
const validateTextSearch = (text) => {
  if (!text) return null;
  
  if (text.length > 500) {
    return {
      field: 'textSearch',
      message: 'Arama metni çok uzun (maksimum 500 karakter)',
      code: 'TEXT_TOO_LONG'
    };
  }
  
  // Check for balanced quotes
  const doubleQuotes = (text.match(/"/g) || []).length;
  if (doubleQuotes % 2 !== 0) {
    return {
      field: 'textSearch',
      message: 'Tırnak işaretleri dengeli değil',
      code: 'UNBALANCED_QUOTES'
    };
  }
  
  return null;
};

/**
 * Validates all filter parameters
 * @param {import('../types/filters').SearchFilters} filters - Filters to validate
 * @returns {ValidationResult}
 */
export const validateFilters = (filters) => {
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
  const fromError = validateUsername(filters.from, 'from');
  if (fromError) errors.push(fromError);
  
  const toError = validateUsername(filters.to, 'to');
  if (toError) errors.push(toError);
  
  // Return validation result
  if (errors.length > 0) {
    return {
      isValid: false,
      errors
    };
  }
  
  // Sanitize filters if valid
  const sanitizedFilters = {
    ...filters,
    // Trim whitespace
    textSearch: filters.textSearch?.trim() || '',
    from: filters.from?.trim() || '',
    to: filters.to?.trim() || '',
    lang: filters.lang?.toLowerCase() || 'tr',
    // Ensure numbers are integers
    likesMin: Math.max(0, parseInt(filters.likesMin) || 0),
    minRetweets: Math.max(0, parseInt(filters.minRetweets) || 0),
    // Ensure dates are properly formatted
    since: filters.since || '',
    until: filters.until || '',
    // Boolean values
    media: Boolean(filters.media),
    hasImages: Boolean(filters.hasImages),
    hasVideos: Boolean(filters.hasVideos),
    isQuestion: Boolean(filters.isQuestion),
    isReply: Boolean(filters.isReply)
  };
  
  return {
    isValid: true,
    errors: [],
    sanitizedFilters
  };
};

/**
 * Gets user-friendly error messages
 * @param {ValidationError[]} errors - Validation errors
 * @returns {string[]}
 */
export const getErrorMessages = (errors) => {
  return errors.map(error => error.message);
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
