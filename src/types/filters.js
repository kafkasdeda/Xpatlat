/**
 * @typedef {Object} BaseFilter
 * @property {string} key - Unique identifier for the filter
 * @property {string} label - Display label for the filter
 * @property {*} default - Default value for the filter
 */

/**
 * @typedef {BaseFilter} TextFilter
 * @property {'text'} type - Filter type identifier
 * @property {string} placeholder - Placeholder text for input
 */

/**
 * @typedef {BaseFilter} RangeFilter
 * @property {'range'} type - Filter type identifier
 * @property {number} min - Minimum value
 * @property {number} max - Maximum value
 * @property {number} step - Step increment
 */

/**
 * @typedef {BaseFilter} SelectFilter
 * @property {'select'} type - Filter type identifier
 * @property {string[]} options - Available options
 */

/**
 * @typedef {BaseFilter} CheckboxFilter
 * @property {'checkbox'} type - Filter type identifier
 */

/**
 * @typedef {TextFilter | RangeFilter | SelectFilter | CheckboxFilter} Filter
 */

/**
 * @typedef {Object} SearchFilters
 * @property {string} [textSearch] - Text search query
 * @property {number} [likesMin] - Minimum likes count
 * @property {string} [lang] - Language code
 * @property {boolean} [media] - Has media filter
 * @property {string} [from] - From user
 * @property {string} [to] - To user
 * @property {string} [since] - Since date (YYYY-MM-DD)
 * @property {string} [until] - Until date (YYYY-MM-DD)
 * @property {number} [minRetweets] - Minimum retweets
 * @property {boolean} [hasImages] - Has images
 * @property {boolean} [hasVideos] - Has videos
 * @property {boolean} [isQuestion] - Is question
 * @property {boolean} [isReply] - Is reply
 * @property {string[]} [excludeWords] - Words to exclude
 * @property {string[]} [hashtags] - Hashtags to include
 */

/**
 * @typedef {Object} TwitterOperator
 * @property {string} name - Operator name (e.g., 'from', 'to', 'since')
 * @property {string} syntax - Operator syntax (e.g., 'from:', 'to:')
 * @property {string} description - Description of what the operator does
 * @property {string} example - Example usage
 * @property {'string' | 'number' | 'boolean' | 'date'} valueType - Expected value type
 */

/**
 * Twitter search operators reference
 * @type {Object.<string, TwitterOperator>}
 */
export const TWITTER_OPERATORS = {
  from: {
    name: 'from',
    syntax: 'from:',
    description: 'Tweets from a specific user',
    example: 'from:nasa',
    valueType: 'string'
  },
  to: {
    name: 'to',
    syntax: 'to:',
    description: 'Replies to a specific user',
    example: 'to:spacex',
    valueType: 'string'
  },
  since: {
    name: 'since',
    syntax: 'since:',
    description: 'Tweets after a specific date',
    example: 'since:2024-01-01',
    valueType: 'date'
  },
  until: {
    name: 'until',
    syntax: 'until:',
    description: 'Tweets before a specific date',
    example: 'until:2024-12-31',
    valueType: 'date'
  },
  minFaves: {
    name: 'min_faves',
    syntax: 'min_faves:',
    description: 'Minimum number of likes',
    example: 'min_faves:100',
    valueType: 'number'
  },
  minRetweets: {
    name: 'min_retweets',
    syntax: 'min_retweets:',
    description: 'Minimum number of retweets',
    example: 'min_retweets:50',
    valueType: 'number'
  },
  lang: {
    name: 'lang',
    syntax: 'lang:',
    description: 'Tweets in a specific language',
    example: 'lang:en',
    valueType: 'string'
  },
  filterMedia: {
    name: 'filter:media',
    syntax: 'filter:media',
    description: 'Tweets containing media',
    example: 'filter:media',
    valueType: 'boolean'
  },
  filterImages: {
    name: 'filter:images',
    syntax: 'filter:images',
    description: 'Tweets containing images',
    example: 'filter:images',
    valueType: 'boolean'
  },
  filterVideos: {
    name: 'filter:videos',
    syntax: 'filter:videos',
    description: 'Tweets containing videos',
    example: 'filter:videos',
    valueType: 'boolean'
  }
};

/**
 * Default filter values
 * @type {SearchFilters}
 */
export const DEFAULT_FILTERS = {
  textSearch: '',
  likesMin: 0,
  lang: 'tr',
  media: false,
  from: '',
  to: '',
  since: '',
  until: '',
  minRetweets: 0,
  hasImages: false,
  hasVideos: false,
  isQuestion: false,
  isReply: false,
  excludeWords: [],
  hashtags: []
};

/**
 * Validates if a value is empty (null, undefined, empty string, or 0)
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export const isFilterEmpty = (value) => {
  return value === null || value === undefined || value === '' || value === 0;
};

/**
 * Validates date format (YYYY-MM-DD)
 * @param {string} date - Date string to validate
 * @returns {boolean}
 */
export const isValidDate = (date) => {
  if (!date) return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;
  
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

/**
 * Creates a filter object from partial input
 * @param {Partial<SearchFilters>} partial - Partial filter object
 * @returns {SearchFilters}
 */
export const createFilterObject = (partial = {}) => {
  return {
    ...DEFAULT_FILTERS,
    ...partial
  };
};
