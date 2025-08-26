import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../auth/config';
import { GraduationCap, Lock, Mail, ArrowLeft, Sparkles } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('ahmed.almansouri@demo.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      // Let the routing logic handle onboarding check
      const hasCompletedOnboarding = localStorage.getItem('onboardingComplete') === 'true';
      if (hasCompletedOnboarding) {
        navigate('/app');
      } else {
        navigate('/onboarding');
      }
    } else {
      setError('Invalid credentials. Use ahmed.almansouri@demo.com / demo123');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand rounded-full filter blur-3xl opacity-20 animate-pulse" />
      

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/50">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand rounded-2xl mb-4 shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-serif text-3xl text-ink font-bold mb-2">Welcome to AXORA</h1>
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Sparkles className="text-purple-500" size={16} />
                Learn. Build. Level Up.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    placeholder="ahmed.almansouri@demo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-brand text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-[1.02] hover:bg-brand/90"
              >
                Login to AXORA
              </button>
            </form>

            {/* Demo Note */}
            <div className="mt-6 p-4 bg-brand-500 rounded-xl">
              <p className="text-sm text-white text-center">
                <strong className="text-white">Demo Credentials:</strong><br />
                <span className="font-mono text-xs text-white">ahmed.almansouri@demo.com</span><br />
                <span className="font-mono text-xs text-white">demo123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;