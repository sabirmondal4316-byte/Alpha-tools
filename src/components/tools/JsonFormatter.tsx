import React, { useState, useMemo } from 'react';
import { Braces, Copy, Check, Download, AlertCircle, CheckCircle2, ChevronRight, ChevronDown, Upload, Trash2, ArrowUpDown } from 'lucide-react';

const SAMPLE_JSON = `{
  "site": "ALPHA TOOLS",
  "version": "1.0.0",
  "features": {
    "clientSide": true,
    "privacyFocused": true,
    "toolsCount": 8,
    "categories": [
      "Image Processing",
      "Text Analysis",
      "Calculators",
      "Format Converters"
    ]
  },
  "rating": 4.95,
  "developerNotes": null
}`;

export const JsonFormatter: React.FC = () => {
  const [rawInput, setRawInput] = useState<string>(SAMPLE_JSON);
  const [indent, setIndent] = useState<number | 'tab' | 'min'>(2);
  const [sortKeys, setSortKeys] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'code' | 'tree'>('code');
  const [copied, setCopied] = useState<boolean>(false);

  // Parse and validate
  const parseResult = useMemo(() => {
    if (!rawInput.trim()) {
      return { parsed: null, error: null, formatted: '', size: 0 };
    }

    try {
      let obj = JSON.parse(rawInput);

      // Deep sort keys if requested
      if (sortKeys && typeof obj === 'object' && obj !== null) {
        const deepSort = (item: any): any => {
          if (Array.isArray(item)) {
            return item.map(deepSort);
          } else if (item !== null && typeof item === 'object') {
            const sortedKeys = Object.keys(item).sort();
            const result: Record<string, any> = {};
            sortedKeys.forEach((k) => {
              result[k] = deepSort(item[k]);
            });
            return result;
          }
          return item;
        };
        obj = deepSort(obj);
      }

      let formatted = '';
      if (indent === 'min') {
        formatted = JSON.stringify(obj);
      } else if (indent === 'tab') {
        formatted = JSON.stringify(obj, null, '\t');
      } else {
        formatted = JSON.stringify(obj, null, indent);
      }

      const bytes = new Blob([formatted]).size;

      return {
        parsed: obj,
        error: null,
        formatted,
        size: bytes,
      };
    } catch (err: any) {
      return {
        parsed: null,
        error: err.message || 'Invalid JSON syntax',
        formatted: '',
        size: 0,
      };
    }
  }, [rawInput, indent, sortKeys]);

  const copyToClipboard = () => {
    if (!parseResult.formatted) return;
    navigator.clipboard.writeText(parseResult.formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    if (!parseResult.formatted) return;
    const blob = new Blob([parseResult.formatted], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `alpha-formatted-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setRawInput(event.target?.result as string || '');
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Validation Status Indicator */}
        <div className="flex items-center gap-2">
          {parseResult.error ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Invalid JSON</span>
            </div>
          ) : rawInput.trim() ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Valid JSON Syntax</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">Waiting for input...</span>
          )}
        </div>

        {/* Options */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Indentation selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setIndent(2)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                indent === 2
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              2 Spaces
            </button>
            <button
              onClick={() => setIndent(4)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                indent === 4
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              4 Spaces
            </button>
            <button
              onClick={() => setIndent('tab')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                indent === 'tab'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Tab
            </button>
            <button
              onClick={() => setIndent('min')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                indent === 'min'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Minify
            </button>
          </div>

          {/* Sort Keys Toggle */}
          <button
            onClick={() => setSortKeys(!sortKeys)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              sortKeys
                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort Keys</span>
          </button>
        </div>
      </div>

      {/* Main Split: Raw Input vs Formatted Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Input Raw JSON
            </h3>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload .json</span>
                <input
                  type="file"
                  accept=".json,application/json,text/plain"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <button
                onClick={() => setRawInput(SAMPLE_JSON)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sample
              </button>
              <button
                onClick={() => setRawInput('')}
                className="text-xs text-slate-400 hover:text-rose-500"
              >
                Clear
              </button>
            </div>
          </div>

          <textarea
            rows={18}
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="Paste your raw, messy JSON here..."
            className="w-full h-96 p-3 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none leading-relaxed"
          />

          {parseResult.error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
              <p className="font-semibold">Syntax Error:</p>
              <p className="font-mono mt-0.5">{parseResult.error}</p>
            </div>
          )}
        </div>

        {/* Output Column */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            {/* View Mode Toggle: Code vs Interactive Tree */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setViewMode('code')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'code'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Code View
              </button>
              <button
                onClick={() => setViewMode('tree')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'tree'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Tree View
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                disabled={!parseResult.formatted}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 disabled:opacity-40 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadJson}
                disabled={!parseResult.formatted}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Render Code or Tree */}
          {viewMode === 'code' ? (
            <div className="relative">
              <pre className="w-full h-96 p-3 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-emerald-400 overflow-auto whitespace-pre leading-relaxed select-text">
                {parseResult.formatted || '// Formatted output will appear here'}
              </pre>
            </div>
          ) : (
            <div className="w-full h-96 p-3 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 overflow-auto">
              {parseResult.parsed !== null ? (
                <JsonTreeNode data={parseResult.parsed} name="root" isLast={true} />
              ) : (
                <p className="text-slate-400 p-4">Valid JSON required for tree inspector view.</p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Size: {parseResult.size} bytes</span>
            <span>{indent === 'min' ? 'Compact' : `Indented: ${indent}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Recursive JSON Tree Node Component
interface JsonTreeNodeProps {
  data: any;
  name: string;
  isLast: boolean;
}

const JsonTreeNode: React.FC<JsonTreeNodeProps> = ({ data, name, isLast }) => {
  const [isOpen, setIsOpen] = useState(true);

  const isObject = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);

  if (!isObject) {
    let typeColor = 'text-blue-600 dark:text-blue-400';
    if (typeof data === 'string') typeColor = 'text-emerald-600 dark:text-emerald-400';
    else if (typeof data === 'boolean') typeColor = 'text-amber-600 dark:text-amber-400';
    else if (data === null) typeColor = 'text-rose-500';

    return (
      <div className="pl-4 py-0.5 flex items-center gap-1.5 font-mono text-[11px]">
        <span className="text-purple-600 dark:text-purple-400">&quot;{name}&quot;</span>:
        <span className={typeColor}>
          {typeof data === 'string' ? `"${data}"` : String(data)}
        </span>
        {!isLast && <span className="text-slate-400">,</span>}
      </div>
    );
  }

  const keys = Object.keys(data);
  const count = keys.length;

  return (
    <div className="pl-4 py-0.5 font-mono text-[11px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded px-1 -ml-1 inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 select-none"
      >
        {isOpen ? <ChevronDown className="w-3 h-3 text-slate-400" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
        <span className="text-purple-600 dark:text-purple-400 font-semibold">&quot;{name}&quot;</span>:
        <span className="text-slate-400 text-[10px]">
          {isArray ? `Array(${count}) [` : `Object {${count}}`}
        </span>
      </div>

      {isOpen && (
        <div className="border-l border-slate-200 dark:border-slate-800 ml-2">
          {keys.map((key, idx) => (
            <JsonTreeNode
              key={key}
              name={key}
              data={data[key]}
              isLast={idx === keys.length - 1}
            />
          ))}
        </div>
      )}

      {isOpen && (
        <span className="text-slate-400 pl-1">{isArray ? ']' : '}'}{!isLast && ','}</span>
      )}
    </div>
  );
};
