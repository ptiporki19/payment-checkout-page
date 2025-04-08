import { NextResponse } from 'next/server';
import { supabase } from '../../utils/supabase';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: 'Username and password are required'
      });
    }

    // First, delete any existing admin users
    const { error: deleteError } = await supabase
      .from('admin_users')
      .delete()
      .neq('id', 0); // Delete all users

    if (deleteError) {
      console.error('Error deleting existing users:', deleteError);
    }

    // Create the new admin user
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          username: username,
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
      message: 'New admin user created successfully',
      credentials: {
        username: username,
        password: password
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