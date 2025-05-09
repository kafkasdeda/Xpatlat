# Xpatlat Netlify Deployment ve Authentication Rehberi 🚀

**Oluşturulma Tarihi:** 9 Mayıs 2025

Bu rehber, Xpatlat projesinin Netlify'a deploy edilmesi ve Netlify Identity ile authentication eklenmesi için adım adım talimatları içerir.

## 📋 İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Netlify Deploy Adımları](#netlify-deploy-adımları)
3. [Netlify Identity Kurulumu](#netlify-identity-kurulumu)
4. [React Uygulamasına Authentication Eklenmesi](#react-uygulamasına-authentication-eklenmesi)
5. [Kullanıcı Yönetimi](#kullanıcı-yönetimi)
6. [Sorun Giderme](#sorun-giderme)

## 🔧 Gereksinimler

- GitHub hesabı (repo: https://github.com/kafkasdeda/Xpatlat)
- Netlify hesabı (ücretsiz plan yeterli)
- Node.js yüklü bilgisayar
- Netlify CLI (isteğe bağlı)

## 🚀 Netlify Deploy Adımları

### 1. Vite Konfigürasyonu İçin Hazırlık

`vite.config.js` dosyasını kontrol edin. Deploy için özel bir ayara gerek yok, ancak reponun root dizininde `netlify.toml` dosyası oluşturmak faydalı olacaktır:

```bash
# Bu dosyayı oluşturun: netlify.toml
touch netlify.toml
```

`netlify.toml` dosyasının içeriği:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Netlify Üzerinden Manual Deploy

1. [Netlify Dashboard](https://app.netlify.com/)'a giriş yapın
2. "New site from Git" butonuna tıklayın
3. GitHub'ı seçin ve Xpatlat reposuna bağlanın
4. Build ayarlarını yapılandırın:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. "Deploy site" butonuna tıklayın

### 3. Netlify CLI ile Deploy (Alternatif)

Terminal üzerinden deploy yapmak isterseniz:

```bash
# 1. Netlify CLI yükleyin
npm install -g netlify-cli

# 2. Netlify hesabınıza giriş yapın
netlify login

# 3. Projeyi Netlify'a bağlayın
netlify init

# 4. Manual deploy yapın
netlify deploy --prod
```

### 4. Environment Variables (Gerekirse)

Eğer projenizde çevresel değişkenler (API anahtarları vb.) varsa:

1. Netlify Dashboard > Site settings > Build & deploy > Environment
2. "Edit variables" butonuna tıklayın
3. Key-value çiftleri ekleyin (örn: `VITE_API_KEY=your_api_key`)

## 🔐 Netlify Identity Kurulumu

### 1. Netlify Identity Servisini Etkinleştirin

1. Netlify Dashboard > Site settings > Identity
2. "Enable Identity" butonuna tıklayın
3. Identity ayarlarını yapılandırın:
   - Registration preferences: "Invite only"
   - External providers: İsterseniz GitHub/Google ile giriş ekleyebilirsiniz
   - Email templates: Varsayılan şablonları özelleştirebilirsiniz

### 2. Netlify Identity Widget'ı Yükleyin

```bash
# Projenize gerekli paketi ekleyin
npm install netlify-identity-widget
```

## 🔧 React Uygulamasına Authentication Eklenmesi

### 1. Netlify Identity Widget'ı Ayarlayın

`src/main.jsx` dosyasına eklemeler yapın:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import netlifyIdentity from 'netlify-identity-widget'

// Initialize Netlify Identity
netlifyIdentity.init({
  locale: 'tr' // Türkçe dil desteği (opsiyonel)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 2. Auth Context Oluşturun

`src/context/AuthContext.jsx` dosyasını oluşturun:

```jsx
import { createContext, useContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(netlifyIdentity.currentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });
    
    netlifyIdentity.on('logout', () => {
      setUser(null);
    });
    
    netlifyIdentity.on('init', (user) => {
      setUser(user);
      setLoading(false);
    });
    
    // Cleanup
    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const login = () => {
    netlifyIdentity.open('login');
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const authValues = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### 3. Auth Provider'ı Uygulama Genelinde Sağlayın

`src/main.jsx` dosyasını güncelleyin:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import netlifyIdentity from 'netlify-identity-widget'
import { AuthProvider } from './context/AuthContext'

// Initialize Netlify Identity
netlifyIdentity.init()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
```

### 4. App.jsx İçinde Authentication Kontrolü Yapın

`src/App.jsx` dosyasını güncelleyin:

```jsx
import { useAuth } from './context/AuthContext';
import SearchPage from './pages/SearchPage';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <SearchPage />;
}

export default App;
```

### 5. LoginScreen Komponenti Oluşturun

`src/components/LoginScreen.jsx` dosyasını oluşturun:

```jsx
import { useAuth } from '../context/AuthContext';

function LoginScreen() {
  const { login } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Xpatlat</h1>
        <p className="mb-8 text-gray-600">
          Twitter arama URL oluşturucuya erişmek için lütfen giriş yapın.
        </p>
        <button
          onClick={login}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
```

### 6. LoadingScreen Komponenti Oluşturun

`src/components/LoadingScreen.jsx` dosyasını oluşturun:

```jsx
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
```

### 7. Navbar'a Logout Butonu Ekleyin

Eğer bir navbar bileşeniniz varsa (yoksa oluşturun), logout butonu ekleyin:

```jsx
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Xpatlat</div>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.email}
            </span>
            <button
              onClick={logout}
              className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
```

## 👥 Kullanıcı Yönetimi

### 1. Kullanıcı Davet Etme

1. Netlify Dashboard > Identity > Invite Users
2. Davet etmek istediğiniz e-posta adreslerini ekleyin
3. "Send" butonuna tıklayın

Kullanıcılar e-posta davetini kabul edip parola oluşturarak sisteme girebilecekler.

### 2. Rol Tabanlı Yetkilendirme (İleri Seviye)

Kullanıcılara roller atamak için:

1. Netlify Dashboard > Identity > Identity settings > Roles
2. Rol oluşturun (örn: "admin", "editor", "viewer")
3. Kullanıcılara rol atayın:
   - Identity > Users > [Kullanıcı adı] > Edit > Roles

Uygulamada rolleri kontrol etmek için:

```jsx
const { user } = useAuth();
const isAdmin = user?.app_metadata?.roles?.includes('admin');

if (isAdmin) {
  // Admin özellikleri göster
}
```

## 🔍 Sorun Giderme

### Sık Karşılaşılan Sorunlar

#### 1. Identity Widget Görünmüyor
Sorun: Netlify Identity widget çalışmıyor veya görünmüyor.
Çözüm: `netlifyIdentity.init()` çağrısının doğru şekilde yapıldığından emin olun.

#### 2. "Site URL mismatch" Hatası
Sorun: Local geliştirme ortamında oturum açarken hata alıyorsunuz.
Çözüm: Netlify Identity ayarlarında "Site URL" değerini kontrol edin, development için localhost URL'i ekleyin.

#### 3. Davet E-postaları Gelmiyor
Sorun: Kullanıcı davetleri alıcılara ulaşmıyor.
Çözüm: Spam klasörünü kontrol edin ve Netlify Dashboard > Identity > Settings > Emails'da e-posta ayarlarını doğrulayın.

#### 4. Deploy Sonrası Authentication Çalışmıyor
Sorun: Lokalde çalışan auth, deploy sonrası çalışmıyor.
Çözüm: Netlify Dashboard'da Identity ayarlarının etkin olduğundan emin olun ve site URL'ini kontrol edin.

## 🛣️ Sonraki Adımlar

1. Custom login sayfası tasarımı geliştirin
2. Rol tabanlı yetkilendirme ile farklı kullanıcı tipleri tanımlayın
3. Kullanıcı profil sayfası ekleyin
4. Sosyal medya ile giriş seçenekleri ekleyin (GitHub, Google vb.)
5. Kullanıcıya özgü ayarlar ve tercihler depolayın

---

Bu rehber, Xpatlat projesinin Netlify'a deploy edilmesi ve Netlify Identity ile temel authentication eklenmesi için gereken tüm adımları içermektedir. Sorun yaşarsanız, [Netlify Identity Dokümanları](https://docs.netlify.com/visitor-access/identity/)nı inceleyebilirsiniz.

*Not: Bu rehber, Xpatlat projesinin Claude Desktop uygulaması ile hazırlanmıştır.*