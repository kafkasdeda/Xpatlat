import { useAuth } from '../context/AuthContext';

/**
 * Navbar komponenti
 * Kullanıcı bilgisi ve çıkış butonu içerir
 */
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
              aria-label="Çıkış yap"
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
