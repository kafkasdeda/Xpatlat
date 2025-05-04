/**
 * @file Test setup configuration for Vitest
 * @description Global test configuration and mocks
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock console methods for cleaner test output
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  // Suppress certain console errors/warnings during tests
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning:') &&
      args[0].includes('ReactDOM.render')
    ) {
      return;
    }
    originalError(...args);
  };

  console.warn = (...args) => {
    originalWarn(...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Reset all mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Mock window.localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    key: vi.fn((index) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
    get length() {
      return Object.keys(store).length;
    }
  };
})();

// Mock localStorage
global.localStorage = localStorageMock;

// Make localStorage available on window object too
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Reset localStorage before each test
beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

// Mock window.navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
    readText: vi.fn(),
  },
  writable: true,
});

// Global test utilities
global.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
