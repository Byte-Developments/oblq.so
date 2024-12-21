import { supabase } from '@/lib/supabase/client';
import { cache } from 'react';
import { normalizeUrl } from '@/lib/utils/url';

export class UrlService {
  static create = cache(async (code: string, url: string) => {
    try {
      const normalizedUrl = normalizeUrl(url);
      const { data, error } = await supabase
        .from('urls')
        .insert({ code, url: normalizedUrl })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to create short URL:', error);
      throw new Error('Failed to create short URL');
    }
  });

  static getByCode = cache(async (code: string): Promise<string> => {
    try {
      const { data, error } = await supabase
        .from('urls')
        .select('url')
        .eq('code', code)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error();

      return data.url;
    } catch (error) {
      console.error('Failed to fetch URL:', error);
      throw new Error('Failed to fetch URL');
    }
  });
}