import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostBinding,
  HostListener,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProps, SelectDefinition } from '@fylib/catalog';
import { FyIconComponent } from './icon.component';
import { BaseFyComponent, FyComponentBaseInputs } from '../base/base-component';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'fy-select',
  standalone: true,
  imports: [CommonModule, FyIconComponent],
  template: `
    <div
      class="fy-select"
      [class.fy-select--open]="open"
      [class.fy-select--sm]="size === 'sm'"
      [class.fy-select--lg]="size === 'lg'"
      [class.fy-select--status-success]="status === 'success'"
      [class.fy-select--status-error]="status === 'error'"
      [class]="animationClassSuffix"
    >
      <div
        class="fy-select__control"
        tabindex="0"
        (click)="toggleOpen()"
        (focus)="onFocusHandler()"
        (blur)="onBlurHandler()"
      >
        <span class="fy-select__value">
          {{ displayValue || placeholder }}
        </span>

        @if (iconRightName) {
          <fy-icon class="fy-select__icon" [name]="iconRightName"></fy-icon>
        }
      </div>

      @if (open) {
        <div class="fy-select__dropdown" [class]="dropdownAnimClass">
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
                  (change)="onCheckboxChange($event, opt.value)"
                />
              }
              {{ opt.label }}
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .fy-select {
      position: relative;
      width: 100%;
      font: inherit;
      display: inline-flex;
      align-items: center;
      border: var(--fy-effects-select-borderWidth, 1px) solid var(--fy-effects-select-borderColor, rgba(0,0,0,.15));
      background: var(--fy-effects-select-background, #fff);
      border-radius: var(--fy-effects-select-borderRadius, var(--fy-borderRadius-md));
      box-shadow: var(--fy-effects-select-shadow, none);
      min-height: 36px;
      padding: 0 10px;
      gap: 6px;
      transition: box-shadow .2s ease, border-color .2s ease, background-color .2s ease;
    }

    .fy-select__control {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      cursor: pointer;
    }

    .fy-select__dropdown {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% + 4px);
      background: var(--fy-effects-select-background, #fff);
      border: 1px solid var(--fy-effects-select-borderColor, rgba(0,0,0,.1));
      border-radius: var(--fy-borderRadius-md);
      box-shadow: var(--fy-effects-select-shadow, none);
      max-height: 240px;
      overflow-y: auto;
      z-index: 1000;
    }

    .fy-select__option {
      padding: 6px 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .fy-select__option--selected {
      background: rgba(var(--fy-colors-primary-rgb, 59,130,246), 0.08);
    }

    .fy-select__search {
      width: 100%;
      padding: 6px;
      border: none;
      outline: none;
      border-bottom: 1px solid rgba(0,0,0,.1);
      background-color: transparent;
    }
    .fy-select__icon {
      transition: transform .2s ease;
    }
    .fy-select.fy-select--open .fy-select__icon {
      transform: rotate(180deg);
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FySelectComponent
  extends BaseFyComponent<'fy-select'>
  implements SelectProps, FyComponentBaseInputs {

  @Input() options: { label: string; value: string; disabled?: boolean }[] = [];
  @Input() value?: string | string[];
  @Input() placeholder?: string;
  @Input() disabled: boolean = SelectDefinition.defaultProps!.disabled!;
  @Input() readonly: boolean = SelectDefinition.defaultProps!.readonly!;
  @Input() size: 'sm' | 'md' | 'lg' = SelectDefinition.defaultProps!.size!;
  @Input() status: 'default' | 'success' | 'error' = SelectDefinition.defaultProps!.status!;
  @Input() iconRightName?: string;
  @Input() searchable?: boolean;
  @Input() showCheckbox?: boolean;
  @Input() closeOnSelect?: boolean;

  @Input() onChange?: (value: string | string[]) => void;
  @Input() onFocus?: () => void;
  @Input() onBlur?: () => void;
  
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;

  @Output() fyChange = new EventEmitter<string | string[]>();
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

  open = false;
  searchTerm = '';
  dropdownAnimClass: string = '';

  constructor() {
    super(inject(require('../services/fylib.service').FyLibService), 'fy-select');
    this.hostEl = inject(ElementRef);
  }
  private hostEl: ElementRef<HTMLElement>;

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

  get animationClassSuffix(): string {
    const focus = this.resolveAnim(
      'focus',
      undefined,
      (SelectDefinition.features as any)?.animations?.focus as string | undefined
    ) as string | undefined;
    const key = this.status === 'success' ? 'success' : (this.status === 'error' ? 'error' : undefined);
    const state = key
      ? this.resolveAnim(
          key,
          undefined,
          (SelectDefinition.features as any)?.animations?.[key] as string | undefined
        )
      : undefined;
    return this.composeAnimClasses(focus, state as string | undefined);
  }

  toggleOpen() {
    if (this.disabled || this.readonly) return;
    this.open = !this.open;
    if (this.isAnimationsActive(this.activeAnimations)) {
      const anim = this.open ? 'header-menu-dropdown-in' : 'header-menu-dropdown-out';
      this.fylib.playAnimation(anim);
      this.dropdownAnimClass = `fy-anim-${anim}`;
      const timeout = this.open ? 250 : 250;
      setTimeout(() => { this.dropdownAnimClass = ''; }, timeout);
    }
    if (this.open) {
      this.onFocusHandler();
    } else {
      this.onBlurHandler();
    }
  }

  onFocusHandler() {
    if (this.isAnimationsActive(this.activeAnimations)) {
      const name = this.resolveAnim(
        'focus',
        undefined,
        (SelectDefinition.features as any)?.animations?.focus as string | undefined
      );
      if (name) this.fylib.playAnimation(name);
      this.triggerByEvent('fy-select.focus', undefined, this.activeEffects);
    }
    if (this.onFocus) this.onFocus();
    this.fyFocus.emit();
  }

  onBlurHandler() {
    if (this.onBlur) this.onBlur();
    this.fyBlur.emit();
  }

  onCheckboxChange(event: Event, val: string) {
    event.stopPropagation();
    this.selectOption(val);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.open) return;
    const target = event.target as Node;
    if (!this.hostEl.nativeElement.contains(target)) {
      this.open = false;
      if (this.isAnimationsActive(this.activeAnimations)) {
        this.fylib.playAnimation('header-menu-dropdown-out');
        this.dropdownAnimClass = 'fy-anim-header-menu-dropdown-out';
        setTimeout(() => { this.dropdownAnimClass = ''; }, 250);
      }
      this.onBlurHandler();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.open) return;
    if (event.key === 'Escape') {
      this.open = false;
      if (this.isAnimationsActive(this.activeAnimations)) {
        this.fylib.playAnimation('header-menu-dropdown-out');
        this.dropdownAnimClass = 'fy-anim-header-menu-dropdown-out';
        setTimeout(() => { this.dropdownAnimClass = ''; }, 250);
      }
      this.onBlurHandler();
    }
  }

  selectOption(val: string) {
    if (this.showCheckbox) {
      const arr = Array.isArray(this.value) ? [...this.value] : [];
      const index = arr.indexOf(val);
      if (index >= 0) arr.splice(index, 1);
      else arr.push(val);
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
}
