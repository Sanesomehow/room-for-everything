import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userStr = params.get('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        // Store token and user in localStorage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect to home page or dashboard
        navigate('/');
      } catch (error) {
        console.error('Failed to parse user data:', error);
        setError('Authentication failed. Unable to process user data.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } else {
      setError('Authentication failed. Missing token or user data.');
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg bg-white shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 font-bitter">
          {error ? 'Authentication Error' : 'Completing Login...'}
        </h2>
        
        {error ? (
          <p className="text-red-500 text-center font-raleway">{error}</p>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin my-4"></div>
            <p className="text-gray-600 font-raleway">Please wait while we complete your login</p>
          </div>
        )}
      </div>
    </div>
  );
}