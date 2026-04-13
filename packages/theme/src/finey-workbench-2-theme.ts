import { ThemeDefinition } from '@fylib/core';
import {
  ButtonHoverAnimationName,
  ButtonClickAnimationName,
  ButtonStateAnimationName
} from '@fylib/animation';

const mojaveButtonAnimations: {
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

export const fineyWorkbench2Theme: ThemeDefinition = {
  name: 'finey-workbench-2',
  backgroundEffect: {
    name: 'particles',
    intensity: 20,
    speed: 0.3,
    loop: true
  },
  wallpaper: {
    name: 'dots',
    type: 'pattern',
    opacity: 0.08
  },
  tokens: {
    colors: {
      primary: '#007aff',
      secondary: '#8e8e93',
      success: '#28cd41',
      danger: '#ff3b30',
      warning: '#ffcc00',
      info: '#5ac8fa',
      white: '#ffffff',
      black: '#000000',
      background: '#ececec',
      text: '#2d2d2d',
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
      sm: '3px',
      md: '5px',
      lg: '10px',
      full: '9999px'
    },
    typography: {
      fontFamily: {
        base: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, "Segoe UI", sans-serif',
        heading: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, "Segoe UI", sans-serif',
        mono: '"SF Mono", ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
      },
      fontSize: {
        sm: '12px',
        md: '14px',
        lg: '18px'
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
        height: '48px',
        padding: '0 12px',
        shadow: '0 1px 0 rgba(0,0,0,0.1)',
        toggle: {
          background: 'transparent',
          textColor: 'var(--fy-colors-text)',
          borderRadius: '4px',
          icon: 'list'
        }
      },
      sidebar: {
        width: '240px',
        padding: '10px 0',
        toggle: {
          background: 'transparent',
          textColor: 'var(--fy-colors-text)',
          borderRadius: '4px',
          icon: 'list',
          mode: 'floating',
          tonguePosition: 'bottom'
        }
      },
      content: {
        padding: '20px'
      }
    },
    effects: {
      button: {
        background: 'linear-gradient(to bottom, #ffffff 0%, #f6f6f6 100%)',
        borderColor: '#c3c3c3',
        shadow: '0 1px 1px rgba(0,0,0,0.05)',
        textColor: '#2d2d2d'
      },
      window: {
        background: '#ececec',
        shadow: '0 20px 50px rgba(0,0,0,0.3)'
      },
      input: {
        background: '#ffffff',
        borderColor: '#c3c3c3',
        shadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
        placeholderColor: '#a1a1a1',
        borderWidth: '1px',
        borderRadius: '5px',
        icons: {
          mode: 'inside',
          name: 'magnifying-glass',
          position: 'left',
          outsideGap: '6px',
          color: 'rgba(0,0,0,0.3)'
        }
      },
      select: {
        background: '#ffffff',
        borderColor: '#c3c3c3',
        shadow: '0 1px 1px rgba(0,0,0,0.05)',
        borderWidth: '1px',
        borderRadius: '5px'
      },
      table: {
        background: '#ffffff',
        borderColor: '#e5e5e5',
        headerBackground: '#f6f6f6',
        rowHoverBackground: 'rgba(0,122,255,0.05)',
        stripedBackground: '#f9f9f9',
        textColor: '#2d2d2d',
        headerTextColor: '#8e8e93'
      },
      chart: {
        background: 'transparent',
        borderColor: '#e5e5e5',
        gridColor: 'rgba(0,0,0,0.05)',
        labelColor: '#8e8e93',
        colors: ['#007aff', '#28cd41', '#ffcc00', '#ff3b30', '#5ac8fa'],
        fontFamily: 'inherit'
      },
      modal: {
        background: '#ffffff',
        borderColor: '#c3c3c3',
        shadow: '0 30px 70px rgba(0,0,0,0.4)',
        overlayColor: 'rgba(0,0,0,0.4)',
        borderWidth: '1px',
        borderRadius: '8px',
        dividerColor: '#e5e5e5'
      },
      accordion: {
        background: '#ffffff',
        borderColor: '#e5e5e5',
        shadow: 'none',
        dividerColor: '#e5e5e5',
        borderRadius: '5px',
        headerBackground: 'transparent'
      },
      card: {
        background: '#ffffff',
        borderColor: '#e5e5e5',
        shadow: '0 4px 12px rgba(0,0,0,0.1)',
        dividerColor: '#e5e5e5',
        icons: {
          header: '',
          footer: ''
        }
      },
      badge: {
        background: '#007aff',
        textColor: '#ffffff',
        borderRadius: '4px',
        animation: 'none'
      },
      toast: {
        background: '#ffffff',
        borderColor: '#c3c3c3',
        textColor: '#2d2d2d',
        shadow: '0 8px 20px rgba(0,0,0,0.12)',
        borderRadius: '6px',
        padding: '12px 16px',
        gap: '12px',
        minWidth: '320px',
        maxWidth: '420px',
        titleFontSize: '14px',
        titleFontWeight: '600',
        messageFontSize: '13px',
        messageLineHeight: '1.4',
        iconSize: '22px',
        closeIcon: 'x',
        closeButtonSize: '18px',
        closeButtonOpacity: '0.5',
        closeButtonHoverOpacity: '1',
        closeButtonBackground: 'transparent',
        closeButtonBorder: 'none',
        closeButtonBorderRadius: '4px',
        iconColor: {
          info: '#007aff',
          success: '#28cd41',
          warning: '#ffcc00',
          error: '#ff3b30'
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
          textColor: 'var(--fy-colors-text)',
          icon: 'bell',
          badgeBackground: '#ff3b30',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#ffffff',
          borderColor: '#c3c3c3',
          shadow: '0 20px 40px rgba(0,0,0,0.15)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: '5px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(0, 122, 255, 0.05)',
          textColor: '#2d2d2d',
          descriptionColor: '#8e8e93',
          dividerColor: '#e5e5e5',
          unreadIndicator: '#007aff'
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
      trackBackground: '#f1f1f1',
      thumbBackground: '#c1c1c1',
      thumbHoverBackground: '#a8a8a8',
      thumbBorderRadius: '6px',
      thumbBorderWidth: '2px',
      thumbBorderColor: '#f1f1f1'
    }
  },
  darkTokens: {
    colors: {
      primary: '#0a84ff',
      background: '#1e1e1e',
      text: '#d1d1d1',
      secondary: '#6b6b6b',
      surface: '#2d2d2d'
    },
    effects: {
      button: {
        background: 'linear-gradient(to bottom, #4a4a4a 0%, #3a3a3a 100%)',
        borderColor: '#242424',
        shadow: '0 1px 1px rgba(0,0,0,0.2)',
        textColor: '#d1d1d1'
      },
      card: {
        background: '#2d2d2d',
        borderColor: '#3a3a3a',
        dividerColor: '#3a3a3a',
        shadow: '0 8px 24px rgba(0,0,0,0.5)'
      },
      modal: {
        background: '#2d2d2d',
        borderColor: '#3a3a3a',
        shadow: '0 32px 80px rgba(0,0,0,0.7)',
        overlayColor: 'rgba(0,0,0,0.7)',
        borderWidth: '1px',
        borderRadius: '8px',
        dividerColor: '#3a3a3a'
      },
      accordion: {
        background: '#2d2d2d',
        borderColor: '#3a3a3a',
        shadow: 'none',
        dividerColor: '#3a3a3a',
        borderRadius: '5px',
        headerBackground: 'transparent'
      },
      input: {
        background: '#3a3a3a',
        borderColor: '#242424',
        placeholderColor: '#6b6b6b'
      },
      select: {
        background: '#3a3a3a',
        borderColor: '#242424',
        shadow: 'none',
        borderWidth: '1px',
        borderRadius: '5px'
      },
      table: {
        background: '#1e1e1e',
        borderColor: '#3a3a3a',
        headerBackground: '#2d2d2d',
        rowHoverBackground: 'rgba(10,132,255,0.1)',
        stripedBackground: 'rgba(255,255,255,0.02)',
        textColor: '#d1d1d1',
        headerTextColor: '#6b6b6b'
      },
      chart: {
        background: 'transparent',
        gridColor: 'rgba(255,255,255,0.05)',
        labelColor: '#6b6b6b',
        colors: ['#0a84ff', '#32d74b', '#ffd60a', '#ff453a', '#64d2ff']
      },
      toast: {
        background: '#2d2d2d',
        borderColor: '#3a3a3a',
        textColor: '#d1d1d1',
        shadow: '0 10px 25px rgba(0,0,0,0.6)',
        borderRadius: '6px',
        closeButtonOpacity: '0.6',
        closeButtonHoverOpacity: '1',
        iconColor: {
          info: '#0a84ff',
          success: '#32d74b',
          warning: '#ffd60a',
          error: '#ff453a'
        }
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: 'var(--fy-colors-text)',
          icon: 'bell',
          badgeBackground: '#ff453a',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#2d2d2d',
          borderColor: '#3a3a3a',
          shadow: '0 20px 40px rgba(0,0,0,0.6)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: '5px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(10, 132, 255, 0.1)',
          textColor: '#d1d1d1',
          descriptionColor: '#6b6b6b',
          dividerColor: '#3a3a3a',
          unreadIndicator: '#0a84ff'
        }
      }
    }
  },
  componentAnimations: {
    'fy-button': mojaveButtonAnimations,
    'fy-input': {
      focus: 'input-focus-macos-glow',
      success: 'input-success-macos-pulse',
      error: 'input-error-macos-shake'
    },
    'fy-layout': {
      enter: 'layout-macos-window-enter'
    },
    'fy-slot:header': {
      open: 'header-menu-macos-slide-in',
      close: 'header-menu-macos-slide-out'
    },
    'fy-slot:sidebar': {
      open: 'sidebar-macos-slide-in',
      close: 'sidebar-macos-slide-out'
    },
    'fy-card': {
      enter: 'card-macos-fade-in'
    },
    'fy-notification-menu': {
      open: 'dropdown-in',
      close: 'dropdown-out'
    },
    'fy-accordion': {
      expand: 'accordion-expand',
      collapse: 'accordion-collapse'
    },
    'fy-table': {
      enter: 'table-fade-in',
      rowEnter: 'table-row-enter'
    }
  }
};
