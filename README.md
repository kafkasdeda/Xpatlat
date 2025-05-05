# Xpatlat - Twitter Search URL Generator 🔍

Etik Twitter arama URL üreticisi - Veri çekmiyoruz, sadece doğru soruları soruyoruz.

## 🚀 Demo

[Canlı Demo](https://xpatlat.vercel.app) (yakında)

## ✨ Özellikler

- ✅ **Twitter arama URL'leri oluşturma** - Gelişmiş operatörlerle
- ✅ **Gerçek zamanlı önizleme** - URL'yi anında görün
- ✅ **Gelişmiş filtreleme seçenekleri** - 15+ farklı arama parametresi
- ✅ **Arama geçmişi yönetimi** - Son 50 aramayı kaydedin
- ✅ **Favoriler sistemi** - Sık kullanılan aramaları işaretleyin
- ✅ **URL kopyalama ve direkt Twitter'da açma** - Tek tıkla
- ✅ **Form validasyonu** - Hatalı girişleri önleyin
- ✅ **Responsive tasarım** - Tüm cihazlarda çalışır
- ✅ **Local storage desteği** - Veriler yerel olarak saklanır
- ✅ **Test coverage %85+** - Güvenilir kod tabanı

## 🛠️ Teknolojiler

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 3, PostCSS
- **Testing**: Vitest, @testing-library/react, @testing-library/jest-dom
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git, GitHub

## 📦 Kurulum

### Gereksinimler

- Node.js >= 18.0.0
- npm >= 9.0.0

### Adım Adım Kurulum

```bash
# 1. Projeyi klonlayın
git clone https://github.com/kafkasdeda/Xpatlat.git
cd Xpatlat

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev

# 4. Tarayıcıda açın
# http://localhost:5173
```

## 🚀 Kullanım

### Basit Arama Örneği

1. "Arama Metni" alanına aranacak kelimeyi yazın
2. "URL Oluştur" butonuna tıklayın
3. Oluşan URL'i kopyalayın veya Twitter'da açın

### Gelişmiş Arama Örneği

```text
Arama Metni: "yapay zeka"
Kimden: @elonmusk
Tarih Aralığı: 2024-01-01 - 2024-12-31
Min. Beğeni: 100
Dil: en
Medya Filtresi: ✓ Görseller
```

Oluşan URL:
```
https://twitter.com/search?q="yapay zeka" from:elonmusk since:2024-01-01 until:2024-12-31 min_faves:100 lang:en filter:images&src=typed_query
```

## 🔍 Twitter Arama Operatörleri

### Temel Operatörler

| Operatör | Açıklama | Örnek |
|----------|----------|-------|
| from: | Belirli kullanıcıdan | from:elonmusk |
| to: | Belirli kullanıcıya | to:nasa |
| @mention | Kullanıcı bahseden | @spacex |
| since: | Belirli tarihten sonra | since:2024-01-01 |
| until: | Belirli tarihe kadar | until:2024-12-31 |

### Etkileşim Operatörleri

| Operatör | Açıklama | Örnek |
|----------|----------|-------|
| min_faves: | Minimum beğeni | min_faves:100 |
| min_retweets: | Minimum RT | min_retweets:50 |
| min_replies: | Minimum yanıt | min_replies:10 |

### Medya Operatörleri

| Operatör | Açıklama | Örnek |
|----------|----------|-------|
| filter:media | Herhangi bir medya | filter:media |
| filter:images | Sadece görseller | filter:images |
| filter:videos | Sadece videolar | filter:videos |
| has:images | Görsel içeren | has:images |
| has:videos | Video içeren | has:videos |

### Gelişmiş Operatörler

| Operatör | Açıklama | Örnek |
|----------|----------|-------|
| lang: | Dil filtresi | lang:tr |
| -filter:retweets | RT'leri hariç tut | -filter:retweets |
| -filter:replies | Yanıtları hariç tut | -filter:replies |
| filter:hashtags | Hashtag içeren | filter:hashtags |
| ? | Soru içeren | "nasıl ?" |

## 🧪 Test Komutları

```bash
# Tüm testleri çalıştır
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

### Test Coverage Hedefleri

| Kategori | Minimum Coverage |
|----------|-----------------|
| Utils | 95% |
| Services | 90% |
| Hooks | 85% |
| Components | 80% |
| Overall | 85% |

## 📁 Proje Yapısı

```
Xpatlat/
├── src/
│   ├── components/      # React bileşenleri
│   │   ├── FilterPanel.jsx
│   │   ├── ResultsPanel.jsx
│   │   └── SearchHistory.jsx
│   ├── hooks/          # Custom React hooks
│   │   ├── useFilters.js
│   │   └── useSearchHistory.js
│   ├── services/       # API ve veri servisleri
│   │   └── storageService.js
│   ├── utils/          # Yardımcı fonksiyonlar
│   │   ├── twitterUrlGenerator.js
│   │   └── filterValidator.js
│   ├── types/          # Type tanımlamaları (JSDoc)
│   │   ├── filters.js
│   │   └── index.js
│   ├── tests/          # Test dosyaları
│   │   └── *.test.js
│   └── pages/          # Sayfa bileşenleri
│       └── SearchPage.jsx
├── docs/               # Proje dokümantasyonu
├── public/             # Statik dosyalar
└── ...config files     # Konfigürasyon dosyaları
```

## 🔒 Etik Kullanım

Bu proje aşağıdaki prensiplere bağlıdır:

- ✅ Sadece yasal Twitter arama URL'leri oluşturur
- ✅ Veri scraping veya otomatik veri toplama yapmaz
- ✅ Twitter'ın kullanım şartlarına tam uyum sağlar
- ✅ Kullanıcı verilerini yerel olarak saklar (Local Storage)
- ✅ Üçüncü taraf servislerle veri paylaşmaz

## 🤝 Katkıda Bulunma

### Nasıl Katkıda Bulunabilirsiniz?

1. **Fork Edin**
   ```bash
   git clone https://github.com/kafkasdeda/Xpatlat.git
   ```

2. **Feature Branch Oluşturun**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Değişikliklerinizi Commit Edin**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

4. **Branch'inizi Push Edin**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Pull Request Açın**

### Commit Mesaj Formatı

```
<type>: <description>

[optional body]
[optional footer]
```

Tipler: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Code Review Kriterleri

- ✅ Test coverage %85'in üzerinde
- ✅ ESLint hataları yok
- ✅ Commit mesajları kurallara uygun
- ✅ Dokümantasyon güncel
- ✅ Responsive tasarım test edilmiş

## 📝 Lisans

MIT License - bkz. [LICENSE](LICENSE) dosyası

## 👥 Geliştiriciler

- **Xpatlat Team** - *Initial work* - [kafkasdeda](https://github.com/kafkasdeda)

## 🙏 Teşekkürler

- [Twitter](https://twitter.com) - Arama operatörleri dokümantasyonu için
- [React](https://react.dev) - Harika UI kütüphanesi için
- [Vite](https://vitejs.dev) - Hızlı build sistemi için
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework için

## 📞 İletişim

- GitHub Issues: [Sorun Bildir](https://github.com/kafkasdeda/Xpatlat/issues)
- Email: info@xpatlat.com (yakında)

## 🚀 Gelecek Özellikler

- [ ] Search templates (Hazır arama şablonları)
- [ ] Dark mode desteği
- [ ] CSV export
- [ ] Analytics dashboard
- [ ] Multiple language support
- [ ] Advanced search history management
- [ ] Chrome extension

---

<p align="center">Made with ❤️ by <a href="https://github.com/kafkasdeda">Xpatlat Team</a></p>
