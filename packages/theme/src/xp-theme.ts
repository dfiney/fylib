import { ThemeDefinition } from '@fylib/core';
import { themeEngine } from './engine';
import {
  ButtonHoverAnimationName,
  ButtonClickAnimationName,
  ButtonStateAnimationName
} from '@fylib/animation';

const xpButtonAnimations: {
  hover: ButtonHoverAnimationName;
  click: ButtonClickAnimationName;
  success: ButtonStateAnimationName;
  error: ButtonStateAnimationName;
} = {
  hover: 'button-hover-glow',
  click: 'button-click-press',
  success: 'button-success-pulse',
  error: 'button-error-shake'
};

export const windowsXpTheme: ThemeDefinition = {
  name: 'windows-xp',
  tokens: {
    colors: {
      primary: '#3a6ea5',
      secondary: '#1f4f8b',
      success: '#3cb371',
      danger: '#cc3300',
      warning: '#ffcc00',
      info: '#3a6ea5',
      white: '#ffffff',
      black: '#000000',
      background: '#3a6ea5',
      text: '#000000',
      'primary-rgb': '58, 110, 165',
      surface: '#dfe9f5'
    },
    spacing: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px'
    },
    borderRadius: {
      sm: '3px',
      md: '4px',
      lg: '6px',
      full: '9999px'
    },
    typography: {
      fontFamily: {
        base: '"Tahoma", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        heading: '"Tahoma", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        mono: '"Courier New", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
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
        height: '32px',
        padding: '0 8px',
        shadow: '0 1px 0 rgba(0,0,0,0.35)',
        toggle: {
          background: '#dfe9f5',
          textColor: '#3a6ea5',
          borderRadius: '4px',
          icon: 'menu'
        }
      },
      sidebar: {
        width: '220px',
        padding: '8px 0',
        toggle: {
          background: '#3a6ea5',
          textColor: '#ffffff',
          borderRadius: '4px',
          borderColor: '#ffffff',
          icon: 'menu',
          mode: 'floating',
          tonguePosition: 'bottom'
        }
      },
      content: {
        padding: '8px'
      }
    },
    effects: {
      button: {
        background:
          'linear-gradient(to bottom, #ffffff 0%, #e4f1fb 40%, #c0d5f5 100%)',
        borderColor: '#315b8a',
        shadow: 'inset 0 0 0 1px rgba(255,255,255,0.6)',
        textColor: '#000000'
      },
      window: {
        background:
          'linear-gradient(to bottom, #4b7bd1 0%, #2b4f9d 40%, #214173 100%)',
        shadow: '0 2px 6px rgba(0,0,0,0.6)'
      },
      input: {
        background: '#ffffff',
        borderColor: 'rgba(0,0,0,0.35)',
        shadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
        placeholderColor: '#334155',
        borderWidth: '1px',
        borderRadius: '6px',
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
        borderColor: 'rgba(0,0,0,0.35)',
        shadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
        borderWidth: '1px',
        borderRadius: '6px'
      },
      card: {
        background: '#ffffff',
        borderColor: 'rgba(0,0,0,0.18)',
        shadow: '0 6px 20px rgba(0,0,0,0.25)',
        dividerColor: 'rgba(0,0,0,0.2)',
        icons: {
          header: 'clipboard-text',
          footer: ''
        }
      },
      badge: {
        background: '#ffcc00',
        textColor: '#000000',
        borderRadius: '8px',
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
      primary: '#4c8ad3',
      background: '#1a2948',
      text: '#f9fafb',
      secondary: '#68718bff',
      surface: '#0e1f3d'
    },
    layout: {
      header: {
        logoFilterDarkOpacity: '0.85'
      },
      sidebar: {
        logoFilterDarkOpacity: '0.85'
      }
    },
    effects: {
      card: {
        background: '#0e1f3d',
        borderColor: 'rgba(255,255,255,0.12)',
        dividerColor: 'rgba(255,255,255,0.18)',
        shadow: '0 6px 20px rgba(0,0,0,0.6)',

      },
      input: {
        background: '#132a4f',
        borderColor: 'rgba(255,255,255,0.18)',
        placeholderColor: '#cbd5e1'
      },
      select: {
        background: '#132a4f',
        borderColor: 'rgba(255,255,255,0.18)',
        shadow: 'none',
        borderWidth: '1px',
        borderRadius: '6px'
      },
      button: {
        textColor: '#000000ff'
      }
    }
  },
  componentAnimations: {
    'fy-button': xpButtonAnimations,
    'fy-input': {
      focus: 'input-focus-glow',
      success: 'input-success-pulse',
      error: 'input-error-shake'
    },
    'fy-layout': {
      enter: 'layout-fade-in'
    },
    'fy-slot:header': {
      open: 'sidebar-slide-in',
      close: 'sidebar-slide-out'
    },
    'fy-slot:sidebar': {
      open: 'sidebar-slide-in',
      close: 'sidebar-slide-out'
    }
  }
};

themeEngine.registerTheme(windowsXpTheme);
