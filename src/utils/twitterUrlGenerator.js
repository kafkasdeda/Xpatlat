import { TWITTER_OPERATORS, isFilterEmpty } from '../types/filters';
import { validateFilters } from './filterValidator';

/**
 * Creates a Twitter search URL from filters
 * @param {import('../types/filters').SearchFilters} filters - Search filters
 * @returns {{url: string, errors: import('./filterValidator').ValidationError[]}}
 */
export const createTwitterSearchUrl = (filters) => {
  console.debug('[createTwitterSearchUrl] START', { filters });
  
  // Validate filters first
  const validationResult = validateFilters(filters);
  
  if (!validationResult.isValid) {
    console.debug('[createTwitterSearchUrl] Validation failed', { errors: validationResult.errors });
    return {
      url: '',
      errors: validationResult.errors
    };
  }
  
  // Use sanitized filters
  const sanitizedFilters = validationResult.sanitizedFilters;
  
  const baseUrl = 'https://twitter.com/search';
  let queryParts = [];
  
  // Text Search
  if (sanitizedFilters.textSearch) {
    queryParts.push(sanitizedFilters.textSearch);
  }
  
  // User filters - check both field names for backward compatibility
  if (sanitizedFilters.from || filters.from) {
    queryParts.push(`from:${sanitizedFilters.from || filters.from}`);
  }
  
  if (sanitizedFilters.to || filters.to) {
    queryParts.push(`to:${sanitizedFilters.to || filters.to}`);
  }
  
  // Date filters
  if (sanitizedFilters.since || filters.since) {
    queryParts.push(`since:${sanitizedFilters.since || filters.since}`);
  }
  
  if (sanitizedFilters.until || filters.until) {
    queryParts.push(`until:${sanitizedFilters.until || filters.until}`);
  }
  
  // Engagement filters
  if (sanitizedFilters.likesMin > 0 || filters.likesMin > 0) {
    queryParts.push(`min_faves:${sanitizedFilters.likesMin || filters.likesMin}`);
  }
  
  if (sanitizedFilters.retweetsMin > 0 || filters.retweetsMin > 0) {
    queryParts.push(`min_retweets:${sanitizedFilters.retweetsMin || filters.retweetsMin}`);
  }
  
  // Language filter - only add if explicitly set
  if (filters.language && filters.language !== 'tr') {
    queryParts.push(`lang:${filters.language}`);
  }
  
  // Media filters
  if (sanitizedFilters.hasMedia || filters.hasMedia) {
    queryParts.push('filter:media');
  }
  
  if (sanitizedFilters.hasImages || filters.hasImages) {
    queryParts.push('filter:images');
  }
  
  if (sanitizedFilters.hasVideos || filters.hasVideos) {
    queryParts.push('filter:videos');
  }
  
  // Tweet type filters
  if (sanitizedFilters.isQuestion || filters.isQuestion) {
    queryParts.push('?');
  }
  
  if (sanitizedFilters.isReply || filters.isReply) {
    queryParts.push('filter:replies');
  }
  
  // Hashtag filters
  if (sanitizedFilters.hashtags && sanitizedFilters.hashtags.length > 0) {
    sanitizedFilters.hashtags.forEach(tag => {
      queryParts.push(`#${tag.replace('#', '')}`);
    });
  }
  
  // Exclude words
  if (sanitizedFilters.excludeWords && sanitizedFilters.excludeWords.length > 0) {
    sanitizedFilters.excludeWords.forEach(word => {
      queryParts.push(`-${word}`);
    });
  }
  
  // If no query parts, return empty URL without any parameters
  if (queryParts.length === 0) {
    console.debug('[createTwitterSearchUrl] No query parts, returning empty URL');
    return {
      url: `${baseUrl}?q=`,
      errors: undefined
    };
  }
  
  // Combine all query parts and properly encode
  const queryString = queryParts.join(' ');
  
  // Properly encode the URL - use encodeURIComponent for the query string
  const url = `${baseUrl}?q=${encodeURIComponent(queryString)}`;
  
  console.debug('[createTwitterSearchUrl] END', { url });
  return {
    url,
    errors: undefined
  };
};

// Re-export validation functions from filterValidator
export { validateFilters, validateField, getErrorMessages } from './filterValidator';

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
