"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { DropZone } from "@/components/DropZone";
import { OptimizationList } from "@/components/OptimizationList";
import { OptimizationControls } from "@/components/OptimizationControls";
import { OptimizedFile, OutputFormat } from "@/types";
import { v4 as uuidv4 } from "uuid"; // Need to install uuid or use simple random string

// Simple ID generator if uuid not installed, but better to install uuid
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export default function Home() {
  const [files, setFiles] = useState<OptimizedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<{ format: OutputFormat | 'original', quality: number }>({
    format: 'original',
    quality: 80
  });

  const handleFilesDropped = (newFiles: File[]) => {
    const optimizedFiles: OptimizedFile[] = newFiles.map(file => ({
      id: generateId(),
      file,
      preview: URL.createObjectURL(file), // Note: Should revoke URL later
      status: 'pending',
      originalSize: file.size,
      options: { ...globalSettings }
    }));

    setFiles(prev => [...prev, ...optimizedFiles]);
  };

  const handleRemove = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUpdateOptions = (id: string, options: Partial<OptimizedFile['options']>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, options: { ...f.options, ...options } } : f));
  };

  const handleGlobalSettingsChange = (settings: typeof globalSettings) => {
    setGlobalSettings(settings);
    // Optionally update all PENDING files to match new global settings?
    // User expectation: Global settings apply to future files OR pending files. 
    // Let's update pending files for convenience.
    setFiles(prev => prev.map(f => f.status === 'pending' ? { ...f, options: { ...f.options, ...settings } } : f));
  };

  const handleCompressAll = async () => {
    setIsProcessing(true);

    // Process sequentially or concurrent? Concurrent is faster.
    const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');

    // Mark as processing
    setFiles(prev => prev.map(file => pendingFiles.find(p => p.id === file.id) ? { ...file, status: 'processing' } : file));

    await Promise.all(pendingFiles.map(async (file) => {
      try {
        const formData = new FormData();
        formData.append('file', file.file);
        formData.append('options', JSON.stringify(file.options));

        const res = await fetch('/api/optimize', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('Failed');

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        setFiles(prev => prev.map(f => f.id === file.id ? {
          ...f,
          status: 'done',
          optimizedSize: blob.size,
          optimizedUrl: url
        } : f));

      } catch (error) {
        setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'error', error: 'Failed' } : f));
      }
    }));

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      <Header />

      <main className="container mx-auto px-4 pt-24 max-w-5xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-brand-purple to-brand-orange bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient pb-4">
            Optimize Images Faster
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Reduce file size by up to 90% without losing quality.
            Supports AVIF, WebP, PNG, and JPEG.
          </p>
        </div>

        <DropZone onFilesDropped={handleFilesDropped} />

        <div className="mt-12">
          <OptimizationList
            files={files}
            onRemove={handleRemove}
            onUpdateOptions={handleUpdateOptions}
          />
        </div>
      </main>

      {files.length > 0 && (
        <OptimizationControls
          onCompressAll={handleCompressAll}
          isProcessing={isProcessing}
          currentSettings={globalSettings}
          onGlobalSettingsChange={handleGlobalSettingsChange}
          fileCount={files.filter(f => f.status === 'pending').length}
        />
      )}
    </div>
  );
}
