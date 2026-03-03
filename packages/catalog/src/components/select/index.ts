import { UIComponentDefinition } from '@fylib/core';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  disabled?: boolean;
  readonly?: boolean;
  searchable?: boolean;
  showCheckbox?: boolean;
  closeOnSelect?: boolean;
  loading?: boolean;
  clearable?: boolean;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'default' | 'success' | 'error';
  iconLeft?: string;
  iconRight?: string;
  onChange?: (value: string | string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export const SelectDefinition: UIComponentDefinition<SelectProps> = {
  name: 'select',
  version: '1.0.0',

  defaultProps: {
    disabled: false,
    readonly: false,
    size: 'md',
    status: 'default',
  },

  variants: ['default', 'success', 'error'],

  features: {
    requiresLicenseFeature: 'basic-components',
    animations: {
      focus: 'input-focus-glow',
      error: 'input-error-shake',
      success: 'input-success-pulse',
    },
  },
};
