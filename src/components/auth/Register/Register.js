import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../api';
// Remove the CSS import as we're now using Tailwind

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Remove confirmPassword and agreeToTerms from the data sent to API
      const { confirmPassword, agreeToTerms, ...registrationData } = formData;
      
      await authService.register(registrationData);
      setRegistrationSuccess(true);
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Registration successful! Please log in.' }
        });
      }, 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setErrors({
        ...errors,
        form: errorMessage
      });
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (registrationSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">You will be redirected to the login page shortly.</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Addis Property Rent today</p>
        </div>
        
        {errors.form && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {errors.form}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-blue-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-blue-600"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>}
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="text-gray-600">
                I agree to the{' '}
                <a href="/terms" target="_blank" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
              {errors.agreeToTerms && <span className="text-red-500 text-xs block mt-1">{errors.agreeToTerms}</span>}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
