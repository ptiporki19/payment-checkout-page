/**
 * Simple auth utilities for the CMS admin panel
 * In a real application, you would use a more secure authentication system
 */

import { supabase } from '../../utils/supabase';
import crypto from 'crypto';

// For demo purposes, these would come from environment variables in a real app
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

// Simple password hashing function
const hashPassword = async (password: string): Promise<string> => {
  return crypto.createHash('md5').update(password).digest('hex');
};

// Temporarily bypass authentication
export const isAuthenticated = async (): Promise<boolean> => {
  return true; // Always return true for now
};

// Set authentication state
export const setAuthenticated = (value: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cms_auth', value.toString());
};

// Login function - temporarily bypass
export const login = async (email: string, password: string): Promise<boolean> => {
  return true; // Always return true for now
};

// Logout function - temporarily bypass
export const logout = async (): Promise<void> => {
  // Do nothing for now
};

// Get current user - return mock admin user
export const getCurrentUser = async () => {
  return {
    id: '1',
    email: 'admin@example.com',
    role: 'admin'
  };
}; 