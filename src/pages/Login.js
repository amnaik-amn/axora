import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../auth/config';
import { ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-100 relative">
      {/* Subtle background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
      
      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-gray-700 hover:text-[#AC5757] transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-oswald font-medium text-[#AC5757] text-[42px] mb-2">AXORA</h1>
              <h2 className="font-judson text-2xl text-gray-900 font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-600">
                Log in to continue your learning journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  placeholder="ahmed.almansouri@demo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#AC5757] text-white py-4 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors"
              >
                Log In
              </button>
            </form>

            {/* Sign up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#AC5757] font-semibold hover:text-[#8A4A4A] transition-colors">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Demo Note */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 text-center">
                <strong className="text-gray-900">Demo Credentials:</strong><br />
                <span className="font-mono text-xs text-gray-600">ahmed.almansouri@demo.com</span><br />
                <span className="font-mono text-xs text-gray-600">demo123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;