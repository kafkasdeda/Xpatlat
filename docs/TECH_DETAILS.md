# Technical Details - Xpatlat Project

## 🔧 Technology Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Testing**: Vitest + Testing Library
- **Language**: JavaScript (with JSDoc for types)
- **State Management**: React Hooks
- **Storage**: LocalStorage
- **Version Control**: Git + GitHub
- **Package Manager**: npm

## 📁 Project Structure

```
Xpatlat/
├── docs/                 # Project documentation
├── src/
│   ├── components/      # React components
│   │   ├── FilterPanel.jsx
│   │   ├── ResultsPanel.jsx
│   │   └── SearchHistory.jsx
│   ├── pages/           # Page components
│   │   └── SearchPage.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useFilters.js
│   │   └── useSearchHistory.js
│   ├── services/        # Business logic services
│   │   └── storageService.js
│   ├── utils/           # Utility functions
│   │   ├── twitterUrlGenerator.js
│   │   └── filterValidator.js
│   ├── types/           # Type definitions (JSDoc)
│   │   ├── filters.js
│   │   └── index.js
│   ├── tests/           # Test files
│   │   ├── setup.js
│   │   ├── filterValidator.test.js
│   │   ├── twitterUrlGenerator.test.js
│   │   └── storageService.test.js
│   ├── data/            # Static data
│   │   └── filters.json
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .gitignore           # Git ignore rules
├── postcss.config.cjs   # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies
├── tasks.md             # Task tracking
├── PROJECT_STATUS.md    # Project status
└── PROJECT_INSTRUCTIONS.md  # Project guidelines
```

## 🛠️ Key Components

### 1. Twitter URL Generator
- **File**: `src/utils/twitterUrlGenerator.js`
- **Function**: `createTwitterSearchUrl(filters)`
- **Features**:
  - Supports all Twitter search operators
  - URL encoding
  - Validation integration
  - Debug logging

### 2. Filter Validator
- **File**: `src/utils/filterValidator.js`
- **Features**:
  - Text search validation (max 500 chars)
  - Date format validation (YYYY-MM-DD)
  - Number validation (likes, retweets)
  - Username validation (max 15 chars)
  - Language code validation
  - Sanitization functions

### 3. Storage Service
- **File**: `src/services/storageService.js`
- **Features**:
  - Search history management
  - Favorites system
  - 50 search limit (favorites excluded)
  - Import/Export functionality
  - Version control

### 4. React Components
- **FilterPanel**: Form inputs for search filters
- **ResultsPanel**: URL display and actions
- **SearchHistory**: History management UI
- **SearchPage**: Main page container

## 🔍 Twitter Search Operators Implemented

```javascript
// User filters
from: "from:username"
to: "to:username"

// Date filters
since: "since:YYYY-MM-DD"
until: "until:YYYY-MM-DD"

// Engagement filters
min_faves: "min_faves:100"
min_retweets: "min_retweets:50"

// Content filters
lang: "lang:en"
filter:media
filter:images
filter:videos
filter:replies

// Special filters
isQuestion: "?"
hashtags: "#tag1 #tag2"
excludeWords: "-word1 -word2"
```

## 📊 Current Test Coverage

- **Total Tests**: 90+
- **URL Generator Tests**: 40+
- **Filter Validator Tests**: 50+
- **Coverage**: ~75% (target: 80%)

Test files:
- `src/tests/twitterUrlGenerator.test.js`
- `src/tests/filterValidator.test.js`
- `src/tests/storageService.test.js` (pending)

## 🔧 Configuration Files

### Vite Config
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/tests/'],
      thresholds: {
        global: { branches: 80, functions: 80, lines: 80, statements: 80 }
      }
    }
  }
})
```

### Tailwind Config
```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: []
}
```

## 🎯 Remaining Technical Tasks

1. **Search Templates Implementation** (CORE-005)
   - Create template data structure
   - Build UI component
   - Add template selection logic

2. **Search History UI** (UI-003)
   - Enhance existing SearchHistory component
   - Add interactive features
   - Improve styling

3. **Test Coverage Improvement**
   - Write tests for StorageService
   - Add E2E tests
   - Reach 80% coverage target

4. **Performance Optimizations**
   - Implement React.memo where needed
   - Optimize re-renders
   - Add loading states

5. **Documentation**
   - Update README.md
   - Add JSDoc comments
   - Create user guide

## 💡 Technical Notes

1. **State Management**: Using React hooks (useState, useEffect) for local state
2. **Type Safety**: JSDoc annotations provide type checking in VS Code
3. **Error Handling**: All validations return structured error objects
4. **Debug Logging**: Console.debug used throughout for development
5. **Styling**: Tailwind CSS utility classes for all styling
6. **Testing**: Vitest with Testing Library for component tests

## 🔄 Git Branch Strategy

- `main`: Production-ready code
- `feature/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation updates
- `test/*`: Test additions/improvements

Branch naming: `type/TASK-ID-brief-description`

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vitest": "^3.1.2",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.6.3",
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.3"
  }
}
```
