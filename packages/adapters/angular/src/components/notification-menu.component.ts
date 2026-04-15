import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  ViewEncapsulation,
  signal,
  computed,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationMenuProps, NotificationMenuDefinition, NotificationItem } from '@fylib/catalog';
import { FyLibService } from '../services/fylib.service';
import { BaseFyComponent } from '../base/base-component';
import { FyIconComponent } from './icon.component';
import { FyAccordionComponent } from './accordion.component';
import { FyNotificationService } from '../services/notification.service';
import { FyWebClientService } from '../services/webclient.service';

@Component({
  selector: 'fy-notification-menu',
  standalone: true,
  imports: [
    CommonModule,
    FyIconComponent,
    FyAccordionComponent
  ],
  template: `
    <div class="fy-notification-menu">
      <!-- Botão de Notificação -->
      <button 
        class="fy-notification-menu__trigger" 
        (click)="toggleMenu()"
        [style.color]="themeTokens()?.button?.textColor"
      >
        <fy-icon [name]="themeTokens()?.button?.icon || 'bell'"></fy-icon>
        @if (unreadCountDisplay > 0) {
          <span 
            class="fy-notification-menu__badge"
            [style.background]="themeTokens()?.button?.badgeBackground"
            [style.color]="themeTokens()?.button?.badgeTextColor"
          >
            {{ unreadCountDisplay > 99 ? '99+' : unreadCountDisplay }}
          </span>
        }
      </button>

      <!-- Dropdown -->
      @if (isOpen() || isClosing()) {
        <div 
          class="fy-notification-menu__dropdown"
        [class]="composeAnimClasses(animationClassSuffix)"
        [style.width]="themeTokens()?.dropdown?.width"
        [style.background]="themeTokens()?.dropdown?.background"
        [style.border-color]="themeTokens()?.dropdown?.borderColor"
        [style.box-shadow]="themeTokens()?.dropdown?.shadow"
        [style.border-radius]="themeTokens()?.dropdown?.borderRadius"
      >
        <!-- Header -->
        <div class="fy-notification-menu__header">
          <span class="fy-notification-menu__title">Notificações</span>
          
          <div class="fy-notification-menu__header-actions">
            @if (resolvedConfig().allowClear && notifications.length > 0) {
              <button 
                class="fy-notification-menu__action-btn"
                (click)="clearAll()"
              >
                Limpar tudo
              </button>
            }
            
            @if (resolvedConfig().showViewAll && resolvedConfig().viewAllPosition.startsWith('header')) {
              <button 
                class="fy-notification-menu__action-btn"
                (click)="viewAll()"
              >
                Ver todas
              </button>
            }

            <!-- Botão fechar (Mobile/Tablet) -->
            <button class="fy-notification-menu__close-btn" (click)="closeMenu()">
              <fy-icon name="x"></fy-icon>
            </button>
          </div>
        </div>

        <!-- List -->
        <div 
          class="fy-notification-menu__body" 
          [class.fy-notification-menu__body--scroll]="shouldScroll()"
        >
          @if (_notifications().length === 0) {
            <div class="fy-notification-menu__empty">
              Nenhuma notificação por enquanto.
            </div>
          }

          @if (resolvedConfig().accordionMode) {
            @for (item of displayNotifications(); track item.id) {
              <div class="fy-notification-menu__item-wrapper">
                <fy-accordion 
                  [items]="[{ id: item.id, title: item.title, subtitle: item.description, content: item.details }]"
                  [flush]="true"
                  class="fy-notification-menu__accordion-item"
                  [class.fy-notification-menu__item--unread]="!item.read"
                  [class.fy-notification-menu__item--read]="item.read"
                  (fyExpand)="onItemExpand(item)"
                >
                </fy-accordion>
                @if (!item.read) {
                  <div class="fy-notification-menu__unread-dot"></div>
                }
              </div>
            }
          } @else {
            @for (item of displayNotifications(); track item.id) {
              <div 
                class="fy-notification-menu__item"
                [class.fy-notification-menu__item--unread]="!item.read"
                [class.fy-notification-menu__item--read]="item.read"
                (click)="onItemClick(item)"
              >
                @if (item.icon) {
                  <div class="fy-notification-menu__item-icon">
                    <fy-icon [name]="item.icon"></fy-icon>
                  </div>
                }
                <div class="fy-notification-menu__item-content">
                  <div class="fy-notification-menu__item-title">{{ item.title }}</div>
                  <div class="fy-notification-menu__item-desc">{{ item.description }}</div>
                  <div class="fy-notification-menu__item-date">{{ item.date | date:'short' }}</div>
                </div>
                @if (!item.read) {
                  <div class="fy-notification-menu__item-actions">
                    <button class="fy-notification-menu__read-btn" (click)="onMarkAsRead($event, item)">
                      <fy-icon name="check"></fy-icon>
                    </button>
                  </div>
                }
                @if (!item.read) {
                  <div class="fy-notification-menu__unread-dot"></div>
                }
              </div>
            }
          }
        </div>

        <!-- Footer -->
        @if (resolvedConfig().showViewAll && resolvedConfig().viewAllPosition.startsWith('footer')) {
          <div 
            class="fy-notification-menu__footer"
            [style.justify-content]="resolvedConfig().viewAllPosition.endsWith('right') ? 'flex-end' : 'flex-start'"
          >
            <button class="fy-notification-menu__action-btn" (click)="viewAll()">Ver todas</button>
            @if (shouldScroll() && displayNotifications().length < _notifications().length) {
              <button 
                class="fy-notification-menu__action-btn" 
                (click)="loadMore()"
              >
                Carregar mais
              </button>
            }
          </div>
        }
      </div>
    }
  </div>
  `,
  styles: [`
    .fy-notification-menu {
      position: relative;
      display: inline-block;
    }

    .fy-notification-menu__trigger {
      background: transparent;
      border: none;
      padding: 8px;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      border-radius: 50%;
      transition: background 0.2s;
    }

    .fy-notification-menu__trigger:hover {
      background: rgba(0,0,0,0.05);
    }

    .fy-notification-menu__badge {
      position: absolute;
      top: 4px;
      right: 4px;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      border-radius: 9px;
      font-size: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--fy-colors-surface, #ffffff);
    }

    .fy-notification-menu__dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 8px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: var(--fy-notificationMenu-dropdown-shadow, 0 10px 40px rgba(0,0,0,0.1));
      border: 1px solid var(--fy-notificationMenu-dropdown-borderColor, rgba(0,0,0,0.08));
      background-color: var(--fy-notificationMenu-dropdown-background, #fff);
      border-radius: var(--fy-notificationMenu-dropdown-borderRadius, 12px);
      max-height: var(--fy-notificationMenu-dropdown-maxHeight, 450px);
    }

    @media (max-width: 768px) {
      .fy-notification-menu__dropdown {
        position: fixed;
        top: calc(var(--fy-layout-header-height, 64px) + 8px);
        left: 16px;
        right: 16px;
        width: calc(100% - 32px) !important;
        max-height: calc(100vh - var(--fy-layout-header-height, 64px) - 32px) !important;
        margin-top: 0;
        z-index: 2000;
      }
    }

    .fy-notification-menu__header {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--fy-colors-border, rgba(0,0,0,0.05));
      flex-shrink: 0;
    }

    .fy-notification-menu__header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .fy-notification-menu__title {
      font-weight: var(--fy-typography-fontWeight-bold, 600);
      font-size: 14px;
    }

    .fy-notification-menu__action-btn {
      background: transparent;
      border: none;
      color: var(--fy-colors-primary, #007aff);
      font-size: 12px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .fy-notification-menu__action-btn:hover {
      background: rgba(var(--fy-colors-primary-rgb), 0.08);
    }

    .fy-notification-menu__close-btn {
      display: none;
      background: transparent;
      border: none;
      color: var(--fy-colors-text, inherit);
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .fy-notification-menu__close-btn:hover {
      opacity: 1;
    }

    @media (max-width: 768px) {
      .fy-notification-menu__close-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }

    .fy-notification-menu__body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
    .fy-notification-menu__body--scroll {
      max-height: var(--fy-notificationMenu-dropdown-maxHeight, 320px);
    }

    .fy-notification-menu__empty {
      padding: 32px 16px;
      text-align: center;
      color: var(--fy-colors-secondary, #86868b);
      font-size: 13px;
    }

    .fy-notification-menu__item {
      padding: 12px 16px;
      display: flex;
      gap: 12px;
      cursor: pointer;
      transition: background 0.2s;
      border-bottom: 1px solid var(--fy-colors-border, rgba(0,0,0,0.03));
      position: relative;
    }

    .fy-notification-menu__item:hover {
      background: rgba(0,0,0,0.02);
    }

    .fy-notification-menu__item--unread {
      background: rgba(var(--fy-colors-primary-rgb), 0.02);
    }

    .fy-notification-menu__item--read {
      opacity: 0.6;
      filter: grayscale(0.4);
      transition: all 0.3s ease;
    }

    .fy-notification-menu__item--read:hover {
      opacity: 0.8;
      filter: grayscale(0.2);
    }

    .fy-notification-menu__accordion-item.fy-notification-menu__item--read ::ng-deep .fy-accordion__header {
      opacity: 0.7;
    }

    .fy-notification-menu__unread-dot {
      position: absolute;
      right: 12px;
      top: 12px;
      width: 8px;
      height: 8px;
      background: var(--fy-colors-primary, #007aff);
      border-radius: 50%;
    }

    .fy-notification-menu__item-content {
      flex: 1;
    }

    .fy-notification-menu__item-title {
      font-weight: 600;
      font-size: 13px;
      margin-bottom: 2px;
    }

    .fy-notification-menu__item-desc {
      font-size: 12px;
      color: var(--fy-colors-secondary, #86868b);
      line-height: 1.4;
    }

    .fy-notification-menu__item-date {
      font-size: 11px;
      color: var(--fy-colors-secondary, #86868b);
      margin-top: 4px;
      opacity: 0.7;
    }

    .fy-notification-menu__item-actions {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    .fy-notification-menu__read-btn {
      background: transparent;
      border: none;
      padding: 6px;
      border-radius: 4px;
      cursor: pointer;
      color: var(--fy-colors-primary, #007aff);
      opacity: 0.4;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fy-notification-menu__read-btn:hover {
      opacity: 1;
      background: rgba(var(--fy-colors-primary-rgb), 0.1);
    }

    .fy-notification-menu__accordion-item {
      display: block;
      border-bottom: 1px solid var(--fy-colors-border, rgba(0,0,0,0.03));
    }

    .fy-notification-menu__footer {
      padding: 8px 16px;
      border-top: 1px solid var(--fy-colors-border, rgba(0,0,0,0.05));
      display: flex;
      flex-shrink: 0;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyNotificationMenuComponent extends BaseFyComponent<'fy-notification-menu'> implements NotificationMenuProps {
  private notify = inject(FyNotificationService);
  public _notifications = signal<NotificationItem[]>([]);

  @Input() set notifications(value: NotificationItem[]) {
    this._notifications.set(value ?? []);
  }

  get notifications(): NotificationItem[] {
    return this._notifications();
  }

  @Input() unreadCount: number = 0;
  
  @Input() showAllNotifications?: boolean;
  @Input() maxNotifications?: number;
  @Input() enableClearAll?: boolean;
  @Input() enableAccordion?: boolean;
  @Input() showViewAll?: boolean;
  @Input() viewAllPosition?: any;
  
  @Input() markAllAsReadOnOpen?: boolean;
  @Input() markAsReadOnClick?: boolean;
  @Input() readApiEndpoint?: string;
  @Input() readApiMethod?: 'POST' | 'PUT' | 'PATCH';
  @Input() readApiHeaders?: Record<string, string>;
  @Input() onRead?: (notification: NotificationItem) => void;
  @Input() onReadAll?: (notifications: NotificationItem[]) => void;
  
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;

  @Output() fyOpen = new EventEmitter<void>();
  @Output() fyClearAll = new EventEmitter<void>();
  @Output() fyViewAll = new EventEmitter<void>();
  @Output() fyNotificationClick = new EventEmitter<NotificationItem>();

  public isOpen = signal(false);
  public isClosing = signal(false);

  private webClient = inject(FyWebClientService, { optional: true });

  constructor() {
    super(inject(FyLibService), 'fy-notification-menu');
    
    // Sincroniza com o FyNotificationService usando effect
    effect(() => {
      const current = this.notify.notifications();
      this._notifications.set(current);
      const limit = this.resolvedConfig().limit;
      this.visibleLimit.set(Math.max(limit ?? 10, 10));
    }, { allowSignalWrites: true });
  }

  themeTokens = computed(() => this.fylib.tokens().effects?.notificationMenu);

  resolvedConfig = computed(() => {
    const themeConfig = this.themeTokens()?.config;
    const def = NotificationMenuDefinition.defaultProps!;
    
    return {
      showAll: this.showAllNotifications ?? themeConfig?.showAll ?? def.showAllNotifications!,
      limit: this.maxNotifications ?? themeConfig?.limit ?? def.maxNotifications!,
      allowClear: this.enableClearAll ?? themeConfig?.allowClear ?? def.enableClearAll!,
      accordionMode: this.enableAccordion ?? themeConfig?.accordionMode ?? def.enableAccordion!,
      showViewAll: this.showViewAll ?? themeConfig?.showViewAll ?? def.showViewAll!,
      viewAllPosition: this.viewAllPosition ?? themeConfig?.viewAllPosition ?? def.viewAllPosition!,
      markAllAsReadOnOpen: this.markAllAsReadOnOpen ?? themeConfig?.markAllAsReadOnOpen ?? def.markAllAsReadOnOpen!,
      markAsReadOnClick: this.markAsReadOnClick ?? themeConfig?.markAsReadOnClick ?? def.markAsReadOnClick!,
      readApiEndpoint: this.readApiEndpoint ?? themeConfig?.readApiEndpoint,
      readApiMethod: this.readApiMethod ?? themeConfig?.readApiMethod ?? def.readApiMethod!,
      readApiHeaders: this.readApiHeaders ?? themeConfig?.readApiHeaders
    };
  });

  private visibleLimit = signal<number>(10);
  
  displayNotifications = computed(() => {
    const config = this.resolvedConfig();
    const notifications = this._notifications();
    if (config.showAll) return notifications;
    const limit = this.visibleLimit();
    return notifications.slice(0, limit);
  });
  shouldScroll = computed(() => this._notifications().length > 5);
  scrollHeight = computed(() => this.themeTokens()?.dropdown?.maxHeight || '320px');
  private initialLimit(): number {
    const limit = this.resolvedConfig().limit;
    return Math.max(limit ?? 10, 10);
  }
  
  loadMore() {
    const current = this.visibleLimit();
    const total = this._notifications().length;
    const next = Math.min(current + 10, total);
    this.visibleLimit.set(next);
  }

  accordionItems = computed(() => {
    return this.displayNotifications().map(item => ({
      id: item.id,
      title: item.title,
      subtitle: item.description,
      content: item.details
    } as any));
  });

  get unreadCountDisplay(): number {
    return this._notifications().filter(n => !n.read).length;
  }

  toggleMenu() {
    if (this.isOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isClosing.set(false);
    this.visibleLimit.set(this.initialLimit());
    this.isOpen.set(true);
    this.fyOpen.emit();
    this.triggerByEvent('fy-notification-menu.open', undefined, this.activeEffects);
    
    // Marcar todas como lidas se configurado
    if (this.resolvedConfig().markAllAsReadOnOpen) {
      this.markAllAsRead();
    }
  }

  closeMenu() {
    if (!this.isOpen()) return;
    
    this.isClosing.set(true);
    this.isOpen.set(false);
    this.visibleLimit.set(this.initialLimit());
    
    // Aguarda a animação de saída (out) terminar antes de remover do DOM
    setTimeout(() => {
      this.isClosing.set(false);
    }, 200); // tempo aproximado da animação dropdown-out
  }

  clearAll() {
    this.fyClearAll.emit();
    this.triggerByEvent('fy-notification-menu.clearAll', undefined, this.activeEffects);
    this.notify.clearNotifications();
    this._notifications.set([]);
  }

  viewAll() {
    this.fyViewAll.emit();
    this.closeMenu();
  }

  onItemClick(item: NotificationItem) {
    this.fyNotificationClick.emit(item);
    if (this.resolvedConfig().markAsReadOnClick && !item.read) {
      this.markAsRead(item);
    }
  }

  onItemExpand(item: NotificationItem) {
    if (this.resolvedConfig().markAsReadOnClick && !item.read) {
      this.markAsRead(item);
    }
  }

  onMarkAsRead(event: Event, item: NotificationItem) {
    event.stopPropagation();
    this.markAsRead(item);
  }

  private markAsRead(item: NotificationItem) {
    this.notify.markAsRead(item.id);
    if (this.onRead) this.onRead(item);
    
    // Backend Call
    const config = this.resolvedConfig();
    if (config.readApiEndpoint && this.webClient) {
      this.sendReadToBackend([item.id]);
    }
  }

  private markAllAsRead() {
    const unread = this._notifications().filter(n => !n.read);
    if (unread.length === 0) return;

    this.notify.markAllAsRead();
    if (this.onReadAll) this.onReadAll(unread);

    // Backend Call
    const config = this.resolvedConfig();
    if (config.readApiEndpoint && this.webClient) {
      this.sendReadToBackend(unread.map(n => n.id));
    }
  }

  private sendReadToBackend(ids: string[]) {
    const config = this.resolvedConfig();
    if (!this.webClient || !config.readApiEndpoint) return;

    const body = { ids };
    const method = (config.readApiMethod || 'POST').toLowerCase();
    
    // O FyWebClientService já lida com crypto e headers
    const request = (this.webClient as any)[method](config.readApiEndpoint, body, {
      headers: config.readApiHeaders,
      cryptoEnabled: true // Habilita criptografia se configurada no motor global
    });

    if (request) {
      request.subscribe({
        error: (err: any) => console.error('[FyNotificationMenu] Failed to mark as read in backend', err)
      });
    }
  }

  get animationClassSuffix(): string {
    if (this.isClosing()) {
      const anim = this.resolveAnim('close', undefined, (NotificationMenuDefinition.features as any)?.animations?.close);
      return anim ? ` fy-anim-${anim}` : '';
    }
    
    const anim = this.resolveAnim('open', undefined, (NotificationMenuDefinition.features as any)?.animations?.open);
    return anim ? ` fy-anim-${anim}` : '';
  }
}
