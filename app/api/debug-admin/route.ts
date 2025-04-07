import { NextResponse } from 'next/server';
import { supabase } from '../../utils/supabase';
import crypto from 'crypto';

export async function GET() {
  try {
    // Get the admin user
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', 'admin')
      .single();

    if (adminError) {
      return NextResponse.json({
        success: false,
        error: 'Error fetching admin user',
        details: adminError
      });
    }

    // Calculate the expected hash
    const password = 'password123';
    const expectedHash = crypto.createHash('md5').update(password).digest('hex');

    return NextResponse.json({
      success: true,
      adminUser,
      expectedHash,
      matches: adminUser?.password_hash === expectedHash,
      config: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Key is set' : 'Key is missing'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error
    });
  }
} 