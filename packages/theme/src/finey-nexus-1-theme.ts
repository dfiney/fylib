import { ThemeDefinition } from '@fylib/core';

export const fineyNexus1Theme: ThemeDefinition = {
  name: 'finey-nexus-1',
  backgroundEffect: {
    name: 'matrix',
    intensity: 40,
    speed: 0.8,
    loop: true
  },
  // wallpaper: {
  //   name: 'cyber-grid',
  //   type: 'pattern',
  //   opacity: 1
  // },
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
      modal: {
        background: '#0c1319',
        borderColor: 'rgba(255,255,255,0.16)',
        shadow: '0 28px 70px rgba(0,0,0,0.65)',
        overlayColor: 'rgba(0,0,0,0.55)',
        borderWidth: '1px',
        borderRadius: '14px',
        dividerColor: 'rgba(255,255,255,0.12)'
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
      table: {
        background: '#0c1319',
        borderColor: 'rgba(34, 197, 94, 0.2)',
        headerBackground: 'rgba(34, 197, 94, 0.05)',
        rowHoverBackground: 'rgba(34, 197, 94, 0.08)',
        stripedBackground: 'rgba(255, 255, 255, 0.01)',
        textColor: '#eafaf2',
        headerTextColor: '#22c55e'
      },
      chart: {
        background: 'transparent',
        borderColor: 'rgba(34, 197, 94, 0.2)',
        gridColor: 'rgba(255, 255, 255, 0.05)',
        labelColor: '#93b5a6',
        colors: ['#22c55e', '#0fe3ff', '#00c8ff', '#14b8a6', '#06b6d4'],
        fontFamily: 'inherit'
      },
      accordion: {
        background: '#0c1319',
        borderColor: 'rgba(255,255,255,0.16)',
        shadow: 'none',
        dividerColor: 'rgba(255,255,255,0.12)',
        borderRadius: '14px',
        headerBackground: 'transparent'
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
      },
      toast: {
        background: 'rgba(12, 19, 25, 0.95)',
        borderColor: '#22c55e',
        textColor: '#eafaf2',
        shadow: '0 0 20px rgba(34, 197, 94, 0.3), inset 0 0 10px rgba(34, 197, 94, 0.1)',
        borderRadius: '4px',
        padding: '14px 20px',
        gap: '12px',
        minWidth: '320px',
        maxWidth: '420px',
        titleFontSize: '14px',
        titleFontWeight: '700',
        messageFontSize: '13px',
        messageLineHeight: '1.5',
        iconSize: '24px',
        closeIcon: 'x',
        closeButtonSize: '18px',
        closeButtonOpacity: '0.7',
        closeButtonHoverOpacity: '1',
        closeButtonBackground: 'transparent',
        closeButtonBorder: '1px solid rgba(34, 197, 94, 0.3)',
        closeButtonBorderRadius: '2px',
        iconColor: {
          info: '#00c8ff',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444'
        },
        icons: {
          info: 'lightning-fill',
          success: 'check-circle-fill',
          warning: 'warning-diamond-fill',
          error: 'fire-fill'
        }
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#22c55e',
          icon: 'bell',
          badgeBackground: '#ef4444',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#0c1319',
          borderColor: 'rgba(34, 197, 94, 0.4)',
          shadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 15px rgba(34, 197, 94, 0.15)',
          width: '320px',
          maxHeight: '420px',
          borderRadius: '14px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(34, 197, 94, 0.1)',
          textColor: '#eafaf2',
          descriptionColor: '#93b5a6',
          dividerColor: 'rgba(255,255,255,0.08)',
          unreadIndicator: '#22c55e'
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
      size: {
        sm: '12px',
        md: '16px',
        lg: '20px'
      },
      strokeWidth: '1.5',
      variant: 'regular'
    },
    scrollbar: {
      width: '12px',
      trackBackground: '#0a0f12',
      thumbBackground: 'linear-gradient(180deg, #00c8ff 0%, #22c55e 100%)',
      thumbHoverBackground: 'linear-gradient(180deg, #00e1ff 0%, #28ff6c 100%)',
      thumbBorderRadius: '2px',
      thumbBorderWidth: '2px',
      thumbBorderColor: '#0a0f12'
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
      modal: {
        background: '#0f172a',
        borderColor: 'rgba(255,255,255,0.18)',
        shadow: '0 32px 80px rgba(0,0,0,0.75)',
        overlayColor: 'rgba(0,0,0,0.55)',
        borderWidth: '1px',
        borderRadius: '14px',
        dividerColor: 'rgba(255,255,255,0.12)'
      },
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
      accordion: {
        borderColor: 'rgba(255,255,255,0.18)',
        shadow: 'none',
        dividerColor: 'rgba(255,255,255,0.12)',
        borderRadius: '14px',
        headerBackground: 'transparent'
      },
      button: {
        background: 'linear-gradient(90deg, #0b1e13 0%, #0d2518 100%)',
        borderColor: 'rgba(34, 197, 94, 0.4)',
        shadow: '0 0 15px rgba(34, 197, 94, 0.2)',
        textColor: '#22c55e'
      },
      card: {
        background: '#0c1319',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        dividerColor: 'rgba(255, 255, 255, 0.08)',
        shadow: '0 24px 50px rgba(0,0,0,0.8), 0 0 20px rgba(34, 197, 94, 0.05)'
      },
      table: {
        background: '#0b0f14',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        headerBackground: 'rgba(34, 197, 94, 0.1)',
        rowHoverBackground: 'rgba(34, 197, 94, 0.15)',
        stripedBackground: 'rgba(255, 255, 255, 0.02)',
        textColor: '#e5e7eb',
        headerTextColor: '#22c55e'
      },
      chart: {
        background: 'transparent',
        gridColor: 'rgba(255, 255, 255, 0.08)',
        labelColor: '#9ca3af',
        colors: ['#22c55e', '#0fe3ff', '#00c8ff', '#14b8a6', '#06b6d4']
      },
      toast: {
        background: 'rgba(15, 23, 42, 0.95)',
        borderColor: '#22c55e',
        textColor: '#e5e7eb',
        shadow: '0 0 30px rgba(34, 197, 94, 0.5), inset 0 0 15px rgba(34, 197, 94, 0.2)',
        borderRadius: '4px',
        closeButtonOpacity: '0.8',
        closeButtonHoverOpacity: '1',
        iconColor: {
          info: '#00c8ff',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444'
        },
        icons: {
          info: 'lightning-fill',
          success: 'check-circle-fill',
          warning: 'warning-diamond-fill',
          error: 'fire-fill'
        }
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#22c55e',
          icon: 'bell',
          badgeBackground: '#ef4444',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#0f172a',
          borderColor: 'rgba(34, 197, 94, 0.5)',
          shadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 20px rgba(34, 197, 94, 0.2)',
          width: '320px',
          maxHeight: '420px',
          borderRadius: '14px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(34, 197, 94, 0.15)',
          textColor: '#e5e7eb',
          descriptionColor: '#9ca3af',
          dividerColor: 'rgba(255,255,255,0.1)',
          unreadIndicator: '#22c55e'
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
    }
  }
};
