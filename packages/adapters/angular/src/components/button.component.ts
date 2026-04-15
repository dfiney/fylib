import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonProps, ButtonDefinition } from '@fylib/catalog';
import { FyIconComponent } from './icon.component';
import {
  ButtonHoverAnimationName,
  ButtonClickAnimationName,
  ButtonStateAnimationName
} from '@fylib/animation';
import { EffectName } from '@fylib/config';
import { BaseFyComponent, FyComponentBaseInputs } from '../base/base-component';
import { FyLibService } from '../services/fylib.service';
import { logger } from '@fylib/logger';


@Component({
  selector: 'fy-button',
  standalone: true,
  imports: [CommonModule, FyIconComponent],
  template: `
    @if (link) {
      <a 
        [href]="link"
        [target]="target"
        [class]="'fy-button fy-button--' + variant + ' fy-button--' + size + animationClassSuffix"
        [style]="hostStyles"
        (click)="handleClick($event)"
        (mouseenter)="handleHover()"
        [attr.aria-label]="label || iconName || icon"
      >
        @if(iconName) {
          <fy-icon [name]="iconName" [set]="iconSet" class="fy-button__icon"></fy-icon>
        } @else if(icon) {
          <span [class]="'fy-button__icon ' + icon"></span>
        }
        @if (label) {
          <span class="fy-button__label">{{ label }}</span>
        }
      </a>
    } @else {
      <button 
        [class]="'fy-button fy-button--' + variant + ' fy-button--' + size + animationClassSuffix"
        [disabled]="disabled || loading"
        (click)="handleClick($event)"
        (mouseenter)="handleHover()"
        [style]="hostStyles"
        [attr.aria-busy]="loading"
        [attr.aria-live]="loading ? 'polite' : null"
        [attr.aria-label]="label || iconName || icon"
      >
        @if(loading) {
          <span class="fy-button__loader"></span>
        }
        @if(iconName && !loading) {
          <fy-icon [name]="iconName" [set]="iconSet" class="fy-button__icon"></fy-icon>
        } @else if(icon && !loading) {
          <span [class]="'fy-button__icon ' + icon"></span>
        }
        @if (label) {
          <span class="fy-button__label">{{ label }}</span>
        }
      </button>
    }
  `,
  styles: [`
    .fy-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--fy-spacing-sm) var(--fy-spacing-md);
      border-radius: var(--fy-borderRadius-md);
      font-family: inherit;
      font-size: var(--fy-typography-fontSize-md);
      font-weight: var(--fy-typography-fontWeight-bold);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid var(--fy-effects-button-borderColor, transparent);
      background: var(--fy-effects-button-background, var(--fy-colors-primary));
      color: var(--fy-effects-button-textColor, var(--fy-colors-white));
      outline: none;
      user-select: none;
      position: relative;
      overflow: hidden;
      gap: 8px;
    }

    .fy-animations-disabled, .fy-animations-disabled * {
      transition: none !important;
      animation: none !important;
    }

    .fy-button--secondary {
      background: none !important;
      background-color: var(--fy-colors-secondary) !important;
      color: var(--fy-effects-button-textColor, var(--fy-colors-white)) !important;
    }

    .fy-button--ghost {
      background: none !important;
      background-color: transparent !important;
      color: var(--fy-colors-primary) !important;
      border-color: var(--fy-colors-primary) !important;
    }

    .fy-button--ghost:hover:not(:disabled) {
      background-color: rgba(var(--fy-colors-primary-rgb, 59, 130, 246), 0.1);
    }

    .fy-button--danger {
      background: none !important;
      background-color: var(--fy-colors-danger) !important;
      color: var(--fy-effects-button-textColor, var(--fy-colors-white)) !important;
    }

    .fy-button--sm { 
      padding: var(--fy-spacing-xs) var(--fy-spacing-sm); 
      font-size: var(--fy-typography-fontSize-sm); 
    }
    
    .fy-button--lg { 
      padding: var(--fy-spacing-md) var(--fy-spacing-lg); 
      font-size: var(--fy-typography-fontSize-lg); 
    }

    .fy-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .fy-button__loader {
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      animation: fy-spin 0.8s linear infinite;
      flex-shrink: 0;
    }

    @keyframes fy-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyButtonComponent extends BaseFyComponent<'fy-button'> implements ButtonProps, FyComponentBaseInputs {
  constructor() {
    super(inject(FyLibService), 'fy-button');
  }

  @Input() label: string | undefined = undefined;
  @Input() variant: ButtonProps['variant'] = ButtonDefinition.defaultProps!.variant!;
  @Input() size: ButtonProps['size'] = ButtonDefinition.defaultProps!.size!;
  @Input() disabled: boolean = ButtonDefinition.defaultProps!.disabled!;
  @Input() loading: boolean = ButtonDefinition.defaultProps!.loading!;
  @Input() icon?: string = ButtonDefinition.defaultProps!.icon;
  @Input() iconName?: string;
  @Input() iconSet?: 'ph' | 'fa' | 'mdi';
  @Input() link?: string;
  @Input() target?: string = '_self';
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;

  @Input() hoverAnimation?: ButtonHoverAnimationName;
  @Input() clickAnimation?: ButtonClickAnimationName;
  @Input() successAnimation?: ButtonStateAnimationName;
  @Input() errorAnimation?: ButtonStateAnimationName;
  @Input() hoverEffect?: EffectName;
  @Input() clickEffect?: EffectName;
  @Input() successEffect?: EffectName;
  @Input() errorEffect?: EffectName;

  @Output() fyClick = new EventEmitter<MouseEvent>();

  @HostBinding('class.fy-animations-disabled')
  get animationsDisabled(): boolean {
    return !this.isAnimationsActive(this.activeAnimations);
  }

  @HostBinding('style')
  get hostStyles(): string {
    return this.getHostStyles(this.customStyles);
  }

  get animationClassSuffix(): string {
    const hover = this.resolveAnim(
      'hover',
      this.hoverAnimation,
      (ButtonDefinition.features as any)?.animations?.hover as string | undefined
    );
    const click = this.resolveAnim(
      'click',
      this.clickAnimation,
      (ButtonDefinition.features as any)?.animations?.click as string | undefined
    );
    return this.composeAnimClasses(hover, click);
  }

  handleClick(event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      logger.debug('Component', 'Button clicked', { label: this.label, variant: this.variant });
      if (this.isAnimationsActive(this.activeAnimations)) {
        const animationName = this.resolveAnim(
          'click',
          this.clickAnimation,
          (ButtonDefinition.features as any)?.animations?.click as string | undefined
        );
        if (animationName) {
          this.fylib.playAnimation(animationName);
        }
      }
      this.fyClick.emit(event);
      this.triggerByEvent('fy-button.click', this.clickEffect, this.activeEffects);
    }
  }

  handleHover() {
    if (!this.isAnimationsActive(this.activeAnimations)) {
      return;
    }
    logger.debug('Component', 'Button hovered', { label: this.label });
    const animationName = this.resolveAnim(
      'hover',
      this.hoverAnimation,
      (ButtonDefinition.features as any)?.animations?.hover as string | undefined
    );
    if (animationName) {
      this.fylib.playAnimation(animationName);
    }
    if (this.hoverEffect) this.triggerDirect(this.hoverEffect, this.activeEffects);
  }

}
