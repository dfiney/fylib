import { UIComponentDefinition } from '@fylib/core';

export interface CardProps {
  title?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  mode?: 'default' | 'form';
  mutedHeader?: boolean;
  mutedFooter?: boolean;
  footerText?: string;
  scrollContent?: boolean;
  activeAnimations?: boolean | null;
  activeEffects?: boolean | null;
  customStyles?: Record<string, string> | null;
}

export const CardDefinition: UIComponentDefinition<CardProps> = {
  name: 'card',
  version: '1.0.0',
  defaultProps: {
    variant: 'default',
    mode: 'default',
    mutedHeader: true,
    mutedFooter: true,
    scrollContent: false,
    activeAnimations: null,
    activeEffects: null,
    customStyles: null
  },
  variants: ['default', 'elevated', 'outlined'],
  features: {
    animations: {
      enter: 'card-fade-in'
    },
    effects: {
      onSubmit: 'confetti'
    }
  }
};

