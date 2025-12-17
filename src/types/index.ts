export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
}

export interface Client {
  name: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  date: string; // ISO string
  client: Client;
  status: 'confirmed' | 'cancelled';
}
