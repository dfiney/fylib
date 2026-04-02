import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  inject,
  ViewEncapsulation,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastProps, ToastDefinition } from '@fylib/catalog';
import { FyLibService } from '../services/fylib.service';
import { BaseFyComponent } from '../base/base-component';
import { FyIconComponent } from './icon.component';

@Component({
  selector: 'fy-toast',
  standalone: true,
  imports: [CommonModule, FyIconComponent],
  template: `
    <div
      class="fy-toast"
      [class]="'fy-toast--' + type"
      [class]="composeAnimClasses(animationClassSuffix)"
      [style]="getHostStyles(customStyles)"
    >
      <div class="fy-toast__icon" *ngIf="showIcon">
        <fy-icon [name]="resolvedIcon"></fy-icon>
      </div>
      
      <div class="fy-toast__content">
        <div class="fy-toast__title" *ngIf="title">{{ title }}</div>
        <div class="fy-toast__message">{{ message }}</div>
      </div>

      <button class="fy-toast__close" *ngIf="closable" (click)="close()">
        <fy-icon name="x"></fy-icon>
      </button>
    </div>
  `,
  styles: [`
    .fy-toast {
      display: flex;
      align-items: flex-start;
      gap: var(--fy-spacing-sm, 8px);
      padding: var(--fy-spacing-md, 12px);
      min-width: 280px;
      max-width: 420px;
      background: var(--fy-effects-toast-background, #ffffff);
      border: 1px solid var(--fy-effects-toast-borderColor, rgba(0,0,0,0.1));
      border-radius: var(--fy-effects-toast-borderRadius, 8px);
      box-shadow: var(--fy-effects-toast-shadow, 0 4px 12px rgba(0,0,0,0.1));
      color: var(--fy-effects-toast-textColor, inherit);
      pointer-events: auto;
      margin-bottom: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Animações base */
    .fy-anim-toast-in {
      animation: toast-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    .fy-anim-toast-out {
      animation: toast-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes toast-in {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes toast-out {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.8); opacity: 0; }
    }

    .fy-toast__icon {
      flex-shrink: 0;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fy-toast--info .fy-toast__icon { color: var(--fy-colors-info, #007aff); }
    .fy-toast--success .fy-toast__icon { color: var(--fy-colors-success, #28cd41); }
    .fy-toast--warning .fy-toast__icon { color: var(--fy-colors-warning, #ffcc00); }
    .fy-toast--error .fy-toast__icon { color: var(--fy-colors-danger, #ff3b30); }

    .fy-toast__content {
      flex: 1;
      overflow: hidden;
    }

    .fy-toast__title {
      font-weight: var(--fy-typography-fontWeight-bold, 600);
      font-size: var(--fy-typography-fontSize-md, 14px);
      margin-bottom: 2px;
    }

    .fy-toast__message {
      font-size: var(--fy-typography-fontSize-sm, 13px);
      line-height: 1.4;
      opacity: 0.9;
    }

    .fy-toast__close {
      flex-shrink: 0;
      background: transparent;
      border: none;
      padding: 4px;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s;
      color: currentColor;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fy-toast__close:hover {
      opacity: 1;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyToastComponent extends BaseFyComponent<'fy-toast'> implements ToastProps, OnInit, OnDestroy {
  @Input() id?: string;
  @Input() title?: string;
  @Input() message!: string;
  @Input() type: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() duration: number = 3000;
  @Input() showIcon: boolean = true;
  @Input() closable: boolean = true;
  @Input() position: any = 'top-right';
  
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;

  @Output() fyClose = new EventEmitter<void>();

  private timer?: any;
  public isClosing = signal(false);

  constructor() {
    super(inject(FyLibService), 'fy-toast');
  }

  ngOnInit() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.close(), this.duration);
    }
    
    this.triggerByEvent('fy-toast.open', undefined, this.activeEffects);
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  close() {
    if (this.isClosing()) return;
    
    this.isClosing.set(true);
    
    // Aguarda a animação de saída (out) terminar antes de emitir o fechamento
    setTimeout(() => {
      this.fyClose.emit();
    }, 300); // tempo aproximado da animação toast-out
  }

  get resolvedIcon(): string {
    const themeIcons = this.fylib.getTokens().effects?.toast?.icons;
    const iconFromTheme = themeIcons ? themeIcons[this.type] : undefined;
    
    if (iconFromTheme) {
      return iconFromTheme;
    }
    
    switch (this.type) {
      case 'success': return 'check-circle';
      case 'warning': return 'warning';
      case 'error': return 'x-circle';
      default: return 'info';
    }
  }

  get animationClassSuffix(): string {
    if (this.isClosing()) {
      return ' fy-anim-toast-out';
    }
    return ' fy-anim-toast-in';
  }
}
