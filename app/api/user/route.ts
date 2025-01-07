import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth, currentUser } from '@clerk/nextjs/server';

// Embate 1: Configuração do Cliente Supabase
// Vencedor: Configuração Robusta com Variáveis Corretas e Opções de Autenticação
const supabase = createClient(
  process.env.STORAGE_NEXT_PUBLIC_SUPABASE_URL!,
  process.env.STORAGE_SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Embate 2: Estrutura da Rota
// Vencedor: Rota POST com Validação Robusta
export async function POST() {
  // Embate 3: Autenticação
  // Vencedor: Validação Dupla (userId e user)
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
    // Embate 4: Estratégia de Consulta
    // Vencedor: Verificação Prévia com Select Otimizado
    const { data: existingProfile, error: queryError } = await supabase
      .from('profiles')
      .select('user_id, avatar_url, wallet_address')
      .eq('user_id', userId)
      .single();

    if (queryError && queryError.code !== 'PGRST116') {
      throw queryError;
    }

    // Embate 5: Estrutura de Dados
    // Vencedor: Objeto Estruturado com Validação
    const profileData = {
      user_id: userId,
      avatar_url: user.imageUrl || null,
      wallet_address: user.web3Wallets?.[0]?.web3Wallet || null,
      updated_at: new Date().toISOString()
    };

    // Embate 6: Estratégia de Atualização/Criação
    // Vencedor: Operação Condicional com Tratamento de Erro Robusto
    if (existingProfile) {
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
      return NextResponse.json({ 
        success: true, 
        profile: data,
        action: 'updated'
      });
    } else {
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
      return NextResponse.json({ 
        success: true, 
        profile: data,
        action: 'created'
      });
    }
  } catch (error) {
    // Embate 7: Tratamento de Erro
    // Vencedor: Resposta Detalhada com Logging
    console.error('Error in user profile operation:', error);
    return NextResponse.json({ 
      error: 'Error in user profile operation',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}