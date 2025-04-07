'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

export default function TestCMSPage() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_data')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setCmsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateContent = async () => {
    try {
      setLoading(true);
      const newData = {
        page_content: {
          ...cmsData.page_content,
          title: 'Updated Title ' + new Date().toLocaleTimeString()
        }
      };

      const { error } = await supabase
        .from('cms_data')
        .insert([newData]);

      if (error) throw error;

      // Refresh the data
      const { data, error: fetchError } = await supabase
        .from('cms_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError) throw fetchError;
      setCmsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CMS data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">CMS Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current CMS Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(cmsData, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Test Updates</h2>
          <button
            onClick={updateContent}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Updating...' : 'Update Title'}
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Click the button to update the page title with the current time.
            This will create a new record in the database.
          </p>
        </div>
      </div>
    </div>
  );
} 