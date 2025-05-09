import { useAuth } from './context/AuthContext';
import SearchPage from './pages/SearchPage';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar';

export default function App() {
  const { user, loading } = useAuth();

  // Authentication durumu yüklenirken
  if (loading) {
    return <LoadingScreen />;
  }

  // Kullanıcı giriş yapmamışsa
  if (!user) {
    return <LoginScreen />;
  }

  // Kullanıcı giriş yapmışsa
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <SearchPage />
      </main>
    </div>
  );
}
