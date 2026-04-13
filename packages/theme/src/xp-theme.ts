import { ThemeDefinition } from '@fylib/core';
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
  backgroundEffect: {
    name: 'bubbles',
    intensity: 30,
    speed: 1,
    loop: true
  },
  wallpaper: {
    name: 'grass',
    type: 'pattern',
    opacity: 0.2
  },
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
        stripedBackground: '#f7f9fc',
        textColor: '#000000',
        headerTextColor: '#000000'
      },
      chart: {
        background: 'transparent',
        borderColor: '#91a7b4',
        gridColor: 'rgba(0,0,0,0.05)',
        labelColor: '#334155',
        colors: ['#3a6ea5', '#3cb371', '#ffcc00', '#cc3300', '#1f4f8b'],
        fontFamily: 'inherit'
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
        background: '#FFFFE1',
        borderColor: '#000000',
        textColor: '#000000',
        shadow: '2px 2px 0 rgba(0,0,0,0.2)',
        borderRadius: '0px',
        padding: '8px 28px 8px 12px',
        gap: '10px',
        minWidth: '300px',
        maxWidth: '350px',
        titleFontSize: '11px',
        titleFontWeight: '700',
        messageFontSize: '11px',
        messageLineHeight: '1.2',
        iconSize: '20px',
        closeIcon: 'x',
        closeButtonSize: '14px',
        closeButtonOpacity: '0.8',
        closeButtonHoverOpacity: '1',
        closeButtonBackground: 'transparent',
        closeButtonBorder: '1px solid transparent',
        closeButtonBorderRadius: '0px',
        iconColor: {
          info: '#4ba04b',
          success: '#4ba04b',
          warning: '#4ba04b',
          error: '#ff0000'
        },
        icons: {
          info: 'wifi-high',
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
      size: { sm: '12px', md: '16px', lg: '20px' },
      strokeWidth: '1.5',
      variant: 'regular'
    },
    scrollbar: {
      width: '17px',
      trackBackground: '#f1f1f1',
      // Subtle stippled pattern for track
      trackImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAD0lEQVQImWNgYGBoYGAAABYAA69PrG8AAAAASUVORK5CYII=", 
      thumbBackground: 'linear-gradient(to right, #1d345f 0%, #3a62a7 50%, #1d345f 100%)',
      thumbHoverBackground: 'linear-gradient(to right, #4a7ac9 0%, #bdd4f6 50%, #4a7ac9 100%)',
      thumbBorderRadius: '2px',
      thumbBorderWidth: '1px',
      thumbBorderColor: '#002266',
      thumbBoxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.3)',
      thumbGripImage: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='10'%3E%3Cpath d='M2 1h8M2 3h8M2 5h8M2 7h8M2 9h8' stroke='rgba(255,255,255,0.2)' stroke-width='1'/%3E%3Cpath d='M2 2h8M2 4h8M2 6h8M2 8h8M2 10h8' stroke='rgba(0,0,0,0.1)' stroke-width='1'/%3E%3C/svg%3E",
      thumbGripImageHorizontal: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='12'%3E%3Cpath d='M1 2v8M3 2v8M5 2v8M7 2v8M9 2v8' stroke='rgba(255,255,255,0.2)' stroke-width='1'/%3E%3Cpath d='M2 2v8M4 2v8M6 2v8M8 2v8M10 2v8' stroke='rgba(0,0,0,0.1)' stroke-width='1'/%3E%3C/svg%3E",
      buttonsVisible: true,
      buttonBackground: 'linear-gradient(to right, #1d345f 0%, #3a62a7 50%, #1d345f 100%)',
      buttonHoverBackground: 'linear-gradient(to right, #4a7ac9 0%, #bdd4f6 50%, #4a7ac9 100%)',
      buttonActiveBackground: 'linear-gradient(to right, #0a1b3a 0%, #1d345f 50%, #0a1b3a 100%)',
      // UP BUTTON
      buttonUpImage: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M8.5 6L5 10.5h7L8.5 6z' fill='%231d345f'/%3E%3Cpath d='M1 1h15v1H1zM1 1h1v15H1z' fill='white'/%3E%3Cpath d='M1 15h15v1H1zM15 1h1v15h-1z' fill='rgba(0,0,0,0.3)'/%3E%3C/svg%3E",
      buttonUpHoverImage: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M8.5 6L5 10.5h7L8.5 6z' fill='%231d345f'/%3E%3Cpath d='M1 1h15v1H1zM1 1h1v15H1z' fill='white'/%3E%3Cpath d='M1 15h15v1H1zM15 1h1v15h-1z' fill='rgba(0,0,0,0.3)'/%3E%3C/svg%3E",
      buttonUpActiveImage: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M9.5 7L6 11.5h7L9.5 7z' fill='%231d345f'/%3E%3Cpath d='M1 1h15v1H1zM1 1h1v15H1z' fill='rgba(0,0,0,0.4)'/%3E%3Cpath d='M1 15h15v1H1zM15 1h1v15h-1z' fill='white'/%3E%3C/svg%3E",
      // DOWN BUTTON
      buttonDownImage: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M8.5 11L5 6.5h7L8.5 11z' fill='%231d345f'/%3E%3Cpath d='M1 1h15v1H1zM1 1h1v15H1z' fill='white'/%3E%3Cpath d='M1 15h15v1H1zM15 1h1v15h-1z' fill='rgba(0,0,0,0.3)'/%3E%3C/svg%3E",
      buttonDownHoverImage: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M8.5 11L5 6.5h7L8.5 11z' fill='%231d345f'/%3E%3Cpath d='M1 1h15v1H1zM1 1h1v15H1z' fill='white'/%3E%3Cpath d='M1 15h15v1H1zM15 1h1v15h-1z' fill='rgba(0,0,0,0.3)'/%3E%3C/svg%3E",
      buttonDownActiveImage: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M9.5 12L6 7.5h7L9.5 12z' fill='%231d345f'/%3E%3Cpath d='M1 1h15v1H1zM1 1h1v15H1z' fill='rgba(0,0,0,0.4)'/%3E%3Cpath d='M1 15h15v1H1zM15 1h1v15h-1z' fill='white'/%3E%3C/svg%3E"
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
        stripedBackground: 'rgba(255,255,255,0.02)',
        textColor: '#ffffff',
        headerTextColor: '#4c8ad3'
      },
      chart: {
        background: 'transparent',
        gridColor: 'rgba(255,255,255,0.05)',
        labelColor: '#cbd5e1',
        colors: ['#4c8ad3', '#3cb371', '#ffcc00', '#ff4444', '#68718b']
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


