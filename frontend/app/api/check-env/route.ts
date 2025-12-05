import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    hasAuthSecret: !!process.env.AUTH_SECRET,
    nodeEnv: process.env.NODE_ENV,
    databaseUrlExists: !!process.env.DATABASE_URL
  });
}
