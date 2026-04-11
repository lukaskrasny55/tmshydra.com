import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SeoProps {
  slug: string;
}

export const Seo: React.FC<SeoProps> = ({ slug }) => {
  useEffect(() => {
    const fetchSeo = async () => {
      const { data, error } = await supabase
        .from('seo')
        .select('*')
        .eq('page_slug', slug)
        .single();

      if (!error && data) {
        document.title = data.meta_title || 'TMS-HYDRA';
        
        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', data.meta_description || '');

        // Update keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', data.keywords || '');

        // Update OG Image
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (!ogImage) {
          ogImage = document.createElement('meta');
          ogImage.setAttribute('property', 'og:image');
          document.head.appendChild(ogImage);
        }
        ogImage.setAttribute('content', data.og_image || '');
      }
    };

    fetchSeo();
  }, [slug]);

  return null;
};
