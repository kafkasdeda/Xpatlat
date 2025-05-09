import SearchPage from './pages/SearchPage';

export default function App() {
  // Geçici olarak authentication kontrolünü kaldırdık
  // Doğrudan SearchPage'i render ediyoruz
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <SearchPage />
      </main>
    </div>
  );
}
