import { DesignTokens } from '@fylib/core';
import {
  ButtonClickAnimationName,
  ButtonHoverAnimationName,
  ButtonStateAnimationName,
  InputFocusAnimationName,
  InputStateAnimationName,
  LayoutAnimationName,
  SidebarAnimationName,
  CardAnimationName
} from '@fylib/animation';

export type ThemeName = 
  | 'default'
  | 'finey-workbench-1'
  | 'windows-xp'
  | 'windows-7'
  | 'christmas'
  | 'finey-nexus-1';


export type ComponentSelector =
  | 'fy-button'
  | 'fy-input'
  | 'fy-layout'
  | 'fy-slot'
  | 'fy-slot:sidebar'
  | 'fy-slot:header'
  | 'fy-card';

export type UIEventKey =
  | 'fy-button.click'
  | 'fy-input.focus'
  | 'fy-layout.enter'
  | 'fy-slot:sidebar.open'
  | 'fy-slot:sidebar.close'
  | 'fy-card.enter'
  | 'fy-card.submit';

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

export type ComponentAnimationsOverrides =
  {
    'fy-button'?: Partial<ButtonEventsMap>;
    'fy-input'?: Partial<InputEventsMap>;
    'fy-layout'?: Partial<LayoutEventsMap>;
    'fy-slot:sidebar'?: Partial<SidebarEventsMap>;
    'fy-card'?: Partial<CardEventsMap>;
  } & {
    [selector: string]: { [event: string]: string | undefined } | undefined;
  };

export interface AppConfig {
  theme: ThemeName;
  animationsEnabled: boolean;
  disableAnimationsForComponents?: ComponentSelector[];
  tokenOverrides?: DeepPartial<DesignTokens>;
  componentAnimationsOverrides?: ComponentAnimationsOverrides;
  effectsEnabled?: boolean;
  disableEffectsForComponents?: ComponentSelector[];
  effectTriggers?: Partial<Record<UIEventKey, EffectName>>;
}

export const defaultConfig: AppConfig = {
  theme: 'default',
  animationsEnabled: true,
  effectsEnabled: true
};
