import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputProps, InputDefinition } from '@fylib/catalog';
import {
  InputFocusAnimationName,
  InputStateAnimationName
} from '@fylib/animation';
import { FyIconComponent } from './icon.component';
import { resolveAnimationsActive } from '../base/interaction.utils';
import { EffectName } from '@fylib/config';
import { BaseFyComponent, FyComponentBaseInputs } from '../base/base-component';

@Component({
  selector: 'fy-input',
  standalone: true,
  imports: [CommonModule, FyIconComponent],
  template: `
    <div
      class="fy-input"
      [class.fy-input--with-left]="iconLeft || iconLeftName"
      [class.fy-input--with-right]="iconRight || iconRightName"
      [class.fy-input--sm]="size === 'sm'"
      [class.fy-input--lg]="size === 'lg'"
      [class.fy-input--status-success]="status === 'success'"
      [class.fy-input--status-error]="status === 'error'"
      [class]="animationClassSuffix"
    >
      @if (iconLeftName) {
        <fy-icon class="fy-input__icon fy-input__icon--left" [name]="iconLeftName"></fy-icon>
      } @else if (iconLeft) {
        <span class="fy-input__icon fy-input__icon--left" [class]="iconLeft"></span>
      }
      <input
        class="fy-input__field"
        [attr.type]="visibleType"
        [attr.placeholder]="placeholder || null"
        [disabled]="disabled"
        [readOnly]="readonly"
        [value]="value"
        (input)="onInputHandler($event)"
        (change)="onChangeHandler($event)"
        (focus)="onFocusHandler()"
        (blur)="onBlurHandler()"
      />
      @if (type === 'password' && showPasswordToggle) {
        <button type="button" class="fy-input__toggle" (click)="togglePassword()"></button>
      }
      @if (iconRightName) {
        <fy-icon class="fy-input__icon fy-input__icon--right" [name]="iconRightName"></fy-icon>
      } @else if (iconRight) {
        <span class="fy-input__icon fy-input__icon--right" [class]="iconRight"></span>
      }
    </div>
  `,
  styles: [`
    .fy-input {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 100%;
      max-width: 100%;
      border: var(--fy-effects-input-borderWidth, 1px) solid var(--fy-effects-input-borderColor, rgba(0,0,0,0.15));
      background: var(--fy-effects-input-background, #fff);
      border-radius: var(--fy-effects-input-borderRadius, var(--fy-borderRadius-md));
      box-shadow: var(--fy-effects-input-shadow, none);
      transition: box-shadow .2s ease, border-color .2s ease, background-color .2s ease;
      color: var(--fy-colors-textOverlay, var(--fy-colors-text));
      min-height: 36px;
      padding: 0 10px;
      gap: 6px;
    }

    .fy-animations-disabled, .fy-animations-disabled * {
      transition: none !important;
      animation: none !important;
    }

    .fy-input--sm { min-height: 30px; border-radius: var(--fy-borderRadius-sm); }
    .fy-input--lg { min-height: 42px; border-radius: var(--fy-borderRadius-lg); }

    .fy-input--status-success {
      border-color: var(--fy-colors-success, #22c55e);
      background: rgba(34, 197, 94, 0.04);
    }

    .fy-input--status-error {
      border-color: var(--fy-colors-danger, #ef4444);
      background: rgba(239, 68, 68, 0.04);
    }

    .fy-input__field {
      flex: 1 1 auto;
      border: 0;
      outline: 0;
      background: transparent;
      font: inherit;
      color: inherit;
      min-width: 0;
      height: 100%;
    }
    .fy-input__field::placeholder {
      color: var(--fy-effects-input-placeholderColor, #6b7280);
      opacity: .8;
    }

    .fy-input__icon {
      width: 16px;
      height: 16px;
      opacity: .9;
      flex: 0 0 auto;
      color: var(--fy-effects-input-icons-color, currentColor);
    }

    .fy-input__toggle {
      width: 20px;
      height: 20px;
      border: 0;
      background: transparent;
      cursor: pointer;
      flex: 0 0 auto;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyInputComponent extends BaseFyComponent<'fy-input'> implements InputProps, FyComponentBaseInputs {
  

  @Input() value?: string;
  @Input() placeholder?: string;
  @Input() type: InputProps['type'] = InputDefinition.defaultProps!.type!;
  @Input() disabled: boolean = InputDefinition.defaultProps!.disabled!;
  @Input() readonly: boolean = InputDefinition.defaultProps!.readonly!;
  @Input() mask?: string;
  @Input() showPasswordToggle: boolean = InputDefinition.defaultProps!.showPasswordToggle!;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() iconLeftName?: string;
  @Input() iconRightName?: string;
  @Input() size: NonNullable<InputProps['size']> = InputDefinition.defaultProps!.size!;
  @Input() status: NonNullable<InputProps['status']> = InputDefinition.defaultProps!.status!;
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;
  @Input() focusAnimation?: InputFocusAnimationName;
  @Input() successAnimation?: InputStateAnimationName;
  @Input() errorAnimation?: InputStateAnimationName;
  @Input() focusEffect?: EffectName;
  @Input() successEffect?: EffectName;
  @Input() errorEffect?: EffectName;

  // Callbacks conforme contrato do catálogo (podem ser passados como @Input)
  @Input() onInput?: (value: string) => void;
  @Input() onChange?: (value: string) => void;
  @Input() onFocus?: () => void;
  @Input() onBlur?: () => void;

  // Eventos Angular (não conflitam com o contrato do catálogo)
  @Output() fyInput = new EventEmitter<string>();
  @Output() fyChange = new EventEmitter<string>();
  @Output() fyFocus = new EventEmitter<void>();
  @Output() fyBlur = new EventEmitter<void>();

  @HostBinding('class.fy-animations-disabled')
  get animationsDisabled(): boolean {
    return !this.isAnimationsActive(this.activeAnimations);
  }

  @HostBinding('style')
  get hostStyles(): string {
    return this.getHostStyles(this.customStyles);
  }

  get visibleType(): string {
    return this._passwordVisible && this.type === 'password' ? 'text' : (this.type || 'text');
  }

  get animationClassSuffix(): string {
    const focus = this.resolveAnim(
      'focus',
      this.focusAnimation,
      (InputDefinition.features as any)?.animations?.focus as string | undefined
    ) as string | undefined;
    const key = this.status === 'success' ? 'success' : (this.status === 'error' ? 'error' : undefined);
    const state = key
      ? this.resolveAnim(
          key,
          key === 'success' ? this.successAnimation : this.errorAnimation,
          (InputDefinition.features as any)?.animations?.[key] as string | undefined
        )
      : undefined;
    return this.composeAnimClasses(focus, state as string | undefined);
  }

  private _passwordVisible = false;

  constructor() {
    super(inject(require('../services/fylib.service').FyLibService), 'fy-input');
    const t = this.fylib.tokens() as any;
    const iconsCfg = (((t as any).effects || {}) as any).input?.icons || {};
    const name = iconsCfg.name as string | undefined;
    const position = iconsCfg.position as ('left' | 'right' | undefined);
    if (name) {
      if (!this.iconLeftName && !this.iconRightName) {
        if (position === 'right') {
          this.iconRightName = name;
        } else {
          this.iconLeftName = name;
        }
      }
    }
  }

  togglePassword() {
    this._passwordVisible = !this._passwordVisible;
  }

  onInputHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    let v = target.value || '';
    if (this.mask) {
      v = this.applyMask(v, this.mask);
      target.value = v;
    }
    this.value = v;
    if (this.onInput) this.onInput(v);
    this.fyInput.emit(v);
  }

  onChangeHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    const v = target.value || '';
    if (this.onChange) this.onChange(v);
    this.fyChange.emit(v);
  }

  onFocusHandler() {
    if (this.isAnimationsActive(this.activeAnimations)) {
      const name = this.resolveAnim(
        'focus',
        this.focusAnimation,
        (InputDefinition.features as any)?.animations?.focus as string | undefined
      );
      if (name) this.fylib.playAnimation(name);
      if (this.focusEffect) this.triggerDirect(this.focusEffect, this.activeEffects);
      else this.triggerByEvent('fy-input.focus', undefined, this.activeEffects);
    }
    if (this.onFocus) this.onFocus();
    this.fyFocus.emit();
  }

  onBlurHandler() {
    if (this.onBlur) this.onBlur();
    this.fyBlur.emit();
  }

  private resolveAnimationsActive(): boolean {
    return resolveAnimationsActive(this.fylib, 'fy-input', this.activeAnimations);
  }

  private applyMask(value: string, mask: string): string {
    const digits = value.replace(/\D+/g, '');
    let i = 0;
    let out = '';
    for (const ch of mask) {
      if (ch === '9') {
        if (i < digits.length) out += digits[i++];
        else break;
      } else {
        out += ch;
      }
    }
    return out;
  }
}
