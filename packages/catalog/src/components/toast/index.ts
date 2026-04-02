import { UIComponentDefinition } from '@fylib/core';

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps {
  id?: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  showIcon?: boolean;
  closable?: boolean;
  position?: ToastPosition;
  
  // UI Level control
  activeAnimations?: boolean | null;
  activeEffects?: boolean | null;
  customStyles?: Record<string, string> | null;
}

export const ToastDefinition: UIComponentDefinition<ToastProps> = {
  name: 'toast',
  version: '1.0.0',
  defaultProps: {
    type: 'info',
    duration: 3000,
    showIcon: true,
    closable: true,
    position: 'top-right',
    activeAnimations: null,
    activeEffects: null
  },
  features: {
    animations: {
      enter: 'toast-slide-in',
      leave: 'toast-slide-out'
    }
  }
};
