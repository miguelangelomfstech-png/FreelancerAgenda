import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Service, Appointment } from '../types';

interface StoreContextType {
  services: Service[];
  appointments: Appointment[];
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  addAppointment: (appointment: Appointment) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'app_services',
  APPOINTMENTS: 'app_appointments',
};

const INITIAL_SERVICES: Service[] = [
  { id: '1', name: 'Consultoria Rápida', description: 'Videochamada de 30min', duration: 30, price: 150 },
  { id: '2', name: 'Projeto Completo', description: 'Planejamento e execução', duration: 120, price: 500 },
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  const addService = (service: Service) => {
    setServices((prev) => [...prev, service]);
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <StoreContext.Provider value={{ services, appointments, addService, deleteService, addAppointment }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
