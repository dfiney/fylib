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
      modal: {
        background: '#ffffff',
        borderColor: 'rgba(0,0,0,0.35)',
        shadow: '0 24px 60px rgba(0,0,0,0.45)',
        overlayColor: 'rgba(0,0,0,0.45)',
        borderWidth: '1px',
        borderRadius: '6px',
        dividerColor: 'rgba(0,0,0,0.2)'
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
      table: {
        background: '#ffffff',
        borderColor: '#91a7b4',
        headerBackground: '#e5ecf9',
        rowHoverBackground: '#f1f5fb',
        stripedBackground: '#f7f9fc'
      },
      accordion: {
        background: '#ffffff',
        borderColor: 'rgba(0,0,0,0.35)',
        shadow: 'none',
        dividerColor: 'rgba(0,0,0,0.2)',
        borderRadius: '6px',
        headerBackground: 'transparent'
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
      },
      toast: {
        background: '#ffffff',
        borderColor: '#315b8a',
        textColor: '#000000',
        shadow: '2px 2px 0 rgba(0,0,0,0.2)',
        borderRadius: '0px'
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#ffffff',
          icon: 'bell',
          badgeBackground: '#ffcc00',
          badgeTextColor: '#000000'
        },
        dropdown: {
          background: '#ffffff',
          borderColor: '#315b8a',
          shadow: '2px 2px 4px rgba(0,0,0,0.4)',
          width: '280px',
          maxHeight: '350px',
          borderRadius: '0px'
        },
        item: {
          background: 'transparent',
          hoverBackground: '#316ac5',
          textColor: '#000000',
          descriptionColor: '#666666',
          dividerColor: '#e0e0e0',
          unreadIndicator: '#3a6ea5'
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
      modal: {
        background: '#0e1f3d',
        borderColor: 'rgba(255,255,255,0.18)',
        shadow: '0 32px 80px rgba(0,0,0,0.75)',
        overlayColor: 'rgba(0,0,0,0.6)',
        borderWidth: '1px',
        borderRadius: '6px',
        dividerColor: 'rgba(255,255,255,0.18)'
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
      table: {
        background: '#0e1f3d',
        borderColor: 'rgba(255,255,255,0.12)',
        headerBackground: 'rgba(255,255,255,0.05)',
        rowHoverBackground: 'rgba(76, 138, 211, 0.15)',
        stripedBackground: 'rgba(255,255,255,0.02)'
      },
      accordion: {
        background: '#0e1f3d',
        borderColor: 'rgba(255,255,255,0.18)',
        shadow: 'none',
        dividerColor: 'rgba(255,255,255,0.18)',
        borderRadius: '6px',
        headerBackground: 'transparent'
      },
      button: {
        textColor: '#000000ff'
      },
      toast: {
        background: '#0e1f3d',
        borderColor: '#4c8ad3',
        textColor: '#ffffff',
        shadow: '2px 2px 0 rgba(0,0,0,0.5)',
        borderRadius: '0px'
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: 'var(--fy-colors-text)',
          icon: 'bell',
          badgeBackground: '#ffcc00',
          badgeTextColor: '#000000'
        },
        dropdown: {
          background: '#0e1f3d',
          borderColor: '#4c8ad3',
          shadow: '2px 2px 8px rgba(0,0,0,0.8)',
          width: '280px',
          maxHeight: '350px',
          borderRadius: '0px'
        },
        item: {
          background: 'transparent',
          hoverBackground: '#4c8ad3',
          textColor: '#ffffff',
          descriptionColor: '#cbd5e1',
          dividerColor: 'rgba(255,255,255,0.1)',
          unreadIndicator: '#4c8ad3'
        }
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

themeEngine.registerTheme(windowsXpTheme);
