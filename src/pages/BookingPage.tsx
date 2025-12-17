import { useState } from 'react';
import { useStore, StoreProvider } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Service, Appointment } from '../types';
import { Button } from '../components/ui/Button'; // Fixed import path
import { Input } from '../components/ui/Input';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

// Internal component with the logic
function BookingPageContent() {
  const { services, addAppointment, appointments } = useStore();
  const { getUserById } = useAuth();
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const uid = searchParams.get('uid');
  const pro = uid ? getUserById(uid) : null;
  
  console.log('BookingPage mount - uid:', uid, 'pro:', pro?.name);
  console.log('Services in Store:', services.length);
  
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

  // Check availability logic
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
          <div className="bg-brand-gradient py-12 px-4 sm:px-6 lg:px-8 shadow-xl">
            <div className="max-w-3xl mx-auto text-center">
                <img src="/brand/logowhite.png" alt="MFSTECHGROUP" className="h-16 w-auto mx-auto mb-6 drop-shadow-md" />
                <h1 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                    Agende seu Horário
                </h1>
                <p className="text-blue-100 mt-2 font-medium bg-white/10 inline-block px-4 py-1 rounded-full">{pro?.name || 'Profissional'}</p>
            </div>
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
                      onClick={() => {
                        setSelectedService(service);
                        setStep(2);
                      }}
                      className="w-full text-left p-6 border-2 border-gray-100 rounded-2xl hover:border-brand-primary hover:bg-blue-50/30 transition-all group relative overflow-hidden bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-center relative z-10">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors">{service.name}</h3>
                          <p className="text-gray-500 text-sm mt-1">{service.description}</p>
                          <div className="flex items-center space-x-4 mt-4 text-sm font-medium">
                            <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{service.duration} min</span>
                            <span className="text-brand-primary">R$ {service.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-brand-primary transform group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
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
                            ? "border-brand-primary bg-blue-50 text-brand-primary"
                            : "border-gray-200 hover:border-brand-light"
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
                                ? "bg-brand-primary text-white border-brand-primary"
                                : available
                                  ? "bg-white text-gray-700 border-gray-200 hover:border-brand-primary"
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
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      disabled={!selectedTime}
                      onClick={() => setStep(3)}
                      className="flex-1 px-4 py-3 bg-brand-gradient text-white rounded-xl font-bold shadow-md hover:opacity-90 disabled:opacity-50 transition-all active:scale-95"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <button onClick={() => setStep(2)} className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium mb-4">
                  <ChevronLeft size={16} className="mr-1" /> Voltar
                </button>

                <h2 className="text-xl font-semibold text-gray-900">Seus Dados</h2>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2">
                  <h3 className="font-bold text-brand-primary">Resumo do Agendamento</h3>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Serviço:</span> {selectedService?.name}<br />
                    <span className="font-medium">Data:</span> {selectedDate && format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}<br />
                    <span className="font-medium">Horário:</span> {selectedTime}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Input
                    label="Seu nome completo"
                    required
                    value={clientData.name}
                    onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                  />
                  <Input
                    label="Telefone (WhatsApp)"
                    required
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                  />
                  <Input 
                    label="Email (Opcional)" 
                    value={clientData.email} 
                    onChange={e => setClientData({...clientData, email: e.target.value})} 
                  />
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleBook}
                    className="flex-1 px-4 py-3 bg-brand-gradient text-white rounded-xl font-bold shadow-md hover:opacity-90 transition-all active:scale-95"
                  >
                    Confirmar Agendamento
                  </button>
                </div>
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

// Wrapper component
export function BookingPage() {
    const [searchParams] = useState(new URLSearchParams(window.location.search));
    const uid = searchParams.get('uid');

    if (!uid) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Erro: Link de agendamento inválido.</p>
            </div>
        );
    }

    return (
        <StoreProvider userId={uid || ''} key={uid}>
            <BookingPageContent />
        </StoreProvider>
    );
}
