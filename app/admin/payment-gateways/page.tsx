'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CMSData, PaymentGateway } from '../../types/cms';

export default function PaymentGateways() {
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([]);
  const [activeGatewayId, setActiveGatewayId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editingGateway, setEditingGateway] = useState<PaymentGateway | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
        setPaymentGateways(data.paymentGateways);
        setActiveGatewayId(data.activeGatewayId);
      } catch (error) {
        console.error('Error fetching CMS data:', error);
        setErrorMessage('Failed to load payment gateways. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveChangesToAPI = async (updatedGateways?: PaymentGateway[], newActiveId?: string | null) => {
    try {
      const gatewaysToSave = updatedGateways || paymentGateways;
      const activeIdToSave = newActiveId !== undefined ? newActiveId : activeGatewayId;
      
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          paymentGateways: gatewaysToSave,
          activeGatewayId: activeIdToSave
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save gateway changes');
      }
      
      // Force a refresh of the main page
      router.refresh();
      
      return true;
    } catch (error) {
      console.error('Error saving to API:', error);
      return false;
    }
  };

  const handleActivateGateway = async (gatewayId: string) => {
    setActiveGatewayId(gatewayId);
    const updatedGateways = paymentGateways.map(gateway => ({
      ...gateway,
      isActive: gateway.id === gatewayId
    }));
    
    setPaymentGateways(updatedGateways);
    
    // Save changes to API
    const success = await saveChangesToAPI(updatedGateways, gatewayId);
    
    if (success) {
      setSuccessMessage(`Payment gateway activated successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrorMessage('Failed to activate gateway. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleEditGateway = (gateway: PaymentGateway) => {
    setEditingGateway({ ...gateway });
    setShowAddForm(false);
  };

  const handleAddNew = () => {
    setEditingGateway(null);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditingGateway(null);
    setShowAddForm(false);
  };

  const handleDeleteGateway = async (gatewayId: string) => {
    if (window.confirm('Are you sure you want to delete this payment gateway?')) {
      const updatedGateways = paymentGateways.filter(g => g.id !== gatewayId);
      setPaymentGateways(updatedGateways);
      
      // If we're deleting the active gateway, set active to null
      let newActiveId = activeGatewayId;
      if (activeGatewayId === gatewayId) {
        setActiveGatewayId(null);
        newActiveId = null;
      }
      
      // Save changes to API
      const success = await saveChangesToAPI(updatedGateways, newActiveId);
      
      if (success) {
        setSuccessMessage('Payment gateway deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Failed to delete gateway. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  const handleGatewayFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      let updatedGateways;
      
      if (editingGateway) {
        // Editing existing gateway
        updatedGateways = paymentGateways.map(gateway => 
          gateway.id === editingGateway.id ? editingGateway : gateway
        );
      } else if (showAddForm) {
        // Adding new gateway
        const newGateway: PaymentGateway = {
          id: `gateway-${Date.now()}`,
          name: (e.target as any).name.value,
          checkoutUrl: (e.target as any).checkoutUrl.value,
          isActive: false,
          apiKeys: {
            publicKey: (e.target as any).publicKey.value,
            secretKey: (e.target as any).secretKey.value,
          }
        };
        
        updatedGateways = [...paymentGateways, newGateway];
      } else {
        throw new Error('Invalid form state');
      }
      
      setPaymentGateways(updatedGateways);
      
      // Save changes to API
      const success = await saveChangesToAPI(updatedGateways);
      
      if (success) {
        setSuccessMessage(editingGateway 
          ? 'Payment gateway updated successfully!' 
          : 'Payment gateway added successfully!');
        
        // Reset form state
        setEditingGateway(null);
        setShowAddForm(false);
      } else {
        throw new Error('Failed to save gateway changes');
      }
    } catch (error) {
      console.error('Error saving gateway:', error);
      setErrorMessage('Failed to save gateway. Please try again.');
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payment Gateways</h1>
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

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Configured Gateways</h2>
            <button 
              onClick={handleAddNew}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add New Gateway
            </button>
          </div>
        </div>
        
        {paymentGateways.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No payment gateways configured yet. Click "Add New Gateway" to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {paymentGateways.map(gateway => (
              <div key={gateway.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg mb-1">
                    {gateway.name} 
                    {activeGatewayId === gateway.id && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">URL: {gateway.checkoutUrl}</p>
                  <p className="text-gray-500 text-sm">API Keys: 
                    <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {gateway.apiKeys.publicKey ? '✓ Set' : '✕ Not Set'}
                    </span>
                  </p>
                </div>
                
                <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
                  {activeGatewayId !== gateway.id && (
                    <button
                      onClick={() => handleActivateGateway(gateway.id)}
                      className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
                    >
                      Set as Active
                    </button>
                  )}
                  <button
                    onClick={() => handleEditGateway(gateway)}
                    className="bg-primary text-white px-3 py-1 text-sm rounded hover:bg-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGateway(gateway.id)}
                    className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit/Add Gateway Form */}
      {(editingGateway || showAddForm) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingGateway ? 'Edit Gateway' : 'Add New Gateway'}
          </h2>
          
          <form onSubmit={handleGatewayFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Gateway Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editingGateway?.name || ''}
                onChange={(e) => editingGateway && setEditingGateway({
                  ...editingGateway,
                  name: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="checkoutUrl" className="block text-gray-700 font-medium mb-2">
                Checkout URL
              </label>
              <input
                type="url"
                id="checkoutUrl"
                name="checkoutUrl"
                value={editingGateway?.checkoutUrl || ''}
                onChange={(e) => editingGateway && setEditingGateway({
                  ...editingGateway,
                  checkoutUrl: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
              <p className="mt-1 text-sm text-gray-500">The URL where customers will be redirected for payment</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="publicKey" className="block text-gray-700 font-medium mb-2">
                Public Key
              </label>
              <input
                type="text"
                id="publicKey"
                name="publicKey"
                value={editingGateway?.apiKeys.publicKey || ''}
                onChange={(e) => editingGateway && setEditingGateway({
                  ...editingGateway,
                  apiKeys: {
                    ...editingGateway.apiKeys,
                    publicKey: e.target.value
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="secretKey" className="block text-gray-700 font-medium mb-2">
                Secret Key
              </label>
              <input
                type="text"
                id="secretKey"
                name="secretKey"
                value={editingGateway?.apiKeys.secretKey || ''}
                onChange={(e) => editingGateway && setEditingGateway({
                  ...editingGateway,
                  apiKeys: {
                    ...editingGateway.apiKeys,
                    secretKey: e.target.value
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
              <p className="mt-1 text-sm text-gray-500">
                Note: In a production environment, secret keys should be stored securely and never exposed client-side.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary disabled:opacity-50"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Gateway'}
              </button>
            </div>
          </form>
        </div>
      )}
      
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