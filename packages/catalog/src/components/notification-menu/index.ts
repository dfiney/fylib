import { UIComponentDefinition } from '@fylib/core';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  read: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: string;
  details?: string; // Content for accordion mode
  actionUrl?: string;
}

export interface NotificationMenuProps {
  notifications: NotificationItem[];
  unreadCount?: number;
  
  // These props should ideally be driven by the theme but can be overridden
  showAllNotifications?: boolean;
  maxNotifications?: number;
  enableClearAll?: boolean;
  enableAccordion?: boolean;
  showViewAll?: boolean;
  viewAllPosition?: 'header-left' | 'header-right' | 'footer-left' | 'footer-right';
  
  // UI Level control
  activeAnimations?: boolean | null;
  activeEffects?: boolean | null;
  customStyles?: Record<string, string> | null;
}

export const NotificationMenuDefinition: UIComponentDefinition<NotificationMenuProps> = {
  name: 'notification-menu',
  version: '1.0.0',
  defaultProps: {
    notifications: [],
    unreadCount: 0,
    showAllNotifications: false,
    maxNotifications: 5,
    enableClearAll: true,
    enableAccordion: true,
    showViewAll: true,
    viewAllPosition: 'footer-right',
    activeAnimations: null,
    activeEffects: null
  },
  features: {
    animations: {
      open: 'dropdown-in',
      close: 'dropdown-out'
    }
  }
};
