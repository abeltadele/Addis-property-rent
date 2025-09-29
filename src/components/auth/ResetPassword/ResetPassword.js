import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../../api';
// Remove the CSS import as we're now using Tailwind

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [tokenValid, setTokenValid] = useState(true);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get token from URL parameters
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
    } else {
      setTokenValid(false);
      setError('Invalid or missing reset token');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Password reset successful! Please log in with your new password.' }
        });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
      console.error('Reset password error:', err);
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

  if (!tokenValid) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Reset Link</h2>
            <p className="text-gray-600 mb-6">
              The password reset link is invalid or has expired.
            </p>
            <button 
              onClick={() => navigate('/forgot-password')}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Request a New Reset Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Password Reset Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your password has been updated successfully.
            </p>
            <p className="text-gray-600 mb-6">
              You will be redirected to the login page shortly.
            </p>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h1>
          <p className="text-gray-600">Create a new password for your account</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-blue-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-blue-600"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">Password must:</p>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Be at least 8 characters long</li>
              <li>Contain both letters and numbers</li>
              <li>Include at least one special character</li>
            </ul>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
