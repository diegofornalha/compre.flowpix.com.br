import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const emojiId = searchParams.get('id');

  if (!emojiId) {
    return NextResponse.json({ error: 'Emoji ID is required' }, { status: 400 });
  }

  try {
    // Verificar se o usuário é o criador do emoji
    const { data: emoji } = await supabase
      .from('emojis')
      .select('creator_user_id')
      .eq('id', emojiId)
      .single();

    if (!emoji) {
      return NextResponse.json({ error: 'Emoji not found' }, { status: 404 });
    }

    if (emoji.creator_user_id !== userId) {
      return NextResponse.json({ error: 'Unauthorized to delete this emoji' }, { status: 403 });
    }

    // Deletar o emoji
    const { error: deleteError } = await supabase
      .from('emojis')
      .delete()
      .eq('id', emojiId);

    if (deleteError) throw deleteError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting emoji:', error);
    return NextResponse.json({ error: 'Failed to delete emoji' }, { status: 500 });
  }
} 