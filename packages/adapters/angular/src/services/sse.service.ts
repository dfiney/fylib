import { Injectable, inject, PLATFORM_ID, OnDestroy, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FyLibService } from './fylib.service';
import { FyNotificationService } from './notification.service';
import { SSEConfig } from '@fylib/core';

@Injectable({
  providedIn: 'root'
})
export class FySSEService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private fylib = inject(FyLibService);
  private notification = inject(FyNotificationService);
  
  private eventSource: EventSource | null = null;
  private reconnectTimeout: any = null;
  private config: SSEConfig | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initFromConfig();
    }
  }

  private initFromConfig() {
    const config = this.fylib.config();
    if (config.sse && config.sse.enabled) {
      this.config = config.sse;
      this.connect();
    }
  }

  connect() {
    if (!this.config || !isPlatformBrowser(this.platformId)) return;
    
    this.disconnect();

    try {
      this.eventSource = new EventSource(this.config.endpoint, {
        withCredentials: this.config.withCredentials ?? false
      });

      this.eventSource.onopen = () => {
        console.log('[fyLib] SSE Connected to:', this.config?.endpoint);
      };

      this.eventSource.onerror = (error) => {
        console.error('[fyLib] SSE Error:', error);
        this.reconnect();
      };

      // Registrar eventos mapeados
      if (this.config.events) {
        Object.keys(this.config.events).forEach(eventName => {
          this.eventSource?.addEventListener(eventName, (event: MessageEvent) => {
            try {
              const data = JSON.parse(event.data);
              this.handleEvent(eventName, data);
            } catch (e) {
              this.handleEvent(eventName, event.data);
            }
          });
        });
      }

    } catch (e) {
      console.error('[fyLib] Failed to create EventSource:', e);
      this.reconnect();
    }
  }

  private handleEvent(eventName: string, data: any) {
    if (!this.config?.events || !this.config.events[eventName]) return;

    // Executa a função mapeada passando os serviços necessários
    this.config.events[eventName](data, {
      notification: this.notification,
      // O menu de notificações será integrado via um serviço de estado global ou via FyNotificationService
      menu: this.notification 
    });
  }

  private reconnect() {
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    
    const delay = this.config?.reconnectDelay ?? 5000;
    this.reconnectTimeout = setTimeout(() => {
      console.log('[fyLib] SSE Reconnecting...');
      this.connect();
    }, delay);
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
