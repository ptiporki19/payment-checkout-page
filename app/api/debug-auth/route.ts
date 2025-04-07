import { NextResponse } from 'next/server';
import { supabase } from '../../utils/supabase';

// Simple MD5 hash function for testing
function md5Hash(str: string): string {
  const crypto = require('crypto');
  return crypto.createHash('md5').update(str).digest('hex');
}

export async function GET() {
  try {
    // Check if admin user exists
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', 'admin')
      .single();

    if (adminError) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database error', 
        details: adminError 
      });
    }

    // Calculate expected hash
    const expectedHash = md5Hash('password123');

    return NextResponse.json({
      success: true,
      adminUserExists: !!adminUser,
      adminUser,
      expectedHash,
      matches: adminUser?.password_hash === expectedHash
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error',
      details: error 
    });
  }
} 