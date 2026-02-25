import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostBinding,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProps, SelectDefinition } from '@fylib/catalog';
import {
  SelectFocusAnimationName,
  SelectStateAnimationName
} from '@fylib/animation';
import { FyIconComponent } from './icon.component';
import { resolveAnimationsActive } from '../base/interaction.utils';
import { EffectName } from '@fylib/config';
import { BaseFyComponent, FyComponentBaseInputs } from '../base/base-component';

@Component({
  selector: 'fy-select',
  standalone: true,
  imports: [CommonModule, FyIconComponent],
  template: `
    <div
      class="fy-select"
      [class.fy-select--open]="open"
      [class.fy-select--with-left]="iconLeft || iconLeftName"
      [class.fy-select--with-right]="iconRight || iconRightName"
      [class.fy-select--sm]="size === 'sm'"
      [class.fy-select--lg]="size === 'lg'"
      [class.fy-select--status-success]="status === 'success'"
      [class.fy-select--status-error]="status === 'error'"
      [class]="animationClassSuffix"
    >
      <div class="fy-select__control" (click)="toggleOpen()">
        <span class="fy-select__value">
          {{ displayValue || placeholder }}
        </span>

        @if (iconRightName) {
          <fy-icon class="fy-select__icon" [name]="iconRightName"></fy-icon>
        } @else if (iconRight) {
          <span class="fy-select__icon" [class]="iconRight"></span>
        }
      </div>

      @if (open) {
        <div class="fy-select__dropdown">

          @if (searchable) {
            <input
              class="fy-select__search"
              type="text"
              placeholder="Buscar..."
              (input)="onSearch($event)"
            />
          }

          @for (opt of filteredOptions; track opt.value) {
            <div
              class="fy-select__option"
              [class.fy-select__option--selected]="isSelected(opt.value)"
              (click)="selectOption(opt.value)"
            >
              @if (showCheckbox) {
                <input
                  type="checkbox"
                  [checked]="isSelected(opt.value)"
                  (click)="$event.stopPropagation()"
                />
              }
              {{ opt.label }}
            </div>
          }

        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class FySelectComponent
  extends BaseFyComponent<'fy-select'>
  implements SelectProps, FyComponentBaseInputs {

  // ===== PROPS DO CATÁLOGO =====

  @Input() options: SelectProps['options'] = [];
  @Input() value?: string | string[];
  @Input() placeholder?: string;
  @Input() disabled: boolean = SelectDefinition.defaultProps!.disabled!;
  @Input() readonly: boolean = SelectDefinition.defaultProps!.readonly!;
  @Input() size: NonNullable<SelectProps['size']> = SelectDefinition.defaultProps!.size!;
  @Input() status: NonNullable<SelectProps['status']> = SelectDefinition.defaultProps!.status!;
  @Input() searchable?: boolean;
  @Input() showCheckbox?: boolean;
  @Input() closeOnSelect?: boolean;
  @Input() loading?: boolean;
  @Input() clearable?: boolean;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() iconLeftName?: string;
  @Input() iconRightName?: string;

  // Callbacks do catálogo
  @Input() onChange?: (value: string | string[]) => void;
  @Input() onFocus?: () => void;
  @Input() onBlur?: () => void;
  @Input() onOpen?: () => void;
  @Input() onClose?: () => void;

  // Base inputs
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;
  @Input() focusAnimation?: SelectFocusAnimationName;
  @Input() successAnimation?: SelectStateAnimationName;
  @Input() errorAnimation?: SelectStateAnimationName;
  @Input() focusEffect?: EffectName;
  @Input() successEffect?: EffectName;
  @Input() errorEffect?: EffectName;

  // Eventos Angular
  @Output() fyChange = new EventEmitter<string | string[]>();
  @Output() fyFocus = new EventEmitter<void>();
  @Output() fyBlur = new EventEmitter<void>();
  @Output() fyOpen = new EventEmitter<void>();
  @Output() fyClose = new EventEmitter<void>();

  open = false;
  searchTerm = '';

  constructor() {
    super(inject(require('../services/fylib.service').FyLibService), 'fy-select');
  }

  @HostBinding('class.fy-animations-disabled')
  get animationsDisabled(): boolean {
    return !this.isAnimationsActive(this.activeAnimations);
  }

  @HostBinding('style')
  get hostStyles(): string {
    return this.getHostStyles(this.customStyles);
  }

  get filteredOptions() {
    if (!this.searchTerm) return this.options;
    return this.options.filter(o =>
      o.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get displayValue(): string {
    if (!this.value) return '';
    if (Array.isArray(this.value)) {
      return this.options
        .filter(o => this.value?.includes(o.value))
        .map(o => o.label)
        .join(', ');
    }
    return this.options.find(o => o.value === this.value)?.label || '';
  }

  toggleOpen() {
    if (this.disabled || this.readonly) return;

    this.open = !this.open;

    if (this.open) {
      if (this.onOpen) this.onOpen();
      this.fyOpen.emit();
      if (this.onFocus) this.onFocus();
      this.fyFocus.emit();
    } else {
      if (this.onClose) this.onClose();
      this.fyClose.emit();
      if (this.onBlur) this.onBlur();
      this.fyBlur.emit();
    }
  }

  selectOption(val: string) {
    if (Array.isArray(this.value)) {
      const arr = [...this.value];
      const index = arr.indexOf(val);
      index >= 0 ? arr.splice(index, 1) : arr.push(val);
      this.value = arr;
    } else {
      this.value = val;
      if (this.closeOnSelect !== false) {
        this.open = false;
      }
    }

    if (this.onChange) this.onChange(this.value!);
    this.fyChange.emit(this.value!);
  }

  isSelected(val: string): boolean {
    if (Array.isArray(this.value)) return this.value.includes(val);
    return this.value === val;
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  get animationClassSuffix(): string {
    const focus = this.resolveAnim(
      'focus',
      this.focusAnimation,
      (SelectDefinition.features as any)?.animations?.focus
    );

    const key =
      this.status === 'success'
        ? 'success'
        : this.status === 'error'
        ? 'error'
        : undefined;

    const state = key
      ? this.resolveAnim(
          key,
          key === 'success' ? this.successAnimation : this.errorAnimation,
          (SelectDefinition.features as any)?.animations?.[key]
        )
      : undefined;

    return this.composeAnimClasses(focus, state);
  }

  private resolveAnimationsActive(): boolean {
    return resolveAnimationsActive(this.fylib, 'fy-select', this.activeAnimations);
  }
}