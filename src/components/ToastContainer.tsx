import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { ToastNotification, ToastType } from '../types';

interface ToastContainerProps {
  toasts: ToastNotification[];
  onRemoveToast: (id: string) => void;
}

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} className="text-green-600" />,
  error: <XCircle size={18} className="text-red-600" />,
  warning: <AlertTriangle size={18} className="text-amber-600" />,
  info: <Info size={18} className="text-blue-600" />,
};

const bgColorMap: Record<ToastType, string> = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-amber-50 border-amber-200',
  info: 'bg-blue-50 border-blue-200',
};

export default function ToastContainer({
  toasts,
  onRemoveToast,
}: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-[72px] left-4 right-4 max-w-lg mx-auto z-50 space-y-2 pointer-events-none">
      <div className="pointer-events-auto space-y-2">
        {toasts.map((toast) => (
          <ToastItemInner
            toast={toast}
            onRemove={onRemoveToast}
          />
        ))}
      </div>
    </div>
  );
}

function ToastItemInner({
  toast,
  onRemove,
}: {
  toast: ToastNotification;
  onRemove: (id: string) => void;
}) {
  const { id, type, message, duration } = toast;

  useEffect(() => {
    const timerDuration = duration ?? 4000;
    if (timerDuration > 0) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, timerDuration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onRemove]);

  return (
    <div
      className={`flex items-center space-x-3 p-3.5 rounded-xl border shadow-lg animate-slide-up ${bgColorMap[type]}`}
      role="alert"
      aria-live="polite"
    >
      <div className="shrink-0">{iconMap[type]}</div>
      <p className="text-xs font-semibold text-brand-charcoal flex-1">{message}</p>
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors shrink-0 rounded-full hover:bg-white/50"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
