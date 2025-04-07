import { NextResponse } from 'next/server';
import { defaultCMSData } from '../../data/cms';

// This endpoint simulates fetching data from a CMS
// In a real implementation, this would connect to an actual CMS or database
export async function GET() {
  // Add a small delay to simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return NextResponse.json(defaultCMSData);
} 