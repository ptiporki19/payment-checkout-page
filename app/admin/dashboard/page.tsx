'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CMSData } from '../../types/cms';

export default function Dashboard() {
  const [cmsData, setCmsData] = useState<CMSData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch CMS data
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/cms');
        if (!response.ok) {
          throw new Error('Failed to fetch CMS data');
        }
        const data = await response.json();
        setCmsData(data);
      } catch (error) {
        console.error('Error fetching CMS data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!cmsData) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Failed to load CMS data. Please try again.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Page Content Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Page Content</h2>
          <p className="text-gray-600 mb-4">
            Manage your checkout page content, including titles, descriptions, and button text.
          </p>
          <ul className="mb-6 text-sm">
            <li className="mb-1">
              <span className="font-medium">Page Title:</span> {cmsData.pageContent.title}
            </li>
            <li className="mb-1">
              <span className="font-medium">Main Heading:</span> {cmsData.pageContent.mainHeading}
            </li>
            <li className="mb-1">
              <span className="font-medium">Button Text:</span> {cmsData.pageContent.buttonText}
            </li>
          </ul>
          <Link href="/admin/content" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary block text-center">
            Edit Content
          </Link>
        </div>
        
        {/* Page Style Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Page Style</h2>
          <p className="text-gray-600 mb-4">
            Customize the appearance of your checkout page, including colors and backgrounds.
          </p>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="font-medium mr-2">Background Color:</span> 
              <div 
                className="w-6 h-6 rounded border border-gray-300" 
                style={{ backgroundColor: cmsData.pageStyle.backgroundColor }}
              ></div>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-medium mr-2">Button Color:</span> 
              <div 
                className="w-6 h-6 rounded border border-gray-300" 
                style={{ backgroundColor: cmsData.pageStyle.buttonColor }}
              ></div>
            </div>
            <p className="text-sm mt-2">
              <span className="font-medium">Background Image:</span> {cmsData.pageStyle.backgroundImage ? 'Set' : 'None'}
            </p>
          </div>
          <Link href="/admin/style" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary block text-center">
            Edit Style
          </Link>
        </div>
        
        {/* Payment Gateways Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Payment Gateways</h2>
          <p className="text-gray-600 mb-4">
            Configure and manage your payment gateway integrations.
          </p>
          <div className="mb-6">
            <p className="font-medium mb-2">Configured Gateways:</p>
            <ul className="list-disc pl-5 text-sm">
              {cmsData.paymentGateways.map(gateway => (
                <li key={gateway.id} className={gateway.id === cmsData.activeGatewayId ? 'font-semibold' : ''}>
                  {gateway.name} {gateway.id === cmsData.activeGatewayId && '(Active)'}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/admin/payment-gateways" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary block text-center">
            Manage Gateways
          </Link>
        </div>
        
        {/* Preview Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <p className="text-gray-600 mb-4">
            View your checkout page to see how it looks to customers.
          </p>
          <a 
            href="/" 
            target="_blank" 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 block text-center"
          >
            View Checkout Page
          </a>
        </div>
      </div>
    </div>
  );
} 