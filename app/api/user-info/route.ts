import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs';

export async function GET() {
  const { userId } = getAuth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // Obtém informações detalhadas do usuário atual
    const user = await clerkClient.users.getUser(userId);
    
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Retorna os dados do usuário de forma estruturada
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0]?.emailAddress,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
      lastSignInAt: user.lastSignInAt,
    };

    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados do usuário' }, 
      { status: 500 }
    );
  }
} 