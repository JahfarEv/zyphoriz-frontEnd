import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register } = useAuth();
  const [mode, setMode] = useState('register');
  const [form, setForm] = useState({ mobile: '', email: '', password: '', identifier: '' });
  const [error, setError] = useState('');

  const destination = searchParams.get('redirect') || '/dashboard';
  const set = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (mode === 'register') {
        await register({ mobile: form.mobile, email: form.email, password: form.password });
      } else {
        await login({ identifier: form.identifier, password: form.password });
      }
      navigate(destination, { replace: true });
    } catch (authError) {
      setError(authError.message);
    }
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-background px-4 py-12 flex items-center justify-center">
      <section className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
            {mode === 'register' ? 'Create your zyphoriz account' : 'Welcome back'}
          </h1>
          <p className="font-sans text-sm text-on-surface-variant mt-2">
            {mode === 'register' ? 'Sign up before listing your business.' : 'Log in to manage your businesses.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1 p-1 bg-surface-container rounded-xl mb-6">
          {['register', 'login'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => { setMode(tab); setError(''); }}
              className={`py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                mode === tab ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant'
              }`}
            >
              {tab === 'register' ? 'Register' : 'Log in'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' ? (
            <>
              <label className="block">
                <span className="font-sans text-xs font-semibold text-on-surface-variant">Mobile number</span>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input required type="tel" value={form.mobile} onChange={set('mobile')} placeholder="+91 9876543210" className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
              </label>
              <label className="block">
                <span className="font-sans text-xs font-semibold text-on-surface-variant">Email address</span>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
              </label>
            </>
          ) : (
            <label className="block">
              <span className="font-sans text-xs font-semibold text-on-surface-variant">Email or mobile number</span>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input required value={form.identifier} onChange={set('identifier')} placeholder="Email or mobile number" className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
            </label>
          )}

          <label className="block">
            <span className="font-sans text-xs font-semibold text-on-surface-variant">Password</span>
            <div className="relative mt-1.5">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input required minLength={6} type="password" value={form.password} onChange={set('password')} placeholder="At least 6 characters" className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary" />
            </div>
          </label>

          {error && <p className="text-sm text-error bg-error-container rounded-xl px-3 py-2">{error}</p>}

          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors">
            {mode === 'register' ? 'Create account' : 'Log in'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center font-sans text-xs text-on-surface-variant mt-6">
          Browse businesses without an account. <Link to="/" className="text-primary font-semibold hover:underline">Return home</Link>
        </p>
      </section>
    </main>
  );
};
