import { DesignTokens, SSEConfig } from '@fylib/core';
import { CryptoConfig } from '@fylib/crypto';
import {
  ButtonClickAnimationName,
  ButtonHoverAnimationName,
  ButtonStateAnimationName,
  InputFocusAnimationName,
  InputStateAnimationName,
  LayoutAnimationName,
  SidebarAnimationName,
  CardAnimationName,
  TableAnimationName,
  ChartAnimationName
} from '@fylib/animation';

export type ThemeName = 
  | 'default'
  | 'finey-workbench-1'
  | 'finey-workbench-2'
  | 'finey-workbench-3'
  | 'windows-xp'
  | 'windows-7'
  | 'christmas'
  | 'finey-nexus-1'
  | 'finey-hub-1'
  | 'finey-puffy-1';


export type IconSet = 'ph' | 'fa' | 'mdi';

export type ComponentSelector =
  | 'fy-button'
  | 'fy-input'
  | 'fy-select'
  | 'fy-layout'
  | 'fy-slot'
  | 'fy-slot:sidebar'
  | 'fy-slot:header'
  | 'fy-card'
  | 'fy-table'
  | 'fy-modal'
  | 'fy-accordion'
  | 'fy-chart'
  | 'fy-toast'
  | 'fy-notification-menu';

export type UIEventKey =
  | 'fy-button.click'
  | 'fy-input.focus'
  | 'fy-select.focus'
  | 'fy-layout.enter'
  | 'fy-slot:sidebar.open'
  | 'fy-slot:sidebar.close'
  | 'fy-card.enter'
  | 'fy-card.submit'
  | 'fy-table.enter'
  | 'fy-table.rowClick'
  | 'fy-chart.enter'
  | 'fy-chart.dataClick'
  | 'fy-toast.open'
  | 'fy-notification-menu.open'
  | 'fy-notification-menu.clearAll';

export type EffectName =
  | 'confetti'
  | 'hearts'
  | 'snow'
  | 'bubbles'
  | 'aurora'
  | 'matrix'
  | 'particles'
  | 'stars'
  | 'window-open'
  | 'sidebar-slide-in'
  | 'sidebar-slide-out'
  | 'window-macos-sheet-open'
  | 'window-macos-sheet-close';

export type WallpaperName =
  | 'auto'
  | 'hearts'
  | 'geometric'
  | 'pine-trees'
  | 'cyber-grid'
  | 'dots'
  | 'grass'
  | 'aero-waves'
  | 'mesh-gradient';

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export interface ButtonEventsMap {
  hover?: ButtonHoverAnimationName;
  click?: ButtonClickAnimationName;
  success?: ButtonStateAnimationName;
  error?: ButtonStateAnimationName;
}

export interface InputEventsMap {
  focus?: InputFocusAnimationName;
  success?: InputStateAnimationName;
  error?: InputStateAnimationName;
}

export interface LayoutEventsMap {
  enter?: LayoutAnimationName;
}

export interface SidebarEventsMap {
  open?: SidebarAnimationName;
  close?: SidebarAnimationName;
}

export interface CardEventsMap {
  enter?: CardAnimationName;
}

export interface TableEventsMap {
  enter?: TableAnimationName;
  rowEnter?: TableAnimationName;
}

export interface SelectEventsMap {
  focus?: InputFocusAnimationName;
  success?: InputStateAnimationName;
  error?: InputStateAnimationName;
}

export interface ChartEventsMap {
  enter?: ChartAnimationName;
  update?: ChartAnimationName;
}

export type ComponentAnimationsOverrides =
  {
    'fy-button'?: Partial<ButtonEventsMap>;
    'fy-input'?: Partial<InputEventsMap>;
    'fy-select'?: Partial<SelectEventsMap>;
    'fy-layout'?: Partial<LayoutEventsMap>;
    'fy-slot:sidebar'?: Partial<SidebarEventsMap>;
    'fy-slot:header'?: Partial<SidebarEventsMap>;
    'fy-card'?: Partial<CardEventsMap>;
    'fy-table'?: Partial<TableEventsMap>;
    'fy-chart'?: Partial<ChartEventsMap>;
  } & {
    [selector: string]: { [event: string]: string | undefined } | undefined;
  };

export interface HttpConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
  cryptoEnabled?: boolean;
  autoNotify?: boolean;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggingConfig {
  enabled: boolean; // Interruptor global mestre
  level: LogLevel;   // Nível mínimo (debug, info, warn, error)
  console?: {
    enabled: boolean;
  };
  localFiles?: {
    enabled: boolean; // Salvamento local em arquivo via path
    path: string;
    filenamePattern?: string;
  };
  remote?: {
    enabled: boolean; // Envio para telemetria externa
    endpoint: string;
  };
}

export interface ThemeConfig {
  theme: ThemeName;
  animationsEnabled: boolean;
  themeEffectsEnabled?: boolean;
  wallpaperEnabled?: boolean;
  disableAnimationsForComponents?: ComponentSelector[];
  tokenOverrides?: DeepPartial<DesignTokens>;
  componentAnimationsOverrides?: ComponentAnimationsOverrides;
  effectsEnabled?: boolean;
  disableEffectsForComponents?: ComponentSelector[];
  effectTriggers?: Partial<Record<UIEventKey, EffectName>>;
}

export interface AppConfig {
  theme?: ThemeConfig;
  sse?: SSEConfig;
  crypto?: CryptoConfig;
  http?: HttpConfig;
  logging?: Partial<LoggingConfig>;
}

export const defaultThemeConfig: ThemeConfig = {
  theme: 'default',
  animationsEnabled: true,
  effectsEnabled: true,
  themeEffectsEnabled: false,
  wallpaperEnabled: false
};

export const defaultConfig: AppConfig = {
  theme: defaultThemeConfig,
  logging: {
    enabled: false,
    level: 'info',
    console: {
      enabled: false
    },
    localFiles: {
      enabled: false,
      path: 'fylogs'
    },
    remote: {
      enabled: false,
      endpoint: 'https://logs.example.com'
    }
  }
};

