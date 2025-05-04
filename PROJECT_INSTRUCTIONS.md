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
3. **Dokümantasyon güncellemeleri yap:**
   - **tasks.md**: Task statüsünü güncelle (Completed ✅), actual time ekle, completion date ekle
   - **PROJECT_STATUS.md**: Yeni özellikleri "Tamamlanan İşlemler" bölümüne ekle, proje yapısını güncelle
   - **README.md**: Eğer kullanıcı-görünür bir özellik eklendiyse
   - **CHANGELOG.md**: Eğer varsa, değişiklikleri logla

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
3. [Diğer gerekli dosyalar]

Bu güncellemeleri yapayım mı? (Claude Desktop'ta iseniz)
```

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

### Testing Requirements

1. **Unit Tests**
   - All utility functions
   - URL generation logic
   - Validation functions

2. **Integration Tests**
   - Component interactions
   - Form submissions
   - State management

3. **Manual Testing**
   - Cross-browser testing
   - Responsive design
   - Edge cases

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
   - [ ] All tests passing
   - [ ] No console errors
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
*Last Updated: 2025-05-04*
