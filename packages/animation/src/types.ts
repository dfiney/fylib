export type ButtonHoverAnimationName =
  | 'button-hover-soft'
  | 'button-hover-glow'
  | 'button-hover-lift'
  | 'button-hover-macos-soft';

export type ButtonClickAnimationName =
  | 'button-click-press'
  | 'button-click-ripple'
  | 'button-click-macos-press';

export type ButtonStateAnimationName =
  | 'button-success-pulse'
  | 'button-error-shake'
  | 'button-success-macos-pulse'
  | 'button-error-macos-shake';

export interface ButtonComponentAnimationsConfig {
  hover?: ButtonHoverAnimationName;
  click?: ButtonClickAnimationName;
  success?: ButtonStateAnimationName;
  error?: ButtonStateAnimationName;
}

export type InputFocusAnimationName =
  | 'input-focus-glow'
  | 'input-focus-soft'
  | 'input-focus-macos-glow';

export type InputStateAnimationName =
  | 'input-success-pulse'
  | 'input-error-shake'
  | 'input-success-macos-pulse'
  | 'input-error-macos-shake';

export type LayoutAnimationName =
  | 'layout-fade-in'
  | 'layout-macos-window-enter';

export type SidebarAnimationName =
  | 'sidebar-slide-in'
  | 'sidebar-slide-out'
  | 'sidebar-macos-slide-in'
  | 'sidebar-macos-slide-out';

export type HeaderMenuAnimationName =
  | 'header-menu-slide-in'
  | 'header-menu-slide-out'
  | 'header-menu-macos-slide-in'
  | 'header-menu-macos-slide-out';

export type CardAnimationName =
  | 'card-fade-in'
  | 'card-macos-fade-in';
