import React from 'react';
import { ShieldCheck, Zap, Lock, Heart } from 'lucide-react';
import { PageRoute } from '../../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors mt-auto">
      {/* Trust & Privacy Banner */}
      <div className="border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">100% Client-Side Privacy</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Your files, images, and text never leave your device. All operations execute strictly in your browser.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Instant Hardware Speed</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Zero upload queues or server lag. Powered directly by HTML5 Canvas and native browser engines.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Free Forever & Ad-Light</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  No subscriptions, no accounts, and no paid API paywalls. Built for speed and productivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                ALPHA <span className="text-blue-600 dark:text-blue-400">TOOLS</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Professional, private, and blazing fast browser-based utilities suite. Built with love for creators, engineers, and everyday users.
            </p>
            <div className="text-xs text-slate-400 dark:text-slate-500 pt-1">
              v1.0 · Zero-server architecture
            </div>
          </div>

          {/* Image Tools */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Image Tools
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('image-compressor')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Image Compressor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('image-resizer')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Image Resizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jpg-to-png')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  JPG to PNG Converter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('png-to-jpg')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  PNG to JPG Converter
                </button>
              </li>
            </ul>
          </div>

          {/* Productivity & Dev */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Text & Utilities
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('qr-code-generator')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  QR Code Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('word-counter')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Word Counter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('age-calculator')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Age Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('json-formatter')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  JSON Formatter & Validator
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Information & Legal
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ALPHA TOOLS. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Client-side engineering with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span>for privacy & performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
