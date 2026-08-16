import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '../../data/blog';
import { ROUTE_PATHS } from '../../routePaths';

export const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-14 sm:py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-blue-400 font-bold mb-4 uppercase tracking-widest text-sm">
            Poradňa
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mb-6 uppercase leading-[0.95]">
            Rady o hydroizolácii<br />a plochých strechách
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">
            Praktické články o údržbe, materiáloch a rekonštrukcii plochých striech — napísané tak, aby vám pomohli sa rozhodnúť skôr, než zavoláte na obhliadku.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`${ROUTE_PATHS.blog}/${post.slug}`}
              className="group bg-white rounded-[2rem] shadow-lg border border-slate-100 p-8 sm:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all block"
            >
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold">
                Čítať článok
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
