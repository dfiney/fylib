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

export type TokenPrimitive = string | number | boolean;
export interface TokenTree {
  [key: string]: any;
}

export interface DesignTokens extends TokenTree {
  colors?: ColorsTokens;
  spacing?: SpacingTokens;
  borderRadius?: BorderRadiusTokens;
  typography?: TypographyTokens;
  layout?: LayoutTokens;
  effects?: EffectsTokens;
  icons?: IconsTokens;
  scrollbar?: ScrollbarTokens;
}

export interface ScrollbarTokens extends TokenTree {
  width?: TokenPrimitive;
  trackBackground?: TokenPrimitive;
  trackImage?: TokenPrimitive;
  thumbBackground?: TokenPrimitive;
  thumbHoverBackground?: TokenPrimitive;
  thumbBorderRadius?: TokenPrimitive;
  thumbBorderWidth?: TokenPrimitive;
  thumbBorderColor?: TokenPrimitive;
  thumbBoxShadow?: TokenPrimitive;
  thumbGripImage?: TokenPrimitive;
  thumbGripImageHorizontal?: TokenPrimitive;
  buttonsVisible?: boolean;
  buttonBackground?: TokenPrimitive;
  buttonHoverBackground?: TokenPrimitive;
  buttonActiveBackground?: TokenPrimitive;
  buttonColor?: TokenPrimitive;
  buttonBorderRadius?: TokenPrimitive;
  buttonUpImage?: TokenPrimitive;
  buttonUpHoverImage?: TokenPrimitive;
  buttonUpActiveImage?: TokenPrimitive;
  buttonDownImage?: TokenPrimitive;
  buttonDownHoverImage?: TokenPrimitive;
  buttonDownActiveImage?: TokenPrimitive;
}

export interface SSEServices {
  notification: {
    show: (options: any) => void;
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
  };
  menu: {
    addNotification: (notification: any) => void;
    clearNotifications: () => void;
  };
}

export interface SSEConfig {
  enabled: boolean;
  endpoint: string;
  withCredentials?: boolean;
  heartbeatTimeout?: number;
  reconnectDelay?: number;
  events?: {
    [eventName: string]: (data: any, services: SSEServices) => void;
  };
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
  backgroundEffect?: {
    name: string;
    intensity?: number;
    speed?: number;
    loop?: boolean;
  };
  wallpaper?: WallpaperDefinition;
}

export interface WallpaperDefinition {
  name: string;
  type: 'image' | 'pattern' | 'gradient';
  params?: Record<string, any>;
  opacity?: number;
  overlay?: boolean;
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
    background?: TokenPrimitive;
    shadow?: TokenPrimitive;
    toggle?: LayoutToggleTokens;
    logoFilterDarkOpacity?: string;
  };
  sidebar?: {
    width?: TokenPrimitive;
    padding?: TokenPrimitive;
    background?: TokenPrimitive;
    shadow?: TokenPrimitive;
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

export interface SelectEffectsIconsTokens extends TokenTree {
  mode?: 'inside' | 'inside-static' | 'outside';
  name?: TokenPrimitive;
  position?: 'left' | 'right';
  outsideGap?: TokenPrimitive;
  color?: TokenPrimitive;
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

export interface ChartEffectsTokens {
  background?: TokenPrimitive;
  borderColor?: TokenPrimitive;
  shadow?: TokenPrimitive;
  gridColor?: TokenPrimitive;
  labelColor?: TokenPrimitive;
  colors?: TokenPrimitive[];
  fontFamily?: TokenPrimitive;
}

export interface EffectsTokens extends TokenTree {
  button?: ButtonEffectsTokens;
  window?: WindowEffectsTokens;
  input?: InputEffectsTokens;
  card?: CardEffectsTokens;
  chart?: ChartEffectsTokens;
  toast?: ToastTokens;
  notificationMenu?: NotificationMenuTokens;
  [key: string]: any;
}

export interface ToastTokens {
  background: string;
  borderColor: string;
  textColor: string;
  shadow: string;
  borderRadius: string;
  padding?: string;
  minWidth?: string;
  maxWidth?: string;
  gap?: string;
  titleFontSize?: string;
  titleFontWeight?: string;
  messageFontSize?: string;
  messageLineHeight?: string;
  closeIcon?: string;
  closeButtonSize?: string;
  closeButtonOpacity?: string;
  closeButtonHoverOpacity?: string;
  closeButtonBackground?: string;
  closeButtonBorder?: string;
  closeButtonBorderRadius?: string;
  iconSize?: string;
  iconColor?: {
    info?: string;
    success?: string;
    warning?: string;
    error?: string;
  };
  icons?: {
    info?: string;
    success?: string;
    warning?: string;
    error?: string;
  };
}

export interface NotificationMenuTokens {
  button?: {
    background: string;
    textColor: string;
    icon: string;
    badgeBackground: string;
    badgeTextColor: string;
  };
  dropdown?: {
    background: string;
    borderColor: string;
    shadow: string;
    width: string;
    maxHeight: string;
    borderRadius: string;
  };
  item?: {
    background: string;
    hoverBackground: string;
    textColor: string;
    descriptionColor: string;
    dividerColor: string;
    unreadIndicator: string;
  };
  config?: {
    showAll: boolean;
    limit: number;
    allowClear: boolean;
    accordionMode: boolean;
    showViewAll: boolean;
    viewAllPosition: 'header-left' | 'header-right' | 'footer-left' | 'footer-right';
    markAllAsReadOnOpen?: boolean;
    markAsReadOnClick?: boolean;
    readApiEndpoint?: string;
    readApiMethod?: 'POST' | 'PUT' | 'PATCH';
    readApiHeaders?: Record<string, string>;
  };
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
