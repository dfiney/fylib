import { ThemeDefinition } from '@fylib/core';

export const fineyHub1Theme: ThemeDefinition = {
  name: 'finey-hub-1',
  backgroundEffect: {
    name: 'dots',
    intensity: 30,
    speed: 0.5,
    loop: true
  },
  wallpaper: {
    name: 'dots',
    type: 'pattern',
    opacity: 0.05
  },
  tokens: {
    colors: {
      primary: '#0969da', // GitHub Blue
      secondary: '#656d76',
      success: '#1a7f37',
      danger: '#d1242f',
      warning: '#9a6700',
      info: '#0969da',
      white: '#ffffff',
      black: '#1f2328',
      background: '#ffffff',
      text: '#1f2328',
      'primary-rgb': '9,105,218',
      surface: '#f6f8fa',
      border: '#d0d7de'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    borderRadius: {
      sm: '6px',
      md: '6px',
      lg: '12px',
      full: '9999px',
    },
    typography: {
      fontFamily: {
        base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
      },
      fontSize: {
        sm: '12px',
        md: '14px',
        lg: '16px',
      },
      fontWeight: {
        normal: '400',
        bold: '600',
      }
    },
    layout: {
      app: {
        gap: '0'
      },
      header: {
        height: '64px',
        padding: '0 24px',
        shadow: '0 1px 0 rgba(31,35,40,0.04)',
        toggle: {
          background: 'transparent',
          textColor: '#1f2328',
          borderColor: '#d0d7de',
          borderRadius: '6px',
          icon: 'list' // 8-bit feel
        }
      },
      sidebar: {
        width: '260px',
        padding: '16px 0',
        toggle: {
          background: '#f6f8fa',
          textColor: '#1f2328',
          borderColor: '#d0d7de',
          borderRadius: '6px',
          icon: 'list',
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
        background: '#f6f8fa',
        borderColor: '#d0d7de',
        shadow: '0 1px 0 rgba(31,35,40,0.04)',
        textColor: '#1f2328'
      },
      window: {
        background: '#ffffff',
        shadow: '0 8px 24px rgba(149,157,165,0.2)',
        borderColor: '#d0d7de'
      },
      modal: {
        background: '#ffffff',
        borderColor: '#d0d7de',
        shadow: '0 8px 24px rgba(140,149,159,0.2)',
        overlayColor: 'rgba(31,35,40,0.5)',
        borderWidth: '1px',
        borderRadius: '12px',
        dividerColor: '#d0d7de'
      },
      input: {
        background: '#ffffff',
        borderColor: '#d0d7de',
        shadow: 'inset 0 1px 0 rgba(31,35,40,0.02)',
        placeholderColor: '#6e7781',
        borderWidth: '1px',
        borderRadius: '6px',
        icons: {
          mode: 'inside',
          name: 'magnifying-glass',
          position: 'left',
          outsideGap: '8px',
          color: '#656d76'
        }
      },
      card: {
        background: '#ffffff',
        borderColor: '#d0d7de',
        shadow: 'none',
        dividerColor: '#d0d7de'
      },
      select: {
        background: '#ffffff',
        borderColor: '#d0d7de',
        shadow: '0 1px 0 rgba(31,35,40,0.04)',
        borderWidth: '1px',
        borderRadius: '6px'
      },
      table: {
        background: '#ffffff',
        borderColor: '#d0d7de',
        headerBackground: '#f6f8fa',
        rowHoverBackground: '#f6f8fa',
        stripedBackground: '#f6f8fa',
        textColor: '#1f2328',
        headerTextColor: '#656d76'
      },
      accordion: {
        background: '#ffffff',
        borderColor: '#d0d7de',
        shadow: 'none',
        dividerColor: '#d0d7de',
        borderRadius: '6px',
        headerBackground: 'transparent'
      },
      badge: {
        background: '#eff1f3',
        textColor: '#1f2328',
        borderRadius: '999px',
        animation: 'none'
      },
      toast: {
        background: '#ffffff',
        borderColor: '#d0d7de',
        textColor: '#1f2328',
        shadow: '0 8px 24px rgba(140,149,159,0.2)',
        borderRadius: '6px'
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#1f2328',
          icon: 'bell',
          badgeBackground: '#cf222e',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#ffffff',
          borderColor: '#d0d7de',
          shadow: '0 8px 24px rgba(140,149,159,0.2)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: '6px'
        },
        item: {
          background: 'transparent',
          hoverBackground: '#f6f8fa',
          textColor: '#1f2328',
          descriptionColor: '#656d76',
          dividerColor: '#d0d7de',
          unreadIndicator: '#0969da'
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
    }
  },
  darkTokens: {
    colors: {
      primary: '#2f81f7',
      secondary: '#7d8590',
      success: '#238636',
      danger: '#f85149',
      warning: '#d29922',
      info: '#2f81f7',
      white: '#f0f6fc',
      black: '#010409',
      background: '#0d1117',
      text: '#e6edf3',
      'primary-rgb': '47,129,247',
      surface: '#161b22',
      border: '#30363d'
    },
    layout: {
      header: {
        shadow: '0 1px 0 rgba(1,4,9,0.85)',
        toggle: {
          textColor: '#e6edf3',
          borderColor: '#30363d'
        }
      },
      sidebar: {
        toggle: {
          background: '#161b22',
          textColor: '#e6edf3',
          borderColor: '#30363d'
        }
      }
    },
    effects: {
      button: {
        background: '#21262d',
        borderColor: '#30363d',
        shadow: '0 1px 0 rgba(1,4,9,0.04)',
        textColor: '#c9d1d9'
      },
      window: {
        background: '#0d1117',
        shadow: '0 8px 24px rgba(1,4,9,0.5)',
        borderColor: '#30363d'
      },
      modal: {
        background: '#161b22',
        borderColor: '#30363d',
        shadow: '0 8px 24px rgba(1,4,9,0.5)',
        overlayColor: 'rgba(1,4,9,0.8)',
        dividerColor: '#30363d'
      },
      input: {
        background: '#0d1117',
        borderColor: '#30363d',
        shadow: 'none',
        placeholderColor: '#484f58',
        icons: {
          color: '#7d8590'
        }
      },
      select: {
        background: '#161b22',
        borderColor: '#30363d',
        shadow: '0 8px 24px rgba(1,4,9,0.5)',
        borderWidth: '1px',
        borderRadius: '6px'
      },
      table: {
        background: '#0d1117',
        borderColor: '#30363d',
        headerBackground: '#161b22',
        rowHoverBackground: '#161b22',
        stripedBackground: '#161b22',
        textColor: '#e6edf3',
        headerTextColor: '#7d8590'
      },
      card: {
        background: '#0d1117',
        borderColor: '#30363d',
        dividerColor: '#30363d'
      },
      accordion: {
        background: '#0d1117',
        borderColor: '#30363d',
        shadow: 'none',
        dividerColor: '#30363d',
        borderRadius: '6px',
        headerBackground: 'transparent'
      },
      badge: {
        background: '#21262d',
        textColor: '#c9d1d9'
      },
      toast: {
        background: '#161b22',
        borderColor: '#30363d',
        textColor: '#e6edf3',
        shadow: '0 8px 24px rgba(1,4,9,0.5)',
        borderRadius: '6px'
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#e6edf3',
          icon: 'bell',
          badgeBackground: '#f85149',
          badgeTextColor: '#f0f6fc'
        },
        dropdown: {
          background: '#161b22',
          borderColor: '#30363d',
          shadow: '0 8px 24px rgba(1,4,9,0.5)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: '6px'
        },
        item: {
          background: 'transparent',
          hoverBackground: '#161b22',
          textColor: '#e6edf3',
          descriptionColor: '#7d8590',
          dividerColor: '#30363d',
          unreadIndicator: '#2f81f7'
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
    }
  },
  componentAnimations: {
    'fy-button': {
      hover: 'button-hover-lift'
    },
    'fy-card': {
      enter: 'card-fade-in'
    },
    'fy-layout': {
      enter: 'layout-fade-in'
    }
  }
};
