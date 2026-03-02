import { ThemeDefinition } from '@fylib/core';
import { themeEngine } from './engine';

export const christmasTheme: ThemeDefinition = {
  name: 'christmas',
  tokens: {
    colors: {
      primary: '#af111c', // Vermelho Natal
      secondary: '#2f5233', // Verde Natal
      success: '#22c55e',
      danger: '#af111c',
      warning: '#f59e0b',
      info: '#3b82f6',
      white: '#ffffff',
      black: '#000000',
      background: '#f8f9fa',
      text: '#1a472a',
      'primary-rgb': '175, 17, 28',
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
      md: '16px', // Bordas mais arredondadas para o Natal
      lg: '24px',
      full: '9999px',
    },
    typography: {
      fontFamily: {
        base: '"Playfair Display", "Times New Roman", ui-serif, Georgia, serif',
        heading: '"Playfair Display", "Times New Roman", ui-serif, Georgia, serif',
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
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
      app: { gap: '0' },
      header: {
        height: '64px',
        padding: '0 24px',
        shadow: '0 1px 0 rgba(0,0,0,0.06)',
        toggle: {
          background: 'var(--fy-colors-secondary)',
          textColor: 'var(--fy-colors-white)',
          borderRadius: '9999px',
          icon: 'menu'
        }
      },
      sidebar: {
        width: '260px',
        padding: '16px 0',
        toggle: {
          background: 'var(--fy-colors-secondary)',
          textColor: 'var(--fy-colors-white)',
          borderRadius: '9999px',
          icon: 'menu',
          mode: 'floating',
          tonguePosition: 'bottom'
        }
      },
      content: { padding: '24px' }
    },
    effects: {
      button: {
        background: 'linear-gradient(to bottom, #fff 0%, #ffd9d9 40%, #f2b3b3 100%)',
        borderColor: '#8a1f1f',
        shadow: 'inset 0 0 0 1px rgba(255,255,255,0.6)',
        textColor: '#2f5233'
      },
      window: {
        background: 'var(--fy-colors-background)',
        shadow: '0 4px 16px rgba(0,0,0,0.15)'
      },
      input: {
        background: '#ffffff',
        borderColor: 'rgba(47, 82, 51, 0.25)',
        shadow: 'none',
        placeholderColor: '#6b7280',
        borderWidth: '1px',
        borderRadius: '16px',
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
        borderColor: 'rgba(47, 82, 51, 0.25)',
        shadow: 'none',
        borderWidth: '1px',
        borderRadius: '16px'
      },
      card: {
        background: '#ffffff',
        borderColor: 'rgba(47, 82, 51, 0.15)',
        shadow: '0 10px 30px rgba(47, 82, 51, 0.12)',
        dividerColor: 'rgba(47, 82, 51, 0.15)',
        icons: { header: '', footer: '' }
      },
      badge: {
        background: '#af111c',
        textColor: '#ffffff',
        borderRadius: '14px',
        animation: 'shine'
      }
    },
    icons: {
      defaultSet: 'ph',
      color: 'currentColor',
      size: { sm: '12px', md: '16px', lg: '20px' },
      strokeWidth: '1.5',
      variant: 'duotone'
    }
  },
  darkTokens: {
    colors: {
      primary: '#d42426',
      background: '#0a1a0f',
      text: '#e8f5e9',
      secondary: '#4caf50',
      surface: '#102016'
    },
    effects: {
      card: {
        background: '#102016',
        borderColor: 'rgba(255,255,255,0.08)',
        dividerColor: 'rgba(255,255,255,0.12)',
        shadow: '0 10px 30px rgba(0,0,0,0.5)'
      },
      input: {
        background: '#0f1a12',
        borderColor: 'rgba(255,255,255,0.12)',
        placeholderColor: '#b7ccb9'
      },
      select: {
        background: '#0f1a12',
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: 'none',
        borderWidth: '1px',
        borderRadius: '16px'
      }
    }
  }
};

// Auto-register
themeEngine.registerTheme(christmasTheme);
