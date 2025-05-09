# Xpatlat Proje - Sonraki Adımlar 🚀

## 🎯 Öncelikli Görevler (P0 - Hemen Yapılmalı)

### 1. Test Coverage Analizi ve İyileştirme
**Task ID**: TEST-003-coverage-improvement
**Neden Öncelikli?**: PROJECT_INSTRUCTIONS'ta %85 minimum coverage zorunlu
**Adımlar**:
```bash
# 1. Coverage raporu al
npm run test:coverage

# 2. Eksik test alanlarını belirle
# 3. Öncelikli test dosyaları (muhtemelen):
#    - SearchHistory.test.js
#    - FilterPanel.test.js
#    - useSearchHistory.test.js
```

### 2. README.md Güncelleme (DOC-003)
**Neden Hemen?**: GitHub'da yeni repo var ama README eksik
**İçerik**:
- Proje açıklaması
- Kurulum adımları
- Kullanım örnekleri
- Twitter operatörleri tablosu
- Katkıda bulunma rehberi

## 📋 Yüksek Öncelikli Görevler (P1)

### 1. Copy URL Button (UI-002)
**Tahmini Süre**: 1 saat
**Neden?**: Kullanıcı deneyimi için kritik
**Detaylar**:
```jsx
// ResultsPanel.jsx'e eklenecek
<button
  onClick={() => {
    navigator.clipboard.writeText(generatedUrl);
    setToast('URL kopyalandı!');
  }}
  className="flex items-center gap-2 px-4 py-2 bg-blue-500..."
>
  <ClipboardIcon className="w-5 h-5" />
  URL'yi Kopyala
</button>
```

### 2. Search History UI (UI-003)
**Tahmini Süre**: 4 saat
**Neden?**: Storage service hazır ama UI eksik
**Yapılacaklar**:
- Son aramaları listeleme
- Tıklayınca yükleme
- Geçmişi temizleme
- Favori işaretleme

## 🎨 UI/UX İyileştirmeleri (P2)

### 1. Search Templates (CORE-005)
**Tahmini Süre**: 4 saat
**Şablonlar**:
- Viral İçerik (min_faves:1000 min_retweets:500)
- Sorular (?)
- Medya İçerikler (filter:media)
- Kullanıcı Etkileşimi (to:username)

### 2. Dark Mode Desteği
**Tahmini Süre**: 2 saat
**Detaylar**:
- Tailwind dark: prefix kullan
- localStorage'da tema tercihi sakla
- Tema değiştirme butonu ekle

## 📚 Dokümantasyon Görevleri (P3)

### 1. API Documentation (DOC-002)
**İçerik**:
- JSDoc tüm fonksiyonlar için
- Type definitions açıklamaları
- Kullanım örnekleri

### 2. CHANGELOG.md (DOC-004)
**Format**:
```markdown
# Changelog

## [0.1.0] - 2025-05-05
### Added
- Twitter URL generator
- Filter validation
- Search history
- Test infrastructure
```

## 🔬 Test Görevleri

### 1. E2E Test Senaryoları
**Öncelikli Senaryolar**:
1. Basit arama oluşturma ve kopyalama
2. Gelişmiş filtrelerle arama
3. Geçmişten arama yükleme
4. Hatalı input durumları

### 2. Component Tests
**Eksik Testler**:
- FilterPanel.test.js
- SearchHistory.test.js
- ResultsPanel.test.js

## 🚀 Deployment Hazırlıkları

### 1. Production Build Test
```bash
npm run build
npm run preview
```

### 2. GitHub Pages veya Vercel Deploy
- GitHub Actions workflow hazırla
- Otomatik deployment kur
- Custom domain ayarla (opsiyonel)

## 📅 Haftalık Plan Önerisi

### Pazartesi (Bugün)
1. ✅ CORE-004 tamamlandı
2. ✅ Test suite tamamlandı
3. ⏳ Test coverage analizi (öncelik)
4. ⏳ README güncelleme

### Salı
1. UI-002 (Copy button)
2. UI-003 başlangıç (Search History UI)

### Çarşamba
1. UI-003 tamamlama
2. CORE-005 başlangıç (Templates)

### Perşembe
1. CORE-005 tamamlama
2. DOC-002 (API docs)

### Cuma
1. E2E test senaryoları
2. Deployment hazırlıkları
3. Code review & refactoring

## 💡 Öneriler

1. **Test Coverage Önceliği**: %85 zorunlu, hemen kontrol et
2. **PR #1 Merge**: CORE-003 PR'ı bekliyor, review et ve merge et
3. **Responsive Test**: Mobil görünümü test et
4. **Performance**: Bundle size'ı kontrol et (`npm run build`)
5. **Error Boundaries**: React Error Boundaries ekle

## 🎯 Hedefler

### Kısa Vadeli (Bu Hafta)
- Test coverage %85+
- Tüm P1 görevler tamamlanmış
- README ve temel dokümantasyon hazır

### Orta Vadeli (2 Hafta)
- Tüm UI/UX iyileştirmeleri
- Komple dokümantasyon
- E2E testler
- Production deployment

### Uzun Vadeli (1 Ay)
- Twitter API entegrasyonu araştırması
- Analytics dashboard
- Kullanıcı geri bildirimi toplama
- v1.0 release

## 🔧 Hemen Yapılacaklar

```bash
# 1. Test coverage kontrolü
cd C:\projeler\Xpatlat
npm run test:coverage

# 2. Eğer coverage düşükse
npm run test:watch
# Eksik testleri yaz

# 3. README başla
# (Claude Desktop'ta bu dosyayı oluşturabilirim)
```

---
*Bu doküman her task tamamlandığında güncellenmelidir*
