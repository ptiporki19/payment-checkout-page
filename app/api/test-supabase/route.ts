import { NextResponse } from 'next/server';
import { supabase } from '../../utils/supabase';

export async function GET() {
  try {
    // Test 1: Check if we can connect to Supabase
    const { data: cmsData, error: cmsError } = await supabase
      .from('cms_data')
      .select('*')
      .limit(1);

    if (cmsError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch CMS data',
        details: cmsError.message
      }, { status: 500 });
    }

    // Test 2: Check if we can access admin users
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .limit(1);

    if (adminError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch admin data',
        details: adminError.message
      }, { status: 500 });
    }

    // If we get here, both tests passed
    return NextResponse.json({
      success: true,
      message: 'Supabase connection is working correctly',
      cmsData: cmsData,
      adminData: adminData
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 