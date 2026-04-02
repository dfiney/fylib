import { Injectable, signal, inject, ComponentRef, ApplicationRef, EnvironmentInjector, createComponent, TemplateRef, Type } from '@angular/core';
import { ToastProps, ToastType, ToastPosition } from '@fylib/catalog';
import { FyToastComponent } from '../components/toast.component';
import { DOCUMENT } from '@angular/common';

import { NotificationItem } from '@fylib/catalog';

export interface ToastOptions extends Partial<Omit<ToastProps, 'message'>> {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class FyNotificationService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private document = inject(DOCUMENT);
  
  private containerMap = new Map<ToastPosition, HTMLElement>();
  private toasts = signal<ComponentRef<FyToastComponent>[]>([]);
  private _notifications = signal<NotificationItem[]>([]);
  
  readonly notifications = this._notifications.asReadonly();

  addNotification(notification: NotificationItem) {
    this._notifications.update(current => [notification, ...current]);
  }

  clearNotifications() {
    this._notifications.set([]);
  }

  show(options: ToastOptions | string) {
    const props: ToastOptions = typeof options === 'string' ? { message: options } : options;
    const position = props.position || 'top-right';
    
    const container = this.getOrCreateContainer(position);
    
    // Create component without host element
    const componentRef = createComponent(FyToastComponent, {
      environmentInjector: this.injector
    });

    // Set inputs
    Object.assign(componentRef.instance, props);
    
    // Handle close
    const sub = componentRef.instance.fyClose.subscribe(() => {
      this.destroyToast(componentRef);
      sub.unsubscribe();
    });

    // Manually trigger change detection
    componentRef.changeDetectorRef.detectChanges();
    
    // Attach to appRef so it's part of the Angular component tree
    this.appRef.attachView(componentRef.hostView);
    
    // Append the native element to the container
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    container.appendChild(domElem);
    
    this.toasts.update(current => [...current, componentRef]);

    return componentRef;
  }

  success(message: string, title?: string, options?: Partial<ToastOptions>) {
    return this.show({ ...options, message, title, type: 'success' });
  }

  error(message: string, title?: string, options?: Partial<ToastOptions>) {
    return this.show({ ...options, message, title, type: 'error' });
  }

  warning(message: string, title?: string, options?: Partial<ToastOptions>) {
    return this.show({ ...options, message, title, type: 'warning' });
  }

  info(message: string, title?: string, options?: Partial<ToastOptions>) {
    return this.show({ ...options, message, title, type: 'info' });
  }

  private destroyToast(ref: ComponentRef<FyToastComponent>) {
    this.toasts.update(current => current.filter(r => r !== ref));
    
    // Remove from DOM manually since we appended it manually
    const domElem = (ref.hostView as any).rootNodes[0] as HTMLElement;
    if (domElem && domElem.parentNode) {
      domElem.parentNode.removeChild(domElem);
    }
    
    this.appRef.detachView(ref.hostView);
    ref.destroy();
  }

  private getOrCreateContainer(position: ToastPosition): HTMLElement {
    if (this.containerMap.has(position)) {
      return this.containerMap.get(position)!;
    }

    const container = this.document.createElement('div');
    container.className = `fy-toast-container fy-toast-container--${position}`;
    
    // Style the container
    Object.assign(container.style, {
      position: 'fixed',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column',
      pointerEvents: 'none',
      padding: '16px'
    });

    // Position styles
    const [y, x] = position.split('-');
    if (y === 'top') container.style.top = '0';
    else container.style.bottom = '0';

    if (x === 'left') container.style.left = '0';
    else if (x === 'right') container.style.right = '0';
    else {
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
    }

    this.document.body.appendChild(container);
    this.containerMap.set(position, container);
    return container;
  }
}
