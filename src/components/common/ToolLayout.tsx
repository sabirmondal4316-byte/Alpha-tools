import React, { useEffect } from 'react';
import { ArrowLeft, ChevronRight, HelpCircle, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { ToolItem, PageRoute } from '../../types';
import { ToolIcon } from './ToolIcon';
import { TOOLS_DATA } from '../../data/toolsData';
import { setPageMeta } from '../../utils/seo';

interface ToolLayoutProps {
  tool: ToolItem;
  onNavigate: (route: PageRoute) => void;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, onNavigate, children }) => {
  useEffect(() => {
    setPageMeta(
      `${tool.name} - Free Online Tool`,
      tool.longDesc
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tool]);

  const relatedTools = TOOLS_DATA.filter((t) => t.id !== tool.id && t.category === tool.category).concat(
    TOOLS_DATA.filter((t) => t.id !== tool.id && t.category !== tool.category)
  ).slice(0, 3);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] pb-16">
      {/* Top Banner / Breadcrumb Area */}
      <div className="bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="capitalize">{tool.categoryLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{tool.name}</span>
          </nav>

          {/* Header Title & Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                <ToolIcon name={tool.iconName} className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {tool.name}
                  </h1>
                  {tool.badge && (
                    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {tool.shortDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Tools
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="w-full">{children}</div>

        {/* Informational SEO & How-To Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12 border-t border-slate-200 dark:border-slate-800">
          {/* How to use */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              How to use {tool.name}
            </h3>
            <ol className="space-y-3">
              {tool.howToSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 mt-6">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>100% Private & Client-Side</span>
              </div>
              <p className="text-xs text-blue-700/80 dark:text-blue-300/80 mt-1 leading-relaxed">
                All conversions and computations are executed directly inside your web browser. No files or text are ever uploaded to remote servers.
              </p>
            </div>
          </div>

          {/* Key Features & Benefits */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Key Features
            </h3>
            <ul className="space-y-2.5">
              {tool.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {tool.faqs.map((faq, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-xs">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Tools Strip */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Other Useful Tools</h3>
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all 8 tools &rarr;
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((relTool) => (
              <button
                key={relTool.id}
                onClick={() => onNavigate(relTool.slug as PageRoute)}
                className="p-4 rounded-xl text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ToolIcon name={relTool.iconName} className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {relTool.name}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {relTool.shortDesc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
