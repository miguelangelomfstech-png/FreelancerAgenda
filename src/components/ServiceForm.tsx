import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import type { Service } from '../types';

// I didn't install uuid. I'll use crypto.randomUUID() or Date.now().

export function ServiceForm({ onSuccess }: { onSuccess: () => void }) {
  const { addService } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '30',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: crypto.randomUUID(),
      name: formData.name,
      description: formData.description,
      duration: parseInt(formData.duration),
      price: parseFloat(formData.price),
    };
    addService(newService);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome do Serviço"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Ex: Consultoria"
        required
      />
      <Input
        label="Descrição"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Breve descrição..."
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Duração (min)"
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          required
        />
        <Input
          label="Preço (R$)"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit">Salvar Serviço</Button>
      </div>
    </form>
  );
}
