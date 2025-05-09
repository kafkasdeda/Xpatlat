# Xpatlat Yeni Oturum Başlatma Rehberi 🚀

## 🎯 Hızlı Başlangıç (15 Yaşında Birine Anlatır Gibi)

### 1. Neredeyim? 
```bash
cd C:\projeler\Xpatlat
pwd  # Doğru yerde miyim kontrol et
```

### 2. Claude Masaüstünde miyim?
"Claude masaüstü uygulamasında mısınız?" - Bu soruyu her zaman sor!
- **Evet** → Dosyaları Claude düzenleyebilir
- **Hayır** → Sen kopyala-yapıştır yapacaksın

### 3. Git Branch'im Doğru mu?
```bash
git branch  # Hangi branch'teyim?
git status  # Temiz mi, commit edilmemiş şey var mı?
```

## 📋 Adım Adım Oturum Başlangıcı

### Adım 1: Proje Durumunu Kontrol Et
```bash
# 1. Doğru dizinde miyim?
cd C:\projeler\Xpatlat

# 2. Git durumu temiz mi?
git status

# 3. Hangi branch'teyim?
git branch

# 4. Main'den güncel miyim?
git checkout main
git pull origin main
```

### Adım 2: Dokümantasyonu Oku
Bu sırayla oku:
1. `docs/CURRENT_STATUS_2025_05_05.md` - Bugünün durumu
2. `tasks.md` - Hangi görevler kaldı?
3. `PROJECT_STATUS.md` - Genel proje durumu
4. `PROJECT_INSTRUCTIONS.md` - Kurallar hatırlatması

### Adım 3: Test Durumunu Kontrol Et
```bash
# Test coverage'ı kontrol et
npm run test:coverage

# Testler geçiyor mu?
npm run test
```

### Adım 4: Development Server'ı Başlat
```bash
# Server'ı başlat
npm run dev

# Tarayıcıda aç: http://localhost:5173
```

### Adım 5: Yapılacak Task'ı Seç
```bash
# Claude'a sor:
"task next" # Sonraki önerilen görevi göster
```

## 🔄 Task Başlatma Workflow

### 1. Yeni Branch Oluştur
```bash
# Main'den yeni branch
git checkout main
git pull origin main
git checkout -b feature/TASK-ID-description

# Örnek:
git checkout -b feature/UI-002-copy-button
```

### 2. Boş Commit At (Task Başlangıcı)
```bash
git commit --allow-empty -m "chore: start UI-002 - copy url button"
```

### 3. Claude'a Task'ı Başlat
```
"UI-002 task'ını başlıyorum. Acceptance criteria'yı kontrol edelim."
```

## 📝 Task Çalışma Sırası

### 1. Kod Yaz
- Claude masaüstündeyse dosyaları o düzenler
- Browser'daysan kod verir, sen yapıştırırsın

### 2. Test Et
```bash
# Manuel test
npm run dev
# Tarayıcıda dene

# Unit testleri çalıştır
npm run test

# Yeni test yaz (coverage %85+ olmalı)
npm run test:coverage
```

### 3. Commit Et
```bash
git add .
git status  # Neleri eklediğimi kontrol et
git commit -m "feat: UI-002 implement copy url button"
```

### 4. Push Et
```bash
git push origin feature/UI-002-copy-button
```

## ✅ Task Tamamlama Checklist

### 1. Kod Tamamlandı mı?
- [ ] Acceptance criteria karşılandı
- [ ] Testler yazıldı (%85+ coverage)
- [ ] Manuel test edildi
- [ ] Code review yapıldı

### 2. Dokümantasyon Güncellendi mi?
- [ ] `tasks.md` - Status: Completed ✅
- [ ] `PROJECT_STATUS.md` - Yeni özellik eklendi
- [ ] `README.md` - Eğer kullanıcı-görünür özellikse
- [ ] `CHANGELOG.md` - Eğer varsa

### 3. Git İşlemleri Tamam mı?
- [ ] Commit'ler atıldı
- [ ] Push edildi
- [ ] PR açıldı
- [ ] PR merge edildi

## 🚨 Sık Yapılan Hatalar

### 1. Test Coverage Düşük
```bash
# YANLIŞ: Test yazmadan PR açmak
# DOĞRU: Önce test yaz, sonra PR aç
npm run test:coverage
```

### 2. Dokümantasyon Unutuldu
```bash
# YANLIŞ: Sadece kod yazmak
# DOĞRU: tasks.md ve PROJECT_STATUS.md güncelle
```

### 3. Branch İsimlendirme Yanlış
```bash
# YANLIŞ: git checkout -b yeni-ozellik
# DOĞRU: git checkout -b feature/UI-002-copy-button
```

## 🔍 Debug Komutları

### Proje Durumu
```bash
# Git durumu
git status
git log --oneline -5

# Test durumu
npm run test:coverage

# Build durumu
npm run build
```

### Sorun Giderme
```bash
# Node modules temizle
rm -rf node_modules
npm install

# Git conflicts
git status
# Conflict'leri düzelt
git add .
git commit -m "fix: resolve merge conflicts"
```

## 📋 Günlük Rutin

### Sabah
1. Git pull (main branch güncelle)
2. Test coverage kontrol
3. Task listesini gözden geçir
4. Bugünün task'ını seç

### Öğlen
1. Progress check
2. Test yaz
3. Commit at

### Akşam
1. Dokümantasyon güncelle
2. Push et
3. PR aç (eğer hazırsa)
4. Yarının planını yap

## 🎯 Hızlı Referans Komutları

```bash
# Proje başlat
cd C:\projeler\Xpatlat
npm run dev

# Test çalıştır
npm run test
npm run test:coverage
npm run test:watch

# Git workflow
git checkout main
git pull origin main
git checkout -b feature/new-feature
git add .
git commit -m "feat: description"
git push origin feature/new-feature

# Build kontrol
npm run build
npm run preview
```

## 💡 Claude'a Sorulacak Sorular

1. "task status" - Mevcut görev durumu
2. "task next" - Sonraki önerilen görev
3. "Hangi dosyaları güncellemeliyim?"
4. "Test coverage'ı nasıl artırabilirim?"
5. "Bu hata mesajı ne anlama geliyor?"

## 🔄 Git İşlemleri için Python Script

```bash
# Git işlemlerini kolaylaştır
python git_yapilacaklar.py

# Seçenekler:
# 1. Değişiklikleri kaydet ve push et
# 2. PR talimatlarını göster
# 3. Main branch güncelle
# 4. Yeni task başlat
# 5. Tam iş akışı
```

## 📝 Notlar

- Her oturum başında bu rehberi oku
- Test coverage %85 altına düşmesin
- Commit mesajları anlamlı olsun
- PR açmadan önce manuel test yap
- Dokümantasyonu güncel tut

---
*Bu rehber yeni başlayanlar için hazırlanmıştır. Sorularınız olursa Claude'a sorun!*
