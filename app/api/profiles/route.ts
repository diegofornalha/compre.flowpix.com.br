import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userIds = searchParams.get('userIds')?.split(',') || [];

    if (userIds.length === 0) {
      return NextResponse.json({ error: 'No user IDs provided' }, { status: 400 });
    }

    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('user_id, wallet_address')
      .in('user_id', userIds);

    if (error) throw error;

    return NextResponse.json({ success: true, profiles });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
} 