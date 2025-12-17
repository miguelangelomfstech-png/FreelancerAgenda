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
    <StoreProvider userId={user.id} key={user.id}>
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar / Navigation */}
      <nav className="bg-brand-gradient border-b border-white/10 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <img src="/brand/logowhite.png" alt="MFSTECHGROUP" className="h-10 w-auto" />
              <div className="h-6 w-[1px] bg-white/20"></div>
              <span className="text-xl font-bold text-white tracking-tight">Agenda</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-2">
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

              <div className="h-6 w-px bg-white/20 hidden md:block"></div>

              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-bold text-white">{user.name}</span>
                  <button onClick={copyLink} className="text-[10px] text-blue-100 hover:text-white flex items-center transition-colors">
                    <LinkIcon size={10} className="mr-1" /> Copiar Link
                  </button>
                </div>
                <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white font-bold shadow-inner">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button 
                  onClick={logout} 
                  className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  title="Sair"
                >
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
        'inline-flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 active:scale-95',
        active 
          ? 'text-white bg-white/15 shadow-inner backdrop-blur-sm' 
          : 'text-blue-100 hover:text-white hover:bg-white/5'
      )}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </button>
  );
}
