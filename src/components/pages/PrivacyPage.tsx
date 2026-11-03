import React, { useEffect } from 'react';
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, CheckCircle2 } from 'lucide-react';
import { setPageMeta } from '../../utils/seo';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    setPageMeta(
      'Privacy Policy - ALPHA TOOLS',
      'ALPHA TOOLS Privacy Policy: 100% client-side processing, zero server uploads, no cookies, and total user confidentiality.'
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero-Knowledge Data Policy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last Updated: November 2026 · Effective Immediately
        </p>
      </div>

      {/* Highlights Box */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800/80 rounded-2xl border border-blue-100 dark:border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          The Short Summary (TL;DR)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Files are processed 100% on your device</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>We never store or see your photos or text</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No user accounts or identity collection</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No third-party advertising tracking cookies</span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Client-Side Execution Guarantee
          </h2>
          <p>
            At ALPHA TOOLS, privacy is not merely a policy—it is our core software architecture. When you upload an image to our Image Compressor, Image Resizer, or Image Converters, or when you format JSON code or count words, the data is loaded strictly into your web browser&apos;s memory (`HTMLCanvasElement`, `Blob`, `FileReader`, and local JavaScript execution threads). No image bytes or text strings are transmitted across the Internet to our servers or any third-party clouds.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. Information We Do Not Collect
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do NOT collect, upload, store, or view your source photos, compressed images, or converted graphics.</li>
            <li>We do NOT log or inspect your JSON payloads, passwords, WiFi credentials, or contact vCards entered into our QR Code generator.</li>
            <li>We do NOT collect personal identity records, payment details, or phone numbers.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Local Storage Usage
          </h2>
          <p>
            We utilize standard browser `localStorage` strictly for remembering your aesthetic preferences: specifically, whether you have chosen Light Mode or Dark Mode (`alpha_tools_theme`). This preference stays on your local device and is never synchronized to external databases.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Third-Party Services & External APIs
          </h2>
          <p>
            ALPHA TOOLS does not make use of paid external transformation APIs. All image codecs and compression routines utilize the native browser canvas engine. Standard non-identifiable web server logs (such as IP addresses and HTTP referrers) may be temporarily processed by infrastructure providers (e.g. Cloud Run/CDN) solely for DDoS mitigation and server uptime monitoring.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            5. Contacting Us
          </h2>
          <p>
            If you have questions or inquiries regarding our data handling or security guarantees, please reach out via our contact page or at <a href="mailto:privacy@alphatools.com" className="text-blue-600 dark:text-blue-400 font-medium">privacy@alphatools.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
