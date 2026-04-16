import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyIconComponent } from './icon.component';
import { BaseFyComponent } from '../base/base-component';
import { FyLibService } from '../services/fylib.service';

@Component({
  selector: 'fy-nav-link',
  standalone: true,
  imports: [CommonModule, FyIconComponent],
  template: `
    <a
      [attr.href]="href || to || null"
      [attr.target]="target || null"
      rel="noopener noreferrer"
      class="fy-nav-link"
      [class.active]="active"
      [class.fy-nav-link--hover-disabled]="!hoverEnabled"
      [style]="getHostStyles(customStyles, getVariantStyles(variant))"
    >
      @if (iconName) {
        <fy-icon [name]="iconName" [set]="iconSet" class="fy-nav-link__icon"></fy-icon>
      }
      <ng-content></ng-content>
      @if (!hasProjectedContent) {
        <span>{{ label }}</span>
      }
    </a>
  `,
  styles: [`
    .fy-nav-link {
      display: inline-flex;
      align-items: center;
      gap: var(--fy-spacing-sm, 8px);
      padding: var(--fy-spacing-sm) var(--fy-spacing-md);
      border-radius: var(--fy-borderRadius-sm);
      color: var(--fy-colors-text);
      text-decoration: none;
      transition: background-color 0.15s ease, color 0.15s ease;
    }
    .fy-nav-link__icon {
      flex: 0 0 auto;
      opacity: .95;
    }
    .fy-nav-link:hover:not(.fy-nav-link--hover-disabled) {
      background-color: rgba(var(--fy-colors-primary-rgb, 59,130,246), 0.08);
      color: var(--fy-colors-primary);
    }
    .fy-nav-link.active {
      background-color: rgba(var(--fy-colors-primary-rgb, 59,130,246), 0.12);
      color: var(--fy-colors-primary);
      font-weight: var(--fy-typography-fontWeight-bold);
    }

    /* Dentro do header, os links devem se comportar como itens de navegação horizontal */
    .fy-slot--header .fy-nav-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .fy-slot--header .fy-nav-link {
        display: inline-flex;
        justify-content: flex-start;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyNavLinkComponent extends BaseFyComponent<'fy-nav-link'> {
  constructor() {
    super(inject(FyLibService), 'fy-nav-link');
  }

  @Input() label: string = '';
  @Input() to?: string;
  @Input() href?: string;
  @Input() target?: '_blank' | '_self' | '_parent' | '_top';
  @Input() active?: boolean;
  @Input() hoverEnabled: boolean = true;
  @Input() iconName?: string;
  @Input() iconSet?: 'ph' | 'fa' | 'mdi';
  @Input() variant: string = 'default';
  @Input() customStyles: Record<string, string> | null = null;
  @Input() activeAnimations: boolean | null = null;

  get hasProjectedContent(): boolean {
    // Em Angular, checar projeção é não trivial sem ViewChild/ContentChild; simplificado:
    return !!this.label && this.label.trim().length > 0 ? false : true;
  }
}
