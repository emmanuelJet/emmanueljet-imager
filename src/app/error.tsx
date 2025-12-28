'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { RefreshCw } from '@/components/ui/Icons';
import { useToast } from '@/hooks/useToast';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
    toast(error.message || 'Something went wrong', 'error');
  }, [error, toast]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden'>
      {/* Background blobs */}
      <div className='absolute top-1/4 -right-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-[100px] -z-10 mix-blend-screen animate-float' />
      <div className='absolute bottom-1/4 -left-20 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px] -z-10 mix-blend-screen animate-float' style={{ animationDelay: '-3s' }} />

      <div className='glass-panel p-8 md:p-12 rounded-2xl max-w-md w-full text-center flex flex-col items-center gap-6 border border-white/10'>
        <div className='size-16 rounded-2xl bg-red-500/10 flex items-center justify-center shadow-lg shadow-red-500/20 border border-red-500/20'>
          {/* Using a simple error icon or brand logo with alert state */}
          <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='text-red-500'><path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' /><path d='M12 9v4' /><path d='M12 17h.01' /></svg>
        </div>

        <div className='space-y-2'>
          <h1 className='text-3xl font-bold'>Something went wrong!</h1>
          <p className='text-muted-foreground text-sm md:text-base'>
            We encountered an unexpected error. Our team has been notified.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 w-full'>
          <button
            onClick={() => reset()}
            className='flex-1 inline-flex h-10 items-center justify-center rounded-md border border-white/10 bg-white/5 px-4 text-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-background'
          >
            <RefreshCw className='mr-2 size-4' />
            Try Again
          </button>

          <Link
            href='/'
            className='flex-1 inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-brand-purple to-brand-orange px-4 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-background'
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Error;
