import { Component, Input, ViewEncapsulation, HostBinding, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyLibService } from '../services/fylib.service';
import { AppLayoutDefinition } from '@fylib/catalog';
import { resolveAnimationsActive, triggerEffectForEvent, styleString } from '../base/interaction.utils';
import { EffectName } from '@fylib/config';

@Component({
  selector: 'fy-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'fy-layout fy-layout--' + name" [ngStyle]="customStyles || null">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .fy-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
      background-color: var(--fy-colors-background);
      color: var(--fy-colors-text);
      font-family: var(--fy-typography-fontFamily-base, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    /* App Layout specific styles */
    .fy-layout--app-layout {
      display: grid;
      grid-template-areas:
        "header"
        "content"
        "footer";
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
      gap: var(--fy-layout-gap, 0);
    }

    /* When sidebar slot is present, switch to two columns */
    .fy-layout--app-layout:has(.fy-slot--sidebar) {
      grid-template-areas:
        "header header"
        "sidebar content"
        "footer footer";
      grid-template-columns: var(--fy-layout-sidebar-width, 260px) 1fr;
    }

    @media (max-width: 768px) {
      .fy-layout--app-layout {
        grid-template-areas: 
          "header"
          "content"
          "footer";
        grid-template-columns: 1fr;
      }

      .fy-layout--app-layout:has(.fy-slot--sidebar) {
        grid-template-areas: 
          "header"
          "content"
          "footer";
        grid-template-columns: 1fr;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyLayoutComponent implements OnInit {
  private fylib = inject(FyLibService);

  @Input() name: string = AppLayoutDefinition.name;
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;
  @Input() enterEffect?: EffectName;

  @HostBinding('class.fy-animations-disabled')
  get animationsDisabled(): boolean {
    return !resolveAnimationsActive(this.fylib, 'fy-layout', this.activeAnimations);
  }

  ngOnInit() {
    if (!resolveAnimationsActive(this.fylib, 'fy-layout', this.activeAnimations)) {
      return;
    }
    const animationName = this.fylib.getComponentAnimation('fy-layout', 'enter');
    if (animationName) {
      this.fylib.playAnimation(animationName);
    }
    const enabled = this.fylib.isEffectsEnabledFor('fy-layout', this.activeEffects);
    if (enabled) {
      if (this.enterEffect) {
        this.fylib.triggerEffect(this.enterEffect);
      } else {
        triggerEffectForEvent(this.fylib, 'fy-layout.enter', undefined, 'fy-layout', this.activeEffects);
      }
    }
  }

  private resolveAnimationsActive(): boolean {
    return resolveAnimationsActive(this.fylib, 'fy-layout', this.activeAnimations);
  }
}
