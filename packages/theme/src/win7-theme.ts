import { ThemeDefinition } from '@fylib/core';
import {
  ButtonHoverAnimationName,
  ButtonClickAnimationName,
  ButtonStateAnimationName
} from '@fylib/animation';

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
  backgroundEffect: {
    name: 'aurora',
    intensity: 40,
    speed: 0.5,
    loop: true
  },
  wallpaper: {
    name: 'aero-waves',
    type: 'pattern',
    opacity: 0.15
  },
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
      modal: {
        background: '#ffffff',
        borderColor: '#3b5a9a',
        shadow: '0 24px 60px rgba(0,0,0,0.5)',
        overlayColor: 'rgba(0,0,0,0.45)',
        borderWidth: '1px',
        borderRadius: '4px',
        dividerColor: 'rgba(15,23,42,0.15)'
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
      table: {
        background: '#ffffff',
        borderColor: '#99bce8',
        headerBackground: 'linear-gradient(to bottom, #f2f7ff 0%, #d7e7fb 100%)',
        rowHoverBackground: '#eaf2ff',
        stripedBackground: '#f5f9ff',
        textColor: '#0f172a',
        headerTextColor: '#1b4f9c'
      },
      chart: {
        background: 'transparent',
        borderColor: '#99bce8',
        gridColor: 'rgba(0,0,0,0.05)',
        labelColor: '#41536b',
        colors: ['#2979ff', '#3cb371', '#ffb300', '#d32f2f', '#1b4f9c'],
        fontFamily: 'inherit'
      },
      accordion: {
        background: '#ffffff',
        borderColor: 'rgba(15,23,42,0.25)',
        shadow: 'none',
        dividerColor: 'rgba(15,23,42,0.12)',
        borderRadius: '4px',
        headerBackground: 'transparent'
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
      },
      badge: {
        background: '#d32f2f',
        textColor: '#ffffff',
        borderRadius: '9999px',
        animation: 'shine'
      },
      toast: {
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95) 0%, rgba(229, 240, 255, 0.9) 100%)',
        borderColor: '#3b5a9a',
        textColor: '#0f172a',
        shadow: '0 8px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.8)',
        borderRadius: '4px',
        padding: '10px 14px',
        gap: '12px',
        minWidth: '310px',
        maxWidth: '400px',
        titleFontSize: '13px',
        titleFontWeight: '700',
        messageFontSize: '12px',
        messageLineHeight: '1.4',
        iconSize: '22px',
        closeIcon: 'x',
        closeButtonSize: '16px',
        closeButtonOpacity: '0.6',
        closeButtonHoverOpacity: '1',
        closeButtonBackground: 'rgba(0,0,0,0.05)',
        closeButtonBorder: '1px solid rgba(0,0,0,0.1)',
        closeButtonBorderRadius: '2px',
        iconColor: {
          info: '#1b4f9c',
          success: '#2e7d32',
          warning: '#f57c00',
          error: '#c62828'
        },
        icons: {
          info: 'info-fill',
          success: 'check-circle-fill',
          warning: 'warning-fill',
          error: 'x-circle-fill'
        }
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#ffffff',
          icon: 'bell',
          badgeBackground: '#ffb300',
          badgeTextColor: '#0f172a'
        },
        dropdown: {
          background: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#3b5a9a',
          shadow: '0 8px 24px rgba(0,0,0,0.4)',
          width: '300px',
          maxHeight: '380px',
          borderRadius: '4px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'linear-gradient(to bottom, #eaf2ff 0%, #d7e7fb 100%)',
          textColor: '#0f172a',
          descriptionColor: '#4b5563',
          dividerColor: 'rgba(0,0,0,0.1)',
          unreadIndicator: '#2979ff'
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
      size: { sm: '12px', md: '16px', lg: '20px' },
      strokeWidth: '1.5',
      variant: 'regular'
    },
    scrollbar: {
      width: '12px',
      trackBackground: 'rgba(255,255,255,0.1)',
      thumbBackground: 'rgba(255,255,255,0.4)',
      thumbHoverBackground: 'rgba(255,255,255,0.6)',
      thumbBorderRadius: '6px',
      thumbBorderWidth: '2px',
      thumbBorderColor: 'transparent'
    }
  },
  darkTokens: {
    colors: {
      primary: '#4c8dff',
      background: '#1e293b',
      secondary: '#334e7b',
      textOverlay: '#0f172a',
      text: '#f9fafb'
    },
    effects: {
      modal: {
        background: '#1e293b',
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: '0 32px 80px rgba(0,0,0,0.75)',
        overlayColor: 'rgba(0,0,0,0.6)',
        borderWidth: '1px',
        borderRadius: '4px',
        dividerColor: 'rgba(255,255,255,0.12)'
      },
      table: {
        background: '#1e293b',
        borderColor: 'rgba(255,255,255,0.12)',
        headerBackground: 'rgba(255,255,255,0.08)',
        rowHoverBackground: 'rgba(41, 121, 255, 0.15)',
        stripedBackground: 'rgba(255,255,255,0.02)',
        textColor: '#f9fafb',
        headerTextColor: '#4c8dff'
      },
      chart: {
        background: 'transparent',
        gridColor: 'rgba(255,255,255,0.05)',
        labelColor: '#94a3b8',
        colors: ['#4c8dff', '#3cb371', '#ffb300', '#f87171', '#334e7b']
      },
      accordion: {
        background: '#1e293b',
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: 'none',
        dividerColor: 'rgba(255,255,255,0.12)',
        borderRadius: '4px',
        headerBackground: 'transparent'
      },
      toast: {
        background: 'linear-gradient(to bottom, #1e293b 0%, #111d2e 100%)',
        borderColor: '#4c8dff',
        textColor: '#f9fafb',
        shadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)',
        borderRadius: '4px',
        closeButtonOpacity: '0.7',
        closeButtonHoverOpacity: '1',
        iconColor: {
          info: '#4c8dff',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171'
        }
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: 'var(--fy-colors-text)',
          icon: 'bell',
          badgeBackground: '#ffb300',
          badgeTextColor: '#0f172a'
        },
        dropdown: {
          background: '#1e293b',
          borderColor: '#4c8dff',
          shadow: '0 8px 24px rgba(0,0,0,0.8)',
          width: '300px',
          maxHeight: '380px',
          borderRadius: '4px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(255, 255, 255, 0.05)',
          textColor: '#f9fafb',
          descriptionColor: '#94a3b8',
          dividerColor: 'rgba(255,255,255,0.1)',
          unreadIndicator: '#4c8dff'
        }
      }
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
    },
    'fy-notification-menu': {
        open: 'dropdown-in',
        close: 'dropdown-out'
    },
    'fy-accordion': {
        expand: 'accordion-expand',
        collapse: 'accordion-collapse'
    }
  }
};


