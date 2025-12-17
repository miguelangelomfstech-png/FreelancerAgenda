import { useState } from 'react';
import { ServiceList } from '../components/ServiceList';
import { CalendarView } from '../components/CalendarView';
import { Notifications } from '../components/Notifications';
import { LayoutGrid, Calendar as CalendarIcon } from 'lucide-react';
import { clsx } from 'clsx'; // Keeping clsx as used in NavButton locally or use twMerge if preferred

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'services' | 'calendar'>('services');

  return (
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
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">Olá, Profissional</span>
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                P
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
