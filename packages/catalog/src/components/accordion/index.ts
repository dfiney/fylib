import { UIComponentDefinition } from '@fylib/core';

export type AccordionExpandMode = 'single' | 'multiple';

export type AccordionSize = 'sm' | 'md' | 'lg';

export type AccordionStatus = 'default' | 'success' | 'error';

export interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  disabled?: boolean;
  icon?: string;
}

export interface AccordionProps {
  items?: AccordionItem[];

  activeIndex?: number | number[]; // single ou multiple
  expandMode?: AccordionExpandMode;

  size?: AccordionSize;
  status?: AccordionStatus;

  bordered?: boolean;
  flush?: boolean; // estilo sem borda externa
  animated?: boolean;
  lazy?: boolean; // renderiza conteúdo só quando abre

  iconPosition?: 'left' | 'right';

  disabled?: boolean;

  onOpen?: (index: number) => void;
  onClose?: (index: number) => void;
  onChange?: (activeIndex: number | number[]) => void;
}

export const AccordionDefinition: UIComponentDefinition<AccordionProps> = {
  name: 'accordion',
  version: '1.0.0',

  defaultProps: {
    items: [],
    expandMode: 'single',
    size: 'md',
    status: 'default',
    bordered: true,
    flush: false,
    animated: true,
    lazy: false,
    iconPosition: 'right',
    disabled: false
  },

  variants: ['default', 'success', 'error'],

  features: {
    requiresLicenseFeature: 'basic-components',
    animations: {
      expand: 'accordion-expand',
      collapse: 'accordion-collapse',
      error: 'accordion-error-shake',
      success: 'accordion-success-pulse'
    }
  }
};