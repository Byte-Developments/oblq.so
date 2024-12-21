import { supabase } from '@/lib/supabase/client';
import { nanoid } from 'nanoid';
import { cache } from 'react';

export class PasteService {
  static create = cache(async (data: {
    content: string;
    title?: string;
    language?: string;
    expiresAt?: Date;
    burnAfterRead?: boolean;
  }) => {
    try {
      const { data: paste, error } = await supabase
        .from('pastes')
        .insert({
          content: data.content,
          title: data.title,
          language: data.language,
          expires_at: data.expiresAt?.toISOString(),
          burn_after_read: data.burnAfterRead,
        })
        .select()
        .single();

      if (error) throw error;
      return paste;
    } catch (error) {
      console.error('Failed to create paste:', error);
      throw new Error('Failed to create paste');
    }
  });

  static getById = cache(async (id: string) => {
    try {
      const { data: paste, error } = await supabase
        .from('pastes')
        .select()
        .eq('id', id)
        .single();

      if (error) throw error;

      if (paste && paste.burn_after_read) {
        await supabase
          .from('pastes')
          .update({ viewed: true })
          .eq('id', id);
      }

      return paste;
    } catch (error) {
      console.error('Failed to fetch paste:', error);
      throw new Error('Failed to fetch paste');
    }
  });
}