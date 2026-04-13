import { Component, Input, ViewEncapsulation, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyLibService } from '../services/fylib.service';
import { iconRegistry, IconVariant } from '../icons/registry';
import { IconSet } from '@fylib/config';

type IconSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'fy-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="fy-icon"
          [class]="'fy-icon--' + size"
          [ngStyle]="wrapperStyle()"
          >
      @if (svgPath) {
        <svg [attr.viewBox]="svgViewBox" fill="currentColor" aria-hidden="true">
          <path [attr.d]="svgPath"></path>
        </svg>
      } @else {
        @if (className) {
          <span [class]="className"></span>
        }
      }
    </span>
  `,
  styles: [`
    .fy-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--fy-icons-color, currentColor);
    }
    .fy-icon svg {
      width: 1em;
      height: 1em;
    }
    .fy-icon--sm { font-size: var(--fy-icons-size-sm, var(--fy-typography-fontSize-sm, 12px)); }
    .fy-icon--md { font-size: var(--fy-icons-size-md, var(--fy-typography-fontSize-md, 16px)); }
    .fy-icon--lg { font-size: var(--fy-icons-size-lg, var(--fy-typography-fontSize-lg, 20px)); }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyIconComponent {
  private fylib = inject(FyLibService);
  @Input() name?: string;
  @Input() size: IconSize = 'md';
  @Input() color?: string | null;
  @Input() strokeWidth?: string | number | null;
  @Input() variant?: IconVariant | null;
  @Input() set?: IconSet;

  wrapperStyle = computed(() => {
    const style: Record<string, string> = {};
    const tokens = this.fylib.tokens() as any;
    const defaultColor = tokens?.icons?.color;
    const defaultStroke = tokens?.icons?.strokeWidth;
    const color = this.color ?? (defaultColor ? String(defaultColor) : null);
    if (color) style['color'] = color;
    const sw = this.strokeWidth ?? (defaultStroke ? String(defaultStroke) : null);
    if (sw != null) style['--fy-icon-stroke-width'] = String(sw);
    return style;
  });

  get svgPath(): string | null {
    const tokens = this.fylib.tokens() as any;
    const defaultSet = tokens?.icons?.defaultSet || null;
    const effectiveSet = this.set || defaultSet || null;
    if (effectiveSet) {
      const provider = iconRegistry.getProvider(effectiveSet);
      const v = (this.variant ?? (tokens?.icons?.variant as IconVariant | undefined)) || undefined;
      if (provider?.resolveSvg) {
        const res = provider.resolveSvg(String(this.name), v);
        if (res?.svg) {
          this._svgViewBox = res.viewBox || '0 0 24 24';
          return res.svg;
        }
      }
    }
    switch (this.name) {
      case 'user':
        return 'M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5S7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z';
      case 'search':
        return 'M11 4a7 7 0 105.197 12.03l3.386 3.387 1.414-1.414-3.387-3.386A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z';
      case 'eye':
        return 'M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z';
      case 'eye-slash':
        return 'M2 2l20 20-1.5 1.5L16.9 18.9A10.9 10.9 0 0112 19c-7 0-11-7-11-7a21.8 21.8 0 015.4-6.5L3.5 3.5 2 2zm7.7 7.7a4 4 0 005.6 5.6l-5.6-5.6zM12 5c7 0 11 7 11 7a21.8 21.8 0 01-4.3 5.1l-1.5-1.5A10.9 10.9 0 0012 7a10.9 10.9 0 00-3.4.6L7.2 6.2A21.8 21.8 0 0112 5zm-9 7s4 7 11 7a10.9 10.9 0 004.3-.9l-1.6-1.6A10.9 10.9 0 0112 17c-7 0-11-5-11-5z';
      case 'menu':
        return 'M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z';
      default:
        return null;
    }
  }

  private _svgViewBox = '0 0 24 24';
  get svgViewBox(): string {
    return this._svgViewBox;
  }

  get className(): string | null {
    const tokens = this.fylib.tokens() as any;
    const defaultSet = tokens?.icons?.defaultSet || null;
    const effectiveSet = this.set || defaultSet;
    if (!effectiveSet) return null;
    const provider = iconRegistry.getProvider(effectiveSet);
    const v = (this.variant ?? (tokens?.icons?.variant as IconVariant | undefined)) || undefined;
    if (provider?.resolveClass) {
      return provider.resolveClass(String(this.name), v);
    }
    const base = effectiveSet === 'ph' ? 'ph' : effectiveSet;
    return `${base} ${base}-${this.name}`;
  }
}
