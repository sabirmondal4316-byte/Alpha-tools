import React, { useEffect } from 'react';
import { FileText, Shield, CheckCircle2 } from 'lucide-react';
import { setPageMeta } from '../../utils/seo';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    setPageMeta(
      'Terms of Service - ALPHA TOOLS',
      'Terms and conditions for utilizing ALPHA TOOLS online utilities and conversion features.'
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Usage Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last Updated: November 2026 · Effective Immediately
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By visiting, accessing, or using ALPHA TOOLS (&ldquo;the Website&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;), you agree to comply with and be bound by these Terms of Service. If you do not agree with any of these terms, you should immediately cease utilizing the service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. Permitted Use & Intellectual Property
          </h2>
          <p>
            You are granted a free, non-exclusive, revocable license to utilize the tools provided on ALPHA TOOLS for personal, educational, and commercial purposes. You retain 100% intellectual property ownership of all images, documents, and text files processed through our utilities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Disclaimer of Warranties
          </h2>
          <p>
            The services and utilities on ALPHA TOOLS are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied. While we strive to ensure maximum accuracy and performance across all calculations and image operations, we do not warrant that the website will be completely error-free or uninterrupted.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall ALPHA TOOLS or its creators be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the tools provided on this site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            5. Modifications to Services
          </h2>
          <p>
            We reserve the right to add, update, improve, or discontinue any tool or feature at any time without prior notice. Continued use of the platform constitutes agreement to any updated terms.
          </p>
        </section>
      </div>
    </div>
  );
};
