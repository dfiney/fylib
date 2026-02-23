import { UIComponentDefinition } from '@fylib/core';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search';

export interface InputProps {
  value?: string;
  placeholder?: string;
  type?: InputType;
  disabled?: boolean;
  readonly?: boolean;
  mask?: string;
  showPasswordToggle?: boolean;
  iconLeft?: string;
  iconRight?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'default' | 'success' | 'error';
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const InputDefinition: UIComponentDefinition<InputProps> = {
  name: 'input',
  version: '1.0.0',
  defaultProps: {
    type: 'text',
    disabled: false,
    readonly: false,
    showPasswordToggle: false,
    size: 'md',
    status: 'default'
  },
  variants: ['default', 'success', 'error'],
  features: {
    requiresLicenseFeature: 'basic-components',
    animations: {
      focus: 'input-focus-glow',
      error: 'input-error-shake',
      success: 'input-success-pulse'
    }
  }
};
