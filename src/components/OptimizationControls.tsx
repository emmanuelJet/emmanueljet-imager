"use client";

import { OutputFormat } from "@/types";
import { Download, Loader2, Zap } from "lucide-react";

interface OptimizationControlsProps {
  onCompressAll: () => void;
  isProcessing: boolean;
  onGlobalSettingsChange: (settings: { format: OutputFormat | 'original', quality: number }) => void;
  currentSettings: { format: OutputFormat | 'original', quality: number };
  fileCount: number;
  completedCount: number;
  totalCount: number;
  onDownloadAll: () => void;
}

export function OptimizationControls({
  onCompressAll,
  isProcessing,
  onGlobalSettingsChange,
  currentSettings,
  fileCount,
  completedCount,
  totalCount,
  onDownloadAll
}: OptimizationControlsProps) {
  return (
    <div className="sticky bottom-4 z-40 mt-8 p-4 rounded-2xl glass-panel border border-brand-purple/20 flex flex-wrap items-center justify-between gap-4 max-w-4xl mx-auto shadow-2xl shadow-brand-purple/10">

      <div className="flex items-center gap-6 flex-1 min-w-[200px]">
        <div className="space-y-1">
          <label className="text-xs font-medium text-foreground/60 block">Global Format</label>
          <select
            value={currentSettings.format}
            onChange={(e) => onGlobalSettingsChange({ ...currentSettings, format: e.target.value as any })}
            className="bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-brand-purple outline-none min-w-[120px]"
          >
            <option value="original">Match Original</option>
            <option value="avif">Convert to AVIF</option>
            <option value="webp">Convert to WebP</option>
            <option value="jpeg">Convert to JPEG</option>
            <option value="png">Convert to PNG</option>
          </select>
        </div>

        <div className="space-y-1 flex-1 max-w-[200px]">
          <label className="text-xs font-medium text-foreground/60 flex justify-between">
            <span>Global Quality</span>
            <span className="text-brand-purple">{currentSettings.quality}%</span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={currentSettings.quality}
            onChange={(e) => onGlobalSettingsChange({ ...currentSettings, quality: Number(e.target.value) })}
            className="w-full accent-brand-orange h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>

      <button
        onClick={onCompressAll}
        disabled={isProcessing || fileCount === 0}
        className="px-8 py-3 rounded-xl bg-gradient-to-br from-brand-purple to-brand-orange text-white font-bold shadow-lg shadow-brand-purple/25 hover:shadow-brand-purple/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Compressing...
          </>
        ) : (
          <>
            <Zap className="size-5 fill-white" />
            Compress {fileCount > 0 ? `${fileCount} Images` : 'All'}
          </>
        )}
      </button>

      {completedCount > 0 && completedCount === totalCount && (
        <button
          onClick={onDownloadAll}
          className="px-8 py-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all active:scale-95 flex items-center gap-2"
        >
          <Download className="size-5" />
          Download ZIP ({completedCount})
        </button>
      )}
    </div>
  );
}
