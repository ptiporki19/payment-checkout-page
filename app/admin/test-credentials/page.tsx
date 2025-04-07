'use client';

import { useState } from 'react';
import { login } from '../utils/auth';

export default function TestCredentialsPage() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testLogin = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const success = await login('admin', 'password123');
      setResult(success ? 'Login successful!' : 'Login failed');
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const setupAdmin = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/setup-admin', {
        method: 'POST',
      });
      const data = await response.json();
      setResult(data.success ? 'Admin user created successfully' : `Error: ${data.error}`);
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Test Admin Credentials</h1>
        
        <div className="space-y-4">
          <button
            onClick={setupAdmin}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Setup Admin User'}
          </button>

          <button
            onClick={testLogin}
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Test Login'}
          </button>

          {result && (
            <div className={`p-4 rounded ${result.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 