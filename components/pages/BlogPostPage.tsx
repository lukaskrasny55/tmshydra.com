import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Phone, Clock } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import { ROUTE_PATHS } from '../../routePaths';
import { trackConversion } from '../GoogleAds';
import { localBusinessSchema } from '../Seo';

const PHONE_NUMBER = '+421911551354';
const PHONE_DISPLAY = '+421 911 551 354';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Článok sa nenašiel</h1>
          <Link to={ROUTE_PATHS.blog} className="text-blue-600 font-bold hover:underline">
            Späť na poradňu
          </Link>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const url = `https://www.tmshydra.com${ROUTE_PATHS.blog}/${post.slug}`;
  const title = `${post.title} | TMS HYDRA poradňa`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: { '@type': 'Organization', name: 'TMS-HYDRA' },
    publisher: { '@type': 'Organization', name: 'TMS-HYDRA', logo: { '@type': 'ImageObject', url: 'https://www.tmshydra.com/logo1.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="TMS-HYDRA" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://www.tmshydra.com/logo1.png" />
        <meta property="og:locale" content="sk_SK" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={post.metaDescription} />

        <script type="application/ld+json" id="local-business-schema">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <div className="bg-slate-900 py-14 sm:py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to={ROUTE_PATHS.blog}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Späť na poradňu
          </Link>

          <div className="flex items-center gap-2 text-blue-400 font-bold mb-4 uppercase tracking-widest text-sm">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4 leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 p-8 sm:p-12 mb-12 prose prose-lg prose-slate max-w-none">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-slate-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 sm:p-12 mb-16 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">
              Riešite podobnú situáciu na vlastnej streche?
            </h2>
            <p className="text-slate-400">
              Bezplatná obhliadka, jasná cenová ponuka a záruka až 15 rokov.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackConversion('call')}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all whitespace-nowrap"
            >
              <Phone className="w-5 h-5" />
              {PHONE_DISPLAY}
            </a>
            <Link
              to={`${ROUTE_PATHS.contact}#calendar`}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-xl font-bold hover:bg-white/20 transition-all whitespace-nowrap"
            >
              Dohodnúť obhliadku
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {otherPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">
              Ďalšie články
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`${ROUTE_PATHS.blog}/${p.slug}`}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-all block"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-sm">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
