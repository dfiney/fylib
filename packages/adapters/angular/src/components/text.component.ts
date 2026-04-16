import { Component, Input, ViewEncapsulation, signal, effect, inject, HostBinding } from '@angular/core';
import { FyLibService } from '../services/fylib.service';
import { cryptoEngine } from '@fylib/crypto';
import { BaseFyComponent } from '../base/base-component';

@Component({
  selector: 'fy-text',
  standalone: true,
  template: `
    <span [style]="getHostStyles(customStyles, getVariantStyles(variant))">{{ value() }}</span>
  `,
  encapsulation: ViewEncapsulation.None
})
export class FyTextComponent extends BaseFyComponent<'fy-text'> {
  private _raw = signal<string>('');
  @Input() set text(v: string) { this._raw.set(v ?? ''); }
  @Input() cryptoEnabled: boolean = false;
  @Input() variant: string = 'default';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() strong: boolean = false;
  @Input() customStyles: Record<string, string> | null = null;
  @Input() activeAnimations: boolean | null = null;
  public value = signal<string>('');

  @HostBinding('style.font-weight')
  get fontWeight(): string | null {
    return this.strong ? 'bold' : null;
  }

  @HostBinding('style.font-size')
  get fontSize(): string | null {
    switch (this.size) {
      case 'sm': return 'var(--fy-typography-fontSize-sm, 12px)';
      case 'lg': return 'var(--fy-typography-fontSize-lg, 20px)';
      case 'xl': return '28px';
      default: return 'var(--fy-typography-fontSize-md, 16px)';
    }
  }

  constructor() {
    super(inject(FyLibService), 'fy-text');
    effect(async () => {
      const raw = this._raw();
      const cfg = this.fylib.config().crypto;
      let finalValue = raw;

      if (this.cryptoEnabled && cfg?.enabled) {
        try {
          finalValue = await cryptoEngine.decrypt(raw, cfg);
        } catch {
          finalValue = raw;
        }
      }
      
      this.value.set(finalValue);
    }, { allowSignalWrites: true });
  }
}
