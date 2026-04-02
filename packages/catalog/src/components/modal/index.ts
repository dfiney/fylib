import { UIComponentDefinition } from '@fylib/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ModalPosition = 'center' | 'top' | 'bottom';

export type ModalStatus = 'default' | 'success' | 'error' | 'warning';

export interface ModalProps {
  visible?: boolean;

  title?: string;
  subtitle?: string;

  content?: string;

  size?: ModalSize;
  position?: ModalPosition;

  status?: ModalStatus;

  closable?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;

  showHeader?: boolean;
  showFooter?: boolean;

  showConfirmButton?: boolean;
  showCancelButton?: boolean;

  confirmText?: string;
  cancelText?: string;

  loading?: boolean;

  centered?: boolean;
  blockScroll?: boolean;

  draggable?: boolean;
  resizable?: boolean;

  icon?: string;

  onOpen?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ModalDefinition: UIComponentDefinition<ModalProps> = {
  name: 'modal',
  version: '1.0.0',

  defaultProps: {
    visible: false,
    size: 'md',
    position: 'center',
    status: 'default',
    closable: true,
    closeOnEscape: true,
    closeOnBackdrop: true,
    showHeader: true,
    showFooter: false,
    showConfirmButton: false,
    showCancelButton: false,
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    loading: false,
    centered: true,
    blockScroll: true,
    draggable: false,
    resizable: false
  },

  variants: ['default', 'success', 'error', 'warning'],

  features: {
    requiresLicenseFeature: 'basic-components',
    animations: {
      open: 'modal-fade-in',
      close: 'modal-fade-out',
      error: 'modal-error-shake',
      success: 'modal-success-pulse'
    }
  }
};