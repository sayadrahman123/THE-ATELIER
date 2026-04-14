import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register, loading } = useAuth();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const result = await login(loginData.email, loginData.password);
    if (result.success) navigate('/');
    else setLoginError('Invalid credentials. Please try again.');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register(registerData.name, registerData.email);
    if (result.success) navigate('/');
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      <main className="min-h-screen flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Atmospheric background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-fixed/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-fixed/20 blur-[120px] pointer-events-none" />

        {/* Mobile branding */}
        <div className="absolute top-8 left-8 md:hidden">
          <span className="text-xl font-bold tracking-widest font-headline">THE ATELIER</span>
        </div>

        {/* Split-screen card */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 ambient-shadow bg-surface-container-lowest overflow-hidden">

          {/* ── Left: Login ── */}
          <section className="p-8 md:p-16 flex flex-col justify-center">
            <div className="mb-12">
              <span className="text-xs font-label font-semibold tracking-[0.2em] text-secondary uppercase mb-4 block">
                Returning
              </span>
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4 leading-tight">
                Welcome Back
              </h1>
              <p className="text-on-surface-variant font-body leading-relaxed max-w-sm">
                Sign in to your curated space and continue your journey with THE ATELIER.
              </p>
            </div>

            <form className="space-y-10" onSubmit={handleLogin}>
              <div className="space-y-2 group">
                <label className="text-[10px] font-label font-bold tracking-widest text-on-surface-variant uppercase group-focus-within:text-secondary transition-colors block">
                  Email Address
                </label>
                <div className="ghost-border py-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline">mail</span>
                  <input
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:text-outline-variant font-body outline-none"
                    placeholder="curator@atelier.com"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-label font-bold tracking-widest text-on-surface-variant uppercase group-focus-within:text-secondary transition-colors block">
                  Password
                </label>
                <div className="ghost-border py-2 flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline">lock</span>
                  <input
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:text-outline-variant font-body outline-none"
                    placeholder="••••••••"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="text-right mt-2">
                  <a href="#" className="text-[10px] font-label font-semibold tracking-widest text-secondary hover:opacity-70 uppercase">
                    Forgot Credentials?
                  </a>
                </div>
              </div>

              {loginError && (
                <p className="text-xs text-error font-label tracking-wide">{loginError}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-on-primary py-5 px-8 font-label font-bold tracking-[0.15em] uppercase hover:bg-secondary transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? 'Entering...' : 'Enter The Atelier'}
                </button>
              </div>
            </form>

            {/* Social Access */}
            <div className="mt-16">
              <p className="text-[10px] font-label font-bold tracking-widest text-on-surface-variant uppercase mb-6 flex items-center gap-4">
                <span className="flex-grow h-[1px] bg-outline-variant/30" />
                Or Access Via
                <span className="flex-grow h-[1px] bg-outline-variant/30" />
              </p>
              <div className="flex gap-4">
                <button className="flex-1 border-b border-outline-variant/20 py-4 flex items-center justify-center hover:bg-surface-container-low transition-colors group">
                  <span className="text-[11px] font-label font-bold tracking-widest uppercase group-hover:text-secondary">Apple</span>
                </button>
                <button className="flex-1 border-b border-outline-variant/20 py-4 flex items-center justify-center hover:bg-surface-container-low transition-colors group">
                  <span className="text-[11px] font-label font-bold tracking-widest uppercase group-hover:text-secondary">Google</span>
                </button>
              </div>
            </div>
          </section>

          {/* ── Right: Register ── */}
          <section className="relative bg-surface-container-low p-8 md:p-16 flex flex-col">
            {/* Branding */}
            <div className="absolute top-10 right-10 hidden lg:block">
              <span className="text-lg font-bold tracking-[0.3em] font-headline">THE ATELIER</span>
            </div>

            <div className="relative flex-grow flex flex-col justify-center">
              <div className="mb-10">
                <span className="text-xs font-label font-semibold tracking-[0.2em] text-secondary uppercase mb-4 block">
                  New Guest
                </span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-6 leading-tight">
                  Create An Identity
                </h2>
              </div>

              {/* Visual narrative bento */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="aspect-[4/5] bg-surface overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3ESoXIkrbCjwd2WC_Yy7mZWa98gHP59rOLRLXHTB6Lmy0HmaSfRA7euua-KCjyNj5JyGMwo-CAs4NY-yDMHnyQaREXWtg9BQhj8KICUCXQSIxM89aHv1nUZprv_5OoH-njjDyEEs3_OpRLgvfkVsrPg1L3QoSudBxb88oAWzlzHHs34xndS3UPZVmL73VQlwQEDeM1RFk8W27e7kmk-Y8jj_tq2WHLoy-mY9fFPEwITIyt7CW9vXaKnipqRlIx2yMYABGh1P9jRt1"
                    alt="Premium leather goods"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="aspect-[4/5] bg-surface flex flex-col justify-end p-6 border-b border-secondary/20">
                  <h3 className="text-xl font-headline italic mb-2">Member Benefits</h3>
                  <p className="text-[10px] font-label tracking-widest text-on-surface-variant uppercase leading-loose">
                    Priority Access<br />Curated Collections<br />Bespoke Services
                  </p>
                </div>
              </div>

              <form className="space-y-8" onSubmit={handleRegister}>
                <div className="ghost-border py-2 flex items-center gap-3 group">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-secondary transition-colors">person</span>
                  <input
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:text-outline-variant font-body outline-none"
                    placeholder="Full Name"
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="ghost-border py-2 flex items-center gap-3 group">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-secondary transition-colors">alternate_email</span>
                  <input
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:text-outline-variant font-body outline-none"
                    placeholder="Email Address"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-transparent border border-primary text-primary py-5 px-8 font-label font-bold tracking-[0.15em] uppercase hover:bg-primary hover:text-on-primary transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-60"
                  >
                    Begin Registration
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-2">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </form>

              <p className="mt-8 text-[11px] font-body text-on-surface-variant leading-relaxed text-center lg:text-left">
                By creating an account, you agree to our{' '}
                <a href="#" className="underline decoration-secondary-fixed-dim text-on-surface hover:text-secondary transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline decoration-secondary-fixed-dim text-on-surface hover:text-secondary transition-colors">
                  Privacy Policy
                </a>.
              </p>
            </div>
          </section>
        </div>

        {/* Footer attribution */}
        <footer className="absolute bottom-6 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant/60 font-label text-[10px] tracking-[0.2em] uppercase">
          <span>© 2024 THE ATELIER. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-secondary transition-colors">Privacy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms</a>
            <a href="#" className="hover:text-secondary transition-colors">Contact</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AuthPage;
