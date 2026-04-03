import { ThemeDefinition } from '@fylib/core';

export const christmasTheme: ThemeDefinition = {
  name: 'christmas',
  backgroundEffect: {
    name: 'snow',
    intensity: 150,
    speed: 1,
    loop: true
  },
  wallpaper: {
    name: 'pine-trees',
    type: 'pattern',
    opacity: 0.1
  },
  tokens: {
    colors: {
      primary: '#af111c', // Vermelho Natal
      secondary: '#2f5233', // Verde Natal
      success: '#22c55e',
      danger: '#af111c',
      warning: '#f59e0b',
      info: '#3b82f6',
      white: '#ffffff',
      black: '#000000',
      background: '#f8f9fa',
      text: '#1a472a',
      'primary-rgb': '175, 17, 28',
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
      md: '16px', // Bordas mais arredondadas para o Natal
      lg: '24px',
      full: '9999px',
    },
    typography: {
      fontFamily: {
        base: '"Playfair Display", "Times New Roman", ui-serif, Georgia, serif',
        heading: '"Playfair Display", "Times New Roman", ui-serif, Georgia, serif',
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
      app: { gap: '0' },
      header: {
        height: '64px',
        padding: '0 24px',
        shadow: '0 1px 0 rgba(0,0,0,0.06)',
        toggle: {
          background: 'var(--fy-colors-secondary)',
          textColor: 'var(--fy-colors-white)',
          borderRadius: '9999px',
          icon: 'menu'
        }
      },
      sidebar: {
        width: '260px',
        padding: '16px 0',
        toggle: {
          background: 'var(--fy-colors-secondary)',
          textColor: 'var(--fy-colors-white)',
          borderRadius: '9999px',
          icon: 'menu',
          mode: 'floating',
          tonguePosition: 'bottom'
        }
      },
      content: { padding: '24px' }
    },
    effects: {
      button: {
        background: 'linear-gradient(to bottom, #fff 0%, #ffd9d9 40%, #f2b3b3 100%)',
        borderColor: '#8a1f1f',
        shadow: 'inset 0 0 0 1px rgba(255,255,255,0.6)',
        textColor: '#2f5233'
      },
      window: {
        background: 'var(--fy-colors-background)',
        shadow: '0 4px 16px rgba(0,0,0,0.15)'
      },
      modal: {
        background: '#ffffff',
        borderColor: 'rgba(47, 82, 51, 0.25)',
        shadow: '0 24px 60px rgba(0,0,0,0.25)',
        overlayColor: 'rgba(0,0,0,0.45)',
        borderWidth: '1px',
        borderRadius: '16px',
        dividerColor: 'rgba(47, 82, 51, 0.15)'
      },
      input: {
        background: '#ffffff',
        borderColor: 'rgba(47, 82, 51, 0.25)',
        shadow: 'none',
        placeholderColor: '#6b7280',
        borderWidth: '1px',
        borderRadius: '16px'
      },
      table: {
        background: '#ffffff',
        borderColor: 'rgba(175, 17, 28, 0.15)',
        headerBackground: 'rgba(175, 17, 28, 0.05)',
        rowHoverBackground: 'rgba(47, 82, 51, 0.05)',
        stripedBackground: 'rgba(175, 17, 28, 0.02)',
        textColor: '#1a472a',
        headerTextColor: '#af111c'
      },
      chart: {
        background: 'transparent',
        borderColor: 'rgba(175, 17, 28, 0.15)',
        gridColor: 'rgba(0,0,0,0.05)',
        labelColor: '#2f5233',
        colors: ['#af111c', '#2f5233', '#f59e0b', '#3b82f6', '#d42426'],
        fontFamily: 'inherit'
      },
      select: {
        background: '#ffffff',
        borderColor: 'rgba(47, 82, 51, 0.25)',
        shadow: 'none',
        borderWidth: '1px',
        borderRadius: '16px'
      },
      accordion: {
        background: '#ffffff',
        borderColor: 'rgba(47, 82, 51, 0.25)',
        shadow: 'none',
        dividerColor: 'rgba(47, 82, 51, 0.15)',
        borderRadius: '16px',
        headerBackground: 'transparent'
      },
      card: {
        background: '#ffffff',
        borderColor: 'rgba(47, 82, 51, 0.15)',
        shadow: '0 10px 30px rgba(47, 82, 51, 0.12)',
        dividerColor: 'rgba(47, 82, 51, 0.15)',
        icons: { header: '', footer: '' }
      },
      badge: {
        background: '#af111c',
        textColor: '#ffffff',
        borderRadius: '14px',
        animation: 'shine'
      },
      toast: {
        background: '#ffffff',
        borderColor: '#af111c',
        textColor: '#1a472a',
        shadow: '0 10px 30px rgba(175, 17, 28, 0.15)',
        borderRadius: '16px',
        padding: '16px 20px',
        gap: '14px',
        minWidth: '320px',
        maxWidth: '420px',
        titleFontSize: '16px',
        titleFontWeight: '700',
        messageFontSize: '14px',
        messageLineHeight: '1.4',
        iconSize: '24px',
        closeIcon: 'x',
        closeButtonSize: '20px',
        closeButtonOpacity: '0.6',
        closeButtonHoverOpacity: '1',
        closeButtonBackground: '#af111c',
        closeButtonBorder: 'none',
        closeButtonBorderRadius: '50%',
        iconColor: {
          info: '#3b82f6',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#af111c'
        },
        icons: {
          info: 'snowflake-fill',
          success: 'gift-fill',
          warning: 'star-fill',
          error: 'x-circle-fill'
        }
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: 'var(--fy-colors-white)',
          icon: 'bell',
          badgeBackground: '#af111c',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#ffffff',
          borderColor: 'rgba(47, 82, 51, 0.15)',
          shadow: '0 20px 40px rgba(47, 82, 51, 0.2)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: '20px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(47, 82, 51, 0.05)',
          textColor: '#1a472a',
          descriptionColor: '#2f5233',
          dividerColor: 'rgba(175, 17, 28, 0.08)',
          unreadIndicator: '#af111c'
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
      variant: 'duotone'
    }
  },
  darkTokens: {
    colors: {
      primary: '#d42426',
      background: '#0a1a0f',
      text: '#e8f5e9',
      secondary: '#4caf50',
      surface: '#102016'
    },
    effects: {
      card: {
        background: '#102016',
        borderColor: 'rgba(255,255,255,0.08)',
        dividerColor: 'rgba(255,255,255,0.12)',
        shadow: '0 10px 30px rgba(0,0,0,0.5)'
      },
      modal: {
        background: '#0f1a12',
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: '0 32px 80px rgba(0,0,0,0.7)',
        overlayColor: 'rgba(0,0,0,0.6)',
        borderWidth: '1px',
        borderRadius: '16px',
        dividerColor: 'rgba(255,255,255,0.12)'
      },
      input: {
        background: '#0f1a12',
        borderColor: 'rgba(255,255,255,0.12)',
        placeholderColor: '#b7ccb9'
      },
      select: {
        background: '#0f1a12',
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: 'none',
        borderWidth: '1px',
        borderRadius: '16px'
      },
      table: {
        background: '#102016',
        borderColor: 'rgba(255,255,255,0.08)',
        headerBackground: 'rgba(175, 17, 28, 0.15)',
        rowHoverBackground: 'rgba(76, 175, 80, 0.08)',
        stripedBackground: 'rgba(255,255,255,0.02)',
        textColor: '#e8f5e9',
        headerTextColor: '#d42426'
      },
      chart: {
        background: 'transparent',
        gridColor: 'rgba(255,255,255,0.05)',
        labelColor: '#b7ccb9',
        colors: ['#d42426', '#4caf50', '#fbbf24', '#60a5fa', '#af111c']
      },
      accordion: {
        background: '#0f1a12',
        borderColor: 'rgba(255,255,255,0.12)',
        shadow: 'none',
        dividerColor: 'rgba(255,255,255,0.12)',
        borderRadius: '16px',
        headerBackground: 'transparent'
      },
      toast: {
        background: '#102016',
        borderColor: '#d42426',
        textColor: '#e8f5e9',
        shadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 10px rgba(212, 36, 38, 0.2)',
        borderRadius: '16px',
        closeButtonOpacity: '0.8',
        closeButtonHoverOpacity: '1',
        iconColor: {
          info: '#60a5fa',
          success: '#4caf50',
          warning: '#fbbf24',
          error: '#d42426'
        },
        icons: {
          info: 'snowflake-fill',
          success: 'gift-fill',
          warning: 'star-fill',
          error: 'x-circle-fill'
        }
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: 'var(--fy-colors-text)',
          icon: 'bell',
          badgeBackground: '#d42426',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#102016',
          borderColor: 'rgba(255,255,255,0.12)',
          shadow: '0 20px 40px rgba(0,0,0,0.7)',
          width: '320px',
          maxHeight: '400px',
          borderRadius: '20px'
        },
        item: {
          background: 'transparent',
          hoverBackground: 'rgba(255,255,255,0.05)',
          textColor: '#e8f5e9',
          descriptionColor: '#b7ccb9',
          dividerColor: 'rgba(255,255,255,0.08)',
          unreadIndicator: '#d42426'
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
