# Xpatlat - Twitter Search URL Generator

Etik Twitter arama URL üreticisi - Veri çekmiyoruz, sadece doğru soruları soruyoruz.

## 🚀 Özellikler

- ✅ Twitter arama URL'leri oluşturma
- ✅ Gelişmiş filtreleme seçenekleri
- ✅ Arama geçmişi yönetimi
- ✅ Favoriler sistemi
- ✅ URL kopyalama ve direkt Twitter'da açma
- ✅ Responsive tasarım
- ✅ Local storage desteği

## 🛠️ Teknolojiler

- React 19
- Vite
- Tailwind CSS 3
- Vitest
- @testing-library/react
- PostCSS

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Üretim için build al
npm run build

# Testleri çalıştır
npm run test

# Test coverage raporu
npm run test:coverage
```

## 🧪 Test Komutları

```bash
# Testleri çalıştır
npm run test

# Watch modunda testleri çalıştır
npm run test:watch

# Coverage raporu al
npm run test:coverage

# Test UI'ı aç
npm run test:ui

# Debug modunda test
npm run test:debug
```

## 📁 Proje Yapısı

```
src/
├── components/      # React bileşenleri
├── hooks/          # Custom React hooks
├── services/       # API ve veri servisleri
├── utils/          # Yardımcı fonksiyonlar
├── types/          # Type tanımlamaları (JSDoc)
├── tests/          # Test dosyaları
└── pages/          # Sayfa bileşenleri
```

## 🔍 Twitter Arama Operatörleri

| Operatör | Açıklama | Örnek |
|----------|----------|-------|
| from: | Belirli kullanıcıdan | from:elonmusk |
| to: | Belirli kullanıcıya | to:nasa |
| since: | Belirli tarihten sonra | since:2024-01-01 |
| until: | Belirli tarihe kadar | until:2024-12-31 |
| min_faves: | Minimum beğeni | min_faves:100 |
| min_retweets: | Minimum RT | min_retweets:50 |
| filter:media | Medya içeren | filter:media |
| lang: | Dil filtresi | lang:tr |

## 🔒 Etik Kullanım

Bu proje sadece Twitter'ın yasal arama URL'lerini oluşturur. Veri scraping yapmaz ve Twitter'ın kullanım şartlarına uyar.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

MIT

## 👥 Geliştiriciler

- Xpatlat Team

---

Made with ❤️ by Xpatlat Team
