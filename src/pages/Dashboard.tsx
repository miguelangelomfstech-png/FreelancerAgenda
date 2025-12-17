import { useState, useEffect } from 'react';
import { ServiceList } from '../components/ServiceList';
import { CalendarView } from '../components/CalendarView';
import { Notifications } from '../components/Notifications';
import { LayoutGrid, Calendar as CalendarIcon, LogOut, Link as LinkIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../context/AuthContext';
import { StoreProvider } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'services' | 'calendar'>('services');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const bookingLink = `${window.location.protocol}//${window.location.host}/book?uid=${user.id}`;
  
  const copyLink = () => {
    navigator.clipboard.writeText(bookingLink);
    alert('Link copiado!');
  }

  return (
    <StoreProvider userId={user.id}>
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar / Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AgendaPro
              </span>
              <div className="hidden md:flex space-x-4">
                <NavButton 
                  active={activeTab === 'services'} 
                  onClick={() => setActiveTab('services')}
                  icon={<LayoutGrid size={18} />}
                >
                  Serviços
                </NavButton>
                <NavButton 
                  active={activeTab === 'calendar'} 
                  onClick={() => setActiveTab('calendar')}
                  icon={<CalendarIcon size={18} />}
                >
                  Calendário
                </NavButton>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={copyLink} className="hidden md:flex items-center text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors">
                 <LinkIcon size={14} className="mr-2"/>
                 Link de Agendamento
              </button>
              
              <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-3 hidden sm:inline">{user.name}</span>
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button onClick={logout} className="ml-4 text-gray-400 hover:text-red-500 transition-colors" title="Sair">
                    <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
        {activeTab === 'services' && <ServiceList />}
        {activeTab === 'calendar' && <CalendarView />}
        <Notifications />
      </main>
    </div>
    </StoreProvider>
  );
}

function NavButton({ children, active, onClick, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
        active 
          ? 'text-indigo-600 bg-indigo-50' 
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
      )}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </button>
  );
}
