# Xpatlat Teknik Detaylar 🔧

## 🏗️ Proje Mimarisi

### Klasör Yapısı
```
C:\projeler\Xpatlat\
├── src/
│   ├── components/          # React bileşenleri
│   │   ├── FilterPanel.jsx  # Filtre formu UI
│   │   ├── ResultsPanel.jsx # URL sonuç ve kopyalama
│   │   └── SearchHistory.jsx # Arama geçmişi UI
│   ├── pages/
│   │   └── SearchPage.jsx   # Ana sayfa bileşeni
│   ├── hooks/               # Custom React hooks
│   │   ├── useFilters.js    # Filtre state yönetimi
│   │   └── useSearchHistory.js # Arama geçmişi hook
│   ├── services/
│   │   └── storageService.js # LocalStorage yönetimi
│   ├── utils/
│   │   ├── twitterUrlGenerator.js # URL oluşturma
│   │   └── filterValidator.js # Form validasyonu
│   ├── types/
│   │   ├── filters.js       # JSDoc type tanımları
│   │   └── index.js         # Type exports
│   ├── tests/               # Test dosyaları
│   │   ├── setup.js         # Test konfigürasyonu
│   │   ├── filterValidator.test.js ✅
│   │   ├── twitterUrlGenerator.test.js ✅
│   │   └── storageService.test.js
│   ├── data/
│   │   └── filters.json     # Filtre meta verileri
│   ├── App.jsx              # Ana uygulama
│   ├── main.jsx             # React entry point
│   └── index.css            # Global stiller
├── .gitignore               # Git ignore kuralları
├── postcss.config.cjs       # PostCSS konfigürasyonu
├── tailwind.config.js       # Tailwind CSS ayarları
├── vite.config.js           # Vite build konfigürasyonu
└── package.json             # Proje bağımlılıkları
```

## 🛠️ Teknoloji Stack

### Frontend Framework
- **React 19**: Yeni sürüm özellikleri
- **Vite**: Modern build tool, hızlı HMR
- **Tailwind CSS 3**: Utility-first CSS framework
- **PostCSS**: CSS post-processing

### Test Framework
- **Vitest**: Vite-native test runner
- **@testing-library/react**: React component testing
- **@testing-library/jest-dom**: DOM matchers
- **Coverage**: Vitest coverage reporter

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Git**: Version control
- **GitHub**: Code repository

## 📦 Bağımlılıklar

### Production Dependencies
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.5",
    "vitest": "^1.5.0",
    "@testing-library/react": "^14.2.1",
    "@testing-library/jest-dom": "^6.1.5"
  }
}
```

## 🔧 Konfigürasyon Dosyaları

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    css: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/setup.js',
      ]
    }
  }
})
```

### tailwind.config.js
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### postcss.config.cjs
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 🏛️ Core Services

### 1. TwitterUrlGenerator
**Dosya**: `src/utils/twitterUrlGenerator.js`
**Sorumluluk**: Twitter arama URL'lerini oluşturur
**Özellikler**:
- Temel operatörler (from, to, since, until)
- Gelişmiş operatörler (min_faves, min_retweets)
- Medya filtreleri (images, videos)
- Dil ve exclude operatörleri
- URL encoding

### 2. FilterValidator
**Dosya**: `src/utils/filterValidator.js`
**Sorumluluk**: Form inputlarını valide eder
**Özellikler**:
- Date format validation
- Number range validation
- Username validation
- Language code validation
- Text length validation
- Sanitization

### 3. StorageService
**Dosya**: `src/services/storageService.js`
**Sorumluluk**: LocalStorage işlemleri
**Özellikler**:
- Search history management
- Favorites system
- Import/Export functionality
- Version control
- 50 search limit

## 🎨 UI Components

### 1. FilterPanel
**Props**: `filters`, `onFilterChange`, `onClearFilters`, `validationErrors`
**Özellikler**:
- Dynamic form fields
- Real-time validation
- Error messages
- Clear functionality

### 2. ResultsPanel
**Props**: `generatedUrl`, `onCopyUrl`, `onOpenInTwitter`
**Özellikler**:
- URL display
- Copy button
- Open in Twitter button
- Success notifications

### 3. SearchHistory
**Props**: `history`, `onSelectHistory`, `onDeleteHistory`, `onToggleFavorite`
**Özellikler**:
- History list
- Favorite toggle
- Delete functionality
- Import/Export

## 🪝 Custom Hooks

### 1. useFilters
**Return**: `{ filters, setFilters, clearFilters }`
**Özellikler**:
- Filter state management
- Update handlers
- Reset functionality

### 2. useSearchHistory
**Return**: `{ history, addToHistory, clearHistory, toggleFavorite, ... }`
**Özellikler**:
- History state management
- CRUD operations
- LocalStorage sync

