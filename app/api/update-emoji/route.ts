import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { emojiId, prompt } = await request.json();

    if (!emojiId || !prompt) {
      return NextResponse.json({ error: 'Emoji ID and prompt are required' }, { status: 400 });
    }

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
      return NextResponse.json({ error: 'Unauthorized to update this emoji' }, { status: 403 });
    }

    // Atualizar o prompt do emoji
    const { data: updatedEmoji, error: updateError } = await supabase
      .from('emojis')
      .update({ prompt })
      .eq('id', emojiId)
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, emoji: updatedEmoji });
  } catch (error) {
    console.error('Error updating emoji:', error);
    return NextResponse.json({ error: 'Failed to update emoji' }, { status: 500 });
  }
} 