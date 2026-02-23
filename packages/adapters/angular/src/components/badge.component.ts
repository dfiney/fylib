import { Component, Input, ViewEncapsulation, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyLibService } from '../services/fylib.service';

@Component({
  selector: 'fy-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="fy-badge" [class.fy-badge--shine]="shineClass()" [ngStyle]="badgeStyle()" >
      <ng-content></ng-content>
      @if (text) {
        <span>{{ text }}</span>
      }
    </span>
  `,
  styles: [`
    .fy-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 6px;
      min-width: 16px;
      height: 16px;
      font-size: 10px;
      font-weight: 700;
      line-height: 1;
      border-radius: 8px;
      background-color: var(--fy-badge-background, #ff4757);
      color: var(--fy-badge-textColor, #fff);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.06);
      white-space: nowrap;
    }
    .fy-badge.fy-badge--shine {
      position: relative;
      overflow: hidden;
    }
    .fy-badge.fy-badge--shine::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -150%;
      width: 50%;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent);
      transform: skewX(-20deg);
      animation: fy-badge-shine 2.4s linear infinite;
    }
    @keyframes fy-badge-shine {
      0% { left: -150%; }
      100% { left: 200%; }
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyBadgeComponent {
  private fylib = inject(FyLibService);
  @Input() text?: string;
  @Input() background?: string | null;
  @Input() textColor?: string | null;
  @Input() borderRadius?: string | null;
  @Input() shine?: boolean | null;

  badgeStyle = computed(() => {
    const style: Record<string, string> = {};
    const tokens = this.fylib.tokens() as any;
    const badgeTokens = tokens?.effects?.badge || tokens?.badge || {};
    const bg = this.background ?? badgeTokens.background ?? null;
    const fg = this.textColor ?? badgeTokens.textColor ?? null;
    const br = this.borderRadius ?? badgeTokens.borderRadius ?? null;
    if (bg) style['--fy-badge-background'] = bg;
    if (fg) style['--fy-badge-textColor'] = fg;
    if (br) style['border-radius'] = br;
    return style;
  });

  shineClass = computed(() => {
    const tokens = this.fylib.tokens() as any;
    const badgeTokens = tokens?.effects?.badge || tokens?.badge || {};
    const shineToken = badgeTokens.animation === 'shine';
    return this.shine ?? shineToken;
  });
}
