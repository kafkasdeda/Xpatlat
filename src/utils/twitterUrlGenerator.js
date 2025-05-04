import { TWITTER_OPERATORS, isFilterEmpty } from '../types/filters';
import { validateFilters } from './filterValidator';

/**
 * Creates a Twitter search URL from filters
 * @param {import('../types/filters').SearchFilters} filters - Search filters
 * @returns {{url: string, errors: import('./filterValidator').ValidationError[]}}
 */
export const createTwitterSearchUrl = (filters) => {
  // Validate filters first
  const validationResult = validateFilters(filters);
  
  if (!validationResult.isValid) {
    return {
      url: '',
      errors: validationResult.errors
    };
  }
  
  // Use sanitized filters
  const sanitizedFilters = validationResult.sanitizedFilters;
  
  const baseUrl = 'https://twitter.com/search';
  const params = new URLSearchParams();
  
  let queryParts = [];
  
  // Text Search
  if (sanitizedFilters.textSearch) {
    queryParts.push(sanitizedFilters.textSearch);
  }
  
  // User filters
  if (sanitizedFilters.from) {
    queryParts.push(`from:${sanitizedFilters.from}`);
  }
  
  if (sanitizedFilters.to) {
    queryParts.push(`to:${sanitizedFilters.to}`);
  }
  
  // Date filters
  if (sanitizedFilters.since) {
    queryParts.push(`since:${sanitizedFilters.since}`);
  }
  
  if (sanitizedFilters.until) {
    queryParts.push(`until:${sanitizedFilters.until}`);
  }
  
  // Engagement filters
  if (sanitizedFilters.likesMin > 0) {
    queryParts.push(`min_faves:${sanitizedFilters.likesMin}`);
  }
  
  if (sanitizedFilters.minRetweets > 0) {
    queryParts.push(`min_retweets:${sanitizedFilters.minRetweets}`);
  }
  
  // Language filter
  if (sanitizedFilters.lang && sanitizedFilters.lang !== '') {
    queryParts.push(`lang:${sanitizedFilters.lang}`);
  }
  
  // Media filters
  if (sanitizedFilters.media) {
    queryParts.push('filter:media');
  }
  
  if (sanitizedFilters.hasImages) {
    queryParts.push('filter:images');
  }
  
  if (sanitizedFilters.hasVideos) {
    queryParts.push('filter:videos');
  }
  
  // Tweet type filters
  if (sanitizedFilters.isQuestion) {
    queryParts.push('?');
  }
  
  if (sanitizedFilters.isReply) {
    queryParts.push('is:reply');
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
  
  // Combine all query parts
  const queryString = queryParts.join(' ');
  
  if (queryString) {
    params.set('q', queryString);
    params.set('f', 'live'); // Set to "Latest" tweets by default
  }
  
  return {
    url: `${baseUrl}?${params.toString()}`,
    errors: []
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
