'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CMSData, PageStyle } from '../../types/cms';

export default function StyleEditor() {
  const [pageStyle, setPageStyle] = useState<PageStyle | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/cms');
        if (!response.ok) {
          throw new Error('Failed to fetch CMS data');
        }
        const data: CMSData = await response.json();
        setPageStyle(data.pageStyle);
      } catch (error) {
        console.error('Error fetching CMS data:', error);
        setErrorMessage('Failed to load page style. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (pageStyle) {
      setPageStyle({
        ...pageStyle,
        [name]: value
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        if (pageStyle && typeof reader.result === 'string') {
          setPageStyle({
            ...pageStyle,
            backgroundImage: reader.result
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeBackgroundImage = () => {
    if (pageStyle) {
      setPageStyle({
        ...pageStyle,
        backgroundImage: null
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // Save the data to the API
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageStyle })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save style');
      }
      
      setSuccessMessage('Page style saved successfully!');
      
      // Force a refresh of the main page
      router.refresh();
    } catch (error) {
      console.error('Error saving style:', error);
      setErrorMessage('Failed to save style. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!pageStyle) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Failed to load page style. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Page Style</h1>
        <button 
          onClick={() => router.push('/admin/dashboard')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label htmlFor="backgroundColor" className="block text-gray-700 font-medium mb-2">
                Background Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="backgroundColor"
                  name="backgroundColor"
                  value={pageStyle.backgroundColor}
                  onChange={handleChange}
                  className="h-10 w-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={pageStyle.backgroundColor}
                  onChange={handleChange}
                  name="backgroundColor"
                  className="ml-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="textColor" className="block text-gray-700 font-medium mb-2">
                Text Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="textColor"
                  name="textColor"
                  value={pageStyle.textColor}
                  onChange={handleChange}
                  className="h-10 w-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={pageStyle.textColor}
                  onChange={handleChange}
                  name="textColor"
                  className="ml-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="buttonColor" className="block text-gray-700 font-medium mb-2">
                Button Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="buttonColor"
                  name="buttonColor"
                  value={pageStyle.buttonColor}
                  onChange={handleChange}
                  className="h-10 w-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={pageStyle.buttonColor}
                  onChange={handleChange}
                  name="buttonColor"
                  className="ml-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="buttonHoverColor" className="block text-gray-700 font-medium mb-2">
                Button Hover Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="buttonHoverColor"
                  name="buttonHoverColor"
                  value={pageStyle.buttonHoverColor}
                  onChange={handleChange}
                  className="h-10 w-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={pageStyle.buttonHoverColor}
                  onChange={handleChange}
                  name="buttonHoverColor"
                  className="ml-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Background Image
              </label>
              
              <div className="border border-gray-300 rounded-md p-4">
                {pageStyle.backgroundImage ? (
                  <div className="mb-3">
                    <div className="relative w-full h-40 bg-gray-100 rounded overflow-hidden mb-2">
                      <img 
                        src={pageStyle.backgroundImage} 
                        alt="Background Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeBackgroundImage}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 bg-gray-100 rounded mb-3">
                    <span className="text-gray-500 text-sm">No background image set</span>
                  </div>
                )}
                
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload new image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-secondary"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Upload an image file (JPG, PNG, etc.) to use as the page background.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      
      {/* Preview Button */}
      <div className="mt-4 text-center">
        <a 
          href="/" 
          target="_blank" 
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Live Page
        </a>
      </div>
    </div>
  );
} 