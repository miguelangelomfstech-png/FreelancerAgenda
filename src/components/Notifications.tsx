import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';

export function Notifications() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Simulate a notification appearing after 5 seconds
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white border-l-4 border-indigo-600 rounded-lg shadow-lg p-4 max-w-sm flex items-start gap-3">
        <div className="text-indigo-600 mt-0.5">
          <Bell size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">Lembrete de Agenda</h4>
          <p className="text-sm text-gray-600 mt-1">Você tem um agendamento ("Consultoria") começando em breve (10:00).</p>
        </div>
        <button onClick={() => setShow(false)} className="text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
