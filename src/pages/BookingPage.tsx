import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Service, Appointment } from '../types';
import { Button } from '../components/ui/Button'; // Fixed import path
import { Input } from '../components/ui/Input';
import { Check, ChevronLeft } from 'lucide-react';
import { clsx } from 'clsx';
// Note: reusing CalendarView or building a simpler selection calendar?
// Using a simpler horizontal date picker or standard date input for simplicity in this wizard.
// Or just a grid of next 14 days.

export function BookingPage() {
  const { services, addAppointment, appointments } = useStore();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientData, setClientData] = useState({ name: '', phone: '', email: '' });

  const handleBook = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(':');
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(parseInt(hours), parseInt(minutes));

    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      serviceId: selectedService.id,
      date: appointmentDate.toISOString(),
      client: { ...clientData },
      status: 'confirmed'
    };

    addAppointment(newAppointment);
    setStep(4); // Success
  };

  // Generate next 14 days
  const upcomingDays = Array.from({ length: 14 }, (_, i) => addDays(startOfToday(), i));
  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  // Check availability logic (simple: if appt exists at that time)
  const isSlotAvailable = (date: Date, time: string) => {
    return !appointments.some(appt => {
      const apptDate = new Date(appt.date);
      const [h, m] = time.split(':');
      return isSameDay(apptDate, date) && apptDate.getHours() === parseInt(h) && apptDate.getMinutes() === parseInt(m);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-8 py-6 text-white text-center">
            <h1 className="text-2xl font-bold">Agende seu Horário</h1>
            <p className="text-indigo-100 mt-2">Profissional Demo</p>
          </div>

          <div className="p-8">
            {/* Steps Progress */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={clsx("w-3 h-3 rounded-full transition-colors", s === step ? "bg-indigo-600" : s < step ? "bg-green-500" : "bg-gray-200")} />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Selecione um Serviço</h2>
                <div className="grid gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => { setSelectedService(service); setStep(2); }}
                      className="text-left w-full p-6 rounded-xl border-2 border-transparent bg-gray-50 hover:border-indigo-600 hover:bg-indigo-50 transition-all group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-700">{service.name}</h3>
                          <p className="text-gray-500 text-sm mt-1">{service.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="block font-bold text-gray-900">R$ {service.price.toFixed(2)}</span>
                          <span className="text-sm text-gray-500">{service.duration} min</span>
                        </div>
                      </div>
                    </button>
                  ))}
                  {services.length === 0 && <p className="text-center text-gray-500">Nenhum serviço disponível.</p>}
                </div>
              </div>
            )}

            {step === 2 && selectedService && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <button onClick={() => setStep(1)} className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium mb-4">
                  <ChevronLeft size={16} className="mr-1" /> Voltar
                </button>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Escolha a Data</h2>
                  <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
                    {upcomingDays.map((day) => (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={clsx(
                          "flex-shrink-0 w-24 p-3 rounded-xl border-2 text-center transition-all",
                          selectedDate && isSameDay(selectedDate, day)
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-indigo-300"
                        )}
                      >
                        <span className="block text-xs uppercase font-bold text-gray-500 mb-1">{format(day, 'EEE', { locale: ptBR })}</span>
                        <span className="block text-2xl font-bold">{format(day, 'd')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div className="animate-in fade-in">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Horários Disponíveis</h2>
                    <div className="grid grid-cols-4 gap-3">
                      {timeSlots.map((time) => {
                        const available = isSlotAvailable(selectedDate, time);
                        return (
                          <button
                            key={time}
                            disabled={!available}
                            onClick={() => setSelectedTime(time)}
                            className={clsx(
                              "py-2 rounded-lg text-sm font-medium border transition-all",
                              selectedTime === time
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : available
                                  ? "bg-white text-gray-700 border-gray-200 hover:border-indigo-200"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent"
                            )}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <Button 
                    className="w-full" 
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(3)}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <button onClick={() => setStep(2)} className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium mb-4">
                  <ChevronLeft size={16} className="mr-1" /> Voltar
                </button>

                <h2 className="text-xl font-semibold text-gray-900">Seus Dados</h2>
                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500">Serviço:</span>
                   <span className="font-medium">{selectedService?.name}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500">Data:</span>
                   <span className="font-medium capitalize">{selectedDate && format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500">Horário:</span>
                   <span className="font-medium">{selectedTime}</span>
                 </div>
                </div>

                <div className="space-y-4">
                  <Input 
                    label="Nome Completo" 
                    value={clientData.name} 
                    onChange={e => setClientData({...clientData, name: e.target.value})} 
                  />
                  <Input 
                    label="Telefone (WhatsApp)" 
                    value={clientData.phone} 
                    onChange={e => setClientData({...clientData, phone: e.target.value})} 
                  />
                  <Input 
                    label="Email (Opcional)" 
                    value={clientData.email} 
                    onChange={e => setClientData({...clientData, email: e.target.value})} 
                  />
                </div>

                <Button className="w-full" onClick={handleBook} disabled={!clientData.name || !clientData.phone}>
                  Confirmar Agendamento
                </Button>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-12 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <Check size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Agendamento Confirmado!</h2>
                <p className="text-gray-500 mb-8">Obrigado, {clientData.name}. Entraremos em contato em breve.</p>
                <Button onClick={() => window.location.href = '/'}>Voltar ao Início</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
