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
      [style]="getHostStyles(customStyles, getVariantStyles(variant))"
    >
      @if (showIcon) {
        <div class="fy-toast__icon">
          <fy-icon [name]="resolvedIcon" [color]="resolvedIconColor"></fy-icon>
        </div>
      }
      
      <div class="fy-toast__content">
        @if (title) { <div class="fy-toast__title">{{ title }}</div> }
        <div class="fy-toast__message">{{ message }}</div>
      </div>

      @if (closable) {
        <button class="fy-toast__close" (click)="close()">
          <fy-icon [name]="resolvedCloseIcon"></fy-icon>
        </button>
      }
    </div>
  `,
  styles: [`
    .fy-toast {
      display: flex;
      align-items: flex-start;
      gap: var(--fy-effects-toast-gap, var(--fy-spacing-sm, 8px));
      padding: var(--fy-effects-toast-padding, var(--fy-spacing-md, 12px));
      min-width: var(--fy-effects-toast-minWidth, 280px);
      max-width: var(--fy-effects-toast-maxWidth, 420px);
      background: var(--fy-effects-toast-background, #ffffff);
      border: 1px solid var(--fy-effects-toast-borderColor, rgba(0,0,0,0.1));
      border-radius: var(--fy-effects-toast-borderRadius, 8px);
      box-shadow: var(--fy-effects-toast-shadow, 0 4px 12px rgba(0,0,0,0.1));
      color: var(--fy-effects-toast-textColor, inherit);
      pointer-events: auto;
      margin-bottom: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
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
      font-size: var(--fy-effects-toast-iconSize, 20px);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fy-toast--info .fy-toast__icon { color: var(--fy-effects-toast-iconColor-info, var(--fy-colors-info, #007aff)); }
    .fy-toast--success .fy-toast__icon { color: var(--fy-effects-toast-iconColor-success, var(--fy-colors-success, #28cd41)); }
    .fy-toast--warning .fy-toast__icon { color: var(--fy-effects-toast-iconColor-warning, var(--fy-colors-warning, #ffcc00)); }
    .fy-toast--error .fy-toast__icon { color: var(--fy-effects-toast-iconColor-error, var(--fy-colors-danger, #ff3b30)); }

    .fy-toast__content {
      flex: 1;
      overflow: hidden;
    }

    .fy-toast__title {
      font-weight: var(--fy-effects-toast-titleFontWeight, var(--fy-typography-fontWeight-bold, 600));
      font-size: var(--fy-effects-toast-titleFontSize, var(--fy-typography-fontSize-md, 14px));
      margin-bottom: 2px;
    }

    .fy-toast__message {
      font-size: var(--fy-effects-toast-messageFontSize, var(--fy-typography-fontSize-sm, 13px));
      line-height: var(--fy-effects-toast-messageLineHeight, 1.4);
      opacity: 0.9;
    }

    .fy-toast__close {
      position: absolute;
      top: 4px;
      right: 4px;
      flex-shrink: 0;
      background: var(--fy-effects-toast-closeButtonBackground, transparent);
      border: var(--fy-effects-toast-closeButtonBorder, none);
      border-radius: var(--fy-effects-toast-closeButtonBorderRadius, 0);
      padding: 2px;
      cursor: pointer;
      opacity: var(--fy-effects-toast-closeButtonOpacity, 0.5);
      transition: opacity 0.2s;
      color: currentColor;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--fy-effects-toast-closeButtonSize, 18px);
      height: var(--fy-effects-toast-closeButtonSize, 18px);
    }

    .fy-toast__close:hover {
      opacity: var(--fy-effects-toast-closeButtonHoverOpacity, 1);
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyToastComponent extends BaseFyComponent<'fy-toast'> implements ToastProps, OnInit, OnDestroy {
  @Input() id?: string;
  @Input() title?: string;
  @Input() message!: string;
  @Input() type: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() variant: string = 'default';
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
    
    // Garantir que efeitos reativos sejam permitidos se necessário no futuro
    // (Por enquanto o Toast usa ngOnInit para disparar eventos)
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

  get resolvedIconColor(): string {
    const themeIconColors = this.fylib.getTokens().effects?.toast?.iconColor;
    const colorFromTheme = themeIconColors ? themeIconColors[this.type] : undefined;
    
    if (colorFromTheme) {
      return String(colorFromTheme);
    }
    
    const colors = this.fylib.getTokens().colors;
    switch (this.type) {
      case 'success': return String(colors?.success || '#28cd41');
      case 'warning': return String(colors?.warning || '#ffcc00');
      case 'error': return String(colors?.danger || '#ff3b30');
      default: return String(colors?.info || '#007aff');
    }
  }

  get resolvedCloseIcon(): string {
    const themeCloseIcon = this.fylib.getTokens().effects?.toast?.closeIcon;
    return themeCloseIcon || 'x';
  }

  get animationClassSuffix(): string {
    if (this.isClosing()) {
      return ' fy-anim-toast-out';
    }
    return ' fy-anim-toast-in';
  }
}
