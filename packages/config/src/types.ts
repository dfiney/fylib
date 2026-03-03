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
  | 'finey-nexus-1';


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
  | 'window-open'
  | 'sidebar-slide-in'
  | 'sidebar-slide-out'
  | 'window-macos-sheet-open'
  | 'window-macos-sheet-close';

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

export interface AppConfig {
  theme: ThemeName;
  animationsEnabled: boolean;
  disableAnimationsForComponents?: ComponentSelector[];
  tokenOverrides?: DeepPartial<DesignTokens>;
  componentAnimationsOverrides?: ComponentAnimationsOverrides;
  sse?: SSEConfig;
  crypto?: CryptoConfig;
  http?: HttpConfig;
  effectsEnabled?: boolean;
  disableEffectsForComponents?: ComponentSelector[];
  effectTriggers?: Partial<Record<UIEventKey, EffectName>>;
}

export const defaultConfig: AppConfig = {
  theme: 'default',
  animationsEnabled: true,
  effectsEnabled: true
};
