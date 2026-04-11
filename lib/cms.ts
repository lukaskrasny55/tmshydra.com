import { supabase } from './supabase';

export const getPageSections = async (page_slug: string) => {
  if (!supabase) return {};

  const { data, error } = await supabase
    .from('page_sections')
    .select('section_key, content')
    .eq('page_slug', page_slug);

  if (error) {
    console.error('Error fetching page sections:', error);
    return {};
  }

  const sections: Record<string, string> = {};
  data.forEach((item: any) => {
    sections[item.section_key] = item.content;
  });

  return sections;
};

export const updatePageSection = async (page_slug: string, section_key: string, content: string) => {
  if (!supabase) return;

  const { error } = await supabase
    .from('page_sections')
    .upsert({ page_slug, section_key, content }, { onConflict: 'page_slug,section_key' });

  if (error) {
    console.error(`Error updating section ${section_key} for page ${page_slug}:`, error);
    throw error;
  }
};
