import { ThemeDefinition } from '@fylib/core';
import {
  ButtonHoverAnimationName,
  ButtonClickAnimationName,
  ButtonStateAnimationName
} from '@fylib/animation';
import { themeEngine } from './engine';

const workbenchButtonAnimations: {
  hover: ButtonHoverAnimationName;
  click: ButtonClickAnimationName;
  success: ButtonStateAnimationName;
  error: ButtonStateAnimationName;
} = {
  hover: 'button-hover-macos-soft',
  click: 'button-click-macos-press',
  success: 'button-success-macos-pulse',
  error: 'button-error-macos-shake'
};

export const fineyWorkbench1Theme: ThemeDefinition = {
  name: 'finey-workbench-1',
  tokens: {
    colors: {
      primary: '#007aff',
      secondary: '#8e8e93',
      success: '#34c759',
      danger: '#ff3b30',
      warning: '#ffcc00',
      info: '#5ac8fa',
      white: '#ffffff',
      black: '#000000',
      background: '#f5f5f7',
      text: '#1c1c1e',
      'primary-rgb': '0, 122, 255',
      surface: '#ffffff'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '20px',
      xl: '28px'
    },
    borderRadius: {
      sm: '4px',
      md: '6px',
      lg: '12px',
      full: '9999px'
    },
    typography: {
      fontFamily: {
        base: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, "Segoe UI", sans-serif',
        heading: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, "Segoe UI", sans-serif',
        mono: '"SF Mono", ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
      },
      fontSize: {
        sm: '13px',
        md: '15px',
        lg: '20px'
      },
      fontWeight: {
        normal: '400',
        bold: '600'
      }
    },
    layout: {
      app: {
        gap: '0'
      },
      header: {
        height: '52px',
        padding: '0 15px',
        shadow: '0 1px 0 rgba(0,0,0,0.12)',
        toggle: {
          background: 'rgba(14, 194, 119, 0.08)',
          textColor: 'var(--fy-colors-primary)',
          borderRadius: '5px',
          icon: 'menu'
        }
      },
      sidebar: {
        width: '260px',
        padding: '12px 0',
        toggle: {
          background: 'rgba(14, 194, 119, 0.12)',
          textColor: 'var(--fy-colors-primary)',
          borderRadius: '5px',
          icon: 'menu',
          mode: 'floating',
          tonguePosition: 'bottom'
        }
      },
      content: {
        padding: '18px'
      }
    },
    effects: {
      button: {
        background:
          'linear-gradient(to bottom, #ffffff 0%, #f7f7f9 40%, #e5e5ea 100%)',
        borderColor: 'rgba(0,0,0,0.18)',
        shadow: '0 1px 0 rgba(255,255,255,0.8)',
        textColor: '#1c1c1e'
      },
      window: {
        background:
          'linear-gradient(to bottom, #f9f9fb 0%, #e5e5ea 50%, #d1d1d6 100%)',
        shadow: '0 18px 40px rgba(0,0,0,0.28)'
      },
      input: {
        background: '#ffffff',
        borderColor: 'rgba(0,0,0,0.18)',
        shadow: '0 0 0 1px rgba(255,255,255,0.8)',
        placeholderColor: '#8e8e93',
        borderWidth: '1px',
        borderRadius: '8px',
        icons: {
          mode: 'inside',
          name: 'search',
          position: 'left',
          outsideGap: '8px',
          color: 'rgba(0,0,0,0.45)'
        }
      },
      card: {
        background: '#ffffff',
        borderColor: 'rgba(0,0,0,0.08)',
        shadow: '0 12px 30px rgba(0,0,0,0.18)',
        dividerColor: 'rgba(0,0,0,0.08)',
        icons: {
          header: '',
          footer: ''
        }
      },
      badge: {
        background: '#0a84ff',
        textColor: '#ffffff',
        borderRadius: '10px',
        animation: 'shine'
      }
    },
    icons: {
      defaultSet: 'ph',
      color: 'currentColor',
      size: { sm: '12px', md: '16px', lg: '20px' },
      strokeWidth: '1.5',
      variant: 'regular'
    }
  },
  darkTokens: {
    colors: {
      primary: '#0a84ff',
      background: '#1c1c1e',
      text: '#f5f5f7',
      secondary: '#636366',
      surface: '#1f1f20'
    },
    effects: {
      card: {
        background: '#1f1f20',
        borderColor: 'rgba(255,255,255,0.08)',
        dividerColor: 'rgba(255,255,255,0.12)',
        shadow: '0 12px 30px rgba(0,0,0,0.6)'
      },
      input: {
        background: '#2c2c2e',
        borderColor: 'rgba(255,255,255,0.12)',
        placeholderColor: '#a1a1a1'
      }
    }
  },
  componentAnimations: {
    'fy-button': workbenchButtonAnimations,
    'fy-input': {
      focus: 'input-focus-macos-glow',
      success: 'input-success-macos-pulse',
      error: 'input-error-macos-shake'
    },
    'fy-layout': {
      enter: 'layout-macos-window-enter'
    },
    'fy-slot:header': {
      open: 'header-macos-slide-in',
      close: 'header-macos-slide-out'
    },
    'fy-slot:sidebar': {
      open: 'sidebar-macos-slide-in',
      close: 'sidebar-macos-slide-out'
    },
    'fy-card': {
      enter: 'card-macos-fade-in'
    }
  }
};

themeEngine.registerTheme(fineyWorkbench1Theme);
