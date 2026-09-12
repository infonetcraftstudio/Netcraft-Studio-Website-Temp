import React from 'react';
import { useStudio } from '../context/StudioContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast, closeToast } = useStudio();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle size={18} color="#ef4444" />;
      case 'info':
        return <Info size={18} color="#3b82f6" />;
      default:
        return <CheckCircle2 size={18} color="#2dd4bf" />;
    }
  };

  return (
    <div className="toast-container" role="alert" aria-live="assertive">
      <div className={`toast toast-${toast.type || 'success'}`}>
        {getIcon()}
        <span>{toast.message}</span>
        <button
          onClick={closeToast}
          style={{ color: 'rgba(255,255,255,0.6)', marginLeft: '12px' }}
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
