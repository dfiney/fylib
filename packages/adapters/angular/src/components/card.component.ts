import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProps, CardDefinition } from '@fylib/catalog';
import { FyIconComponent } from './icon.component';
import { animationClasses } from '../base/interaction.utils';
import { EffectName } from '@fylib/config';
import { BaseFyComponent, FyComponentBaseInputs } from '../base/base-component';

@Component({
  selector: 'fy-card',
  standalone: true,
  imports: [CommonModule, FyIconComponent],
  template: `
    <section
      class="fy-card fy-card--{{variant}} {{ animationClassSuffix }}"
      [style]="getHostStyles(customStyles, getVariantStyles(variant))"
    >
      @if (title || hasHeaderSlot) {
        <header class="fy-card__header" [class.fy-card__header--muted]="mutedHeader">
          @if (headerIconName) {
            <fy-icon class="fy-card__header-icon" [name]="headerIconName"></fy-icon>
          }
          <ng-content select="[fy-card-header]"></ng-content>
          @if (title) {
            <h3 class="fy-card__title">{{ title }}</h3>
          }
        </header>
      }

      <form class="fy-card__body" [class.fy-card__body--scroll]="scrollContent" (submit)="onSubmit($event)">
        <ng-content></ng-content>
        @if (hasActionsSlot) {
          <div class="fy-card__actions">
            <ng-content select="[fy-card-actions]"></ng-content>
          </div>
        }
      </form>

      @if (footerText || hasFooterSlot) {
        <footer class="fy-card__footer" [class.fy-card__footer--muted]="mutedFooter">
          @if (footerIconName) {
            <fy-icon class="fy-card__footer-icon" [name]="footerIconName"></fy-icon>
          }
          <ng-content select="[fy-card-footer]"></ng-content>
          @if (footerText) {
            <span>{{ footerText }}</span>
          }
        </footer>
      }
    </section>
  `,
  styles: [`
    .fy-card {
      display: flex;
      flex-direction: column;
      gap: var(--fy-spacing-sm, 8px);
      border-radius: var(--fy-borderRadius-lg, 12px);
      background: var(--fy-effects-card-background, var(--fy-colors-surface, #fff));
      border: 1px solid var(--fy-effects-card-borderColor, rgba(0,0,0,0.08));
      box-shadow: var(--fy-effects-card-shadow, 0 6px 24px rgba(15, 23, 42, 0.06));
      overflow: hidden;
      width: 100%;
      max-width: 100%;
      color: var(--fy-colors-textOverlay, var(--fy-colors-text));
    }
    .fy-card__header-icon, .fy-card__footer-icon { margin-right: var(--fy-spacing-sm, 8px); opacity: .9; }

    .fy-card__header,
    .fy-card__footer {
      padding: var(--fy-spacing-md, 16px);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .fy-card__header--muted,
    .fy-card__footer--muted {
      background: var(--fy-colors-mutedBackground, rgba(15, 23, 42, 0.03));
      color: var(--fy-colors-secondary, #64748b);
    }

    .fy-card__title {
      margin: 0;
      font-size: var(--fy-typography-fontSize-lg, 20px);
      font-weight: var(--fy-typography-fontWeight-bold, 700);
    }

    .fy-card__body {
      padding: var(--fy-spacing-md, 16px);
      display: flex;
      flex-direction: column;
      gap: var(--fy-spacing-md, 16px);
    }

    .fy-card__body--scroll {
      max-height: 420px;
      overflow-y: auto;
    }

    .fy-card__actions {
      display: flex;
      gap: var(--fy-spacing-sm, 8px);
      padding-top: var(--fy-spacing-sm, 8px);
      border-top: 1px solid var(--fy-effects-card-dividerColor, rgba(0,0,0,0.08));
      justify-content: flex-end;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .fy-card__body--scroll {
        max-height: 60vh;
      }
      .fy-card__actions {
        justify-content: stretch;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyCardComponent extends BaseFyComponent<'fy-card'> implements CardProps, FyComponentBaseInputs {

  @Input() title?: string;
  @Input() headerIconName?: string;
  @Input() footerIconName?: string;
  @Input() variant: NonNullable<CardProps['variant']> = CardDefinition.defaultProps!.variant!;
  @Input() mode: NonNullable<CardProps['mode']> = CardDefinition.defaultProps!.mode!;
  @Input() mutedHeader: boolean = CardDefinition.defaultProps!.mutedHeader!;
  @Input() mutedFooter: boolean = CardDefinition.defaultProps!.mutedFooter!;
  @Input() footerText?: string;
  @Input() scrollContent: boolean = CardDefinition.defaultProps!.scrollContent!;
  @Input() activeAnimations: boolean | null = CardDefinition.defaultProps!.activeAnimations!;
  @Input() activeEffects: boolean | null = CardDefinition.defaultProps!.activeEffects!;
  @Input() customStyles: Record<string, string> | null = CardDefinition.defaultProps!.customStyles!;

  @Input() submitEffect?: EffectName

  @Output() fySubmit = new EventEmitter<void>();


  @HostBinding('class.fy-animations-disabled')
  get animationsDisabled(): boolean {
    return !this.isAnimationsActive(this.activeAnimations);
  }

  constructor() {
    super(inject(require('../services/fylib.service').FyLibService), 'fy-card');
    
    const t = this.fylib.tokens() as any;
    const icons = t?.effects?.card?.icons || {};
    if (icons?.header) this.headerIconName = icons.header;
    if (icons?.footer) this.footerIconName = icons.footer;
  }

  get hasHeaderSlot(): boolean { return false; }
  get hasFooterSlot(): boolean { return false; }
  get hasActionsSlot(): boolean { return true; }

  get animationClassSuffix(): string {
    const anim = this.resolveAnim('enter', undefined, (CardDefinition.features as any)?.animations?.enter as string | undefined);
    return animationClasses(anim);
  }

  get hostStyles(): string {
    return this.getHostStyles(this.customStyles);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.mode === 'form' && this.isAnimationsActive(this.activeAnimations)) {
      this.triggerByEvent('fy-card.submit', this.submitEffect, this.activeEffects);
    }
    if (this.mode === 'form') {
      this.fySubmit.emit();
    }
  }

  private resolveAnimationsActive(): boolean {
    return this.isAnimationsActive(this.activeAnimations);
  }
}
