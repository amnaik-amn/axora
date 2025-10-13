import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calendar helper functions
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 14 - i);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleCalendarDateSelect = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setFormData({ ...formData, dateOfBirth: formattedDate });
    setShowCalendar(false);
  };

  const handleMonthChange = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const handleYearChange = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      // Check if user is at least 15 years old
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      // Adjust age if birthday hasn't occurred this year
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
      
      if (actualAge < 15) {
        newErrors.dateOfBirth = 'You must be at least 15 years old to sign up';
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        createdAt: new Date().toISOString()
      }));
      
      // Mark as logged in
      localStorage.setItem('isLoggedIn', 'true');
      
      // Do NOT mark onboarding as complete - user needs to complete onboarding flow
      // localStorage.setItem('onboardingComplete', 'true');
      
      // Debug logging
      console.log('Signup - Stored user data:', {
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth
      });
      
      // Redirect to onboarding flow
      navigate('/onboarding');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Subtle background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#AC5757] rounded-full filter blur-3xl opacity-10" />
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-oswald font-medium text-[#AC5757] text-[50px] mb-2">AXORA</h1>
              <h2 className="font-judson text-2xl text-gray-900 font-bold mb-2">Join the Crew</h2>
              <p className="text-gray-600">
                Create your account and start learning
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC5757] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#AC5757] transition-colors"
                  >
                    <Calendar size={20} />
                  </button>
                </div>
                
                {/* Calendar Popup */}
                {showCalendar && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-80">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        onClick={() => handleMonthChange(-1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex items-center gap-2">
                        <select
                          value={currentDate.getMonth()}
                          onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value), 1))}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                          {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                          ))}
                        </select>
                        <select
                          value={currentDate.getFullYear()}
                          onChange={(e) => handleYearChange(parseInt(e.target.value))}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleMonthChange(1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                        <div key={`empty-${i}`} className="p-2"></div>
                      ))}
                      {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                        const day = i + 1;
                        const isToday = new Date().getDate() === day && 
                                       new Date().getMonth() === currentDate.getMonth() && 
                                       new Date().getFullYear() === currentDate.getFullYear();
                        const isSelected = formData.dateOfBirth && 
                                         new Date(formData.dateOfBirth).getDate() === day &&
                                         new Date(formData.dateOfBirth).getMonth() === currentDate.getMonth() &&
                                         new Date(formData.dateOfBirth).getFullYear() === currentDate.getFullYear();
                        
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleCalendarDateSelect(day)}
                            className={`p-2 text-sm rounded hover:bg-[#AC5757] hover:text-white transition-colors ${
                              isSelected ? 'bg-[#AC5757] text-white' : 
                              isToday ? 'bg-gray-200 text-[#AC5757] font-bold' : 
                              'text-gray-700'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowCalendar(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
                
                {errors.dateOfBirth && (
                  <p className="mt-2 text-sm text-red-600">{errors.dateOfBirth}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#AC5757] text-white py-4 rounded-lg font-semibold hover:bg-[#8A4A4A] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#AC5757] font-semibold hover:text-[#8A4A4A] transition-colors">
                  Log in
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-[#AC5757] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-[#AC5757] hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;