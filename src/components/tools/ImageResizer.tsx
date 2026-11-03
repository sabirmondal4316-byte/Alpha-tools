import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Lock, Unlock, RefreshCw, Layers, Check, Maximize2 } from 'lucide-react';

interface Preset {
  label: string;
  width: number;
  height: number;
  category: string;
}

const PRESETS: Preset[] = [
  { label: 'Instagram Square', width: 1080, height: 1080, category: 'Social Media' },
  { label: 'Instagram Story / Reel', width: 1080, height: 1920, category: 'Social Media' },
  { label: 'YouTube Thumbnail', width: 1280, height: 720, category: 'Social Media' },
  { label: 'Twitter / X Post', width: 1200, height: 675, category: 'Social Media' },
  { label: 'Facebook Post', width: 1200, height: 630, category: 'Social Media' },
  { label: 'Full HD (1080p)', width: 1920, height: 1080, category: 'Display' },
  { label: '4K Ultra HD', width: 3840, height: 2160, category: 'Display' },
  { label: 'Square Avatar', width: 500, height: 500, category: 'Profile' },
];

export const ImageResizer: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [quality, setQuality] = useState<number>(90);
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    };
    img.src = url;
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (lockAspectRatio && aspectRatio > 0) {
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (lockAspectRatio && aspectRatio > 0) {
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const applyScalePercentage = (pct: number) => {
    if (originalWidth === 0 || originalHeight === 0) return;
    const newW = Math.round((originalWidth * pct) / 100);
    const newH = Math.round((originalHeight * pct) / 100);
    setWidth(newW);
    setHeight(newH);
  };

  const applyPreset = (preset: Preset) => {
    setWidth(preset.width);
    setHeight(preset.height);
    setLockAspectRatio(false);
  };

  // Render and produce resized image
  useEffect(() => {
    if (!imageUrl || width <= 0 || height <= 0) return;

    setIsResizing(true);
    const timeout = setTimeout(() => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          if (format === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
          }

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                setResizedBlob(blob);
                if (resizedUrl) URL.revokeObjectURL(resizedUrl);
                setResizedUrl(URL.createObjectURL(blob));
              }
              setIsResizing(false);
            },
            format,
            quality / 100
          );
        }
      };
      img.src = imageUrl;
    }, 150);

    return () => clearTimeout(timeout);
  }, [imageUrl, width, height, format, quality]);

  const handleDownload = () => {
    if (!resizedBlob || !imageFile) return;
    const a = document.createElement('a');
    const base = imageFile.name.replace(/\.[^/.]+$/, '');
    const ext = format === 'image/jpeg' ? '.jpg' : format === 'image/webp' ? '.webp' : '.png';
    a.href = resizedUrl || '';
    a.download = `alpha-resized-${base}-${width}x${height}${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Box */}
      {!imageUrl ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="relative group border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-12 text-center bg-slate-50/50 dark:bg-slate-900/30 hover:bg-blue-50/20 cursor-pointer transition-all"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) handleFileSelect(e.target.files[0]);
            }}
          />
          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Maximize2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Upload Image to Resize
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Supports PNG, JPG, JPEG, WebP, GIF, and SVG. 100% Client-Side.
            </p>
            <button
              type="button"
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              Choose Image
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Dimensions & Scale
                </h3>
                <button
                  onClick={() => {
                    setImageUrl(null);
                    setImageFile(null);
                    setResizedBlob(null);
                  }}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Change Image
                </button>
              </div>

              {/* Width & Height Inputs */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={width || ''}
                      onChange={(e) => handleWidthChange(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 text-sm font-mono font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={height || ''}
                      onChange={(e) => handleHeightChange(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 text-sm font-mono font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Lock Aspect Ratio Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !lockAspectRatio;
                    setLockAspectRatio(next);
                    if (next && height > 0) {
                      setAspectRatio(width / height);
                    }
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                    lockAspectRatio
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {lockAspectRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>{lockAspectRatio ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}</span>
                </button>
              </div>

              {/* Quick Percentage Scaling */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Quick Scale (% of original)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[25, 50, 75, 150, 200].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => applyScalePercentage(pct)}
                      className="py-1.5 px-2 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-center transition-colors font-mono"
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Social Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Popular Presets
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="p-2 text-left rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/50 transition-colors"
                    >
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {preset.label}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                        {preset.width} × {preset.height}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Export Format & Quality */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Output Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['image/png', 'image/jpeg', 'image/webp'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center transition-colors ${
                        format === fmt
                          ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {fmt === 'image/jpeg' ? 'JPG' : fmt === 'image/webp' ? 'WebP' : 'PNG'}
                    </button>
                  ))}
                </div>

                {format !== 'image/png' && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-600 dark:text-slate-400">Quality</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{quality}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleDownload}
                disabled={isResizing || !resizedBlob}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resized Image</span>
              </button>
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Live Resized Preview
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 mt-0.5">
                    <span>Original: {originalWidth} × {originalHeight} px ({imageFile ? formatBytes(imageFile.size) : ''})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                    {width} × {height} px
                  </span>
                  <div className="text-[11px] font-mono text-slate-400">
                    {resizedBlob ? `~${formatBytes(resizedBlob.size)}` : 'Calculating...'}
                  </div>
                </div>
              </div>

              {/* Image Preview Box */}
              <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center p-4 border border-slate-800">
                {resizedUrl ? (
                  <img
                    src={resizedUrl}
                    alt="Resized preview"
                    className="max-w-full max-h-full object-contain shadow-md rounded"
                  />
                ) : (
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
                    Rendering preview...
                  </div>
                )}
              </div>

              {/* Information Strip */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-center text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Megapixels</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {((width * height) / 1000000).toFixed(2)} MP
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Aspect Ratio</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {height > 0 ? (width / height).toFixed(2) : '1.00'}:1
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Format</span>
                  <span className="font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase">
                    {format.replace('image/', '')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
