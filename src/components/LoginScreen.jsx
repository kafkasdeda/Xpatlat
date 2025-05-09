import { useAuth } from '../context/AuthContext';

/**
 * Giriş ekranı komponenti
 * Kullanıcı giriş yapmadığında gösterilir
 */
function LoginScreen() {
  const { login } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Xpatlat</h1>
        <p className="mb-4 text-lg font-semibold">Twitter Arama URL Oluşturucu</p>
        <p className="mb-8 text-gray-600">
          Bu uygulama, Twitter'da gelişmiş aramalar yapmanızı sağlayan özel URL'ler oluşturur.
          Devam etmek için lütfen giriş yapın.
        </p>
        <button
          onClick={login}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          aria-label="Giriş yap"
        >
          Giriş Yap
        </button>
        <p className="mt-4 text-sm text-gray-500">
          *Davet yoluyla erişim. Yetkilendirme için site yöneticisiyle iletişime geçin.
        </p>
      </div>
    </div>
  );
}

export default LoginScreen;
