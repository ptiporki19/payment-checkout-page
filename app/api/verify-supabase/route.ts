import { NextResponse } from 'next/server';
import { supabase } from '../../utils/supabase';

export async function GET() {
  try {
    // Test the connection by making a simple query
    const { data, error } = await supabase
      .from('cms_data')
      .select('*')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Supabase connection error',
        details: error,
        config: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Key is set' : 'Key is missing'
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Supabase',
      data: data,
      config: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Key is set' : 'Key is missing'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error,
      config: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Key is set' : 'Key is missing'
      }
    });
  }
} 