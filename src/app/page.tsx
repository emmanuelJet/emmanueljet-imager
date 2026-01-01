'use client';

import JSZip from 'jszip';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';

import { Header } from '@/components/Header';
import { DropZone } from '@/components/DropZone';
import { OptimizationList } from '@/components/OptimizationList';
import { OptimizationControls } from '@/components/OptimizationControls';
import type { OptimizedFile, OutputFormat } from '@/types';
import { useToast } from '@/hooks/useToast';

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const Home = () => {
  const { toast } = useToast();
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

    const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');

    // Mark as processing
    setFiles(prev => prev.map(file => pendingFiles.find(p => p.id === file.id) ? { ...file, status: 'processing' } : file));

    await Promise.all(pendingFiles.map(async (file) => {
      try {
        const options = {
          maxSizeMB: 100,
          maxWidthOrHeight: undefined,
          useWebWorker: true,
          fileType: file.options.format === 'original' ? undefined : `image/${file.options.format}`,
          initialQuality: file.options.quality / 100, // library uses 0-1
        };

        const compressedFile = await imageCompression(file.file, options);
        const blob = compressedFile; // It returns a Blob/File
        const url = URL.createObjectURL(blob);

        setFiles(prev => prev.map(f => f.id === file.id ? {
          ...f,
          status: 'done',
          optimizedSize: blob.size,
          optimizedUrl: url
        } : f));

      } catch (error) {
        // console.error('Compression error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to compress image';
        toast(`Error: ${errorMessage}`, 'error');
        setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'error', error: errorMessage } : f));
      }
    }));

    setIsProcessing(false);
  };

  const handleCompressSingle = async (id: string) => {
    const fileToCompress = files.find(f => f.id === id);
    if (!fileToCompress) return;

    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'processing' } : f));

    try {
      const options = {
        maxSizeMB: 100,
        maxWidthOrHeight: undefined,
        useWebWorker: true,
        fileType: fileToCompress.options.format === 'original' ? undefined : `image/${fileToCompress.options.format}`,
        initialQuality: fileToCompress.options.quality / 100,
      };

      const compressedFile = await imageCompression(fileToCompress.file, options);
      const blob = compressedFile;
      const url = URL.createObjectURL(blob);

      setFiles(prev => prev.map(f => f.id === id ? {
        ...f,
        status: 'done',
        optimizedSize: blob.size,
        optimizedUrl: url
      } : f));
    } catch (error) {
      // console.error('Compression error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to compress image';
      toast(`Error: ${errorMessage}`, 'error');
      setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'error', error: errorMessage } : f));
    }
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const completedFiles = files.filter(f => f.status === 'done');

    // Add files to zip
    for (const file of completedFiles) {
      if (file.optimizedUrl) {
        const response = await fetch(file.optimizedUrl);
        const blob = await response.blob();
        // Determine extension
        const ext = file.options.format === 'original' ? file.file.name.split('.').pop() : file.options.format;
        const originalName = file.file.name.substring(0, file.file.name.lastIndexOf('.'));
        zip.file(`${originalName}.${ext}`, blob);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);

    // Trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-images.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='min-h-screen bg-background text-foreground pb-32'>
      <Header />

      <main className='container mx-auto px-4 pt-24 max-w-5xl'>
        <div className='text-center mb-12 space-y-4'>
          <h1 className='text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-brand-purple to-brand-orange bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient pb-4'>
            Optimize Images Faster
          </h1>
          <p className='text-xl text-foreground/60 max-w-2xl mx-auto'>
            Reduce file size by up to 90% without losing quality.
            Supports AVIF, WebP, PNG, and JPEG.
          </p>
        </div>

        <DropZone onFilesDropped={handleFilesDropped} />

        <div className='mt-12'>
          <OptimizationList
            files={files}
            onRemove={handleRemove}
            onUpdateOptions={handleUpdateOptions}
            onCompress={handleCompressSingle}
          />
        </div>
      </main>

      {files.length > 1 && (
        <OptimizationControls
          onCompressAll={handleCompressAll}
          isProcessing={isProcessing}
          currentSettings={globalSettings}
          onGlobalSettingsChange={handleGlobalSettingsChange}
          fileCount={files.filter(f => f.status === 'pending').length}
          completedCount={files.filter(f => f.status === 'done').length}
          totalCount={files.length}
          onDownloadAll={handleDownloadAll}
        />
      )}
    </div>
  );
};

export default Home;
