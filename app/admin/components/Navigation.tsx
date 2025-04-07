'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '../utils/auth';

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      name: 'Page Content',
      path: '/admin/content',
    },
    {
      name: 'Page Style',
      path: '/admin/style',
    },
    {
      name: 'Payment Gateways',
      path: '/admin/payment-gateways',
    },
  ];

  return (
    <div className="bg-primary text-white">
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-xl font-bold">Checkout CMS</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`hover:text-gray-200 ${isActive(item.path) ? 'border-b-2 border-white' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md ml-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation; 