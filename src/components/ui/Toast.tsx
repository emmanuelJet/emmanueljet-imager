'use client';



import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from '@/components/ui/Icons';
import { cn } from '@/utilities';

// Toast types needed for props
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export const ToastContainer = ({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) => {
  return (
    <div className='fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none p-4 max-w-sm w-full'>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}



const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
  const icons = {
    success: <CheckCircle className='size-5 text-green-400' />,
    error: <AlertCircle className='size-5 text-red-400' />,
    warning: <AlertTriangle className='size-5 text-brand-orange' />,
    info: <Info className='size-5 text-blue-400' />,
  };

  const bgColors = {
    success: 'bg-green-500/10 border-green-500/20',
    error: 'bg-red-500/10 border-red-500/20',
    warning: 'bg-orange-500/10 border-orange-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
  };

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg transition-all animate-in slide-in-from-right-full fade-in duration-300',
        bgColors[toast.type],
        'glass-panel' // Use existing glass utility if available, or just fallback
      )}
    >
      <div className='mt-0.5 shrink-0'>{icons[toast.type]}</div>
      <p className='text-sm font-medium text-foreground/90 flex-1'>{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className='shrink-0 p-1 rounded-full hover:bg-white/10 text-foreground/50 hover:text-foreground transition-colors'
      >
        <X className='size-4' />
      </button>
    </div>
  );
}
