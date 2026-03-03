import { SSEConfig, SSEServices } from '@fylib/core';
import { NotificationItem, ToastType } from '@fylib/catalog';

interface SSENotificationData {
  title?: string;
  message: string;
  type?: ToastType;
  icon?: string;
  details?: string;
}

export const sseConfig: SSEConfig = {
  enabled: true,
  endpoint: 'http://localhost:3000/events', // URL do servidor SSE
  reconnectDelay: 5000,
  events: {
    'new-notification': (data: SSENotificationData, services: SSEServices) => {
      // Exemplo de payload: { title: 'Sucesso', message: 'Operação concluída', type: 'success' }

      // 1. Exibe o Toast
      services.notification.show({
        title: data.title || 'Nova Notificação',
        message: data.message,
        type: data.type || 'info',
        duration: 5000
      });

      // 2. Adiciona ao Menu de Notificações
      const notification: NotificationItem = {
        id: Date.now().toString(),
        title: data.title || 'Nova Notificação',
        description: data.message,
        date: new Date(),
        read: false,
        type: (data.type as any) || 'info',
        icon: data.icon || 'bell',
        details: data.details
      };

      services.menu.addNotification(notification);
    },
    'system-update': (data: { message?: string }, services: SSEServices) => {
      services.notification.warning(
        data.message || 'O sistema será atualizado para manutenção.',
        'Alerta do Sistema'
      );
    }
  }
};
