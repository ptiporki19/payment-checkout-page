import { NextResponse } from 'next/server';
import { supabase } from '../../utils/supabase';

export async function GET() {
  try {
    // Try to get table info
    const { data: tableInfo, error: tableError } = await supabase
      .from('admin_users')
      .select('*')
      .limit(1);

    if (tableError) {
      return NextResponse.json({
        success: false,
        error: 'Table error',
        details: tableError
      });
    }

    // Try to insert a test user
    const { data: insertData, error: insertError } = await supabase
      .from('admin_users')
      .insert([
        {
          username: 'admin',
          password_hash: '482c811da5d5b4bc6d497ffa98491e38' // MD5 hash of 'password123'
        }
      ])
      .select();

    return NextResponse.json({
      success: true,
      tableExists: true,
      insertResult: insertData,
      insertError
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error
    });
  }
} 