import React, { useState } from 'react';
import MitsubishiLogo from './MitsubishiLogo';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (staffName: string, staffEmail: string) => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('ahmad.razali@mitsubishi.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both Email/Staff ID and Password.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Ahmad Razali', email);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans text-brand-charcoal relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-br from-brand-red via-brand-red-deep to-primary diagonal-lines">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg/80"></div>
      </div>

      {/* Top red bar with branding */}
      <div className="relative z-10 px-5 pt-10 pb-6">
        <div className="flex items-center justify-center mb-4">
          <MitsubishiLogo className="w-16 h-16" showText={false} />
        </div>
        <div className="text-center">
          <p className="text-lg mt-1 font-medium">
            Sales Companion Portal
          </p>
        </div>
      </div>

      {/* Main login card */}
      <div className="relative z-10 flex-1 px-4 pb-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-up">
            {/* Card header accent */}
            <div className="h-1 bg-gradient-to-r from-brand-red-deep via-brand-red to-brand-red-light"></div>

            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-brand-charcoal text-xl font-bold font-display">
                  Sign In
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Access your sales dashboard
                </p>
              </div>

              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium animate-fade-in">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email/Staff ID */}
                <div className="animate-fade-up stagger-1">
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2.5">
                    Email / Staff ID
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-red transition-colors">
                      <User size={18} strokeWidth={1.5} />
                    </div>
                    <input
                      type="text"
                      id="email"
                      className="block w-full h-12 pl-12 pr-4 border border-brand-border rounded-xl bg-gray-50/50 focus:bg-white text-sm focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all duration-200 font-medium"
                      placeholder="Enter your email or Staff ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="animate-fade-up stagger-2">
                  <div className="flex justify-between items-center mb-2.5">
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-medium text-brand-red hover:text-brand-red-deep transition-colors focus:outline-none focus:ring-brand-red/30 rounded px-1.5 py-0.5"
                      onClick={() => alert("Password reset link sent to registered email.")}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-red transition-colors">
                      <Lock size={18} strokeWidth={1.5} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className="block w-full h-12 pl-12 pr-12 border border-brand-border rounded-xl bg-gray-50/50 focus:bg-white text-sm focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all duration-200 font-medium"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-brand-red/30 rounded"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} strokeWidth={1.5} aria-hidden="true" /> : <Eye size={18} strokeWidth={1.5} aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center animate-fade-up stagger-3">
                  <div className="relative">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="sr-only"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label
                      htmlFor="remember_me"
                      className="flex items-center cursor-pointer select-none"
                    >
                      <span className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
                        rememberMe
                          ? 'bg-brand-red border-brand-red'
                          : 'border-brand-border hover:border-gray-300'
                      }`}>
                        {rememberMe && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="ml-2.5 text-sm text-gray-500 font-medium">
                        Remember me for 30 days
                      </span>
                    </label>
                  </div>
                </div>

                {/* Login Button */}
                <div className="pt-3 animate-fade-up stagger-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-brand-red to-primary text-white font-semibold text-sm rounded-xl hover:from-brand-red-deep hover:to-primary transition-all duration-200 focus:outline-none focus:ring-brand-red/40 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-brand-red/15 clipped-corner group"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <>
                        <span className="font-bold tracking-wide">Sign In</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Secure access badge */}
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow"></div>
              <span className="font-medium tracking-wider uppercase">Secure Enterprise Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-6 pt-2">
        <p className="text-center text-xs text-gray-400 font-medium tracking-wide">
          © 2026 Mitsubishi Motors Malaysia. All rights reserved.
        </p>
      </div>
    </div>
  );
}
