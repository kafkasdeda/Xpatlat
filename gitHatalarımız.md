# Git Hatalarımız ve Çözüm Önerileri

## 🐛 Yaptığımız Hatalar

### 1. Aynı Branch'te Birden Fazla Task Tamamlama
**Ne Oldu:**
- CORE-003 için açtığımız `feature/CORE-003-url-parameter-validation` branch'inde TECH-002 task'ını da tamamladık
- Tek branch'te iki farklı task'ın değişiklikleri karıştı

**Sorun:**
- Commit geçmişi karışık
- Code review zorlaşır
- Rollback gerektiğinde hangi task'ın hangi commit olduğu belirsiz
- Branch ismi ile içerik uyumsuz

### 2. Task Başlangıç Commit'lerini Atlamak
**Ne Oldu:**
- Task başlarken empty commit atmayı unuttuk
- Doğrudan kodlamaya başladık

**Sorun:**
- Task'ın ne zaman başladığı belirsiz
- Git log'da task başlangıçları görünmüyor

### 3. Commit Mesajlarında Task ID Eksikliği
**Ne Oldu:**
- Bazı commit'lerde task ID'sini yazdık, bazılarında yazmadık
- Tutarsız commit mesajları oluştu

**Sorun:**
- Hangi commit'in hangi task'a ait olduğu karışıyor
- Arama yaparken zorluk çıkıyor

### 4. Büyük Dosyaları Git'e Yükleme
**Ne Oldu:**
- Python virtual environment klasörünü (xpatlat_env/) yanlışlıkla Git'e ekledik
- Node.exe gibi büyük dosyalar GitHub'a yüklendi
- GitHub 79.48 MB boyutunda dosya uyarısı verdi

**Sorun:**
- Repository şişiyor
- Clone/pull işlemleri yavaşlıyor
- GitHub'da büyük dosya uyarıları
- Gereksiz binary dosyaların takip edilmesi

**Çözüm:**
- `.gitignore` dosyası oluşturuldu
- Virtual environment'lar git'ten çıkarıldı
- Node modules, build dosyaları vb. ignore edildi

## ✅ Bundan Sonra Yapılması Gerekenler

### 1. Her Task İçin Ayrı Branch Kullanma
```bash
# Her yeni task başlarken:
git checkout develop
git pull origin develop
git checkout -b feature/[TASK-ID]-brief-description

# Örnek:
git checkout -b feature/TECH-002-local-storage
```

### 2. Task Başlangıç Commit'i
```bash
# Branch oluşturduktan hemen sonra:
git commit --allow-empty -m "chore: start [TASK-ID] - brief description"

# Örnek:
git commit --allow-empty -m "chore: start TECH-002 - implement localStorage"
```

### 3. Tutarlı Commit Mesajları
```bash
# Her commit'te task ID'si kullan:
git commit -m "<type>: [TASK-ID] <description>"

# Örnekler:
git commit -m "feat: TECH-002 add StorageService"
git commit -m "test: TECH-002 add unit tests for storage"
git commit -m "docs: TECH-002 update documentation"
```

### 4. Task Tamamlama Commit'i
```bash
# Task bittiğinde final commit:
git commit -m "feat: complete [TASK-ID] - brief summary"

# Örnek:
git commit -m "feat: complete TECH-002 - localStorage integration ready"
```

### 5. PR (Pull Request) Oluşturma
```bash
# Task bittiğinde:
git push origin feature/[TASK-ID]-description

# GitHub/GitLab'da PR aç:
# - Title: [TASK-ID] Brief description
# - Description: Task detayları, test edilmesi gerekenler
# - Reviewers: Takım arkadaşları
```

## 📋 Task Workflow Checklist

Her task için şu adımları takip et:

1. [ ] Develop branch'inden güncel çek
2. [ ] Yeni feature branch oluştur: `feature/[TASK-ID]-description`
3. [ ] Boş başlangıç commit'i at: `chore: start [TASK-ID]`
4. [ ] Kodlama yap
5. [ ] Atomik commit'ler at (her commit'te task ID)
6. [ ] Task bittiğinde final commit at
7. [ ] Push et ve PR oluştur
8. [ ] Review sonrası develop'a merge et
9. [ ] Local branch'i sil

## 🔄 Hatalı Durumları Düzeltme

### Yanlış Branch'e Commit Attıysak:
```bash
# Son commit'i geri al (değişiklikler kalır)
git reset HEAD~1

# Doğru branch'e geç
git checkout -b feature/correct-branch

# Tekrar commit et
git commit -m "feat: [TASK-ID] description"
```

### Task ID'siz Commit Attıysak:
```bash
# Son commit mesajını düzelt
git commit --amend -m "feat: [TASK-ID] correct message"
```

## 🎯 Branch İsimlendirme Standardı

```
feature/[TASK-ID]-brief-description
fix/[TASK-ID]-brief-description
hotfix/[TASK-ID]-brief-description
refactor/[TASK-ID]-brief-description
```

Örnekler:
- `feature/CORE-003-url-validation`
- `fix/UI-001-button-alignment`
- `hotfix/PROD-001-critical-bug`

## 📝 Commit Types

- **feat**: Yeni özellik
- **fix**: Bug düzeltme
- **docs**: Dokümantasyon
- **style**: Kod formatı (whitespace, semicolon vb.)
- **refactor**: Kod yeniden yapılandırma
- **test**: Test ekleme/düzeltme
- **chore**: Build, config değişiklikleri
- **perf**: Performans iyileştirme

---

*Bu dokümanı her Git hatası yaptığımızda güncelleyelim ki bir daha aynı hatayı yapmayalım!*

*Son güncelleme: 2025-05-05*
