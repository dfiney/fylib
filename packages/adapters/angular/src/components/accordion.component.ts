import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionProps, AccordionItem, AccordionDefinition, AccordionExpandMode } from '@fylib/catalog';
import { BaseFyComponent, FyComponentBaseInputs } from '../base/base-component';
import { FyLibService } from '../services/fylib.service';

@Component({
  selector: 'fy-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fy-accordion" 
         [class.fy-accordion--bordered]="bordered" 
         [class.fy-accordion--flush]="flush"
         [style]="getHostStyles(customStyles, getVariantStyles(variant))"
         role="presentation">
      @for (it of items; track it.id; let i = $index) {
        <section class="fy-accordion__item" 
                 [class.fy-accordion__item--active]="isActive(i)" 
                 [class.fy-accordion__item--disabled]="it.disabled">
          <header class="fy-accordion__header" 
                  (click)="toggle(i)"
                  (keydown)="handleKeyDown($event, i)"
                  [attr.aria-expanded]="isActive(i)"
                  [attr.aria-controls]="'fy-accordion-panel-' + it.id"
                  [attr.aria-disabled]="it.disabled || disabled"
                  [attr.id]="'fy-accordion-header-' + it.id"
                  [tabindex]="it.disabled || disabled ? -1 : 0"
                  role="button">
            <div class="fy-accordion__header-main">
              <h4 class="fy-accordion__title">{{ it.title }}</h4>
              @if (it.subtitle) { <p class="fy-accordion__subtitle">{{ it.subtitle }}</p> }
            </div>
            <span class="fy-accordion__indicator" 
                  [class.fy-accordion__indicator--open]="isActive(i)"
                  aria-hidden="true">▾</span>
          </header>
          
          <div 
            class="fy-accordion__panel-wrapper" 
            [ngClass]="getPanelClasses(i)"
            [attr.id]="'fy-accordion-panel-' + it.id"
            [attr.aria-labelledby]="'fy-accordion-header-' + it.id"
            [attr.aria-hidden]="!isActive(i)"
            role="region"
          >
            <div class="fy-accordion__panel">
              @if (!lazy || isActive(i)) {
                @if (it.content) {
                  <div class="fy-accordion__content">{{ it.content }}</div>
                } @else {
                  <ng-content select="[fy-accordion-item-content={{it.id}}]"></ng-content>
                }
              }
            </div>
          </div>
        </section>
      }
    </div>
  `,
  styles: [`
    .fy-accordion {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .fy-accordion--bordered { 
      border: 1px solid var(--fy-effects-accordion-borderColor, rgba(0,0,0,0.1));
      border-radius: var(--fy-effects-accordion-borderRadius, var(--fy-borderRadius-md));
      padding: 4px;
      background: var(--fy-effects-accordion-background, #fff);
      box-shadow: var(--fy-effects-accordion-shadow, none);
    }
    .fy-accordion--flush { border: none; padding: 0; }

    .fy-accordion__item {
      background: var(--fy-effects-accordion-background, #fff);
      border: 1px solid var(--fy-effects-accordion-borderColor, rgba(0,0,0,0.1));
      border-radius: var(--fy-effects-accordion-borderRadius, var(--fy-borderRadius-md));
      overflow: hidden;
    }
    .fy-accordion--flush .fy-accordion__item {
      border: none;
      border-radius: 0;
      background: transparent;
    }

    .fy-accordion__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 12px;
      background: var(--fy-effects-accordion-headerBackground, transparent);
      cursor: pointer;
      user-select: none;
    }
    .fy-accordion__title {
      margin: 0;
      font-size: var(--fy-typography-fontSize-md, 14px);
      font-weight: var(--fy-typography-fontWeight-bold, 600);
    }
    .fy-accordion__subtitle {
      margin: 0;
      font-size: var(--fy-typography-fontSize-sm, 11px);
      opacity: .7;
    }
    .fy-accordion__header-main {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .fy-accordion__indicator {
      transition: transform .2s ease;
    }
    .fy-accordion__indicator--open { transform: rotate(180deg); }

    .fy-accordion__panel-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
      opacity: 0;
      overflow: hidden;
    }

    .fy-accordion__panel-wrapper--active {
      grid-template-rows: 1fr;
      opacity: 1;
    }

    .fy-accordion__panel {
      min-height: 0;
      border-top: 1px solid var(--fy-effects-accordion-dividerColor, rgba(0,0,0,0.08));
      padding: 0 12px;
      transition: padding 0.3s ease;
    }

    .fy-accordion__panel-wrapper--active .fy-accordion__panel {
      padding: 12px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyAccordionComponent extends BaseFyComponent<'fy-accordion'> implements AccordionProps, FyComponentBaseInputs {
  constructor() {
    super(inject(FyLibService), 'fy-accordion');
  }

  @Input() items: AccordionItem[] = AccordionDefinition.defaultProps!.items!;
  @Input() variant: string = 'default';
  @Input() activeIndex?: number | number[];
  @Input() expandMode: AccordionExpandMode = AccordionDefinition.defaultProps!.expandMode!;
  @Input() size: AccordionProps['size'] = AccordionDefinition.defaultProps!.size!;
  @Input() status: AccordionProps['status'] = AccordionDefinition.defaultProps!.status!;
  @Input() bordered: boolean = AccordionDefinition.defaultProps!.bordered!;
  @Input() flush: boolean = AccordionDefinition.defaultProps!.flush!;
  @Input() animated: boolean = AccordionDefinition.defaultProps!.animated!;
  @Input() lazy: boolean = AccordionDefinition.defaultProps!.lazy!;
  @Input() iconPosition: 'left' | 'right' = AccordionDefinition.defaultProps!.iconPosition!;
  @Input() disabled: boolean = AccordionDefinition.defaultProps!.disabled!;

  @Input() onOpen?: (index: number) => void;
  @Input() onClose?: (index: number) => void;
  @Input() onChange?: (activeIndex: number | number[]) => void;

  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;

  @Output() fyOpen = new EventEmitter<number>();
  @Output() fyClose = new EventEmitter<number>();
  @Output() fyChange = new EventEmitter<number | number[]>();

  @HostBinding('class.fy-animations-disabled')
  get animationsDisabled() { return !this.isAnimationsActive(this.activeAnimations); }

  @HostBinding('style')
  get hostStyles(): string { return this.getHostStyles(this.customStyles); }

  getPanelClasses(i: number): Record<string, boolean | string | undefined> {
    const active = this.isActive(i);
    const animClass = active 
      ? this.resolveAnim('expand', undefined, 'accordion-expand')
      : this.resolveAnim('collapse', undefined, 'accordion-collapse');
    
    const classes: Record<string, boolean | string | undefined> = {
      'fy-accordion__panel-wrapper--active': active
    };
    
    if (animClass) {
      classes[animClass] = true;
    }
    
    return classes;
  }

  isActive(i: number): boolean {
    const val = this.activeIndex;
    if (this.expandMode === 'multiple') {
      if (Array.isArray(val)) {
        return val.includes(i);
      }
      return val === i;
    }
    return val === i;
  }

  handleKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle(index);
    }
  }

  toggle(i: number) {
    if (this.disabled || this.items[i]?.disabled) return;
    const wasActive = this.isActive(i);
    
    if (this.expandMode === 'single') {
      this.activeIndex = wasActive ? undefined : i;
    } else {
      const current = Array.isArray(this.activeIndex) 
        ? [...this.activeIndex] 
        : (this.activeIndex !== undefined ? [this.activeIndex as number] : []);
      
      const idx = current.indexOf(i);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        current.push(i);
      }
      this.activeIndex = current;
    }

    if (this.isAnimationsActive(this.activeAnimations) && this.animated) {
      const event = wasActive ? 'collapse' : 'expand';
      const name = this.resolveAnim(event, undefined, (AccordionDefinition.features as any)?.animations?.[event] as string | undefined);
      if (name) this.fylib.playAnimation(name);
    }

    if (!wasActive) {
      if (this.onOpen) this.onOpen(i);
      this.fyOpen.emit(i);
    } else {
      if (this.onClose) this.onClose(i);
      this.fyClose.emit(i);
    }
    
    const emitValue = this.activeIndex ?? (this.expandMode === 'single' ? -1 : []);
    if (this.onChange) this.onChange(emitValue);
    this.fyChange.emit(emitValue);
  }
}
