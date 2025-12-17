import { useNavigate, Link } from 'react-router-dom';
import { LayoutGrid, Calendar, Users, Rocket } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img src="/brand/logo.png" alt="MFSTECHGROUP" className="h-10 w-auto" />
          <span className="text-xl font-bold text-brand-dark tracking-tight hidden sm:inline">Freelancer Agenda</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors">Entrar</Link>
          <Link to="/register" className="bg-brand-gradient text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all active:scale-95">Começar Agora</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-brand-primary px-4 py-2 rounded-full text-xs font-bold mb-4 animate-in fade-in slide-in-from-bottom duration-700">
            <Rocket size={14} />
            <span>SOLUÇÃO PARA FREELANCERS MFSTECH</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-brand-dark tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom duration-1000 delay-100">
            Sua Agenda <span className="text-transparent bg-clip-text bg-brand-gradient">Automatizada</span> <br /> e Profissional
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 text-balance animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            Aumente sua produtividade com a plataforma líder em gestão de compromissos. 
            Crie seu link de agendamento em minutos e deixe seus clientes marcarem horários sozinhos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <button 
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-10 py-4 bg-brand-gradient text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Criar minha Agenda Grátis
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-gray-100 text-brand-dark rounded-2xl font-bold text-lg hover:border-brand-primary hover:text-brand-primary transition-all active:scale-95"
            >
              Fazer Login
            </button>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none opacity-20">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-brand-secondary/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>
      </header>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Tudo o que você precisa</h2>
            <div className="w-20 h-1.5 bg-brand-gradient mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<LayoutGrid className="text-blue-600" size={32} />}
              title="Gestão de Serviços"
              description="Cadastre seus serviços com preços e durações personalizadas."
            />
            <FeatureCard 
              icon={<Calendar className="text-blue-600" size={32} />}
              title="Calendário Inteligente"
              description="Visualize seus compromissos diários de forma simples e intuitiva."
            />
            <FeatureCard 
              icon={<Users className="text-blue-600" size={32} />}
              title="Página de Agendamento"
              description="Seus clientes agendam 24/7 sem que você precise responder mensagens."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <img src="/brand/logo.png" alt="MFSTECHGROUP" className="h-8 w-auto mx-auto mb-6 grayscale opacity-50" />
          <p className="text-sm text-gray-500">© 2025 MFSTECHGROUP. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-gradient group-hover:text-white transition-all text-brand-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-brand-dark mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
