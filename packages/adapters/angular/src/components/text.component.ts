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
  @Input() customStyles: Record<string, string> | null = null;
  @Input() activeAnimations: boolean | null = null;
  public value = signal<string>('');

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
    });
  }
}
