# Git Workflow Guide - Xpatlat Project

## 🔄 Mevcut Git Durumu

- **Repository**: https://github.com/kafkasdeda/Xpatlat
- **Ana Branch**: main
- **Aktif Branch**: feature/CORE-004-advanced-operators (PR bekliyor)

## 📝 Branch İsimlendirme Kuralları

```
feature/[TASK-ID]-brief-description
fix/[TASK-ID]-brief-description
docs/[TASK-ID]-brief-description
test/[TASK-ID]-brief-description
```

Örnekler:
- `feature/CORE-005-search-templates`
- `fix/UI-003-history-display`
- `docs/DOC-003-readme-update`

## 🔧 Standart İş Akışı

### 1. Yeni Task Başlatma

```bash
# Main branch'ten başla
git checkout main
git pull origin main

# Yeni branch oluştur
git checkout -b feature/TASK-ID-description

# Boş commit ile başla
git commit --allow-empty -m "chore: start TASK-ID - brief description"

# GitHub'a push et
git push origin feature/TASK-ID-description
```

### 2. Çalışma Sırasında

```bash
# Değişiklikleri kaydet
git add .
git commit -m "type: TASK-ID description"

# Örnek commit mesajları:
# feat: CORE-005 add viral content template
# fix: UI-003 resolve history display bug
# docs: DOC-003 update installation guide
# test: TEST-003 add template tests
```

### 3. Task Tamamlandığında

```bash
# Son değişiklikleri commit et
git add .
git commit -m "feat: complete TASK-ID - brief summary"

# GitHub'a push et
git push origin feature/TASK-ID-description
```

### 4. Pull Request İşlemi

1. GitHub'da repository'ye git
2. "Compare & pull request" butonuna tıkla
3. PR formunu doldur:
   - Title: Task başlığı
   - Description: Yapılan işlerin özeti
   - Related tasks: Kapatılan tasklar
4. "Create pull request" butonuna tıkla
5. "Merge pull request" > "Confirm merge"

### 5. Merge Sonrası

```bash
# Main branch'e dön
git checkout main

# Güncellemeleri çek
git pull origin main

# Eski branch'i sil (opsiyonel)
git branch -d feature/TASK-ID-description
```

## 📋 Commit Mesaj Formatı

```
<type>: [TASK-ID] <description>

[optional body]
[optional footer]
```

### Type'lar:
- `feat`: Yeni özellik
- `fix`: Bug düzeltmesi
- `docs`: Dokümantasyon
- `style`: Kod formatı (fonksiyonellik değişmez)
- `refactor`: Kod yeniden yapılandırma
- `test`: Test ekleme/düzeltme
- `chore`: Build, config değişiklikleri

### Örnekler:
```
feat: CORE-005 implement viral content template
fix: UI-003 correct history item display
docs: DOC-003 add installation instructions
test: TEST-003 add template component tests
chore: update dependencies to latest versions
```

## ⚠️ Önemli Notlar

1. Her zaman güncel main branch'ten başlayın
2. Küçük, sık commitler tercih edin
3. Commit mesajlarında task ID kullanın
4. PR açmadan önce testleri çalıştırın
5. Branch isimlerinde task ID kullanın

## 🔍 Sık Kullanılan Komutlar

```bash
# Mevcut durumu kontrol et
git status
git branch

# Değişiklikleri göster
git diff

# Commit geçmişini göster
git log --oneline

# Son commit'i düzelt
git commit --amend

# Değişiklikleri geri al
git checkout -- filename

# Branch sil
git branch -d branch-name
```