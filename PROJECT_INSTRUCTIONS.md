## 🤖 Git İşlemlerini Otomatikleştirme

### git_yapilacaklar.py Kullanımı

Git işlemlerini kolaylaştırmak için `git_yapilacaklar.py` script'i kullanılabilir.

```bash
# Script'i çalıştır
python git_yapilacaklar.py
```

#### Script Seçenekleri:

1. **Mevcut değişiklikleri kaydet ve push et**
   - Tüm değişiklikleri otomatik olarak ekler
   - Commit atar ve push eder

2. **PR oluşturma talimatlarını göster**
   - GitHub'da PR oluşturma adımlarını gösterir

3. **Main branch'i güncelle**
   - Main branch'e geçer ve son değişiklikleri çeker

4. **Yeni task başlat**
   - Yeni feature branch oluşturur
   - Boş commit atar
   - GitHub'a push eder

5. **Tam iş akışı**
   - Değişiklikleri kaydeder
   - PR talimatlarını gösterir
   - Main branch'i günceller
   - İsteğe bağlı yeni task başlatır

### Örnek Kullanım:

```bash
# Yeni task başlatmak için
python git_yapilacaklar.py
# Seçim: 4
# Task ID: CORE-005
# Task açıklaması: search templates
```

### Tam İş Akışı İçin:

```bash
# Tam iş akışı seçeneği
python git_yapilacaklar.py
# Seçim: 5
# Adımları takip et
```

Bu script sayesinde Git komutlarını tek tek yazmak yerine interaktif menü üzerinden kolayca yönetebilirsiniz.

## 📚 Git ve GitHub İş Akışı (15 Yaşında Birine Anlatır Gibi)

### Git Nedir?
Git, kodlarınızın geçmişini takip eden bir sistem. Bir Word belgesinde "Geri Al" tuşuna basmak gibi, ama çok daha güçlü.

### GitHub Nedir?
GitHub, kodlarımızı sakladığımız bir bulut servisi. Google Drive'a dosya yükler gibi, biz de kodlarımızı GitHub'a yüklüyoruz.

### Temel Git Komutları ve Ne İşe Yararlar

1. **git status**
   - "Hangi dosyalar değişti?" sorusuna cevap verir
   - Hangi branch'te olduğunuzu gösterir
   - Commit edilmemiş değişiklikleri listeler

2. **git add [dosya]**
   - "Bu dosyayı kaydetmeye hazırla" demek
   - Örnek: `git add tasks.md`
   - Tüm dosyalar için: `git add .`

3. **git commit -m "mesaj"**
   - "Bu değişiklikleri kaydet" demek
   - Mesaj kısmı ne yaptığınızı açıklar
   - Örnek: `git commit -m "test: add filter validation tests"`

4. **git push**
   - "Bu değişiklikleri GitHub'a yükle" demek
   - Örnek: `git push origin feature/test-branch`

5. **git pull**
   - "GitHub'daki son değişiklikleri indir" demek
   - Örnek: `git pull origin main`

6. **git checkout**
   - "Başka bir branch'e geç" demek
   - Yeni branch: `git checkout -b feature/yeni-ozellik`
   - Var olan branch: `git checkout main`

### Pull Request Nedir?
Pull Request (PR), "Yazdığım kodları ana projeye ekleyebilir miyiz?" diye sormak demek.

### Pull Request Nasıl Açılır?

1. **Kodları GitHub'a Yükleyin**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-branch-name
   ```

2. **GitHub Web Sitesine Gidin**
   - Tarayıcıda açın: `https://github.com/kullaniciadi/proje-adi`

3. **Pull Request Oluşturun**
   - Sarı banner'da "Compare & pull request" düğmesine tıklayın
   - Başlık ve açıklama yazın
   - "Create pull request" düğmesine tıklayın

4. **Merge Edin**
   - Yeşil "Merge pull request" düğmesine tıklayın
   - "Confirm merge" düğmesine tıklayın

5. **Local'i Güncelleyin**
   ```bash
   git checkout main
   git pull origin main
   ```

### Branch Nedir?
Branch, projenin farklı versiyonları gibi düşünün. Ana kitabı bozmadan yeni bir bölüm yazmak gibi.

