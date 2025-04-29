import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export async function fetchInfoFromSupabase(lang) {
  console.log('fetchInfoFromSupabase', lang);


  const { data, error } = await supabase
  .from('site_translations')
  .select(`lang-${lang}`)
  .single()

  if (data && !error) {
    const dynamicTranslations = typeof data[`lang-${lang}`] === 'string'
      ? JSON.parse(data[`lang-${lang}`])
      : data[`lang-${lang}`];

    t = {
      ...t,
      ...dynamicTranslations
    }
  }

  return {
    props: {
      lang,
      t,
    }
  };
}

export const fetchLangFromSupabase = async (lang) => {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const { data, error } = await supabase
    .from('site_translations')
    .select('*')
    .eq('id', 1)
    .single();

    if (error) {
      console.error('Error fetching translations:', error.message);
      throw new Error('Failed to load translations.');
    }
  
    // 👇 Nos aseguramos que el campo exista
    const translations = data[`lang-${lang}`];
  
    if (!translations) {
      console.warn(`Translations for lang-${lang} not found, falling back to 'lang-es'.`);
      return data['lang-es']; // fallback en caso de que no exista
    }
  
    return translations;
};
