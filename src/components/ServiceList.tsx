import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ServiceForm } from './ServiceForm';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Trash2, Clock, DollarSign, Plus } from 'lucide-react';

export function ServiceList() {
  const { services, deleteService } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Meus Serviços</h2>
          <p className="text-sm text-gray-500">Gerencie os serviços que você oferece.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus size={18} className="mr-2" />
          Novo Serviço
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900 line-clamp-1">{service.name}</h3>
              <button 
                onClick={() => deleteService(service.id)}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                title="Excluir serviço"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{service.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-50 pt-4">
              <div className="flex items-center">
                <Clock size={16} className="mr-1.5 text-indigo-500" />
                {service.duration} min
              </div>
              <div className="flex items-center font-medium text-gray-900">
                <DollarSign size={16} className="mr-0.5 text-indigo-500" />
                {service.price.toFixed(2)}
              </div>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p>Nenhum serviço cadastrado.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Novo Serviço"
      >
        <ServiceForm onSuccess={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
}
