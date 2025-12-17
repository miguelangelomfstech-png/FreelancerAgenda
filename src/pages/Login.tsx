import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <img src="/brand/logo.png" alt="MFSTECHGROUP" className="h-20 w-auto mx-auto mb-6" />
          <h2 className="text-center text-3xl font-extrabold text-brand-primary tracking-tight">
            Acesse sua Agenda
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Gerencie seus compromissos com a tecnologia MFSTECH
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
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

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-gradient hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
              >
                Entrar
              </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              Ainda não tem conta?{' '}
              <Link to="/register" className="font-bold text-brand-primary hover:text-brand-secondary transition-colors transition-colors">
                Crie sua conta agora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
