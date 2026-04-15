import { Component, Input, ViewEncapsulation, signal, effect, inject } from '@angular/core';
import { FyLibService } from '../services/fylib.service';
import { cryptoEngine } from '@fylib/crypto';

@Component({
  selector: 'fy-text',
  standalone: true,
  template: `
    <span>{{ value() }}</span>
  `,
  encapsulation: ViewEncapsulation.None
})
export class FyTextComponent {
  private fylib = inject(FyLibService);
  private _raw = signal<string>('');
  @Input() set text(v: string) { this._raw.set(v ?? ''); }
  @Input() cryptoEnabled: boolean = false;
  public value = signal<string>('');

  constructor() {
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
