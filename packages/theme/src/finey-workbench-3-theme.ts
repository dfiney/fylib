import { ThemeDefinition } from '@fylib/core';
import {
  ButtonHoverAnimationName,
  ButtonClickAnimationName,
  ButtonStateAnimationName
} from '@fylib/animation';

const sequoiaButtonAnimations: {
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

export const fineyWorkbench3Theme: ThemeDefinition = {
  name: 'finey-workbench-3',
  backgroundEffect: {
    name: 'stars',
    intensity: 100,
    speed: 0.2,
    loop: true
  },
  wallpaper: {
    name: 'mesh-gradient',
    type: 'pattern',
    opacity: 0.1
  },
  tokens: {
    colors: {
      primary: '#007aff',
      secondary: '#86868b',
      success: '#28cd41',
      danger: '#ff3b30',
      warning: '#ffcc00',
      info: '#5ac8fa',
      white: '#ffffff',
      black: '#000000',
      background: '#f5f5f7',
      text: '#1d1d1f',
      'primary-rgb': '0, 122, 255',
      surface: 'rgba(255, 255, 255, 0.72)'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '20px',
      xl: '28px'
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '16px',
      full: '9999px'
    },
    typography: {
      fontFamily: {
        base: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
        heading: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
        mono: '"SF Mono", ui-monospace, Menlo, Monaco, monospace'
      },
      fontSize: {
        sm: '12px',
        md: '14px',
        lg: '19px'
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
        height: '52px',
        padding: '0 16px',
        shadow: 'none',
        toggle: {
          background: 'transparent',
          textColor: 'var(--fy-colors-text)',
          borderRadius: '8px',
          icon: 'list'
        }
      },
      sidebar: {
        width: '260px',
        padding: '16px 0',
        toggle: {
          background: 'transparent',
          textColor: 'var(--fy-colors-text)',
          borderRadius: '8px',
          icon: 'sidebar',
          mode: 'floating',
          tonguePosition: 'bottom'
        }
      },
      content: {
        padding: '24px'
      }
    },
    effects: {
      button: {
        background: '#ffffff',
        borderColor: 'rgba(0,0,0,0.08)',
        shadow: '0 1px 2px rgba(0,0,0,0.05)',
        textColor: '#1d1d1f'
      },
      window: {
        background: 'rgba(245, 245, 247, 0.8)',
        shadow: '0 24px 60px rgba(0,0,0,0.15)'
      },
      input: {
        background: 'rgba(255, 255, 255, 0.5)',
        borderColor: 'rgba(0,0,0,0.1)',
        shadow: 'none',
        placeholderColor: '#86868b',
        borderWidth: '1px',
        borderRadius: '8px',
        icons: {
          mode: 'inside',
          name: 'magnifying-glass',
          position: 'left',
          outsideGap: '8px',
          color: 'rgba(0,0,0,0.4)'
        }
      },
      select: {
        background: 'rgba(255, 255, 255, 0.96)',
        borderColor: 'rgba(0,0,0,0.1)',
        shadow: 'none',
        borderWidth: '1px',
        borderRadius: '8px'
      },
      table: {
        background: 'transparent',
        borderColor: 'rgba(0,0,0,0.05)',
        headerBackground: 'rgba(0,0,0,0.02)',
        rowHoverBackground: 'rgba(0,122,255,0.05)',
        stripedBackground: 'rgba(0,0,0,0.01)',
        textColor: '#1d1d1f',
        headerTextColor: '#86868b',
      },
      modal: {
        background: 'rgba(255, 255, 255, 0.96)',
        borderColor: 'rgba(0,0,0,0.1)',
        shadow: '0 40px 100px rgba(0,0,0,0.25)',
        overlayColor: 'rgba(0,0,0,0.3)',
        borderWidth: '1px',
        borderRadius: '12px',
        dividerColor: 'rgba(0,0,0,0.05)'
      },
      accordion: {
        background: 'transparent',
        borderColor: 'rgba(0,0,0,0.05)',
        shadow: 'none',
        dividerColor: 'rgba(0,0,0,0.05)',
        borderRadius: '10px',
        headerBackground: 'transparent'
      },
      card: {
        background: 'rgba(255, 255, 255, 0.96)',
        borderColor: 'rgba(0,0,0,0.05)',
        shadow: '0 10px 20px rgba(0,0,0,0.04)',
        dividerColor: 'rgba(0,0,0,0.05)',
        icons: {
          header: '',
          footer: ''
        }
      },
      badge: {
        background: '#007aff',
        textColor: '#ffffff',
        borderRadius: '6px',
        animation: 'shine'
      },
      chart: {
        background: 'transparent',
        borderColor: 'rgba(0,0,0,0.05)',
        gridColor: 'rgba(0,0,0,0.04)',
        labelColor: '#86868b',
        colors: ['#007aff', '#34c759', '#ff9500', '#ff3b30', '#af52de'],
        fontFamily: 'inherit'
      },
      toast: {
        background: 'rgba(255, 255, 255, 0.90)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        textColor: '#1d1d1f',
        shadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.5)',
        borderRadius: '16px',
        padding: '14px 20px',
        gap: '14px',
        minWidth: '340px',
        maxWidth: '440px',
        titleFontSize: '15px',
        titleFontWeight: '600',
        messageFontSize: '14px',
        messageLineHeight: '1.4',
        iconSize: '24px',
        closeIcon: 'x',
        closeButtonSize: '20px',
        closeButtonOpacity: '0.4',
        closeButtonHoverOpacity: '1',
        closeButtonBackground: 'rgba(0,0,0,0.03)',
        closeButtonBorder: 'none',
        closeButtonBorderRadius: '50%',
        iconColor: {
          info: '#007aff',
          success: '#28cd41',
          warning: '#ff9500',
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
          background: 'rgba(255, 255, 255, 0.85)',
          borderColor: 'rgba(0,0,0,0.1)',
          shadow: '0 20px 40px rgba(0,0,0,0.15)',
          width: '320px',
          maxHeight: '450px',
          borderRadius: '14px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(0,0,0,0.03)',
          textColor: '#1d1d1f',
          descriptionColor: '#86868b',
          dividerColor: 'rgba(0,0,0,0.05)',
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
      width: '8px',
      trackBackground: 'transparent',
      thumbBackground: 'rgba(0,0,0,0.2)',
      thumbHoverBackground: 'rgba(0,0,0,0.3)',
      thumbBorderRadius: '10px',
      thumbBorderWidth: '2px',
      thumbBorderColor: 'transparent'
    }
  },
  darkTokens: {
    colors: {
      primary: '#0a84ff',
      background: '#000000',
      text: '#f5f5f7',
      secondary: '#86868b',
      surface: 'rgba(29, 29, 31, 0.72)'
    },
    layout: {
      header: {
        background: 'rgba(29, 29, 31, 0.96)',
        shadow: 'none',
        toggle: {
          background: 'transparent',
          textColor: '#0a84ff'
        }
      },
      sidebar: {
        background: 'rgba(29, 29, 31, 0.96)',
        toggle: {
          background: 'transparent',
          textColor: '#0a84ff'
        }
      }
    },
    effects: {
      accordion: {
        borderColor: '#f5f5f71c',
        dividerColor: '#f5f5f71c',
      },
      button: {
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadow: '0 1px 2px rgba(0,0,0,0.2)',
        textColor: '#f5f5f7'
      },
      window: {
        background: 'rgba(29, 29, 31, 0.8)',
        shadow: '0 24px 60px rgba(0,0,0,0.4)'
      },
      card: {
        background: 'rgba(29, 29, 31, 0.6)',
        borderColor: 'rgba(255,255,255,0.05)',
        dividerColor: 'rgba(255,255,255,0.05)',
        shadow: '0 10px 20px rgba(0,0,0,0.2)'
      },
      modal: {
        background: 'rgba(44, 44, 46, 0.96)',
        borderColor: 'rgba(255,255,255,0.1)',
        shadow: '0 40px 100px rgba(0,0,0,0.5)',
        overlayColor: 'rgba(0,0,0,0.5)',
        borderWidth: '1px',
        borderRadius: '12px',
        dividerColor: 'rgba(255,255,255,0.05)'
      },
      input: {
        background: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        placeholderColor: '#86868b'
      },
      select: {
        background: 'rgba(44, 44, 46, 0.98)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadow: 'none',
        borderWidth: '1px',
        borderRadius: '8px'
      },
      table: {
        background: 'transparent',
        borderColor: 'rgba(255,255,255,0.05)',
        headerBackground: 'rgba(255,255,255,0.02)',
        rowHoverBackground: 'rgba(10,132,255,0.1)',
        stripedBackground: 'rgba(255,255,255,0.01)',
        textColor: '#f5f5f7',
        headerTextColor: '#86868b'
      },
      chart: {
        background: 'transparent',
        gridColor: 'rgba(255,255,255,0.04)',
        labelColor: '#86868b',
        colors: ['#0a84ff', '#32d74b', '#ff9f0a', '#ff453a', '#bf5af2']
      },
      toast: {
        background: 'rgba(44, 44, 46, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textColor: '#f5f5f7',
        shadow: '0 12px 48px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
        borderRadius: '16px',
        closeButtonOpacity: '0.5',
        closeButtonHoverOpacity: '1',
        iconColor: {
          info: '#0a84ff',
          success: '#30d158',
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
          background: 'rgba(44, 44, 46, 0.85)',
          borderColor: 'rgba(255,255,255,0.1)',
          shadow: '0 20px 40px rgba(0,0,0,0.5)',
          width: '320px',
          maxHeight: '450px',
          borderRadius: '14px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(255,255,255,0.03)',
          textColor: '#f5f5f7',
          descriptionColor: '#86868b',
          dividerColor: 'rgba(255,255,255,0.05)',
          unreadIndicator: '#0a84ff'
        }
      }
    },
    scrollbar: {
      trackBackground: 'transparent',
      thumbBackground: 'rgba(255,255,255,0.2)',
      thumbHoverBackground: 'rgba(255,255,255,0.3)',
      thumbBorderColor: 'transparent'
    }
  },
  componentAnimations: {
    'fy-button': sequoiaButtonAnimations,
    'fy-input': {
      focus: 'input-focus-macos-glow',
      success: 'input-success-macos-pulse',
      error: 'input-error-shake'
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
  },
  componentVariants: {
    'fy-button': {
      primary: {
        effects: {
          button: {
            background: '#007aff',
            textColor: '#ffffff'
          }
        }
      }
    },
    'fy-card': {
      default: {
        effects: {
          card: {
            background: 'var(--fy-colors-surface)',
            borderColor: 'rgba(255,255,255,0.1)',
            shadow: '0 4px 12px rgba(0,0,0,0.2)'
          }
        }
      }
    }
  }
};
