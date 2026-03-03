import { ThemeDefinition } from '@fylib/core';
import { themeEngine } from './engine';
import {
  ButtonHoverAnimationName,
  ButtonClickAnimationName,
  ButtonStateAnimationName
} from '@fylib/animation';
import { text } from 'stream/consumers';

const win7ButtonAnimations: {
  hover: ButtonHoverAnimationName;
  click: ButtonClickAnimationName;
  success: ButtonStateAnimationName;
  error: ButtonStateAnimationName;
} = {
  hover: 'button-hover-lift',
  click: 'button-click-ripple',
  success: 'button-success-pulse',
  error: 'button-error-shake'
};

export const windows7Theme: ThemeDefinition = {
  name: 'windows-7',
  tokens: {
    colors: {
      primary: '#2979ff',
      secondary: '#1b4f9c',
      success: '#3cb371',
      danger: '#d32f2f',
      warning: '#ffb300',
      info: '#2979ff',
      white: '#ffffff',
      black: '#000000',
      background: '#0c4da2',
      text: '#0f172a',
      textOverlay: '#0f172a',
      'primary-rgb': '41, 121, 255',
      surface: '#f1f5fb'
    },
    spacing: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px'
    },
    borderRadius: {
      sm: '2px',
      md: '3px',
      lg: '4px',
      full: '9999px'
    },
    typography: {
      fontFamily: {
        base: '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Tahoma", sans-serif',
        heading: '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Tahoma", sans-serif',
        mono: '"Consolas", ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace'
      },
      fontSize: {
        sm: '11px',
        md: '12px',
        lg: '14px'
      },
      fontWeight: {
        normal: '400',
        bold: '700'
      }
    },
    layout: {
      app: {
        gap: '0'
      },
      header: {
        height: '36px',
        padding: '0 10px',
        shadow: '0 1px 0 rgba(0,0,0,0.25)',
        toggle: {
          background: '#2979ff',
          textColor: '#ffffff',
          borderRadius: '12px',
          icon: 'menu'
        }
      },
      sidebar: {
        width: '240px',
        padding: '8px 0',
        toggle: {
          background: '#2979ff',
          textColor: '#ffffff',
          borderRadius: '12px',
          icon: 'menu',
          mode: 'floating',
          tonguePosition: 'bottom'
        }
      },
      content: {
        padding: '10px'
      }
    },
    effects: {
      button: {
        background:
          'linear-gradient(to bottom, #fdfdfd 0%, #e8f0fb 35%, #c5d9f5 100%)',
        borderColor: '#3b5a9a',
        shadow: 'inset 0 0 0 1px rgba(255,255,255,0.7)',
        textColor: '#0f172a'
      },
      window: {
        background:
          'linear-gradient(to bottom, #e5f0ff 0%, #c2d7f2 40%, #a6c4e8 100%)',
        shadow: '0 4px 16px rgba(0,0,0,0.45)'
      },
      input: {
        background: '#ffffff',
        borderColor: 'rgba(15,23,42,0.25)',
        shadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
        placeholderColor: '#41536b',
        borderWidth: '1px',
        borderRadius: '4px',
        icons: {
          mode: 'inside',
          name: 'search',
          position: 'left',
          outsideGap: '8px',
          color: 'currentColor'
        }
      },
      select: {
        background: '#ffffff',
        borderColor: 'rgba(15,23,42,0.25)',
        shadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
        borderWidth: '1px',
        borderRadius: '4px'
      },
      card: {
        background: '#ffffff',
        borderColor: 'rgba(15, 23, 42, 0.12)',
        shadow: '0 8px 24px rgba(0,0,0,0.15)',
        dividerColor: 'rgba(15, 23, 42, 0.12)',
        icons: {
          header: '',
          footer: ''
        }
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
      primary: '#4c8dff',
      background: '#1e293b',
      secondary: '#334e7b',
      textOverlay: '#0f172a',
      text: '#f9fafb'
    }
  },
  componentAnimations: {
    'fy-button': win7ButtonAnimations,
    'fy-input': {
      focus: 'input-focus-soft',
      success: 'input-success-pulse',
      error: 'input-error-shake'
    },
    'fy-layout': {
      enter: 'layout-fade-in'
    },
    'fy-slot:header': {
      open: 'header-menu-slide-in',
      close: 'header-menu-slide-out'
    },
    'fy-slot:sidebar': {
      open: 'sidebar-slide-in',
      close: 'sidebar-slide-out'
    }
  }
};

themeEngine.registerTheme(windows7Theme);
