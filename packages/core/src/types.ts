/**
 * Core types for fyLib
 */

export interface UIComponentDefinition<P = any> {
  name: string;
  version: string;
  defaultProps?: Partial<P>;
  variants?: string[];
  features?: {
    requiresLicenseFeature?: string;
    [key: string]: any;
  };
}

export type TokenPrimitive = string | number;
export interface TokenTree {
  [key: string]: TokenPrimitive | TokenTree | undefined;
}

export interface DesignTokens extends TokenTree {
  colors?: ColorsTokens;
  spacing?: SpacingTokens;
  borderRadius?: BorderRadiusTokens;
  typography?: TypographyTokens;
  layout?: LayoutTokens;
  effects?: EffectsTokens;
  icons?: IconsTokens;
}

export interface ThemeComponentAnimations {
  [componentSelector: string]: {
    [event: string]: string;
  };
}

export interface ThemeDefinition {
  name: string;
  tokens: DesignTokens;
  darkTokens?: DesignTokens;
  componentAnimations?: ThemeComponentAnimations;
}

export interface ColorsTokens extends TokenTree {
  primary?: TokenPrimitive;
  secondary?: TokenPrimitive;
  success?: TokenPrimitive;
  danger?: TokenPrimitive;
  warning?: TokenPrimitive;
  info?: TokenPrimitive;
  white?: TokenPrimitive;
  black?: TokenPrimitive;
  background?: TokenPrimitive;
  text?: TokenPrimitive;
  ['primary-rgb']?: TokenPrimitive;
  surface?: TokenPrimitive;
}

export interface SpacingTokens extends TokenTree {
  xs?: TokenPrimitive;
  sm?: TokenPrimitive;
  md?: TokenPrimitive;
  lg?: TokenPrimitive;
  xl?: TokenPrimitive;
}

export interface BorderRadiusTokens extends TokenTree {
  sm?: TokenPrimitive;
  md?: TokenPrimitive;
  lg?: TokenPrimitive;
  full?: TokenPrimitive;
}

export interface TypographyTokens extends TokenTree {
  fontFamily?: {
    base?: TokenPrimitive;
    heading?: TokenPrimitive;
    mono?: TokenPrimitive;
  };
  fontSize?: {
    sm?: TokenPrimitive;
    md?: TokenPrimitive;
    lg?: TokenPrimitive;
  };
  fontWeight?: {
    normal?: TokenPrimitive;
    bold?: TokenPrimitive;
  };
}

export interface LayoutToggleTokens extends TokenTree {
  background?: TokenPrimitive;
  textColor?: TokenPrimitive;
  borderRadius?: TokenPrimitive;
  borderWidth?: TokenPrimitive;
  borderColor?: TokenPrimitive;
  icon?: TokenPrimitive;
  mode?: 'floating' | 'tongue';
  tonguePosition?: 'top' | 'middle' | 'bottom';
}

export interface LayoutTokens extends TokenTree {
  app?: { gap?: TokenPrimitive };
  header?: {
    height?: TokenPrimitive;
    padding?: TokenPrimitive;
    shadow?: TokenPrimitive;
    toggle?: LayoutToggleTokens;
    logoFilterDarkOpacity?: string;
  };
  sidebar?: {
    width?: TokenPrimitive;
    padding?: TokenPrimitive;
    toggle?: LayoutToggleTokens;
    logoFilterDarkOpacity?: string;
  };
  content?: { padding?: TokenPrimitive };
}

export interface ButtonEffectsTokens extends TokenTree {
  background?: TokenPrimitive;
  borderColor?: TokenPrimitive;
  shadow?: TokenPrimitive;
  textColor?: TokenPrimitive;
}

export interface WindowEffectsTokens extends TokenTree {
  background?: TokenPrimitive;
  shadow?: TokenPrimitive;
}

export interface InputEffectsIconsTokens extends TokenTree {
  mode?: 'inside' | 'inside-static' | 'outside';
  name?: TokenPrimitive;
  position?: 'left' | 'right';
  outsideGap?: TokenPrimitive;
  color?: TokenPrimitive;
}

export interface InputEffectsTokens extends TokenTree {
  background?: TokenPrimitive;
  borderColor?: TokenPrimitive;
  shadow?: TokenPrimitive;
  placeholderColor?: TokenPrimitive;
  borderWidth?: TokenPrimitive;
  borderRadius?: TokenPrimitive;
  icons?: InputEffectsIconsTokens;
}

export interface CardEffectsTokens extends TokenTree {
  background?: TokenPrimitive;
  borderColor?: TokenPrimitive;
  shadow?: TokenPrimitive;
  dividerColor?: TokenPrimitive;
  icons?: {
    header?: TokenPrimitive;
    footer?: TokenPrimitive;
  };
}

export interface EffectsTokens extends TokenTree {
  button?: ButtonEffectsTokens;
  window?: WindowEffectsTokens;
  input?: InputEffectsTokens;
  card?: CardEffectsTokens;
  [key: string]: any;
}

export interface IconsTokens extends TokenTree {
  defaultSet?: 'ph' | 'fa' | 'mdi' | string;
  color?: TokenPrimitive;
  size?: {
    sm?: TokenPrimitive;
    md?: TokenPrimitive;
    lg?: TokenPrimitive;
  };
  strokeWidth?: TokenPrimitive | string;
  variant?: string;
}

export interface AnimationDefinition {
  name: string;
  duration?: number;
  easing?: string;
  keyframes?: any;
}

export interface EffectDefinition {
  name: string;
  type: 'global' | 'local';
  params?: Record<string, any>;
}

// Layout Interfaces
export interface UILayoutDefinition {
  name: string;
  version: string;
  slots: LayoutSlot[];
  responsive?: ResponsiveRules;
  features?: {
    requiresLicenseFeature?: string;
  };
}

export interface LayoutSlot {
  name: string;
  allowedComponents?: string[];
  required?: boolean;
}

export interface ResponsiveRules {
  breakpoints?: Record<string, string | number>;
  rules?: any;
}
