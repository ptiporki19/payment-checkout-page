/**
 * Simple auth utilities for the CMS admin panel
 * In a real application, you would use a more secure authentication system
 */

import { supabase } from '../../utils/supabase';
import crypto from 'crypto';

// For demo purposes, these would come from environment variables in a real app
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

// Simple password hashing function (for demo purposes only)
// In a real app, use a proper hashing algorithm like bcrypt
const hashPassword = async (password: string): Promise<string> => {
  return crypto.createHash('md5').update(password).digest('hex');
};

// Check if the user is authenticated on the client-side
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check both localStorage and cookies
  const localAuth = localStorage.getItem('cms_auth') === 'true';
  const cookieAuth = document.cookie.includes('cms_auth=true');
  
  return localAuth || cookieAuth;
};

// Set authentication state
export const setAuthenticated = (value: boolean): void => {
  if (typeof window === 'undefined') return;
  
  if (value) {
    localStorage.setItem('cms_auth', 'true');
    // Set a cookie that will be visible to the middleware
    document.cookie = 'cms_auth=true; path=/; max-age=86400'; // 24 hours
  } else {
    localStorage.removeItem('cms_auth');
    // Clear the auth cookie
    document.cookie = 'cms_auth=; path=/; max-age=0';
  }
};

// Login function
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const hashedPassword = await hashPassword(password);
    console.log('Attempting login with:', { username, hashedPassword });

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('password_hash', hashedPassword)
      .single();

    if (error) {
      console.error('Login error:', error);
      return false;
    }

    if (!data) {
      console.error('No user found');
      return false;
    }

    console.log('Login successful:', data);
    setAuthenticated(true);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Logout function
export const logout = (): void => {
  setAuthenticated(false);
  // In a real app, you might also want to call an API to invalidate tokens
}; 