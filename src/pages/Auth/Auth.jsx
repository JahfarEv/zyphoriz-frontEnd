import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LockKeyhole, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';

const adminAppUrl =
  import.meta.env.VITE_ADMIN_URL || (import.meta.env.DEV ? 'http://localhost:5174' : '/admin');

export const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ mobile: '', email: '', password: '', identifier: '' });
  const [recoveryStep, setRecoveryStep] = useState('email');
  const [recovery, setRecovery] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destination = searchParams.get('redirect') || '/dashboard';
  const set = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const setRecoveryField = (field) => (event) =>
    setRecovery((current) => ({ ...current, [field]: event.target.value }));

  const startPasswordRecovery = () => {
    setRecovery((current) => ({
      ...current,
      email: form.identifier.includes('@') ? form.identifier.trim() : current.email,
    }));
    setRecoveryStep('email');
    setMode('forgot');
    setError('');
    setNotice('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setIsSubmitting(true);
    try {
      if (mode === 'register') {
        await register({ mobile: form.mobile, email: form.email, password: form.password });
      } else {
        await login({ identifier: form.identifier, password: form.password });
      }
      navigate(destination, { replace: true });
    } catch (authError) {
      setError(authError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setIsSubmitting(true);
    try {
      await api.auth.sendOtp({ email: recovery.email.trim() });
      setRecoveryStep('otp');
      setNotice('If an account exists for that email, an OTP has been sent.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setIsSubmitting(true);
    try {
      await api.auth.verifyOtp({ email: recovery.email.trim(), otp: recovery.otp });
      setRecoveryStep('password');
      setNotice('OTP verified. Choose a new password.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    if (recovery.newPassword !== recovery.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.auth.resetPassword({
        email: recovery.email.trim(),
        otp: recovery.otp,
        newPassword: recovery.newPassword,
      });
      setMode('login');
      setRecoveryStep('email');
      setForm((current) => ({ ...current, identifier: recovery.email, password: '' }));
      setRecovery({ email: '', otp: '', newPassword: '', confirmPassword: '' });
      setNotice('Password reset successfully. Log in with your new password.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const recoverySubmit = {
    email: handleSendOtp,
    otp: handleVerifyOtp,
    password: handleResetPassword,
  }[recoveryStep];

  const goToLogin = () => {
    setMode('login');
    setError('');
    setNotice('');
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-background px-4 py-12 flex items-center justify-center">
      <section className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
            {mode === 'register'
              ? 'Create your zyphoriz account'
              : mode === 'forgot'
                ? 'Reset your password'
                : 'Welcome back'}
          </h1>
          <p className="font-sans text-sm text-on-surface-variant mt-2">
            {mode === 'register'
              ? 'Sign up before listing your business.'
              : mode === 'forgot'
                ? 'Verify your email with a one-time password.'
                : 'Log in to manage your businesses.'}
          </p>
        </div>

        {mode === 'forgot' ? (
          <form onSubmit={recoverySubmit} className="space-y-4">
            {recoveryStep === 'email' && (
              <label className="block">
                <span className="font-sans text-xs font-semibold text-on-surface-variant">Email address</span>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={recovery.email}
                    onChange={setRecoveryField('email')}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </label>
            )}

            {recoveryStep === 'otp' && (
              <>
                <p className="text-sm text-on-surface-variant">Enter the six-digit OTP sent to {recovery.email}.</p>
                <label className="block">
                  <span className="font-sans text-xs font-semibold text-on-surface-variant">One-time password</span>
                  <input
                    required
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={recovery.otp}
                    onChange={(event) =>
                      setRecovery((current) => ({ ...current, otp: event.target.value.replace(/\D/g, '').slice(0, 6) }))
                    }
                    placeholder="123456"
                    className="mt-1.5 w-full px-3 py-3 bg-background border border-outline-variant rounded-xl text-sm tracking-[0.3em] text-center focus:outline-none focus:border-primary"
                  />
                </label>
              </>
            )}

            {recoveryStep === 'password' && (
              <>
                <label className="block">
                  <span className="font-sans text-xs font-semibold text-on-surface-variant">New password</span>
                  <div className="relative mt-1.5">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                    <input
                      required
                      minLength={8}
                      autoComplete="new-password"
                      type="password"
                      value={recovery.newPassword}
                      onChange={setRecoveryField('newPassword')}
                      placeholder="At least 8 characters"
                      className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="font-sans text-xs font-semibold text-on-surface-variant">Confirm new password</span>
                  <div className="relative mt-1.5">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                    <input
                      required
                      minLength={8}
                      autoComplete="new-password"
                      type="password"
                      value={recovery.confirmPassword}
                      onChange={setRecoveryField('confirmPassword')}
                      placeholder="Enter your new password again"
                      className="w-full pl-10 pr-3 py-3 bg-background border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </label>
              </>
            )}

            {error && <p role="alert" className="text-sm text-error bg-error-container rounded-xl px-3 py-2">{error}</p>}
            {notice && <p role="status" className="text-sm text-on-surface-variant bg-primary/10 rounded-xl px-3 py-2">{notice}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {isSubmitting
                ? 'Please wait...'
                : recoveryStep === 'email'
                  ? 'Send OTP'
                  : recoveryStep === 'otp'
                    ? 'Verify OTP'
                    : 'Reset password'}
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
            {recoveryStep !== 'email' && (
              <button
                type="button"
                onClick={() => { setRecoveryStep('email'); setError(''); setNotice(''); }}
                className="w-full inline-flex items-center justify-center gap-2 text-sm text-primary font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Use a different email
              </button>
            )}
            <button
              type="button"
              onClick={goToLogin}
              className="w-full text-center text-sm text-on-surface-variant hover:text-primary"
            >
              Back to log in
            </button>
          </form>
        ) : (
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
          {notice && <p role="status" className="text-sm text-on-surface-variant bg-primary/10 rounded-xl px-3 py-2">{notice}</p>}

          <button disabled={isSubmitting} type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60">
            {isSubmitting ? 'Please wait...' : mode === 'register' ? 'Create account' : 'Log in'}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
        )}

        {mode === 'login' && (
          <div className="mt-4 flex items-center justify-between gap-3 font-sans text-sm text-on-surface-variant">
            <a href={adminAppUrl} className="text-primary font-semibold hover:underline">
              Admin sign in
            </a>
            <button type="button" onClick={startPasswordRecovery} className="text-primary font-semibold hover:underline">
              Forgot password?
            </button>
          </div>
        )}

        {mode !== 'forgot' && <p className="text-center font-sans text-sm text-on-surface-variant mt-5">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setNotice(''); }}
            className="text-primary font-semibold hover:underline"
          >
            {mode === 'login' ? 'Register' : 'Log in'}
          </button>
        </p>
        }

        <p className="text-center font-sans text-xs text-on-surface-variant mt-6">
          Browse businesses without an account. <Link to="/" className="text-primary font-semibold hover:underline">Return home</Link>
        </p>
      </section>
    </main>
  );
};
