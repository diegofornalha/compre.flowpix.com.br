import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth, currentUser } from '@clerk/nextjs/server';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('Clerk user data:', {
    userId,
    imageUrl: user.imageUrl,
    web3Wallets: user.web3Wallets
  });

  try {
    // Primeiro, verificar se o perfil existe
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select()
      .eq('user_id', userId)
      .single();

    const profileData = {
      user_id: userId,
      avatar_url: user.imageUrl,
      wallet_address: user.web3Wallets?.[0]?.web3Wallet || null,
      updated_at: new Date().toISOString()
    };

    if (existingProfile) {
      // Se existe, atualizar com os dados do Clerk
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }

      console.log('Profile updated:', data);
      return NextResponse.json({ success: true, profile: data });
    } else {
      // Se não existe, criar novo perfil com os dados do Clerk
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          ...profileData,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        throw error;
      }

      console.log('Profile created:', data);
      return NextResponse.json({ success: true, profile: data });
    }
  } catch (error) {
    console.error('Error in user profile operation:', error);
    return NextResponse.json({ 
      error: 'Error in user profile operation',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}