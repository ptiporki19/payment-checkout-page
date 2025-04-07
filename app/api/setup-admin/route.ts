import { NextResponse } from 'next/server';
import { supabase } from '../../utils/supabase';
import crypto from 'crypto';

export async function POST() {
  try {
    // First, delete any existing admin user
    const { error: deleteError } = await supabase
      .from('admin_users')
      .delete()
      .eq('username', 'admin');

    if (deleteError) {
      console.error('Error deleting existing admin:', deleteError);
    }

    // Create the admin user with the correct password hash
    const password = 'password123';
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          username: 'admin',
          password_hash: hashedPassword
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Failed to create admin user',
        details: error
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      data: data
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error
    });
  }
} 