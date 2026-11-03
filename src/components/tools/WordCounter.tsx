import React, { useState, useMemo } from 'react';
import {
  FileText,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  Mic,
  AlignLeft,
  Filter
} from 'lucide-react';

const COMMON_STOPWORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on',
  'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we',
  'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
  'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make',
  'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your',
  'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come',
  'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
  'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'is', 'are', 'was', 'were', 'been', 'has', 'had', 'did', 'does'
]);

const SAMPLE_TEXT = `Modern digital utilities are transforming how creators and developers work. By running computations directly in the browser using client-side JavaScript and HTML5 APIs, users enjoy lightning-fast performance without compromising their sensitive data.

ALPHA TOOLS was built on the core philosophy that everyday tasks—such as compressing images, resizing photos, generating QR codes, and formatting JSON—should be instantaneous, private, and accessible to everyone without subscriptions or server uploads.

When you process files locally, you eliminate network latency, avoid server bandwidth bottlenecks, and retain 100% control over your documents. Enjoy the speed and simplicity of native web tools!`;

export const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [copied, setCopied] = useState<boolean>(false);
  const [filterStopwords, setFilterStopwords] = useState<boolean>(true);

  // Compute text statistics
  const stats = useMemo(() => {
    const raw = text;
    const trimmed = raw.trim();

    const charCount = raw.length;
    const charNoSpacesCount = raw.replace(/\s/g, '').length;

    const wordsArray = trimmed ? trimmed.match(/\b[a-zA-Z0-9_\u00C0-\u017F'-]+\b/g) || [] : [];
    const wordCount = wordsArray.length;

    // Sentences: match ending punctuation (. ! ?)
    const sentenceMatches = raw.match(/[^.!?]+[.!?]+(\s|$)/g);
    const sentenceCount = sentenceMatches ? sentenceMatches.length : (trimmed ? 1 : 0);

    // Paragraphs
    const paragraphs = raw.split(/\n+/).filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    // Reading & speaking times (minutes & seconds)
    const readingMinutes = wordCount / 200;
    const readingTimeSec = Math.round(readingMinutes * 60);
    const readingFormatted = readingTimeSec < 60
      ? `${readingTimeSec}s`
      : `${Math.floor(readingTimeSec / 60)}m ${readingTimeSec % 60}s`;

    const speakingMinutes = wordCount / 130;
    const speakingTimeSec = Math.round(speakingMinutes * 60);
    const speakingFormatted = speakingTimeSec < 60
      ? `${speakingTimeSec}s`
      : `${Math.floor(speakingTimeSec / 60)}m ${speakingTimeSec % 60}s`;

    // Average word length
    const totalLetters = wordsArray.reduce((acc, w) => acc + w.length, 0);
    const avgWordLength = wordCount > 0 ? (totalLetters / wordCount).toFixed(1) : '0';

    // Syllables estimation for Flesch score
    const estimateSyllables = (word: string) => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, '');
      if (clean.length <= 3) return 1;
      const syllables = clean.replace(/(?:[^laeiouy]|ed|es|e)$/, '')
        .replace(/^y/, '')
        .match(/[aeiouy]{1,2}/g);
      return syllables ? syllables.length : 1;
    };

    let totalSyllables = 0;
    wordsArray.forEach((w) => {
      totalSyllables += estimateSyllables(w);
    });

    // Flesch Reading Ease formula
    let fleschScore = 0;
    let readingEaseGrade = 'N/A';
    if (wordCount > 5 && sentenceCount > 0) {
      fleschScore = Math.round(
        206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount)
      );
      fleschScore = Math.max(0, Math.min(100, fleschScore));

      if (fleschScore >= 90) readingEaseGrade = 'Very Easy (5th grade)';
      else if (fleschScore >= 80) readingEaseGrade = 'Easy (6th grade)';
      else if (fleschScore >= 70) readingEaseGrade = 'Fairly Easy (7th grade)';
      else if (fleschScore >= 60) readingEaseGrade = 'Standard (8th-9th grade)';
      else if (fleschScore >= 50) readingEaseGrade = 'Fairly Difficult (High School)';
      else if (fleschScore >= 30) readingEaseGrade = 'Difficult (College)';
      else readingEaseGrade = 'Very Difficult (Graduate)';
    }

    // Keyword density
    const frequencyMap = new Map<string, number>();
    wordsArray.forEach((w) => {
      const lower = w.toLowerCase();
      if (filterStopwords && COMMON_STOPWORDS.has(lower)) return;
      if (lower.length > 1) {
        frequencyMap.set(lower, (frequencyMap.get(lower) || 0) + 1);
      }
    });

    const topKeywords = Array.from(frequencyMap.entries())
      .map(([word, count]) => ({
        word,
        count,
        density: wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) : '0',
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return {
      wordCount,
      charCount,
      charNoSpacesCount,
      sentenceCount,
      paragraphCount,
      readingFormatted,
      speakingFormatted,
      avgWordLength,
      fleschScore,
      readingEaseGrade,
      topKeywords,
    };
  }, [text, filterStopwords]);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transformCase = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'clean') => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(
          text.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          )
        );
        break;
      case 'sentence':
        setText(
          text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        );
        break;
      case 'clean':
        // Replace multiple whitespace/newlines
        setText(text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n+/g, '\n\n').trim());
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary KPI Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Words
          </span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {stats.wordCount.toLocaleString()}
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Characters
          </span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
            {stats.charCount.toLocaleString()}
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            No Spaces
          </span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {stats.charNoSpacesCount.toLocaleString()}
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Sentences
          </span>
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 font-mono tabular-nums">
            {stats.sentenceCount.toLocaleString()}
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Paragraphs
          </span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            {stats.paragraphCount.toLocaleString()}
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Reading Time
          </span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
            {stats.readingFormatted}
          </span>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Area */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => transformCase('upper')}
                  className="px-2 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  title="Convert to UPPERCASE"
                >
                  UPPER
                </button>
                <button
                  onClick={() => transformCase('lower')}
                  className="px-2 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  title="Convert to lowercase"
                >
                  lower
                </button>
                <button
                  onClick={() => transformCase('title')}
                  className="px-2 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  title="Convert to Title Case"
                >
                  Title Case
                </button>
                <button
                  onClick={() => transformCase('sentence')}
                  className="px-2 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  title="Convert to Sentence case"
                >
                  Sentence case
                </button>
                <button
                  onClick={() => transformCase('clean')}
                  className="px-2 py-1 text-xs font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  title="Clean extra spaces and trailing blank lines"
                >
                  Clean Spaces
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setText(SAMPLE_TEXT)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Load Sample
                </button>
                <button
                  onClick={() => setText('')}
                  className="text-xs text-slate-400 hover:text-rose-500"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                rows={14}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full p-4 text-sm leading-relaxed rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y transition-colors font-sans"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-4 font-mono tabular-nums">
                <span>Avg Word Length: {stats.avgWordLength} chars</span>
                <span>Speaking Time: ~{stats.speakingFormatted}</span>
              </div>
              <button
                onClick={copyText}
                className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Readability & Keyword Density Sidebar */}
        <div className="lg:col-span-4 space-y-5">
          {/* Readability Gauge Card */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Readability Score
            </h3>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
                {stats.fleschScore}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ 100 (Flesch Score)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${stats.fleschScore}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Grade Level: <strong className="text-slate-900 dark:text-white">{stats.readingEaseGrade}</strong>
            </p>
          </div>

          {/* Keyword Density Table */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Keyword Density
              </h3>
              <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterStopwords}
                  onChange={(e) => setFilterStopwords(e.target.checked)}
                  className="rounded accent-blue-600"
                />
                <span>Exclude Stopwords</span>
              </label>
            </div>

            {stats.topKeywords.length > 0 ? (
              <div className="space-y-2">
                {stats.topKeywords.map((item) => (
                  <div
                    key={item.word}
                    className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                      {item.word}
                    </span>
                    <div className="flex items-center gap-3 font-mono tabular-nums text-slate-500 text-[11px]">
                      <span>{item.count}x</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold w-10 text-right">
                        {item.density}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">
                Add more text to generate keyword frequency metrics.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
