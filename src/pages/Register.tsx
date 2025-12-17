import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    const success = await register(formData.name, formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/brand/logo.png" alt="MFSTECHGROUP" className="h-20 w-auto mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-brand-primary tracking-tight">
            Crie sua Agenda Profissional
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Junte-se à rede de especialistas MFSTECH
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Seu Nome"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu Nome"
              />

              <Input
                label="E-mail"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="exemplo@email.com"
              />

              <Input
                label="Senha"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />

              <Input
                label="Repita a Senha"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
              />

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-gradient hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
              >
                Registrar
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-bold text-brand-primary hover:text-brand-secondary transition-colors">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
