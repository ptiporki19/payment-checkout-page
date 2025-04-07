/**
 * Simple auth utilities for the CMS admin panel
 * In a real application, you would use a more secure authentication system
 */

// For demo purposes, these would come from environment variables in a real app
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

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
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    setAuthenticated(true);
    return true;
  }
  return false;
};

// Logout function
export const logout = (): void => {
  setAuthenticated(false);
  // In a real app, you might also want to call an API to invalidate tokens
}; 