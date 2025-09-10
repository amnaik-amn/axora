import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { login } from '../auth/config';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const role = searchParams.get('role') || 'learner';

  useEffect(() => {
    // Set demo credentials based on role
    switch(role) {
      case 'professor':
        setEmail('prof.sarah@demo.com');
        setPassword('prof123');
        break;
      case 'recruiter':
        setEmail('recruiter@demo.com');
        setPassword('recruit123');
        break;
      default: // learner
        setEmail('ahmed.almansouri@demo.com');
        setPassword('demo123');
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store role in localStorage for dashboard selection
    localStorage.setItem('userRole', role);
    
    const user = login(email, password);
    if (user) {
      // Always redirect to app for demo purposes
      navigate('/app');
    } else {
      setError(`Invalid credentials. Use the demo credentials shown below.`);
    }
  };

  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'professor': return 'Professor';
      case 'recruiter': return 'Recruiter';
      default: return 'Learner';
    }
  };

  const getRoleDescription = (role) => {
    switch(role) {
      case 'professor': return 'Access teaching tools and student management';
      case 'recruiter': return 'Find and connect with talented students';
      default: return 'Log in to continue your learning journey';
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
              <h1 className="font-oswald font-medium text-[#AC5757] text-[50px] mb-2">AXORA</h1>
              <h2 className="font-judson text-2xl text-gray-900 font-bold mb-2">
                Welcome Back, {getRoleDisplayName(role)}
              </h2>
              <p className="text-gray-600">
                {getRoleDescription(role)}
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
                <strong className="text-gray-900">{getRoleDisplayName(role)} Demo Credentials:</strong><br />
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

export default Login;