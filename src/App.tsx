import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { TOOLS_DATA } from './data/toolsData';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { ToolLayout } from './components/common/ToolLayout';

// Tool Components
import { ImageCompressor } from './components/tools/ImageCompressor';
import { ImageResizer } from './components/tools/ImageResizer';
import { QRCodeGenerator } from './components/tools/QRCodeGenerator';
import { WordCounter } from './components/tools/WordCounter';
import { AgeCalculator } from './components/tools/AgeCalculator';
import { JsonFormatter } from './components/tools/JsonFormatter';
import { JpgToPngConverter } from './components/tools/JpgToPngConverter';
import { PngToJpgConverter } from './components/tools/PngToJpgConverter';

// Page Components
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';

const parseHashRoute = (): PageRoute => {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const validRoutes: PageRoute[] = [
    'home',
    'image-compressor',
    'image-resizer',
    'qr-code-generator',
    'word-counter',
    'age-calculator',
    'json-formatter',
    'jpg-to-png',
    'png-to-jpg',
    'about',
    'contact',
    'privacy',
    'terms',
  ];

  if (validRoutes.includes(hash as PageRoute)) {
    return hash as PageRoute;
  }
  return 'home';
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(parseHashRoute);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(parseHashRoute());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global keyboard shortcut: Cmd+K or Ctrl+K to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (route: PageRoute) => {
    if (route === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = `/${route}`;
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getToolItem = (id: string) => {
    return TOOLS_DATA.find((t) => t.id === id) || TOOLS_DATA[0];
  };

  const renderContent = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
      case 'image-compressor':
        return (
          <ToolLayout tool={getToolItem('image-compressor')} onNavigate={navigate}>
            <ImageCompressor />
          </ToolLayout>
        );
      case 'image-resizer':
        return (
          <ToolLayout tool={getToolItem('image-resizer')} onNavigate={navigate}>
            <ImageResizer />
          </ToolLayout>
        );
      case 'qr-code-generator':
        return (
          <ToolLayout tool={getToolItem('qr-code-generator')} onNavigate={navigate}>
            <QRCodeGenerator />
          </ToolLayout>
        );
      case 'word-counter':
        return (
          <ToolLayout tool={getToolItem('word-counter')} onNavigate={navigate}>
            <WordCounter />
          </ToolLayout>
        );
      case 'age-calculator':
        return (
          <ToolLayout tool={getToolItem('age-calculator')} onNavigate={navigate}>
            <AgeCalculator />
          </ToolLayout>
        );
      case 'json-formatter':
        return (
          <ToolLayout tool={getToolItem('json-formatter')} onNavigate={navigate}>
            <JsonFormatter />
          </ToolLayout>
        );
      case 'jpg-to-png':
        return (
          <ToolLayout tool={getToolItem('jpg-to-png')} onNavigate={navigate}>
            <JpgToPngConverter />
          </ToolLayout>
        );
      case 'png-to-jpg':
        return (
          <ToolLayout tool={getToolItem('png-to-jpg')} onNavigate={navigate}>
            <PngToJpgConverter />
          </ToolLayout>
        );
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Header
          currentRoute={currentRoute}
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="flex-1">{renderContent()}</main>

        <Footer onNavigate={navigate} />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={navigate}
        />
      </div>
    </ThemeProvider>
  );
}
