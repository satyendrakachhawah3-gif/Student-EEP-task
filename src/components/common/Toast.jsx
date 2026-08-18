import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200',
    error: 'border-rose-500/30 bg-rose-950/80 text-rose-200',
    info: 'border-blue-500/30 bg-blue-950/80 text-blue-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl animate-bounce-short transition-all">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${borders[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <span className="text-sm font-medium">{toast.message}</span>
        {onClose && (
          <button onClick={onClose} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
