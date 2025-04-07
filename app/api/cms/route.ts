import { NextRequest, NextResponse } from 'next/server';
import { defaultCMSData } from '../../data/cms';
import { CMSData } from '../../types/cms';

// Global variable to store CMS data in memory (in a real app, this would be in a database)
let cmsData: CMSData = { ...defaultCMSData };

// This endpoint gets CMS data
export async function GET() {
  try {
    // If cmsData is empty or missing required fields, reset to default
    if (!cmsData || !cmsData.pageContent || !cmsData.pageStyle || !cmsData.paymentGateways) {
      cmsData = { ...defaultCMSData };
    }
    
    return NextResponse.json(cmsData);
  } catch (error) {
    console.error('Error fetching CMS data:', error);
    // If there's an error, return default data
    return NextResponse.json(defaultCMSData);
  }
}

// This endpoint updates CMS data
export async function POST(request: NextRequest) {
  try {
    const updates = await request.json();
    
    // Ensure cmsData exists and has all required fields
    if (!cmsData || !cmsData.pageContent || !cmsData.pageStyle || !cmsData.paymentGateways) {
      cmsData = { ...defaultCMSData };
    }
    
    // Update only the fields that are provided
    if (updates.pageContent) {
      cmsData.pageContent = { ...cmsData.pageContent, ...updates.pageContent };
    }
    
    if (updates.pageStyle) {
      cmsData.pageStyle = { ...cmsData.pageStyle, ...updates.pageStyle };
    }
    
    if (updates.activeGatewayId !== undefined) {
      cmsData.activeGatewayId = updates.activeGatewayId;
      
      // Update the isActive flag for all gateways
      if (cmsData.paymentGateways.length > 0) {
        cmsData.paymentGateways = cmsData.paymentGateways.map(gateway => ({
          ...gateway,
          isActive: gateway.id === updates.activeGatewayId
        }));
      }
    }
    
    if (updates.paymentGateways) {
      cmsData.paymentGateways = updates.paymentGateways;
    }
    
    return NextResponse.json({ success: true, message: 'CMS data updated' });
  } catch (error) {
    console.error('Error updating CMS data:', error);
    return NextResponse.json({ success: false, message: 'Failed to update CMS data' }, { status: 500 });
  }
} 