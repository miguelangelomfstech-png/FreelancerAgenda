
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BookingPage } from './pages/BookingPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/" element={<div className="p-10 text-center"><a href="/dashboard" className="text-blue-600 underline mr-4">Ir para Dashboard</a><a href="/book" className="text-blue-600 underline">Ir para Agendamento</a></div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
