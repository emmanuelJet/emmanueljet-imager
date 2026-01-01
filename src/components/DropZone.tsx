'use client';

import { useState, useCallback } from 'react';

import { Upload } from '@/components/ui/Icons';
import { cn } from '@/utilities';

interface DropZoneProps {
  onFilesDropped: (files: File[]) => void;
}

export const DropZone = ({ onFilesDropped }: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();

    // Check if any of the dragged items are images
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const hasImage = Array.from(e.dataTransfer.items).some(item =>
        item.kind === 'file' && item.type.startsWith('image/')
      );

      if (hasImage) {
        setIsDragging(true);
      }
    } else {
      // Fallback for browsers that don't expose items during dragover
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  /* Helper to check if file is supported */
  const isFileSupported = (file: File) => {
    // strict check for image mime type
    if (file.type.startsWith('image/')) return true;

    // Fallback for some OS/Browser combos that might yield empty type
    const validExtensions = /\.(png|jpe?g|webp|avif|gif|bmp|tiff?|ico|svg|heic|heif)$/i;
    return validExtensions.test(file.name);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(isFileSupported);

    if (files.length > 0) {
      onFilesDropped(files);
    }
  }, [onFilesDropped]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(isFileSupported);
      if (files.length > 0) {
        onFilesDropped(files);
      }
    }
  }, [onFilesDropped]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative group cursor-pointer transition-all duration-300 ease-out',
        'h-64 rounded-3xl border-2 border-dashed',
        'border-brand-purple bg-brand-purple/5 dark:border-white/10 dark:bg-white/5',
        'flex flex-col items-center justify-center gap-4',
        'hover:border-brand-purple/50 hover:bg-brand-purple/5',
        isDragging && 'border-brand-purple bg-brand-purple/10 scale-[1.02]'
      )}
    >
      <input
        type='file'
        multiple
        accept='image/*'
        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50'
        onChange={handleFileInput}
      />

      <div className={cn(
        'p-4 rounded-full bg-brand-surface border border-brand-purple/10 dark:border-white/10 transition-transform duration-300',
        'group-hover:scale-110',
        isDragging && 'scale-125'
      )}>
        <Upload className='size-8 text-brand-purple' />
      </div>

      <div className='text-center space-y-1'>
        <p className='text-lg font-semibold text-foreground'>
          Drag & Drop images here
        </p>
        <p className='text-sm text-foreground/50'>
          or click to select files (Supports all image formats)
        </p>
      </div>

      <div className='absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-brand-purple/20 rounded-3xl' />
    </div>
  );
}
