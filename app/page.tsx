'use client';

import { useEffect, useState } from 'react';
import { CMSData } from './types/cms';
import CheckoutPage from './components/CheckoutPage';
import { defaultCMSData } from './data/cms';

export default function Home() {
  const [cmsData, setCmsData] = useState<CMSData>(defaultCMSData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCMSData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/cms');
        
        if (!response.ok) {
          throw new Error('Failed to fetch CMS data');
        }
        
        const data = await response.json();
        setCmsData(data);
      } catch (err) {
        console.error('Error fetching CMS data:', err);
        setError('Failed to load page content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCMSData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading payment page...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            className="mt-6 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render the checkout page with CMS data
  return <CheckoutPage cmsData={cmsData} />;
} 