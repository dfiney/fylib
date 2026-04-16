import { ThemeDefinition } from '@fylib/core';

export const defaultTheme: ThemeDefinition = {
  name: 'default',
  tokens: {
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
      white: '#ffffff',
      black: '#0f172a',
      background: '#f8fafc',
      text: '#0f172a',
      'primary-rgb': '59, 130, 246',
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
      sm: '4px',
      md: '8px',
      lg: '12px',
      full: '9999px'
    },
    typography: {
      fontFamily: {
        base: 'system-ui, -apple-system, sans-serif',
        heading: 'system-ui, -apple-system, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      },
      fontSize: {
        sm: '12px',
        md: '14px',
        lg: '16px'
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
        height: '64px',
        padding: '0 24px',
        background: '#ffffff',
        shadow: '0 1px 2px rgba(0,0,0,0.05)',
        toggle: {
          background: 'transparent',
          textColor: 'var(--fy-colors-secondary)',
          borderRadius: 'var(--fy-borderRadius-md)',
          icon: 'menu'
        }
      },
      sidebar: {
        width: '260px',
        background: '#f1f5f9',
        padding: '16px 0',
        shadow: 'none',
        toggle: {
          background: 'var(--fy-colors-primary)',
          textColor: '#ffffff',
          borderRadius: 'var(--fy-borderRadius-full)',
          icon: 'menu',
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
        background: 'var(--fy-colors-primary)',
        borderColor: 'transparent',
        shadow: '0 1px 2px rgba(0,0,0,0.05)',
        textColor: '#ffffff'
      },
      window: {
        background: '#ffffff',
        shadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
      },
      modal: {
        background: '#ffffff',
        borderColor: '#e2e8f0',
        shadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        overlayColor: 'rgba(15, 23, 42, 0.5)',
        borderWidth: '1px',
        borderRadius: 'var(--fy-borderRadius-lg)',
        dividerColor: '#f1f5f9'
      },
      accordion: {
        background: '#ffffff',
        borderColor: '#e2e8f0',
        shadow: 'none',
        dividerColor: '#f1f5f9',
        borderRadius: 'var(--fy-borderRadius-md)',
        headerBackground: 'transparent'
      },
      input: {
        background: '#ffffff',
        borderColor: '#e2e8f0',
        placeholderColor: '#94a3b8',
        shadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
      },
      select: {
        background: '#ffffff',
        borderColor: '#e2e8f0',
        shadow: '0 1px 2px rgba(0,0,0,0.05)'
      },
      card: {
        background: '#ffffff',
        borderColor: '#f1f5f9',
        dividerColor: '#f1f5f9',
        shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      },
      table: {
        background: '#ffffff',
        borderColor: '#f1f5f9',
        headerBackground: '#f8fafc',
        rowHoverBackground: '#f1f5f9',
        stripedBackground: '#f8fafc',
        textColor: '#0f172a',
        headerTextColor: '#64748b'
      },
      chart: {
        background: 'transparent',
        gridColor: '#f1f5f9',
        labelColor: '#64748b',
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      },
      toast: {
        background: '#ffffff',
        borderColor: '#f1f5f9',
        textColor: '#0f172a',
        shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        borderRadius: 'var(--fy-borderRadius-md)',
        closeButtonOpacity: '0.4',
        closeButtonHoverOpacity: '1',
        iconColor: {
          info: '#3b82f6',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
        }
      },
      notificationMenu: {
        button: {
          textColor: 'var(--fy-colors-secondary)',
          badgeBackground: '#ef4444',
          background: 'transparent',
          icon: 'bell',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#ffffff',
          borderColor: '#f1f5f9',
          shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: 'var(--fy-borderRadius-md)'
        },
        item: {
          hoverBackground: '#f8fafc',
          textColor: '#0f172a',
          descriptionColor: '#64748b',
          dividerColor: '#f1f5f9',
          unreadIndicator: '#3b82f6',
          background: ''
        }
      }
    },
    icons: {
      defaultSet: 'ph',
      size: { sm: '16px', md: '20px', lg: '24px' },
      strokeWidth: '2',
      variant: 'regular'
    },
    scrollbar: {
      width: '10px',
      trackBackground: '#f3f4f6',
      thumbBackground: '#d1d5db',
      thumbHoverBackground: '#9ca3af',
      thumbBorderRadius: '5px',
      thumbBorderWidth: '2px',
      thumbBorderColor: '#f3f4f6'
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
    layout: {
      header: {
        background: '#0f172a',
        shadow: '0 1px 2px rgba(0,0,0,0.5)',
        toggle: {
          background: 'rgba(255,255,255,0.05)',
          textColor: '#60a5fa'
        }
      },
      sidebar: {
        background: '#111827',
        toggle: {
          background: '#60a5fa',
          textColor: '#ffffff'
        }
      }
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
        shadow: '0 6px 16px rgba(0, 0, 0, 0.4)'
      },
      table: {
        background: '#0f172a',
        borderColor: 'rgba(255,255,255,0.08)',
        headerBackground: 'rgba(255,255,255,0.04)',
        rowHoverBackground: 'rgba(255,255,255,0.02)',
        stripedBackground: 'rgba(255,255,255,0.01)',
        textColor: '#f9fafb',
        headerTextColor: '#9ca3af'
      },
      toast: {
        background: '#1f2937',
        borderColor: 'rgba(255,255,255,0.08)',
        textColor: '#f9fafb',
        shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#f9fafb',
          icon: 'bell',
          badgeBackground: '#ef4444',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#1f2937',
          borderColor: 'rgba(255,255,255,0.08)',
          shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: 'var(--fy-borderRadius-md)'
        },
        item: {
          background: 'transparent',
          hoverBackground: '#374151',
          textColor: '#f9fafb',
          descriptionColor: '#9ca3af',
          dividerColor: 'rgba(255,255,255,0.08)',
          unreadIndicator: '#60a5fa'
        }
      }
    },
    scrollbar: {
      trackBackground: '#111827',
      thumbBackground: '#374151',
      thumbHoverBackground: '#4b5563',
      thumbBorderColor: '#111827'
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
  },
  componentVariants: {
    'fy-button': {
      primary: {
        effects: {
          button: {
            background: 'var(--fy-colors-primary)',
            textColor: 'var(--fy-colors-white)',
            borderColor: 'transparent'
          }
        }
      },
      secondary: {
        effects: {
          button: {
            background: 'var(--fy-colors-secondary)',
            textColor: 'var(--fy-colors-white)',
            borderColor: 'transparent'
          }
        }
      },
      ghost: {
        effects: {
          button: {
            background: 'transparent',
            textColor: 'var(--fy-colors-primary)',
            borderColor: 'var(--fy-colors-primary)'
          }
        }
      },
      danger: {
        effects: {
          button: {
            background: 'var(--fy-colors-danger)',
            textColor: 'var(--fy-colors-white)',
            borderColor: 'transparent'
          }
        }
      }
    },
    'fy-card': {
      default: {
        effects: {
          card: {
            background: 'var(--fy-colors-surface)',
            borderColor: 'rgba(15, 23, 42, 0.08)',
            shadow: '0 1px 3px rgba(15, 23, 42, 0.08)'
          }
        }
      },
      elevated: {
        effects: {
          card: {
            background: 'var(--fy-colors-surface)',
            borderColor: 'transparent',
            shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }
        }
      },
      outlined: {
        effects: {
          card: {
            background: 'transparent',
            borderColor: 'var(--fy-colors-secondary)',
            shadow: 'none'
          }
        }
      }
    }
  }
};
