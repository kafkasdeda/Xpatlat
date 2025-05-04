import { TWITTER_OPERATORS, isFilterEmpty } from '../types/filters';

/**
 * Creates a Twitter search URL from filters
 * @param {import('../types/filters').SearchFilters} filters - Search filters
 * @returns {string} Twitter search URL
 */
export const createTwitterSearchUrl = (filters) => {
  const baseUrl = 'https://twitter.com/search';
  const params = new URLSearchParams();
  
  let queryParts = [];
  
  // Text Search
  if (filters.textSearch && filters.textSearch.trim()) {
    queryParts.push(filters.textSearch.trim());
  }
  
  // User filters - handle @ symbol properly
  if (filters.from && filters.from.trim()) {
    queryParts.push(`from:${filters.from.trim().replace('@', '')}`);
  }
  
  if (filters.to && filters.to.trim()) {
    queryParts.push(`to:${filters.to.trim().replace('@', '')}`);
  }
  
  // Date filters
  if (filters.since) {
    queryParts.push(`since:${filters.since}`);
  }
  
  if (filters.until) {
    queryParts.push(`until:${filters.until}`);
  }
  
  // Engagement filters
  if (filters.likesMin && filters.likesMin > 0) {
    queryParts.push(`min_faves:${filters.likesMin}`);
  }
  
  if (filters.retweetsMin && filters.retweetsMin > 0) {
    queryParts.push(`min_retweets:${filters.retweetsMin}`);
  }
  
  // Language filter
  if (filters.lang && filters.lang !== '') {
    queryParts.push(`lang:${filters.lang}`);
  }
  
  // Media filters
  if (filters.media) {
    queryParts.push('filter:media');
  }
  
  if (filters.hasImages) {
    queryParts.push('filter:images');
  }
  
  if (filters.hasVideos) {
    queryParts.push('filter:videos');
  }
  
  // Tweet type filters
  if (filters.isQuestion) {
    queryParts.push('?');
  }
  
  if (filters.isReply) {
    queryParts.push('is:reply');
  }
  
  // Hashtag filters
  if (filters.hashtags && filters.hashtags.length > 0) {
    filters.hashtags.forEach(tag => {
      queryParts.push(`#${tag.replace('#', '')}`);
    });
  }
  
  // Exclude words
  if (filters.excludeWords && filters.excludeWords.length > 0) {
    filters.excludeWords.forEach(word => {
      queryParts.push(`-${word}`);
    });
  }
  
  // Combine all query parts
  const queryString = queryParts.join(' ');
  
  if (queryString) {
    params.set('q', queryString);
    params.set('f', 'live'); // Set to "Latest" tweets by default
  }
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Validates search filters
 * @param {import('../types/filters').SearchFilters} filters
 * @returns {{valid: boolean, errors: string[]}}
 */
export const validateFilters = (filters) => {
  const errors = [];
  
  // Validate dates
  if (filters.since && !isValidDateFormat(filters.since)) {
    errors.push('Since date must be in YYYY-MM-DD format');
  }
  
  if (filters.until && !isValidDateFormat(filters.until)) {
    errors.push('Until date must be in YYYY-MM-DD format');
  }
  
  // Validate date range
  if (filters.since && filters.until) {
    const sinceDate = new Date(filters.since);
    const untilDate = new Date(filters.until);
    if (sinceDate > untilDate) {
      errors.push('Since date must be before until date');
    }
  }
  
  // Validate numeric values
  if (filters.likesMin && filters.likesMin < 0) {
    errors.push('Minimum likes cannot be negative');
  }
  
  if (filters.retweetsMin && filters.retweetsMin < 0) {
    errors.push('Minimum retweets cannot be negative');
  }
  
  // Validate language
  if (filters.lang && !isValidLanguageCode(filters.lang)) {
    errors.push('Invalid language code');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Validates date format (YYYY-MM-DD)
 * @param {string} date
 * @returns {boolean}
 */
const isValidDateFormat = (date) => {
  if (!date) return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;
  
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

/**
 * Validates language code
 * @param {string} lang
 * @returns {boolean}
 */
const isValidLanguageCode = (lang) => {
  const validCodes = ['tr', 'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'ar', 'zh'];
  return validCodes.includes(lang);
};

/**
 * Twitter sort options
 */
export const SORT_OPTIONS = {
  TOP: 'top',       // Most popular
  LATEST: 'live',   // Latest
  PEOPLE: 'user',   // People
  PHOTOS: 'image',  // Photos
  VIDEOS: 'video'   // Videos
};
