export type OutputFormat = 'avif' | 'webp' | 'png' | 'jpeg';

export interface OptimizationOptions {
  quality: number;
  format: OutputFormat | 'original';
  width?: number;
  height?: number;
}

export interface OptimizedFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  originalSize: number;
  optimizedSize?: number;
  optimizedUrl?: string;
  error?: string;
  options: OptimizationOptions;
}