- **main/master**: Ana branch, canlı kod
- **feature/**: Yeni özellikler için
- **fix/**: Hata düzeltmeleri için
- **test/**: Test kodları için

### Git İş Akışı Örneği

1. Yeni feature için branch oluştur
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/yeni-ozellik
   ```

2. Kod yaz ve commit et
   ```bash
   # Kod yaz...
   git add .
   git commit -m "feat: implement new feature"
   ```

3. GitHub'a yükle
   ```bash
   git push origin feature/yeni-ozellik
   ```

4. Pull Request aç (GitHub web sitesinde)

5. Code review ve merge

6. Local'i güncelle
   ```bash
   git checkout main
   git pull origin main
   ```

### Sık Karşılaşılan Sorunlar

1. **"Permission denied"**
   - GitHub'a giriş yapmamışsınızdır
   - Çözüm: GitHub Desktop kullanın veya SSH key ayarlayın

2. **"Merge conflict"**
   - İki kişi aynı yeri değiştirmiş
   - Çözüm: Çakışan dosyaları manuel düzenleyin

3. **"Branch already exists"**
   - Bu isimde branch zaten var
   - Çözüm: Farklı isim kullanın

### Altın Kurallar

1. Her zaman güncel main'den başlayın
2. Küçük, sık commitler yapın
3. Anlamlı commit mesajları yazın
4. Test etmeden push etmeyin
5. PR açmadan önce kodunuzu gözden geçirin

# Xpatlat Project Instructions

## 🎯 Project Philosophy
"Etik Twitter arama URL üreticisi - Veri çekmiyoruz, sadece doğru soruları soruyoruz"

## 🚨 IMPORTANT: Claude Desktop Check
**Before making any file changes, I should always ask:**
"Claude masaüstü uygulamasında mısınız? (Browser'da değil)"

If you are in the browser, I cannot modify files directly.
If you are in the desktop app, I can handle file operations for you.

## 🤖 What I Can Do vs What YOU MUST DO

### When I'm in Claude Desktop App:
- ✅ Read all project files
- ✅ Create new files and folders
- ✅ Edit existing files
- ✅ Delete files
- ✅ Move/rename files
- ✅ List directory contents
- ✅ Update all markdown files (tasks.md, PROJECT_STATUS.md, etc.)

### What YOU MUST DO (Even in Desktop App):
**BUNU SİZİN YAPMANIZ GEREKİYOR:**
1. **Git Operations**
   - `git add .`
   - `git commit -m "message"`
   - `git push`
   - `git checkout`
   - Branch operations
   - Merge operations

2. **Terminal Commands**
   - `npm install`
   - `npm run dev`
   - `npm run build`
   - Running tests
   - Starting servers

3. **Testing**
   - Manual testing in browser
   - Verifying functionality
   - Cross-browser testing

### When I'm in Browser:
**BUNU SİZİN YAPMANIZ GEREKİYOR:**
1. All file operations (create, edit, delete)
2. All Git operations
3. All terminal commands
4. Copying code I provide into your files

## 🤖 What I Can Do vs What YOU MUST DO

### When I'm in Claude Desktop App:
- ✅ Read all project files
- ✅ Create new files and folders
- ✅ Edit existing files
- ✅ Delete files
- ✅ Move/rename files
- ✅ List directory contents
- ✅ Update all markdown files (tasks.md, PROJECT_STATUS.md, etc.)

### What YOU MUST DO (Even in Desktop App):
**BUNU SİZİN YAPMANIZ GEREKİYOR:**
1. **Git Operations**
   - `git add .`
   - `git commit -m "message"`
   - `git push`
   - `git checkout`
   - Branch operations
   - Merge operations

2. **Terminal Commands**
   - `npm install`
   - `npm run dev`
   - `npm run build`
   - Running tests
   - Starting servers

3. **Testing**
   - Manual testing in browser
   - Verifying functionality
   - Cross-browser testing

### When I'm in Browser:
**BUNU SİZİN YAPMANIZ GEREKİYOR:**
1. All file operations (create, edit, delete)
2. All Git operations
3. All terminal commands
4. Copying code I provide into your files

## 🧪 STRICT TESTING POLICY

### IRON RULES OF TESTING 🔒
1. **NO CODE WITHOUT TESTS** - Test yoksa kod yoktur!
2. **TEST COVERAGE MINIMUM %80** - Altı kabul edilmez!
3. **TESTLER GEÇMEDEN PR KABUL EDİLMEZ** - Kırmızı = Durdur!
4. **DEBUG LOGLAR ZORUNLU** - Her kritik noktada log olmalı!

### Testing Workflow

#### Claude'un Sorumlulukları:
1. Tüm test dosyalarını hazırlar
2. Test senaryolarını yazar
3. Mock data ve test utility'lerini oluşturur
4. Debug log stratejisini belirler
5. Test konfigürasyonunu hazırlar

#### Kullanıcının Yapacakları:
```bash
# 1. Test bağımlılıklarını yükle
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# 2. Testleri çalıştır
npm run test

# 3. Test coverage raporu
npm run test:coverage

# 4. Watch mode
npm run test:watch
```

### Debug Log Standards 📝

#### Mandatory Debug Logs:
```javascript
// Function entry
console.debug(`[${functionName}] START`, { params });

// Critical points
console.debug(`[${functionName}] ${checkpoint}`, { state });

// Error situations
console.error(`[${functionName}] ERROR`, { error, context });

// Performance
console.time(`[${functionName}]`);
// ... code ...
console.timeEnd(`[${functionName}]`);

// Function exit
console.debug(`[${functionName}] END`, { result });
```

#### Log Levels:
- `console.debug()` - Development only
- `console.info()` - Important information
- `console.warn()` - Potential issues
- `console.error()` - Errors only

### Test Categories

1. **Unit Tests**
   - Every utility function
   - Every service method
   - Every hook
   - Every pure component

2. **Integration Tests**
   - Component interactions
   - Hook + Component integration
   - Service + Component integration

3. **E2E Tests**
   - Critical user flows
   - Form submissions
   - Error scenarios

### Test Coverage Requirements

| Category | Minimum Coverage |
|----------|------------------|
| Utils | 95% |
| Services | 90% |
| Hooks | 85% |
| Components | 80% |
| Overall | 85% |

### Test File Naming
- Unit tests: `[filename].test.js`
- Integration tests: `[feature].integration.test.js`
- E2E tests: `[flow].e2e.test.js`

### Test Structure (AAA Pattern)
```javascript
describe('FeatureName', () => {
  beforeEach(() => {
    // Arrange - Setup
  });

  test('should do something', () => {
    // Arrange
    const input = { /* test data */ };
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe(expectedValue);
  });

  test('should handle edge case', () => {
    // ...
  });
});
```

### Edge Cases to Test
1. Empty inputs
2. Null/undefined values
3. Invalid data types
4. Boundary values
5. Concurrent operations
6. Error scenarios
7. Performance limits

### Test Commands in package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:debug": "vitest --inspect-brk --single-thread"
  }
}
```

