
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Dashboard } from './pages/Dashboard';

import { BookingPage } from './pages/BookingPage';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/" element={<div className="p-10 text-center"><a href="/dashboard" className="text-blue-600 underline mr-4">Ir para Dashboard</a><a href="/book" className="text-blue-600 underline">Ir para Agendamento</a></div>} />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
