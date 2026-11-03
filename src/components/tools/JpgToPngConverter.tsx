import React, { useState, useRef } from 'react';
import { Upload, Download, Trash2, Archive, ArrowRight, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import JSZip from 'jszip';

interface ConvertedJpgItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalUrl: string;
  pngBlob: Blob | null;
  pngUrl: string | null;
  pngSize: number;
  width: number;
  height: number;
  isConverting: boolean;
}

export const JpgToPngConverter: React.FC = () => {
  const [items, setItems] = useState<ConvertedJpgItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const convertFile = (file: File): Promise<ConvertedJpgItem> => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substring(2, 9);
      const originalUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              const pngUrl = URL.createObjectURL(blob);
              resolve({
                id,
                file,
                name: file.name,
                originalSize: file.size,
                originalUrl,
                pngBlob: blob,
                pngUrl,
                pngSize: blob.size,
                width: img.naturalWidth,
                height: img.naturalHeight,
                isConverting: false,
              });
            } else {
              resolve({
                id,
                file,
                name: file.name,
                originalSize: file.size,
                originalUrl,
                pngBlob: null,
                pngUrl: null,
                pngSize: 0,
                width: img.naturalWidth,
                height: img.naturalHeight,
                isConverting: false,
              });
            }
          }, 'image/png');
        }
      };

      img.onerror = () => {
        resolve({
          id,
          file,
          name: file.name,
          originalSize: file.size,
          originalUrl,
          pngBlob: null,
          pngUrl: null,
          pngSize: 0,
          width: 0,
          height: 0,
          isConverting: false,
        });
      };

      img.src = originalUrl;
    });
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter(
      (f) => f.type === 'image/jpeg' || f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg')
    );
    if (valid.length === 0) return;

    const convertedList: ConvertedJpgItem[] = [];
    for (const f of valid) {
      const res = await convertFile(f);
      convertedList.push(res);
    }

    setItems((prev) => [...prev, ...convertedList]);
  };

  const downloadSingle = (item: ConvertedJpgItem) => {
    if (!item.pngBlob) return;
    const a = document.createElement('a');
    const baseName = item.name.replace(/\.[^/.]+$/, '');
    a.href = item.pngUrl || '';
    a.download = `${baseName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAllZip = async () => {
    if (items.length === 0) return;
    const zip = new JSZip();

    items.forEach((item) => {
      if (item.pngBlob) {
        const baseName = item.name.replace(/\.[^/.]+$/, '');
        zip.file(`${baseName}.png`, item.pngBlob);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = `alpha-converted-png-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    items.forEach((item) => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.pngUrl) URL.revokeObjectURL(item.pngUrl);
    });
    setItems([]);
  };

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
        className="relative group border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-10 text-center bg-slate-50/50 dark:bg-slate-900/30 hover:bg-blue-50/20 cursor-pointer transition-all"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Upload JPG / JPEG Images to Convert
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Converts instantly to lossless PNG format in your browser. Supports batch conversion.
          </p>
          <button
            type="button"
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            Select JPG Files
          </button>
        </div>
      </div>

      {/* Converted Files List & ZIP */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {items.length} file{items.length > 1 ? 's' : ''} converted to PNG
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              >
                + Add More
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 rounded-lg transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={downloadAllZip}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-sm transition-all"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>Download All (ZIP)</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={item.pngUrl || item.originalUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {item.name.replace(/\.[^/.]+$/, '')}.png
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-mono tabular-nums text-slate-500 mt-0.5">
                      <span>{item.width} × {item.height} px</span>
                      <span>·</span>
                      <span>JPG: {formatBytes(item.originalSize)}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 inline" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        PNG: {formatBytes(item.pngSize)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => downloadSingle(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                    aria-label="Remove item"
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
