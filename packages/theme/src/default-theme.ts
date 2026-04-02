import { ThemeDefinition } from '@fylib/core';
import { themeEngine } from './engine';

export const defaultTheme: ThemeDefinition = {
  name: 'default',
  tokens: {
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      success: '#22c55e',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      white: '#ffffff',
      black: '#000000',
      background: '#ffffff',
      text: '#1f2937',
      'primary-rgb': '59, 130, 246',
      surface: '#dfe9f5'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      full: '9999px',
    },
    typography: {
      fontFamily: {
        base: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        heading: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
      app: {
        gap: '0'
      },
      header: {
        height: '64px',
        padding: '0 24px',
        shadow: '0 1px 0 rgba(0,0,0,0.06)',
        toggle: {
          background: 'var(--fy-colors-primary)',
          textColor: 'var(--fy-colors-white)',
          borderRadius: '5px',
          borderWidth: '1px',
          borderColor: "white",
          icon: 'menu'
        },
        logoFilterDarkOpacity: '0.85'
      },
      sidebar: {
        width: '260px',
        padding: '16px 0',
        toggle: {
          background: 'var(--fy-colors-primary)',
          textColor: 'var(--fy-colors-white)',
          borderRadius: '5px',
          borderColor: "var(--fy-colors-white)",
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
        background: 'var(--fy-colors-primary)',
        borderColor: 'transparent',
        shadow: 'none',
        textColor: 'var(--fy-colors-white)'
      },
      window: {
        background: 'var(--fy-colors-background)',
        shadow: '0 1px 3px rgba(15, 23, 42, 0.08)'
      },
      modal: {
        background: '#ffffff',
        borderColor: 'rgba(15, 23, 42, 0.12)',
        shadow: '0 20px 60px rgba(15, 23, 42, 0.25)',
        overlayColor: 'rgba(0,0,0,0.45)',
        borderWidth: '1px',
        borderRadius: 'var(--fy-borderRadius-md)',
        dividerColor: 'rgba(15, 23, 42, 0.08)'
      },
      input: {
        background: '#ffffff',
        borderColor: 'rgba(15, 23, 42, 0.12)',
        shadow: 'none',
        placeholderColor: '#6b7280',
        borderWidth: '1px',
        borderRadius: 'var(--fy-borderRadius-md)',
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
        borderColor: 'rgba(15, 23, 42, 0.12)',
        shadow: '0 6px 16px rgba(15, 23, 42, 0.08)',
        borderWidth: '1px',
        borderRadius: 'var(--fy-borderRadius-md)'
      },
      table: {
        background: 'var(--fy-colors-white)',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        headerBackground: 'rgba(15, 23, 42, 0.02)',
        rowHoverBackground: 'rgba(15, 23, 42, 0.01)',
        stripedBackground: 'rgba(15, 23, 42, 0.005)'
      },
      chart: {
        background: 'transparent',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        shadow: 'none',
        gridColor: 'rgba(15, 23, 42, 0.05)',
        labelColor: '#64748b',
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        fontFamily: 'inherit'
      },
      card: {
        background: '#ffffff',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        shadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
        dividerColor: 'rgba(15, 23, 42, 0.08)',
        icons: {
          header: '',
          footer: ''
        }
      },
      accordion: {
        background: '#ffffff',
        borderColor: 'rgba(15, 23, 42, 0.12)',
        shadow: 'none',
        dividerColor: 'rgba(15, 23, 42, 0.08)',
        borderRadius: 'var(--fy-borderRadius-md)',
        headerBackground: 'transparent'
      },
      badge: {
        background: '#ef4444',
        textColor: '#ffffff',
        borderRadius: '9999px',
        animation: 'shine'
      },
      toast: {
        background: '#ffffff',
        borderColor: 'rgba(15, 23, 42, 0.12)',
        textColor: '#1f2937',
        shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        borderRadius: 'var(--fy-borderRadius-md)'
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: 'var(--fy-colors-text)',
          icon: 'bell',
          badgeBackground: '#ef4444',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#ffffff',
          borderColor: 'rgba(15, 23, 42, 0.12)',
          shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: 'var(--fy-borderRadius-md)'
        },
        item: {
          background: 'transparent',
          hoverBackground: '#f8fafc',
          textColor: '#1f2937',
          descriptionColor: '#64748b',
          dividerColor: 'rgba(15, 23, 42, 0.08)',
          unreadIndicator: '#3b82f6'
        },
        config: {
          showAll: false,
          limit: 5,
          allowClear: true,
          accordionMode: true,
          showViewAll: true,
          viewAllPosition: 'footer-right'
        }
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
      primary: '#60a5fa',
      background: '#111827',
      text: '#f9fafb',
      secondary: '#9ca3af',
      surface: '#0f172a'
    },
    effects: {
      card: {
        background: '#0f172a',
        borderColor: 'rgba(255,255,255,0.08)',
        dividerColor: 'rgba(255,255,255,0.12)',
        shadow: '0 10px 30px rgba(0,0,0,0.5)'
      },
      modal: {
        background: '#0f172a',
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: '0 24px 70px rgba(0,0,0,0.7)',
        overlayColor: 'rgba(0,0,0,0.6)',
        borderWidth: '1px',
        borderRadius: 'var(--fy-borderRadius-md)',
        dividerColor: 'rgba(255,255,255,0.12)'
      },
      accordion: {
        background: '#0f172a',
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: 'none',
        dividerColor: 'rgba(255,255,255,0.12)',
        borderRadius: 'var(--fy-borderRadius-md)',
        headerBackground: 'transparent'
      },
      input: {
        background: '#111827',
        borderColor: 'rgba(255,255,255,0.12)',
        placeholderColor: '#9ca3af',
        shadow: 'none'
      },
      select: {
        background: '#111827',
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: '0 6px 16px rgba(15, 23, 42, 0.08)',
        borderWidth: '1px',
        borderRadius: 'var(--fy-borderRadius-md)'
      },
      table: {
        background: '#1f2937',
        borderColor: 'rgba(255,255,255,0.08)',
        headerBackground: 'rgba(255,255,255,0.05)',
        rowHoverBackground: 'rgba(255,255,255,0.02)',
        stripedBackground: 'rgba(255,255,255,0.01)'
      },
      chart: {
        background: 'transparent',
        gridColor: 'rgba(255,255,255,0.05)',
        labelColor: '#9ca3af',
        colors: ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa']
      },
      button: {
        textColor: '#ffffff'
      },
      toast: {
        background: '#1f2937',
        borderColor: 'rgba(255,255,255,0.1)',
        textColor: '#f9fafb',
        shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        borderRadius: 'var(--fy-borderRadius-md)'
      },
      notificationMenu: {
        button: {
          textColor: 'var(--fy-colors-text)',
          badgeBackground: '#f87171',
          background: 'transparent',
          icon: 'bell',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#1f2937',
          borderColor: 'rgba(255,255,255,0.1)',
          shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: 'var(--fy-borderRadius-md)'
        },
        item: {
          hoverBackground: 'rgba(255,255,255,0.05)',
          textColor: '#f9fafb',
          descriptionColor: '#9ca3af',
          dividerColor: 'rgba(255,255,255,0.08)',
          unreadIndicator: '#60a5fa',
          background: ''
        }
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
    'fy-select': {
      focus: 'input-focus-glow',
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
    },
    'fy-notification-menu': {
        open: 'dropdown-in',
        close: 'dropdown-out'
    },
    'fy-accordion': {
        expand: 'accordion-expand',
        collapse: 'accordion-collapse'
    },
    'fy-card': {
      enter: 'card-fade-in'
    },
    'fy-table': {
      enter: 'table-fade-in',
      rowEnter: 'table-row-enter'
    }
  }
};

// Auto-register default theme
themeEngine.registerTheme(defaultTheme);
