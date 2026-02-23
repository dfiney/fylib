import { UIComponentDefinition } from '@fylib/core';

export interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  onClick?: () => void;
}

export const ButtonDefinition: UIComponentDefinition<ButtonProps> = {
  name: 'button',
  version: '1.0.0',
  defaultProps: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false
  },
  variants: ['primary', 'secondary', 'ghost', 'danger'],
  features: {
    requiresLicenseFeature: 'basic-components',
    animations: {
      hover: 'button-hover-soft',
      click: 'button-click-press'
    },
    effects: {
      onSuccess: 'confetti'
    }
  }
};
