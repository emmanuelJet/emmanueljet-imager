"use client";

import { OptimizedFile, OutputFormat } from "@/types";
import { formatBytes, cn } from "@/lib/utils";
import { X, Check, Loader2, Download, AlertCircle, FileImage, Settings2 } from "lucide-react";
import { useState } from "react";

interface OptimizationListProps {
  files: OptimizedFile[];
  onRemove: (id: string) => void;
  onUpdateOptions: (id: string, options: Partial<OptimizedFile['options']>) => void;
}

export function OptimizationList({ files, onRemove, onUpdateOptions }: OptimizationListProps) {
  if (files.length === 0) return null;

  return (
    <div className="w-full space-y-4">
      {files.map((file) => (
        <OptimizationItem
          key={file.id}
          file={file}
          onRemove={onRemove}
          onUpdateOptions={onUpdateOptions}
        />
      ))}
    </div>
  );
}

function OptimizationItem({
  file,
  onRemove,
  onUpdateOptions
}: {
  file: OptimizedFile;
  onRemove: (id: string) => void;
  onUpdateOptions: (id: string, options: Partial<OptimizedFile['options']>) => void;
}) {
  const [showSettings, setShowSettings] = useState(false);
  const isDone = file.status === 'done';
  const isProcessing = file.status === 'processing';
  const savedPercentage = file.optimizedSize
    ? Math.round(((file.originalSize - file.optimizedSize) / file.originalSize) * 100)
    : 0;

  return (
    <div className="group relative bg-brand-surface border border-white/5 rounded-2xl p-4 transition-all hover:border-brand-purple/30">
      <div className="flex items-center gap-4">
        {/* Preview */}
        <div className="relative size-16 rounded-xl overflow-hidden bg-black/20 shrink-0">
          <img
            src={file.preview}
            alt={file.file.name}
            className="w-full h-full object-cover"
          />
          {file.status === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500/50">
              <AlertCircle className="size-6 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground truncate" title={file.file.name}>
              {file.file.name}
            </h3>
            {isDone && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">
                -{savedPercentage}%
              </span>
            )}
            {file.status === 'done' && (
              <span className="text-xs text-brand-purple font-mono">
                {file.options.format.toUpperCase()}
              </span>
            )}
          </div>

          <div className="text-sm text-foreground/60 flex items-center gap-2 mt-1">
            <span>{formatBytes(file.originalSize)}</span>
            {file.optimizedSize && (
              <>
                <span>→</span>
                <span className={cn(isDone && "text-green-400 font-bold")}>
                  {formatBytes(file.optimizedSize)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {file.status === 'done' && file.optimizedUrl ? (
            <a
              href={file.optimizedUrl}
              download={`optimized-${file.file.name.split('.')[0]}.${file.options.format === 'original' ? 'jpg' : file.options.format}`} // naive extension fix
              className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
              title="Download"
            >
              <Download className="size-5" />
            </a>
          ) : (
            <button
              onClick={() => setShowSettings(!showSettings)}
              disabled={isProcessing}
              className={cn(
                "p-2 rounded-lg transition-colors",
                showSettings ? "bg-brand-purple/20 text-brand-purple" : "hover:bg-white/5 text-foreground/60"
              )}
            >
              <Settings2 className="size-5" />
            </button>
          )}

          <button
            onClick={() => onRemove(file.id)}
            disabled={isProcessing}
            className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 text-foreground/40 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Local Settings (Expandable) */}
      {showSettings && (
        <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 fade-in">
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground/60">Quality</label>
            <input
              type="range"
              min="10"
              max="100"
              value={file.options.quality}
              onChange={(e) => onUpdateOptions(file.id, { quality: Number(e.target.value) })}
              className="w-full accent-brand-orange"
            />
            <div className="text-right text-xs text-brand-purple font-mono">{file.options.quality}%</div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground/60">Format</label>
            <select
              value={file.options.format}
              onChange={(e) => onUpdateOptions(file.id, { format: e.target.value as OutputFormat | 'original' })}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-1 text-sm focus:border-brand-purple outline-none"
            >
              <option value="original">Original</option>
              <option value="avif">AVIF (Best)</option>
              <option value="webp">WebP (Good)</option>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isProcessing && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-purple/20 rounded-b-2xl overflow-hidden">
          <div className="h-full bg-brand-purple animate-progress-indeterminate" />
        </div>
      )}
    </div>
  );
}
