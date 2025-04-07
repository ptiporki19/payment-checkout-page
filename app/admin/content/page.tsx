'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CMSData, PageContent } from '../../types/cms';

export default function ContentEditor() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
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
        setPageContent(data.pageContent);
      } catch (error) {
        console.error('Error fetching CMS data:', error);
        setErrorMessage('Failed to load page content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (pageContent) {
      setPageContent({
        ...pageContent,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // Actually save the data to the API
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageContent })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save content');
      }
      
      setSuccessMessage('Page content saved successfully!');
      
      // Force a refresh of the main page by re-fetching data
      router.refresh();
    } catch (error) {
      console.error('Error saving content:', error);
      setErrorMessage('Failed to save content. Please try again.');
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

  if (!pageContent) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Failed to load page content. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Page Content</h1>
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
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Page Title (Browser Tab)
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={pageContent.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mainHeading" className="block text-gray-700 font-medium mb-2">
            Main Heading
          </label>
          <input
            type="text"
            id="mainHeading"
            name="mainHeading"
            value={pageContent.mainHeading}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subHeading" className="block text-gray-700 font-medium mb-2">
            Sub Heading
          </label>
          <input
            type="text"
            id="subHeading"
            name="subHeading"
            value={pageContent.subHeading}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={pageContent.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="buttonText" className="block text-gray-700 font-medium mb-2">
            Button Text
          </label>
          <input
            type="text"
            id="buttonText"
            name="buttonText"
            value={pageContent.buttonText}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="footerText" className="block text-gray-700 font-medium mb-2">
            Footer Text
          </label>
          <input
            type="text"
            id="footerText"
            name="footerText"
            value={pageContent.footerText}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="language" className="block text-gray-700 font-medium mb-2">
            Language
          </label>
          <select
            id="language"
            name="language"
            value={pageContent.language}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>

        <div className="flex justify-end">
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