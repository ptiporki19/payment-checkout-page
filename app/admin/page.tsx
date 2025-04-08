'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from './utils/auth';

export default function AdminRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // If authenticated, redirect to dashboard, otherwise to login
    if (isAuthenticated()) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-700">Redirecting...</p>
      </div>
    </div>
  );
} 