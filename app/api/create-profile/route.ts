import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { avatar_url, wallet_address } = await request.json();
    console.log('Recebido na API:', { userId, avatar_url, wallet_address });

    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingProfile) {
      let updateData: any = {
        avatar_url,
        updated_at: new Date().toISOString()
      };

      // Só incluir wallet_address se foi fornecido
      if (wallet_address !== undefined) {
        updateData.wallet_address = wallet_address;
      }

      console.log('Atualizando perfil com:', updateData);

      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar perfil:', error);
        throw error;
      }

      console.log('Perfil atualizado:', data);
      return NextResponse.json({ success: true, profile: data });
    } else {
      let insertData: any = {
        user_id: userId,
        avatar_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Só incluir wallet_address se foi fornecido
      if (wallet_address !== undefined) {
        insertData.wallet_address = wallet_address;
      }

      console.log('Criando perfil com:', insertData);

      const { data, error } = await supabase
        .from('profiles')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar perfil:', error);
        throw error;
      }

      console.log('Perfil criado:', data);
      return NextResponse.json({ success: true, profile: data });
    }
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    return NextResponse.json({ 
      error: 'Failed to create/update profile',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 