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
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
};

// Set authentication state
export const setAuthenticated = (value: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cms_auth', value.toString());
};

// Login function
export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return false;
    }

    return !!data.session;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}; 