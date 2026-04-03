import { ThemeDefinition } from '@fylib/core';

export const fineyPuffy1Theme: ThemeDefinition = {
  name: 'finey-puffy-1',
  backgroundEffect: {
    name: 'hearts',
    intensity: 20,
    speed: .4,
    loop: true
  },
  wallpaper: {
    name: 'hearts',
    type: 'pattern',
    opacity: 0.5
  },
  tokens: {
    colors: {
      primary: '#ff85a2', // Rosa vibrante mas suave
      secondary: '#ffb3c6', // Rosa pastel
      success: '#a2d2ff', // Azul candy (sucesso no tema puffy)
      danger: '#ff4d6d', // Rosa forte para erro
      warning: '#ffe5ec', // Rosa claríssimo
      info: '#c8b6ff', // Roxo lavanda
      white: '#ffffff',
      black: '#4a0e1c', // Marrom avermelhado escuro em vez de preto puro
      background: '#fff0f3', // Fundo rosa blush ultra leve
      text: '#590d22', // Texto vinho escuro para contraste suave
      'primary-rgb': '255, 133, 162',
      surface: '#ffccd5'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    borderRadius: {
      sm: '8px', // Bordas mais arredondadas que o padrão
      md: '16px',
      lg: '24px',
      full: '9999px',
    },
    typography: {
      fontFamily: {
        base: '"Quicksand", "Inter", sans-serif',
        heading: '"Quicksand", "Inter", sans-serif',
        mono: 'monospace'
      },
      fontSize: {
        sm: '13px',
        md: '16px',
        lg: '20px',
      },
      fontWeight: {
        normal: '500', // Levemente mais gordinho
        bold: '700',
      }
    },
    layout: {
      app: { gap: '12px' },
      header: {
        height: '72px',
        padding: '0 32px',
        background: '#ffffff',
        shadow: '0 4px 20px rgba(255, 133, 162, 0.15)',
        toggle: {
          background: '#ff85a2',
          textColor: '#ffffff',
          borderRadius: '12px',
          borderWidth: '0px',
          borderColor: 'transparent',
          icon: 'heart' // Ícone temático
        }
      },
      sidebar: {
        width: '280px',
        padding: '24px 12px',
        background: '#ffffff',
        shadow: '4px 0 20px rgba(255, 133, 162, 0.15)',
        toggle: {
          mode: 'tongue',
          tonguePosition: 'middle',
          background: '#ff85a2',
          textColor: '#ffffff',
          borderRadius: '0 12px 12px 0',
          borderColor: 'transparent',
          icon: 'caret-right'
        }
      },
      content: { padding: '32px' }
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
        shadow: '0 20px 50px rgba(255, 133, 162, 0.12)'
      },
      input: {
        background: '#ffffff',
        borderColor: '#ffccd5',
        shadow: 'none',
        placeholderColor: '#ffb3c6',
        borderWidth: '2px', // Borda mais visível
        borderRadius: '12px',
        icons: {
          mode: 'inside',
          name: 'sparkle',
          position: 'left',
          color: '#ff85a2'
        }
      },
      card: {
        background: '#ffffff',
        borderColor: '#ffe5ec',
        shadow: '0 10px 40px rgba(255, 133, 162, 0.08)',
        dividerColor: '#fff0f3',
        icons: {
          header: 'heart',
          footer: 'sparkle'
        }
      },
      badge: {
        background: '#ff4d6d',
        textColor: '#ffffff',
        borderRadius: '8px',
        animation: 'puffy-sparkle' // Nova animação
      },
      toast: {
        background: '#ffffff',
        borderColor: '#ff85a2',
        textColor: '#590d22',
        shadow: '0 15px 45px rgba(255, 133, 162, 0.2)',
        borderRadius: '16px',
        iconColor: {
          info: '#ff85a2',
          success: '#a2d2ff',
          warning: '#ffb3c6',
          error: '#ff4d6d'
        }
      },
      modal: {
        background: '#ffffff',
        borderColor: '#ffccd5',
        shadow: '0 30px 70px rgba(255, 133, 162, 0.25)',
        overlayColor: 'rgba(74, 14, 28, 0.15)',
        borderWidth: '2px',
        borderRadius: '24px',
        dividerColor: '#fff0f3'
      },
      select: {
        background: '#ffffff',
        borderColor: '#ffccd5',
        shadow: '0 8px 20px rgba(255, 133, 162, 0.08)',
        borderWidth: '2px',
        borderRadius: '12px'
      },
      table: {
        background: '#ffffff',
        borderColor: '#fff0f3',
        headerBackground: '#fff0f3',
        rowHoverBackground: '#fff5f7',
        stripedBackground: '#fffafa',
        textColor: '#590d22',
        headerTextColor: '#ff85a2'
      },
      chart: {
        background: 'transparent',
        borderColor: '#fff0f3',
        gridColor: '#fff0f3',
        labelColor: '#ffb3c6',
        colors: ['#ff85a2', '#a2d2ff', '#c8b6ff', '#ffb3c6', '#ffe5ec'],
        fontFamily: 'inherit'
      },
      accordion: {
        background: '#ffffff',
        borderColor: '#ffe5ec',
        shadow: 'none',
        dividerColor: '#fff0f3',
        borderRadius: '16px',
        headerBackground: 'transparent'
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#ff85a2',
          icon: 'bell-ringing',
          badgeBackground: '#ff4d6d',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#ffffff',
          borderColor: '#ffccd5',
          shadow: '0 20px 50px rgba(255, 133, 162, 0.2)',
          width: '340px',
          maxHeight: '450px',
          borderRadius: '20px'
        },
        item: {
          background: 'transparent',
          hoverBackground: '#fff0f3',
          textColor: '#590d22',
          descriptionColor: '#ffb3c6',
          dividerColor: '#fff5f7',
          unreadIndicator: '#ff85a2'
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
        sm: '14px',
        md: '18px',
        lg: '24px'
      },
      strokeWidth: '2',
      variant: 'duotone'
    },
    scrollbar: {
      width: '12px',
      trackBackground: '#fff0f3',
      thumbBackground: 'linear-gradient(180deg, #ffb3c6 0%, #ff85a2 100%)',
      thumbHoverBackground: 'linear-gradient(180deg, #ffc8d6 0%, #ff9bb4 100%)',
      thumbBorderRadius: '10px',
      thumbBorderWidth: '2px',
      thumbBorderColor: '#fff0f3'
    }
  },
  darkTokens: {
    colors: {
      primary: '#ff85a2',
      secondary: '#590d22',
      background: '#1a0a0d', // Cinza quase preto com toque vinho
      text: '#fff0f3',
      surface: '#2d0f16',
      'primary-rgb': '255, 133, 162'
    },
    layout: {
      header: {
        background: '#2d0f16',
        shadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        toggle: {
          background: '#ff85a2',
          textColor: '#ffffff',
          borderRadius: '12px'
        }
      },
      sidebar: {
        background: '#1a0a0d',
        toggle: {
          background: '#ff85a2',
          textColor: '#ffffff',
          borderRadius: '0 12px 12px 0'
        }
      }
    },
    effects: {
      window: {
        background: '#2d0f16',
        shadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
      },
      card: {
        background: '#2d0f16',
        borderColor: '#4a0e1c',
        shadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      },
      input: {
        background: '#1a0a0d',
        borderColor: '#4a0e1c',
        textColor: '#fff0f3'
      },
      modal: {
        background: '#2d0f16',
        borderColor: '#4a0e1c',
        shadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        borderWidth: '2px',
        borderRadius: '24px',
        dividerColor: '#4a0e1c'
      },
      select: {
        background: '#1a0a0d',
        borderColor: '#4a0e1c',
        shadow: 'none',
        borderWidth: '2px',
        borderRadius: '12px'
      },
      table: {
        background: '#2d0f16',
        borderColor: '#4a0e1c',
        headerBackground: '#4a0e1c',
        rowHoverBackground: '#3a121b',
        stripedBackground: '#2d0f16',
        textColor: '#fff0f3',
        headerTextColor: '#ff85a2'
      },
      chart: {
        background: 'transparent',
        gridColor: '#4a0e1c',
        labelColor: '#ffb3c6'
      },
      accordion: {
        background: '#2d0f16',
        borderColor: '#4a0e1c',
        shadow: 'none',
        dividerColor: '#4a0e1c',
        borderRadius: '16px',
        headerBackground: 'transparent'
      },
      badge: {
        background: '#ff4d6d',
        textColor: '#ffffff'
      },
      toast: {
        background: '#2d0f16',
        borderColor: '#ff85a2',
        textColor: '#fff0f3',
        shadow: '0 15px 45px rgba(0, 0, 0, 0.4)',
        borderRadius: '16px'
      },
      notificationMenu: {
        button: {
          background: 'transparent',
          textColor: '#ff85a2',
          icon: 'bell-ringing',
          badgeBackground: '#ff4d6d',
          badgeTextColor: '#ffffff'
        },
        dropdown: {
          background: '#2d0f16',
          borderColor: '#4a0e1c',
          shadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
          width: '340px',
          maxHeight: '450px',
          borderRadius: '20px'
        },
        item: {
          background: 'transparent',
          hoverBackground: '#3a121b',
          textColor: '#fff0f3',
          descriptionColor: '#ffb3c6',
          dividerColor: '#4a0e1c',
          unreadIndicator: '#ff85a2'
        }
      }
    }
  },
  componentAnimations: {
    'fy-button': {
      hover: 'button-puffy-bounce',
      click: 'button-puffy-press'
    },
    'fy-card': {
      enter: 'card-puffy-float'
    },
    'fy-input': {
      focus: 'input-puffy-glow'
    },
    'fy-select': {
      focus: 'input-puffy-glow'
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
    'fy-table': {
      enter: 'table-fade-in',
      rowEnter: 'table-row-enter'
    }
  }
};
