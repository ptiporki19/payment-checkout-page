import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../utils/supabase';
import { defaultCMSData } from '../../data/cms';
import { CMSData } from '../../types/cms';

// This endpoint gets CMS data
export async function GET() {
  try {
    // Get the latest CMS data from Supabase
    const { data, error } = await supabase
      .from('cms_data')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching CMS data:', error);
      return NextResponse.json(defaultCMSData);
    }

    if (!data) {
      // If no data exists, create initial data
      const { error: insertError } = await supabase
        .from('cms_data')
        .insert([{
          page_content: defaultCMSData.pageContent,
          page_style: defaultCMSData.pageStyle,
          payment_gateways: defaultCMSData.paymentGateways,
          active_gateway_id: defaultCMSData.activeGatewayId
        }]);

      if (insertError) {
        console.error('Error creating initial CMS data:', insertError);
        return NextResponse.json(defaultCMSData);
      }

      return NextResponse.json(defaultCMSData);
    }

    // Return the data from Supabase
    return NextResponse.json({
      pageContent: data.page_content,
      pageStyle: data.page_style,
      paymentGateways: data.payment_gateways,
      activeGatewayId: data.active_gateway_id
    } as CMSData);
  } catch (error) {
    console.error('Error in CMS GET:', error);
    return NextResponse.json(defaultCMSData);
  }
}

// This endpoint updates CMS data
export async function POST(request: NextRequest) {
  try {
    const updates = await request.json();
    
    // Get current data to merge with updates
    const { data: currentData, error: fetchError } = await supabase
      .from('cms_data')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError) {
      console.error('Error fetching current CMS data:', fetchError);
      return NextResponse.json({ success: false, message: 'Failed to fetch current data' }, { status: 500 });
    }

    // Prepare the update data
    const updateData: any = {
      page_content: currentData?.page_content || defaultCMSData.pageContent,
      page_style: currentData?.page_style || defaultCMSData.pageStyle,
      payment_gateways: currentData?.payment_gateways || defaultCMSData.paymentGateways,
      active_gateway_id: currentData?.active_gateway_id || defaultCMSData.activeGatewayId
    };

    // Update only the fields that are provided
    if (updates.pageContent) {
      updateData.page_content = { ...updateData.page_content, ...updates.pageContent };
    }
    
    if (updates.pageStyle) {
      updateData.page_style = { ...updateData.page_style, ...updates.pageStyle };
    }
    
    if (updates.activeGatewayId !== undefined) {
      updateData.active_gateway_id = updates.activeGatewayId;
      
      // Update the isActive flag for all gateways
      if (updateData.payment_gateways.length > 0) {
        updateData.payment_gateways = updateData.payment_gateways.map((gateway: any) => ({
          ...gateway,
          isActive: gateway.id === updates.activeGatewayId
        }));
      }
    }
    
    if (updates.paymentGateways) {
      updateData.payment_gateways = updates.paymentGateways;
    }

    // Insert new record with updated data
    const { error: insertError } = await supabase
      .from('cms_data')
      .insert([updateData]);

    if (insertError) {
      console.error('Error updating CMS data:', insertError);
      return NextResponse.json({ success: false, message: 'Failed to update CMS data' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'CMS data updated' });
  } catch (error) {
    console.error('Error in CMS POST:', error);
    return NextResponse.json({ success: false, message: 'Failed to update CMS data' }, { status: 500 });
  }
} 