## 📋 Task Management System

### Core Principles

1. **Atomic Tasks**
   - Her task tek bir sorumluluk taşımalı
   - Task büyüklüğü maksimum 4 saat olmalı
   - Birbirinden bağımsız tamamlanabilir olmalı

2. **Task Identification**
   - Format: `[Category]-[Number]-[short-description]`
   - Categories: CORE, UI, TECH, DOC, TEST
   - Example: `CORE-001-create-twitter-url`

3. **Task Dependencies**
   - Açıkça belirtilmeli
   - Bağımlı task başlamadan önce bağımlılık çözülmeli
   - Circular dependency yasak

4. **Task States**
   - `Not Started` → `In Progress` → `Testing` → `Completed`
   - Blocker varsa: `Blocked` (sebep açıklanmalı)
   - İptal edilirse: `Cancelled` (sebep açıklanmalı)

### Daily Workflow

1. **Session Start**
   ```
   1. Ask "Claude masaüstü uygulamasında mısınız?"
   2. Review tasks.md
   3. Check PROJECT_STATUS.md
   4. Identify current sprint tasks
   5. Verify no blockers exist
   ```

2. **Task Selection**
   - Priority sırasına göre (P0 → P1 → P2 → P3)
   - Bağımlılıkları çözülmüş olanlardan
   - Current sprint'ten
   - Task başlamadan önce uygun branch oluştur
   - Initial commit yap (`git commit --allow-empty -m "chore: start [TASK-ID] - description"`)

