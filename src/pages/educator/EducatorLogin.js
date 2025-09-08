import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../auth/config';
import { ArrowLeft } from 'lucide-react';

const EducatorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Set default educator demo credentials
    setEmail('prof.sarah@demo.com');
    setPassword('prof123');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store educator role in localStorage
    localStorage.setItem('userRole', 'educator');
    
    const user = login(email, password);
    if (user) {
      // Redirect to educator app
      navigate('/educator-app');
    } else {
      setError('Invalid credentials. Use the demo credentials shown below.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Subtle background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
      
      {/* Back to Landing */}
      <div className="absolute top-6 left-6 z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#AC5757] transition-colors">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-oswald font-medium text-[#AC5757] text-[42px] mb-2">AXORA</h1>
              <h2 className="font-judson text-2xl text-gray-900 font-bold mb-2">
                Welcome Back, Educator
              </h2>
              <p className="text-gray-600">
                Access teaching tools and student management
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
                  placeholder="prof.sarah@demo.com"
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
                <Link to="/educator-signup" className="text-[#AC5757] font-semibold hover:text-[#8A4A4A] transition-colors">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Demo Note */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 text-center">
                <strong className="text-gray-900">Educator Demo Credentials:</strong><br />
                <span className="font-mono text-xs text-gray-600">{email}</span><br />
                <span className="font-mono text-xs text-gray-600">{password}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorLogin;
