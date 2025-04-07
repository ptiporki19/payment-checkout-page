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

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cms_auth') === 'true';
};

// Set authentication state
export const setAuthenticated = (value: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cms_auth', value.toString());
};

// Login function
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    console.log('Attempting login with:', { username });
    const hashedPassword = await hashPassword(password);
    console.log('Hashed password:', hashedPassword);

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('password_hash', hashedPassword)
      .single();

    console.log('Supabase response:', { data, error });

    if (error) {
      console.error('Login error:', error);
      return false;
    }

    if (!data) {
      console.error('No user found with these credentials');
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