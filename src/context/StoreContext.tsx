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



const INITIAL_SERVICES: Service[] = [
  { id: '1', name: 'Consultoria Rápida', description: 'Videochamada de 30min', duration: 30, price: 150 },
  { id: '2', name: 'Projeto Completo', description: 'Planejamento e execução', duration: 120, price: 500 },
];

export const StoreProvider: React.FC<{ children: ReactNode; userId?: string }> = ({ children, userId }) => {
  // If a userId is not provided (e.g. public booking page might need one passed, or dashboard uses logged in user),
  // we might handle that in the hook consumption or here.
  // For the dashboard, we want the logged-in user's ID.
  // For the booking page, we want the target freelancer's ID.
  
  // We will force a key update whenever the userId changes to reset state
  const storageKeyServices = userId ? `app_services_${userId}` : null;
  const storageKeyAppointments = userId ? `app_appointments_${userId}` : null;

  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load data when userId changes
  useEffect(() => {
    if (!storageKeyServices || !storageKeyAppointments) {
      setServices([]);
      setAppointments([]);
      return;
    }

    const savedServices = localStorage.getItem(storageKeyServices);
    const savedAppointments = localStorage.getItem(storageKeyAppointments);

    setServices(savedServices ? JSON.parse(savedServices) : INITIAL_SERVICES);
    setAppointments(savedAppointments ? JSON.parse(savedAppointments) : []);
  }, [userId, storageKeyServices, storageKeyAppointments]);

  // Save data when it changes
  useEffect(() => {
    if (storageKeyServices && services.length > 0) { // Don't overwrite with empty if initializing
       // Actually we can overwrite if it's intentional, but here let's be safe.
       // Better logic: we only write if we have a valid key.
       localStorage.setItem(storageKeyServices, JSON.stringify(services));
    }
  }, [services, storageKeyServices]);

  useEffect(() => {
    if (storageKeyAppointments) {
       localStorage.setItem(storageKeyAppointments, JSON.stringify(appointments));
    }
  }, [appointments, storageKeyAppointments]);

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
