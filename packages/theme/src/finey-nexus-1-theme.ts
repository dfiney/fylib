import { ThemeDefinition } from '@fylib/core';

export const fineyNexus1Theme: ThemeDefinition = {
  name: 'finey-nexus-1',
  tokens: {
    colors: {
      primary: '#22c55e',
      secondary: '#86efac',
      success: '#22c55e',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#22c55e',
      white: '#ffffff',
      black: '#000000',
      background: '#06090b',
      text: '#ffffff',
      'primary-rgb': '34,197,94',
      surface: '#0c1319',
      border: 'rgba(34,197,94,0.12)'
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
        background: '#06090b',
        shadow: '0 1px 0 rgba(34,197,94,0.1)',
        toggle: {
          background: '#06090b',
          textColor: '#22c55e',
          borderColor: 'rgba(34,197,94,0.6)',
          borderRadius: '5px',
          icon: 'menu'
        },
        logoFilterDarkOpacity: '1'
      },
      sidebar: {
        width: '260px',
        padding: '16px 0',
        background: '#06090b',
        toggle: {
          background: '#06090b',
          textColor: '#22c55e',
          borderColor: 'rgba(34,197,94,0.6)',
          borderRadius: '5px',
          icon: 'menu',
          mode: 'floating',
          tonguePosition: 'bottom'
        },
        logoFilterDarkOpacity: '1'
      },
      content: {
        padding: '24px'
      }
    },
    effects: {
      button: {
        background: 'linear-gradient(90deg, #10b981 0%, #22c55e 100%)',
        borderColor: 'transparent',
        shadow: '0 12px 40px rgba(34,197,94,0.35)',
        textColor: '#06090b'
      },
      window: {
        background: '#0c1319',
        shadow: '0 12px 40px rgba(0,0,0,0.55)',
        borderColor: 'rgba(34,197,94,0.2)'
      },
      modal: {
        background: '#0c1319',
        borderColor: 'rgba(34,197,94,0.25)',
        shadow: '0 28px 70px rgba(0,0,0,0.65)',
        overlayColor: 'rgba(0,0,0,0.75)',
        borderWidth: '1px',
        borderRadius: '14px',
        dividerColor: 'rgba(34,197,94,0.12)'
      },
      input: {
        background: '#06090b',
        borderColor: 'rgba(34,197,94,0.2)',
        shadow: '0 0 0 1px rgba(34,197,94,0.1) inset',
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
        background: '#06090b',
        borderColor: 'rgba(34,197,94,0.2)',
        shadow: '0 0 0 1px rgba(34,197,94,0.1) inset',
        borderWidth: '1px',
        borderRadius: '14px'
      },
      table: {
        background: '#0c1319',
        borderColor: 'rgba(34, 197, 94, 0.2)',
        headerBackground: 'rgba(34, 197, 94, 0.08)',
        rowHoverBackground: 'rgba(34, 197, 94, 0.12)',
        stripedBackground: 'rgba(255, 255, 255, 0.01)',
        textColor: '#eafaf2',
        headerTextColor: '#22c55e'
      },
      chart: {
        background: 'transparent',
        borderColor: 'rgba(34, 197, 94, 0.2)',
        gridColor: 'rgba(255, 255, 255, 0.05)',
        labelColor: '#93b5a6',
        colors: ['#22c55e', '#4ade80', '#10b981', '#14b8a6', '#059669'],
        fontFamily: 'inherit'
      },
      accordion: {
        background: '#0c1319',
        borderColor: 'rgba(34,197,94,0.2)',
        shadow: 'none',
        dividerColor: 'rgba(34,197,94,0.12)',
        borderRadius: '14px',
        headerBackground: 'transparent'
      },
      card: {
        background: '#0c1319',
        borderColor: 'rgba(34,197,94,0.7)',
        shadow: '0 24px 50px rgba(0,0,0,0.6)',
        dividerColor: 'rgba(34,197,94,0.12)',
        icons: {
          header: '',
          footer: ''
        }
      },
      badge: {
        background: '#22c55e',
        textColor: '#06090b',
        borderRadius: '9999px',
        animation: 'shine'
      },
      toast: {
        background: 'rgba(6, 9, 11, 0.95)',
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
          info: '#22c55e',
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
          dividerColor: 'rgba(34, 197, 94, 0.12)',
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
      trackBackground: '#06090b',
      thumbBackground: 'linear-gradient(180deg, #10b981 0%, #22c55e 100%)',
      thumbHoverBackground: 'linear-gradient(180deg, #4ade80 0%, #22c55e 100%)',
      thumbBorderRadius: '2px',
      thumbBorderWidth: '2px',
      thumbBorderColor: '#06090b'
    }
  },
  darkTokens: {}, // Empty since tokens are already dark
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
  },
  componentVariants: {
    'fy-button': {
      primary: {
        effects: {
          button: {
            background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
            textColor: '#06090b',
            shadow: '0 4px 14px 0 rgba(34, 197, 94, 0.39)'
          }
        }
      },
      secondary: {
        effects: {
          button: {
            background: '#0c1319',
            textColor: '#22c55e',
            borderColor: 'rgba(34, 197, 94, 0.4)'
          }
        }
      }
    },
    'fy-card': {
      default: {
        effects: {
          card: {
            background: '#0c1319',
            borderColor: 'var(--fy-colors-border)',
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }
        }
      }
    }
  }
};