### Task Completion Workflow

1. **Acceptance criteria'yı kontrol et**
2. **Test senaryolarını çalıştır**
3. **Dokümantasyon güncellemeleri yap** (Aşağıdaki checklist'i kullan)

#### 📋 ZORUNLU DOKÜMANTASYON GÜNCELLEMELERİ

**HER TASK TAMAMLANDIĞINDA güncellenmesi ZORUNLU dosyalar:**

1. **tasks.md** - ZORUNLU
   - Task status: "Completed ✅" olarak güncelle
   - Actual time ekle
   - Completion date ekle  
   - Task Status Overview tablosunu güncelle
   - Total Progress yüzdesini güncelle

2. **PROJECT_STATUS.md** - ZORUNLU
   - "Tamamlanan İşlemler" bölümüne yeni özelliği ekle
   - Proje yapısını güncelle (eğer yeni dosyalar eklendiyse)
   - "Yapılacaklar Listesi" bölümünü güncelle
   - "Bir Sonraki Oturumda Yapılacaklar" listesini güncelle
   - "Son güncelleme" tarihini ve tamamlanan task'ı belirt

3. **README.md** - DURUMA GÖRE
   - Sadece kullanıcı-görünür özellikler eklendiğinde güncelle
   - Yeni kurulum adımları gerektiren değişiklikler varsa
   - API kullanımı değiştiyse
   - Önemli özellikler eklendiyse

4. **CHANGELOG.md** - EĞER VARSA
   - Major özellikler eklendiğinde
   - Breaking changes varsa
   - Versiyon numarası değiştiyse

#### Task Completion Checklist
```
✅ GÖREV TAMAMLAMA KONTROL LİSTESİ:
   
1. [ ] tasks.md güncellemesi:
   - Status: Completed ✅
   - Actual time eklendi
   - Completion date eklendi
   - Progress percentage güncellendi
   
2. [ ] PROJECT_STATUS.md güncellemesi:
   - "Tamamlanan İşlemler" bölümüne yeni özellik eklendi
   - Proje yapısı güncellendi (yeni dosyalar varsa)
   - "Bir Sonraki Oturumda Yapılacaklar" listesi güncellendi
   
3. [ ] Diğer gerekli dokümanlar:
   - README.md (kullanıcı-görünür özellikler için)
   - CHANGELOG.md (varsa)
```

**Task tamamlandığında Claude şunu desin:**
```
🎉 [TASK-ID] tamamlandı!

📄 Güncellenmesi gereken dosyalar:
1. tasks.md - Task durumunu Completed yap ✅
2. PROJECT_STATUS.md - Yeni özelliği ekle
3. [Diğer gerekli dosyalar - duruma göre]

Bu güncellemeleri yapayım mı? (Claude Desktop'ta iseniz)
```

🚨 **UNUTMA**: Task tamamlandığında MUTLAKA tasks.md ve PROJECT_STATUS.md güncellenmelidir!

### Code Standards

1. **File Organization**
   ```
   src/
   ├── components/     # React components
   ├── hooks/         # Custom hooks
   ├── utils/         # Utility functions
   ├── services/      # API and data services
   ├── types/         # TypeScript types/interfaces
   └── constants/     # Constant values
   ```

2. **Component Structure**
   - Functional components with hooks
   - Props validation with TypeScript
   - Error boundaries where needed
   - Clear prop interfaces

3. **Naming Conventions**
   - Components: PascalCase
   - Functions: camelCase
   - Constants: UPPER_SNAKE_CASE
   - Files: kebab-case (except components)

### Twitter Search Operators Reference

| Operator | Description | Example |
|----------|------------|---------|
| from: | Tweets from user | from:nasa |
| to: | Replies to user | to:spacex |
| since: | After date | since:2024-01-01 |
| until: | Before date | until:2024-12-31 |
| min_faves: | Minimum likes | min_faves:100 |
| min_retweets: | Minimum RTs | min_retweets:50 |
| filter:media | Has media | filter:media |
| lang: | Language | lang:en |

### Testing Requirements (OLD - See STRICT TESTING POLICY above)

[This section moved to STRICT TESTING POLICY with enhanced rules]

### Documentation Requirements

1. **Code Comments**
   - JSDoc for all functions
   - Complex logic explained
   - TODOs with issue references

2. **README Updates**
   - Feature additions
   - Configuration changes
   - Usage examples

3. **Task Documentation**
   - Clear acceptance criteria
   - Test cases defined
   - Dependencies mapped

### Version Control

1. **Task-Based Commits**
   - Her task başlamadan önce commit yapılmalı
   - Commit mesajı task ID'sini içermeli
   - Küçük, atomik commitler tercih edilmeli
   
   ```bash
   # Task başlangıcı
   git commit -m "chore: start [TASK-ID] - brief description"
   
   # Task ilerlemesi
   git commit -m "feat: [TASK-ID] implement feature X"
   git commit -m "fix: [TASK-ID] resolve issue Y"
   
   # Task tamamlanması
   git commit -m "feat: complete [TASK-ID] - final implementation"
   ```

2. **Commit Messages**
   ```
   <type>: [TASK-ID] <description>

   [optional body]
   [optional footer]
   ```
   Types: feat, fix, docs, style, refactor, test, chore

3. **Branch Strategy**
   - main: Production ready
   - develop: Integration branch
   - feature/*: New features (named as feature/TASK-ID-description)
   - fix/*: Bug fixes (named as fix/TASK-ID-description)

4. **Task Workflow with Git**
   ```bash
   # 1. Task başlangıcı
   git checkout develop
   git pull origin develop
   git checkout -b feature/CORE-001-create-twitter-url
   git commit --allow-empty -m "chore: start CORE-001 - create twitter url function"
   
   # 2. Çalışma sırasında
   git add .
   git commit -m "feat: CORE-001 add basic url structure"
   git commit -m "test: CORE-001 add unit tests for url generation"
   
   # 3. Task tamamlandığında
   git commit -m "feat: complete CORE-001 - twitter url generator ready"
   git push origin feature/CORE-001-create-twitter-url
   # Create PR to develop branch
   ```

### Security Considerations

1. **No Sensitive Data**
   - No API keys in code
   - No user credentials stored
   - Only public Twitter operations

2. **Input Validation**
   - Sanitize all user inputs
   - Validate URL parameters
   - Prevent injection attacks

### Performance Guidelines

1. **React Optimization**
   - Use React.memo for expensive components
   - Implement useMemo/useCallback where needed
   - Lazy load components when possible

2. **State Management**
   - Keep state minimal
   - Use context sparingly
   - Consider Redux for complex state

### Deployment Checklist

1. **Pre-deployment**
   - [ ] All tests passing (100% pass rate)
   - [ ] Test coverage ≥ 85%
   - [ ] No console.error logs in production
   - [ ] Performance tests passing
   - [ ] Build successful
   - [ ] Documentation updated

2. **Post-deployment**
   - [ ] Verify functionality
   - [ ] Check analytics
   - [ ] Monitor errors

## 🔄 Task Update Commands

Use these commands in conversation:

- `task status` - Get current task overview
- `task update [TASK-ID]` - Update specific task status
- `task next` - Get recommended next task
- `task block [TASK-ID] [reason]` - Mark task as blocked
- `task complete [TASK-ID]` - Mark task as completed

## 🎯 Project Goals

1. **Ethical Usage**
   - Only generate search URLs
   - No data scraping
   - Respect Twitter's ToS

2. **User Experience**
   - Intuitive interface
   - Real-time feedback
   - Mobile responsive

3. **Technical Excellence**
   - Clean code
   - Comprehensive tests
   - Performance optimized

## 📝 Notes

- Always ask about Claude Desktop vs Browser before file operations
- Always update tasks.md after task completion
- Keep PROJECT_STATUS.md current with major changes
- Review these instructions at session start
- Ask for clarification if requirements unclear

---
*Last Updated: 2025-05-05* (Enhanced with Strict Testing Policy)
