import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../api';
// Remove the CSS import as we're now using Tailwind

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
      console.error('Forgot password error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (success) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Email Sent!</h2>
            <p className="text-gray-600 mb-4">
              We've sent a password reset link to your email address.
            </p>
            <p className="text-gray-600 mb-6">
              Please check your inbox and follow the instructions to reset your password.
            </p>
            <button 
              onClick={handleBackToLogin}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password</h1>
          <p className="text-gray-600">Enter your email to receive a password reset link</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button 
            onClick={handleBackToLogin}
            className="text-blue-600 hover:underline text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
