import { ThemeDefinition } from '@fylib/core';

export const fineyPuffy1Theme: ThemeDefinition = {
  name: 'finey-puffy-1',
  backgroundEffect: {
    name: 'hearts',
    intensity: 20,
    speed: 0.2,
    loop: true
  },
  wallpaper: {
    name: 'hearts',
    type: 'pattern',
    opacity: 0.1
  },
  tokens: {
    colors: {
      primary: '#ff85a2',
      secondary: '#ffccd5',
      success: '#ffccd5',
      danger: '#ff85a2',
      warning: '#ffccd5',
      info: '#ff85a2',
      white: '#ffffff',
      black: '#590d22',
      background: '#fff0f3',
      text: '#590d22',
      'primary-rgb': '255, 133, 162',
      surface: '#ffffff'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px'
    },
    borderRadius: {
      sm: '10px',
      md: '20px',
      lg: '30px',
      full: '9999px'
    },
    typography: {
      fontFamily: {
        base: '"Quicksand", sans-serif',
        heading: '"Quicksand", sans-serif',
        mono: 'monospace'
      },
      fontSize: {
        sm: '12px',
        md: '14px',
        lg: '18px'
      },
      fontWeight: {
        normal: '500',
        bold: '700'
      }
    },
    layout: {
      app: {
        gap: '0'
      },
      header: {
        height: '70px',
        padding: '0 24px',
        background: '#ffffff',
        shadow: '0 4px 20px rgba(255, 133, 162, 0.1)',
        toggle: {
          background: 'transparent',
          textColor: '#ff85a2',
          borderRadius: '12px',
          icon: 'heart'
        }
      },
      sidebar: {
        width: '280px',
        background: '#fff0f3',
        padding: '20px 0',
        shadow: 'none',
        toggle: {
          background: '#ff85a2',
          textColor: '#ffffff',
          borderRadius: '50%',
          icon: 'heart',
          mode: 'floating',
          tonguePosition: 'bottom'
        }
      },
      content: {
        padding: '30px'
      }
    },
    effects: {
      button: {
        background: 'linear-gradient(135deg, #ff85a2 0%, #ffb3c6 100%)',
        borderColor: 'transparent',
        shadow: '0 4px 15px rgba(255, 133, 162, 0.3)',
        textColor: '#ffffff'
      },
      window: {
        background: '#ffffff',
        shadow: '0 10px 40px rgba(255, 133, 162, 0.1)'
      },
      modal: {
        background: '#ffffff',
        borderColor: '#ffccd5',
        shadow: '0 20px 60px rgba(255, 133, 162, 0.2)',
        overlayColor: 'rgba(89, 13, 34, 0.3)',
        borderWidth: '2px',
        borderRadius: '30px',
        dividerColor: '#fff0f3'
      },
      accordion: {
        background: '#ffffff',
        borderColor: '#ffccd5',
        shadow: 'none',
        dividerColor: '#fff0f3',
        borderRadius: '20px',
        headerBackground: 'transparent'
      },
      input: {
        background: '#ffffff',
        borderColor: '#ffccd5',
        placeholderColor: '#ffb3c6',
        shadow: 'none'
      },
      select: {
        background: '#ffffff',
        borderColor: '#ffccd5',
        shadow: 'none'
      },
      card: {
        background: '#ffffff',
        borderColor: '#ffe5ec',
        dividerColor: '#ffe5ec',
        shadow: '0 10px 40px rgba(255, 133, 162, 0.08)'
      },
      table: {
        background: '#ffffff',
        borderColor: '#ffe5ec',
        headerBackground: '#fff0f3',
        rowHoverBackground: '#fff0f3',
        stripedBackground: '#fff9fa',
        textColor: '#590d22',
        headerTextColor: '#ff85a2'
      },
      chart: {
        background: 'transparent',
        gridColor: 'rgba(255, 133, 162, 0.1)',
        labelColor: '#ff85a2',
        colors: ['#ff85a2', '#ffccd5', '#ffb3c6', '#fb6f92', '#ffc2d1']
      },
      scrollbar: {
        width: '12px',
        trackBackground: '#fff0f3',
        thumbBackground: '#ffccd5',
        thumbHoverBackground: '#ffb3c6',
        thumbBorderRadius: '6px',
        thumbBorderWidth: '2px',
        thumbBorderColor: '#fff0f3'
      },
      notificationMenu: {
        button: {
          icon: "heart",
          textColor: '#ff85a2'
        },
        dropdown: {
          
        }
      }
    }
  },
  darkTokens: {
    colors: {
      primary: '#ff4d7d',
      background: '#3a0916',
      text: '#fff0f3',
      secondary: '#ff85a2',
      surface: '#5a0a20'
    },
    layout: {
      header: {
        background: '#5a0a20',
        shadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
        toggle: {
          textColor: '#ffccd5'
        }
      },
      sidebar: {
        background: '#3a0916',
        toggle: {
          background: '#ff4d7d',
          textColor: '#3a0916'
        }
      }
    },
    effects: {
      card: {
        background: '#5a0a20',
        borderColor: 'rgba(255,255,255,0.1)',
        dividerColor: 'rgba(255,255,255,0.15)',
        shadow: '0 10px 40px rgba(0,0,0,0.5)'
      },
      button: {
        background: 'linear-gradient(135deg, #ff4d7d 0%, #800f2f 100%)',
        borderColor: 'transparent',
        shadow: '0 4px 15px rgba(255, 133, 162, 0.2)',
        textColor: '#ffffff'
      },
      window: {
        background: '#3a0916',
        shadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
      },
      modal: {
        background: '#5a0a20',
        borderColor: 'rgba(255,255,255,0.15)',
        shadow: '0 20px 60px rgba(0,0,0,0.6)',
        overlayColor: 'rgba(0,0,0,0.5)',
        borderWidth: '1px',
        borderRadius: '30px',
        dividerColor: 'rgba(255,255,255,0.12)'
      },
      input: {
        background: '#3a0916',
        borderColor: 'rgba(255,255,255,0.15)',
        placeholderColor: '#ff85a2'
      },
      select: {
        background: '#3a0916',
        borderColor: 'rgba(255,255,255,0.15)',
        shadow: 'none'
      },
      table: {
        background: '#5a0a20',
        borderColor: 'rgba(255,255,255,0.1)',
        headerBackground: 'rgba(255,255,255,0.05)',
        rowHoverBackground: 'rgba(255,255,255,0.05)',
        stripedBackground: 'rgba(255,255,255,0.02)',
        textColor: '#fff0f3',
        headerTextColor: '#ff4d7d'
      },
      accordion: {
        background: '#5a0a20',
        borderColor: 'rgba(255,255,255,0.1)',
        shadow: 'none',
        dividerColor: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        headerBackground: 'transparent'
      },
      chart: {
        background: 'transparent',
        gridColor: 'rgba(255, 255, 255, 0.05)',
        labelColor: '#ff85a2',
        colors: ['#ff4d7d', '#ff85a2', '#ffccd5', '#800f2f', '#ffc2d1']
      },
      toast: {
        background: '#5a0a20',
        borderColor: 'rgba(255,255,255,0.1)',
        textColor: '#fff0f3'
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#ffccd5',
          icon: 'heart',
          badgeBackground: '#ff4d7d',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#5a0a20',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          shadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: '20px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(255, 255, 255, 0.05)',
          textColor: '#fff0f3',
          descriptionColor: '#ff85a2',
          dividerColor: 'rgba(255, 255, 255, 0.1)',
          unreadIndicator: '#ff4d7d'
        }
      }
    },
    scrollbar: {
      trackBackground: '#3a0916',
      thumbBackground: '#800f2f',
      thumbHoverBackground: '#ff4d7d',
      thumbBorderColor: '#3a0916'
    }
  },
  componentAnimations: {
    'fy-button': {
      hover: 'button-hover-soft',
      click: 'button-click-press'
    },
    'fy-layout': {
      enter: 'layout-fade-in'
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
            background: 'linear-gradient(135deg, #ff85a2 0%, #ffb3c6 100%)',
            textColor: '#ffffff',
            shadow: '0 4px 15px rgba(255, 133, 162, 0.3)',
            borderRadius: '20px'
          }
        }
      },
      secondary: {
        effects: {
          button: {
            background: '#ffccd5',
            textColor: '#590d22',
            shadow: '0 2px 10px rgba(255, 204, 213, 0.2)',
            borderRadius: '20px'
          }
        }
      }
    },
    'fy-card': {
      default: {
        effects: {
          card: {
            background: 'var(--fy-colors-surface)',
            borderColor: '#ffe5ec',
            shadow: '0 10px 40px rgba(255, 133, 162, 0.08)',
            borderRadius: '24px'
          }
        }
      }
    }
  }
};
