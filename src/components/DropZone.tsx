"use client";

import { Upload, ImageIcon, FileImage } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFilesDropped: (files: File[]) => void;
}

export function DropZone({ onFilesDropped }: DropZoneProps) {
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
    // Accept any file that the browser identifies as an image
    // or has a common image extension if the type is missing/generic
    if (file.type.startsWith('image/')) return true;

    const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.bmp', '.tiff', '.ico', '.svg'];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    return validExtensions.includes(extension) || /\.(png|jpe?g|webp|avif|gif|bmp|tiff?|ico|svg)$/i.test(file.name);
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
        "relative group cursor-pointer transition-all duration-300 ease-out",
        "h-64 rounded-3xl border-2 border-dashed border-white/10 bg-white/5",
        "flex flex-col items-center justify-center gap-4",
        "hover:border-brand-blue/50 hover:bg-brand-blue/5",
        isDragging && "border-brand-blue bg-brand-blue/10 scale-[1.02]"
      )}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileInput}
      />

      <div className={cn(
        "p-4 rounded-full bg-brand-surface border border-white/10 transition-transform duration-300",
        "group-hover:scale-110",
        isDragging && "scale-125"
      )}>
        <Upload className="size-8 text-brand-blue" />
      </div>

      <div className="text-center space-y-1">
        <p className="text-lg font-semibold text-foreground">
          Drag & Drop images here
        </p>
        <p className="text-sm text-foreground/50">
          or click to select files (Supports all image formats)
        </p>
      </div>

      <div className="absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-brand-blue/20 rounded-3xl" />
    </div>
  );
}
