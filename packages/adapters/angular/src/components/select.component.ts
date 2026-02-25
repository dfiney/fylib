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
import { SelectProps } from '@fylib/catalog';
import { FyIconComponent } from './icon.component';
import { BaseFyComponent, FyComponentBaseInputs } from '../base/base-component';

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
    >
      <div class="fy-select__control" (click)="toggleOpen()" tabindex="0">
        <span class="fy-select__value">
          {{ displayValue || placeholder }}
        </span>

        @if (iconRightName) {
          <fy-icon class="fy-select__icon" [name]="iconRightName"></fy-icon>
        }
      </div>

      @if (open) {
        <div class="fy-select__dropdown">
          @if (type === 'searchable') {
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
              @if (type === 'checkbox') {
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
  styles: [`
    .fy-select {
      position: relative;
      width: 100%;
      font: inherit;
    }

    .fy-select__control {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: var(--fy-effects-input-borderWidth, 1px) solid var(--fy-effects-input-borderColor, rgba(0,0,0,.15));
      background: var(--fy-effects-input-background, #fff);
      border-radius: var(--fy-borderRadius-md);
      padding: 6px 10px;
      cursor: pointer;
      min-height: 36px;
    }

    .fy-select__dropdown {
      position: absolute;
      width: 100%;
      margin-top: 4px;
      background: #fff;
      border: 1px solid rgba(0,0,0,.1);
      border-radius: var(--fy-borderRadius-md);
      box-shadow: var(--fy-effects-input-shadow, none);
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
      background: rgba(0,0,0,.05);
    }

    .fy-select__search {
      width: 100%;
      padding: 6px;
      border: none;
      outline: none;
      border-bottom: 1px solid rgba(0,0,0,.1);
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
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() status: 'default' | 'success' | 'error' = 'default';
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

  @HostBinding('style')
  get hostStyles(): string {
    return this.getHostStyles(this.customStyles);
  }

  open = false;
  searchTerm = '';

  constructor() {
    super(inject(require('../services/fylib.service').FyLibService), 'fy-select');
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
    if (this.open && this.onFocus) this.onFocus();
    if (!this.open && this.onBlur) this.onBlur();
  }

  selectOption(val: string) {
    if (this === 'checkbox') {
      const arr = Array.isArray(this.value) ? [...this.value] : [];
      const index = arr.indexOf(val);
      if (index >= 0) arr.splice(index, 1);
      else arr.push(val);
      this.value = arr;
    } else {
      this.value = val;
      this.open = false;
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