## 📝 Type System (JSDoc)

### SearchFilters Type
```javascript
/**
 * @typedef {Object} SearchFilters
 * @property {string} textSearch - Arama metni
 * @property {string} from - Gönderen kullanıcı
 * @property {string} to - Alıcı kullanıcı
 * @property {string} likesMin - Minimum beğeni sayısı
 * @property {string} retweetsMin - Minimum retweet sayısı
 * @property {string} since - Başlangıç tarihi (YYYY-MM-DD)
 * @property {string} until - Bitiş tarihi (YYYY-MM-DD)
 * @property {string} language - Dil kodu (ör: tr, en)
 * @property {Object} mediaTypes - Medya tipleri
 * @property {boolean} mediaTypes.images - Resim filtresi
 * @property {boolean} mediaTypes.videos - Video filtresi
 * @property {boolean} mediaTypes.any - Herhangi bir medya
 * @property {Object} exclude - Hariç tutulacaklar
 * @property {boolean} exclude.retweets - RT'leri hariç tut
 * @property {boolean} exclude.replies - Yanıtları hariç tut
 * @property {boolean} exclude.links - Linkleri hariç tut
 * @property {Object} engagement - Etkileşim filtreleri
 * @property {boolean} engagement.hasQuestion - Soru içeren
 * @property {boolean} engagement.hasHashtags - Hashtag içeren
 */
```

## 🧪 Test Strategy

### Unit Tests
- Utility functions (100% coverage hedefi)
- Services (90% coverage hedefi)
- Hooks (85% coverage hedefi)

### Integration Tests
- Component + Hook entegrasyonu
- Service + Component entegrasyonu

### E2E Tests (Planned)
- User flows
- Form submissions
- Error scenarios

## 🔍 Debug Logging Strategy

### Log Levels
```javascript
console.debug() // Development only
console.info()  // Important information
console.warn()  // Potential issues
console.error() // Errors only
```

### Log Format
```javascript
console.debug(`[${functionName}] ${action}`, { context });
```

## 🌐 Twitter Search Operators

### Basic Operators
| Operator | Description | Example |
|----------|-------------|---------|
| from: | From user | from:nasa |
| to: | To user | to:spacex |
| since: | Start date | since:2024-01-01 |
| until: | End date | until:2024-12-31 |

### Engagement Operators
| Operator | Description | Example |
|----------|-------------|---------|
| min_faves: | Minimum likes | min_faves:100 |
| min_retweets: | Minimum RTs | min_retweets:50 |
| filter:replies | Has replies | filter:replies |

### Media Operators
| Operator | Description | Example |
|----------|-------------|---------|
| filter:media | Has media | filter:media |
| filter:images | Has images | filter:images |
| filter:videos | Has videos | filter:videos |

### Advanced Operators
| Operator | Description | Example |
|----------|-------------|---------|
| lang: | Language | lang:tr |
| -filter:retweets | No retweets | -filter:retweets |
| -filter:replies | No replies | -filter:replies |
| ? | Questions | ? |

## 🔒 Security Considerations

### Input Validation
- All user inputs are validated
- Special characters are encoded
- Length limits enforced

### Storage Security
- LocalStorage only (no sensitive data)
- No API keys or credentials
- Clear data option available

### URL Security
- Proper URL encoding
- No injection vulnerabilities
- Safe parameter handling

## 🚀 Performance Optimizations

### React Optimizations
- Functional components
- Memoization where needed
- Controlled re-renders

### Build Optimizations
- Tree shaking
- Code splitting (planned)
- Asset optimization

### Runtime Optimizations
- Debounced inputs
- Efficient state updates
- Minimal re-renders

## 📊 Analytics (Planned)

### User Metrics
- Search usage patterns
- Popular filter combinations
- Error rates

### Performance Metrics
- Page load time
- Time to interactive
- Bundle size

## 🔄 CI/CD Pipeline (Planned)

### GitHub Actions
- Automated testing
- Coverage reports
- Build verification
- Deployment automation

### Deployment Options
- GitHub Pages
- Vercel
- Netlify

## 🎯 Architecture Principles

1. **Separation of Concerns**
   - UI components are pure
   - Business logic in services
   - State management in hooks

2. **Testability**
   - Small, focused functions
   - Dependency injection
   - Mockable services

3. **Maintainability**
   - Clear file structure
   - Consistent naming
   - Comprehensive documentation

4. **Performance**
   - Minimal dependencies
   - Efficient algorithms
   - Optimized re-renders

5. **Security**
   - Input validation
   - Output encoding
   - No sensitive data storage

---
*Bu doküman proje mimarisi değiştikçe güncellenmelidir*
