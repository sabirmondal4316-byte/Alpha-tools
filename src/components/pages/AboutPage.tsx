import React, { useEffect } from 'react';
import { ShieldCheck, Cpu, Zap, Heart, CheckCircle2, Globe, Users, ArrowRight } from 'lucide-react';
import { PageRoute } from '../../types';
import { setPageMeta } from '../../utils/seo';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    setPageMeta(
      'About Us - ALPHA TOOLS',
      'Learn about ALPHA TOOLS, our mission for private client-side utilities, and our zero-server data philosophy.'
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Built for Speed, Engineered for Privacy.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          ALPHA TOOLS is a modern suite of free online utilities designed to replace clunky, ad-saturated, server-dependent converter websites.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Privacy by Architecture</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Most online tools require you to upload private family photos, confidential financial JSON data, or sensitive text to remote cloud servers. At ALPHA TOOLS, we build all utilities using client-side JavaScript, Web Workers, and HTML5 Canvas. Your files never touch a remote server.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Zero Latency Performance</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Uploading and waiting for a server to process a 10MB photo takes time and bandwidth. By running directly inside your device&apos;s CPU and GPU via modern web browsers, tasks complete in milliseconds without artificial throttling.
          </p>
        </div>
      </div>

      {/* Philosophy Details */}
      <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Our Four Guarantees
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">No Hidden Fees or Subscriptions</h3>
              <p className="text-xs text-slate-500 mt-0.5">All 8 tools are 100% free with unlimited usages and zero artificial daily caps.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Zero Account Requirements</h3>
              <p className="text-xs text-slate-500 mt-0.5">You will never be asked to enter an email, sign in with social media, or create a password.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">No Watermarks</h3>
              <p className="text-xs text-slate-500 mt-0.5">Every image compressed, resized, or converted is crisp, clean, and entirely yours.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Mobile-Optimized Experience</h3>
              <p className="text-xs text-slate-500 mt-0.5">Designed from day one to work smoothly across smartphones, tablets, and desktop workstations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 text-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl text-white shadow-xl shadow-blue-500/10 space-y-4">
        <h2 className="text-2xl font-bold">Ready to streamline your workflow?</h2>
        <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto">
          Explore our suite of 8 professional tools and experience client-side speed.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-blue-700 bg-white hover:bg-blue-50 rounded-xl shadow-sm transition-colors"
        >
          <span>Explore All Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
