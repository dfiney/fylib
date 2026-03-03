import { ThemeDefinition } from '@fylib/core';
import { themeEngine } from './engine';
 
export const fineyNexus1Theme: ThemeDefinition = {
  name: 'finey-nexus-1',
  tokens: {
    colors: {
      primary: '#22c55e',
      secondary: '#0fe3ff',
      success: '#22c55e',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#0fe3ff',
      white: '#ffffff',
      black: '#000000',
      background: '#0a0f12',
      text: '#eafaf2',
      'primary-rgb': '34,197,94',
      surface: '#0c1319',
      border: 'rgba(255,255,255,0.08)'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      full: '9999px',
    },
    typography: {
      fontFamily: {
        base: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        heading: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace'
      },
      fontSize: {
        sm: '12px',
        md: '16px',
        lg: '20px',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      }
    },
    layout: {
      app: {
        gap: '0'
      },
      header: {
        height: '64px',
        padding: '0 24px',
        shadow: '0 1px 0 rgba(255,255,255,0.06)',
        toggle: {
          background: '#0a0f12',
          textColor: '#22c55e',
          borderColor: 'rgba(34,197,94,0.6)',
          borderRadius: '5px',
          icon: 'menu'
        },
        logoFilterDarkOpacity: '0.85'
      },
      sidebar: {
        width: '260px',
        padding: '16px 0',
        toggle: {
          background: '#0a0f12',
          textColor: '#22c55e',
          borderColor: 'rgba(34,197,94,0.6)',
          borderRadius: '5px',
          icon: 'menu',
          mode: 'floating',
          tonguePosition: 'bottom'
        },
        logoFilterDarkOpacity: '0.85'
      },
      content: {
        padding: '24px'
      }
    },
    effects: {
      button: {
        background: 'linear-gradient(90deg, #00c8ff 0%, #22c55e 100%)',
        borderColor: 'transparent',
        shadow: '0 12px 40px rgba(34,197,94,0.35)',
        textColor: '#0b0f14'
      },
      window: {
        background: '#0f172a',
        shadow: '0 12px 40px rgba(0,0,0,0.55)',
        borderColor: 'rgba(255,255,255,0.08)'
      },
      input: {
        background: '#0a0f12',
        borderColor: 'rgba(255,255,255,0.16)',
        shadow: '0 0 0 1px rgba(255,255,255,0.08) inset',
        placeholderColor: '#93b5a6',
        borderWidth: '1px',
        borderRadius: '14px',
        icons: {
          mode: 'inside',
          name: 'user',
          position: 'left',
          outsideGap: '8px',
          color: 'currentColor'
        }
      },
      select: {
        background: '#0a0f12',
        borderColor: 'rgba(255,255,255,0.16)',
        shadow: '0 0 0 1px rgba(255,255,255,0.08) inset',
        borderWidth: '1px',
        borderRadius: '14px'
      },
      card: {
        background: '#0c1319',
        borderColor: 'rgba(34,197,94,0.7)',
        shadow: '0 24px 50px rgba(0,0,0,0.6)',
        dividerColor: 'rgba(255,255,255,0.08)',
        icons: {
          header: '',
          footer: ''
        }
      },
      badge: {
        background: '#22c55e',
        textColor: '#0b0f14',
        borderRadius: '9999px',
        animation: 'shine'
      }
    },
    icons: {
      defaultSet: 'ph',
      color: 'currentColor',
      size: {
        sm: '12px',
        md: '16px',
        lg: '20px'
      },
      strokeWidth: '1.5',
      variant: 'regular'
    }
  },
  darkTokens: {
    colors: {
      primary: '#22c55e',
      background: '#0b0f14',
      text: '#e5e7eb',
      secondary: '#14b8a6',
      surface: '#0f172a'
    },
    effects: {
      input: {
        borderColor: 'rgba(255,255,255,0.18)',
        placeholderColor: '#a3a3a3',
        shadow: 'none'
      },
      select: {
        borderColor: 'rgba(255,255,255,0.18)',
        shadow: 'none',
        borderWidth: '1px',
        borderRadius: '14px'
      },
      button: {
        textColor: '#0b0f14'
      },
      card: {
        shadow: '0 24px 50px rgba(0,0,0,0.6)'
      }
    }
  },
  componentAnimations: {
    'fy-button': {
      hover: 'button-hover-soft',
      click: 'button-click-press',
      success: 'button-success-pulse',
      error: 'button-error-shake'
    },
    'fy-input': {
      focus: 'input-focus-glow',
      success: 'input-success-pulse',
      error: 'input-error-shake'
    },
    'fy-layout': {
      enter: 'layout-fade-in'
    },
    'fy-slot:header': {
      open: 'header-menu-dropdown-in',
      close: 'header-menu-dropdown-out'
    },
    'fy-slot:sidebar': {
      open: 'sidebar-slide-in',
      close: 'sidebar-slide-out'
    },
    'fy-card': {
      enter: 'card-fade-in'
    }
  }
};
 
themeEngine.registerTheme(fineyNexus1Theme);
