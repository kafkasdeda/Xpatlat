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
      console.debug('[AuthProvider] User logged in', { user: user?.email });
    });
    
    netlifyIdentity.on('logout', () => {
      setUser(null);
      console.debug('[AuthProvider] User logged out');
    });
    
    netlifyIdentity.on('init', (user) => {
      setUser(user);
      setLoading(false);
      console.debug('[AuthProvider] Initialized', { 
        isLoggedIn: !!user,
        user: user?.email 
      });
    });
    
    // Cleanup
    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
      netlifyIdentity.off('init');
    };
  }, []);

  const login = () => {
    console.debug('[AuthProvider] Opening login modal');
    netlifyIdentity.open('login');
  };

  const logout = () => {
    console.debug('[AuthProvider] Logging out');
    netlifyIdentity.logout();
  };

  const authValues = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
