import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// 👇 Instancia de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 👇 Nombre de tu tabla y el id del registro
const TABLE_NAME = 'site_translations';
const RECORD_ID = 1; // ajusta si tu registro no es id=1

export async function getTranslations(lang) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', RECORD_ID)
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
}
