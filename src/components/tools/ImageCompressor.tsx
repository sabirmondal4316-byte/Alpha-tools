import React, { useState, useRef } from 'react';
import { Upload, Download, Trash2, Sliders, RefreshCw, Archive, Check, ArrowRight, Eye } from 'lucide-react';
import JSZip from 'jszip';

interface ProcessedImage {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalUrl: string;
  compressedBlob: Blob | null;
  compressedUrl: string | null;
  compressedSize: number;
  width: number;
  height: number;
  isProcessing: boolean;
  savingsPercent: number;
}

export const ImageCompressor: React.FC = () => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [quality, setQuality] = useState<number>(75);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [limitDimensions, setLimitDimensions] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<ProcessedImage | null>(null);
  const [splitPos, setSplitPos] = useState<number>(50);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = (file: File, q: number, format: 'image/jpeg' | 'image/webp', limitDim: boolean, maxW: number): Promise<ProcessedImage> => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substring(2, 9);
      const originalUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        let targetWidth = img.naturalWidth;
        let targetHeight = img.naturalHeight;

        if (limitDim && targetWidth > maxW) {
          const ratio = maxW / targetWidth;
          targetWidth = maxW;
          targetHeight = Math.round(targetHeight * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // If JPEG, fill white background for transparency
          if (format === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
          }
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedUrl = URL.createObjectURL(blob);
                const compressedSize = blob.size;
                const savings = Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100));

                const item: ProcessedImage = {
                  id,
                  file,
                  name: file.name,
                  originalSize: file.size,
                  originalUrl,
                  compressedBlob: blob,
                  compressedUrl,
                  compressedSize,
                  width: targetWidth,
                  height: targetHeight,
                  isProcessing: false,
                  savingsPercent: savings
                };
                resolve(item);
              } else {
                resolve({
                  id,
                  file,
                  name: file.name,
                  originalSize: file.size,
                  originalUrl,
                  compressedBlob: null,
                  compressedUrl: null,
                  compressedSize: file.size,
                  width: targetWidth,
                  height: targetHeight,
                  isProcessing: false,
                  savingsPercent: 0
                });
              }
            },
            format,
            q / 100
          );
        }
      };

      img.onerror = () => {
        resolve({
          id,
          file,
          name: file.name,
          originalSize: file.size,
          originalUrl,
          compressedBlob: null,
          compressedUrl: null,
          compressedSize: file.size,
          width: 0,
          height: 0,
          isProcessing: false,
          savingsPercent: 0
        });
      };

      img.src = originalUrl;
    });
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    const newItems: ProcessedImage[] = [];
    for (const f of validFiles) {
      const processed = await processFile(f, quality, outputFormat, limitDimensions, maxWidth);
      newItems.push(processed);
    }

    setImages((prev) => {
      const combined = [...prev, ...newItems];
      if (!previewImage && combined.length > 0) {
        setPreviewImage(combined[0]);
      }
      return combined;
    });
  };

  const reprocessAll = async (newQuality = quality, newFormat = outputFormat, newLimitDim = limitDimensions, newMaxW = maxWidth) => {
    if (images.length === 0) return;

    const updated = await Promise.all(
      images.map(async (item) => {
        return await processFile(item.file, newQuality, newFormat, newLimitDim, newMaxW);
      })
    );

    setImages(updated);
    if (previewImage) {
      const found = updated.find((u) => u.name === previewImage.name) || updated[0];
      setPreviewImage(found);
    }
  };

  const downloadSingle = (item: ProcessedImage) => {
    if (!item.compressedBlob) return;
    const a = document.createElement('a');
    const ext = outputFormat === 'image/webp' ? '.webp' : '.jpg';
    const baseName = item.name.replace(/\.[^/.]+$/, '');
    a.href = item.compressedUrl || '';
    a.download = `alpha-compressed-${baseName}${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAllZip = async () => {
    if (images.length === 0) return;
    const zip = new JSZip();
    const ext = outputFormat === 'image/webp' ? '.webp' : '.jpg';

    images.forEach((item) => {
      if (item.compressedBlob) {
        const baseName = item.name.replace(/\.[^/.]+$/, '');
        zip.file(`alpha-compressed-${baseName}${ext}`, item.compressedBlob);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = `alpha-tools-compressed-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const remaining = prev.filter((img) => img.id !== id);
      if (previewImage && previewImage.id === id) {
        setPreviewImage(remaining[0] || null);
      }
      return remaining;
    });
  };

  const clearAll = () => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.originalUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
    setPreviewImage(null);
  };

  const totalOriginal = images.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressed = images.reduce((acc, curr) => acc + curr.compressedSize, 0);
  const totalSaved = totalOriginal > 0 ? Math.max(0, Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)) : 0;

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="relative group border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-8 sm:p-12 text-center bg-slate-50/50 dark:bg-slate-900/30 hover:bg-blue-50/20 dark:hover:bg-blue-950/20 transition-all cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Choose Images or Drag & Drop Here
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supports JPG, JPEG, PNG, and WebP (up to 50MB each). Processed securely in your browser.
          </p>
          <button
            type="button"
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            Select Images
          </button>
        </div>
      </div>

      {/* Workspace Controls & Results */}
      {images.length > 0 && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Compression Settings</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
                >
                  + Add More
                </button>
                <button
                  onClick={clearAll}
                  className="px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quality Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Compression Quality</span>
                  <span className="font-mono tabular-nums text-blue-600 dark:text-blue-400 font-bold">
                    {quality}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setQuality(val);
                    reprocessAll(val, outputFormat, limitDimensions, maxWidth);
                  }}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Smallest File (10%)</span>
                  <span>Balanced (75%)</span>
                  <span>Best Quality (100%)</span>
                </div>
              </div>

              {/* Output Format */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Output Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOutputFormat('image/jpeg');
                      reprocessAll(quality, 'image/jpeg', limitDimensions, maxWidth);
                    }}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      outputFormat === 'image/jpeg'
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    JPG / JPEG
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOutputFormat('image/webp');
                      reprocessAll(quality, 'image/webp', limitDimensions, maxWidth);
                    }}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                      outputFormat === 'image/webp'
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    WebP (Modern)
                  </button>
                </div>
              </div>

              {/* Dimension constraint */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Max Width Limit
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={limitDimensions}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setLimitDimensions(checked);
                        reprocessAll(quality, outputFormat, checked, maxWidth);
                      }}
                      className="rounded accent-blue-600"
                    />
                    <span>Constrain</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    disabled={!limitDimensions}
                    value={maxWidth}
                    onChange={(e) => {
                      const val = Math.max(100, Number(e.target.value));
                      setMaxWidth(val);
                      if (limitDimensions) {
                        reprocessAll(quality, outputFormat, true, val);
                      }
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-50"
                    placeholder="1920"
                  />
                  <span className="text-xs text-slate-500 shrink-0">px</span>
                </div>
              </div>
            </div>

            {/* Overall Stats Banner */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 font-mono tabular-nums">
                <span>Total: <strong className="text-slate-900 dark:text-white">{images.length} files</strong></span>
                <span>Original: <strong className="text-slate-900 dark:text-white">{formatBytes(totalOriginal)}</strong></span>
                <span>Compressed: <strong className="text-blue-600 dark:text-blue-400">{formatBytes(totalCompressed)}</strong></span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Saved: -{totalSaved}%</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={downloadAllZip}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-sm transition-all"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Download All (ZIP)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Split View Preview Modal / Area */}
          {previewImage && (
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Preview: {previewImage.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  <span>{formatBytes(previewImage.originalSize)} &rarr; <strong className="text-blue-600 dark:text-blue-400">{formatBytes(previewImage.compressedSize)}</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">(-{previewImage.savingsPercent}%)</span>
                </div>
              </div>

              {/* Visual Compare Container */}
              <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center select-none border border-slate-800">
                {/* Original Base Image */}
                <img
                  src={previewImage.originalUrl}
                  alt="Original"
                  className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Compressed Clipped Image */}
                {previewImage.compressedUrl && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${splitPos}%)` }}
                  >
                    <img
                      src={previewImage.compressedUrl}
                      alt="Compressed"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize"
                  style={{ left: `${splitPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white text-slate-900 shadow-md flex items-center justify-center text-[10px] font-bold">
                    ⇆
                  </div>
                </div>

                {/* Interactive Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={splitPos}
                  onChange={(e) => setSplitPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  aria-label="Comparison slider position"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono rounded pointer-events-none">
                  Original
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-[11px] font-mono rounded pointer-events-none">
                  Compressed ({quality}%)
                </div>
              </div>
              <p className="text-[11px] text-center text-slate-400">
                Drag the divider slider left & right to inspect visual quality difference.
              </p>
            </div>
          )}

          {/* List of Compressed Images */}
          <div className="grid grid-cols-1 gap-3">
            {images.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-xl border transition-all ${
                  previewImage?.id === item.id
                    ? 'border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
                  <img
                    src={item.compressedUrl || item.originalUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums mt-0.5">
                      <span>{formatBytes(item.originalSize)}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 inline" />
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{formatBytes(item.compressedSize)}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">(-{item.savingsPercent}%)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 sm:mt-0 w-full sm:w-auto justify-end shrink-0">
                  <button
                    onClick={() => setPreviewImage(item)}
                    className="px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>
                  <button
                    onClick={() => downloadSingle(item)}
                    className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => removeImage(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-colors"
                    aria-label="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
