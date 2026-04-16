import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostBinding,
  HostListener,
  inject,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalProps, ModalDefinition } from '@fylib/catalog';
import { FyButtonComponent } from './button.component';
import { BaseFyComponent, FyComponentBaseInputs } from '../base/base-component';

@Component({
  selector: 'fy-modal',
  standalone: true,
  imports: [CommonModule, FyButtonComponent],
  template: `
    @if (visible) {
      <div class="fy-modal-overlay" (click)="onBackdropClick()"></div>
      <div class="fy-modal" [ngClass]="['fy-modal--' + size, 'fy-modal--status-' + status, modalAnimClass]" [style]="getHostStyles(customStyles, getVariantStyles(variant))">
        @if (showHeader) {
          <header class="fy-modal__header">
            @if (title) { <h3 class="fy-modal__title">{{ title }}</h3> }
            @if (subtitle) { <p class="fy-modal__subtitle">{{ subtitle }}</p> }
            @if (closable) {
              <button type="button" class="fy-modal__close" (click)="handleCancel()">&times;</button>
            }
          </header>
        }

        <section class="fy-modal__body">
          <ng-content></ng-content>
          @if (content) { <div class="fy-modal__content">{{ content }}</div> }
        </section>

        @if (showFooter) {
          <footer class="fy-modal__footer">
            @if (showCancelButton) {
              <fy-button
                variant="ghost"
                size="md"
                [label]="cancelText || 'Cancelar'"
                (fyClick)="handleCancel()"
              ></fy-button>
            }
            @if (showConfirmButton) {
              <fy-button
                size="md"
                [label]="confirmText || 'Confirmar'"
                (fyClick)="handleConfirm()"
              ></fy-button>
            }
          </footer>
        }
      </div>
    }
  `,
  styles: [`
    .fy-modal-overlay {
      position: fixed;
      inset: 0;
      background: var(--fy-effects-modal-overlayColor, rgba(0,0,0,0.45));
      z-index: 2000;
    }
    .fy-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--fy-effects-modal-background, var(--fy-colors-surface, #fff));
      border: var(--fy-effects-modal-borderWidth, 1px) solid var(--fy-effects-modal-borderColor, rgba(0,0,0,0.12));
      border-radius: var(--fy-effects-modal-borderRadius, var(--fy-borderRadius-md));
      box-shadow: var(--fy-effects-modal-shadow, 0 20px 60px rgba(0,0,0,0.2));
      color: var(--fy-colors-text);
      width: 90vw;
      max-width: 640px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 2001;
    } 
    .fy-modal--sm { max-width: 400px; }
    .fy-modal--md { max-width: 640px; }
    .fy-modal--lg { max-width: 840px; }
    .fy-modal--xl { max-width: 1040px; }
    .fy-modal--full { width: 96vw; height: 90vh; max-width: none; }

    .fy-modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--fy-effects-modal-dividerColor, rgba(0,0,0,0.08));
    }
    .fy-modal__title {
      margin: 0;
      font-size: var(--fy-typography-fontSize-lg, 18px);
      font-weight: var(--fy-typography-fontWeight-bold, 700);
    }
    .fy-modal__subtitle {
      margin: 0;
      opacity: .8;
      font-size: var(--fy-typography-fontSize-sm, 12px);
    }
    .fy-modal__close {
      border: 0;
      background: transparent;
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
    }
    .fy-modal__body {
      padding: 16px;
      flex: 1; 
      overflow: auto;
    }
    .fy-modal__footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid var(--fy-effects-modal-dividerColor, rgba(0,0,0,0.08));
    }

    .fy-modal--status-success {
      border-color: var(--fy-colors-success, #22c55e);
      box-shadow: 0 0 0 3px rgba(34,197,94,0.15), var(--fy-effects-modal-shadow, 0 20px 60px rgba(0,0,0,0.2));
    }
    .fy-modal--status-error {
      border-color: var(--fy-colors-danger, #ef4444);
      box-shadow: 0 0 0 3px rgba(239,68,68,0.15), var(--fy-effects-modal-shadow, 0 20px 60px rgba(0,0,0,0.2));
    }

    .fy-animations-disabled, .fy-animations-disabled * {
      transition: none !important;
      animation: none !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyModalComponent
  extends BaseFyComponent<'fy-modal'>
  implements ModalProps, FyComponentBaseInputs, OnChanges {

  @Input() visible: boolean = ModalDefinition.defaultProps!.visible!;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() content?: string;
  @Input() size: NonNullable<ModalProps['size']> = ModalDefinition.defaultProps!.size!;
  @Input() variant: string = 'default';
  @Input() position: NonNullable<ModalProps['position']> = ModalDefinition.defaultProps!.position!;
  @Input() status: NonNullable<ModalProps['status']> = ModalDefinition.defaultProps!.status!;
  @Input() closable: boolean = ModalDefinition.defaultProps!.closable!;
  @Input() closeOnEscape: boolean = ModalDefinition.defaultProps!.closeOnEscape!;
  @Input() closeOnBackdrop: boolean = ModalDefinition.defaultProps!.closeOnBackdrop!;
  @Input() showHeader: boolean = ModalDefinition.defaultProps!.showHeader!;
  @Input() showFooter: boolean = ModalDefinition.defaultProps!.showFooter!;
  @Input() showConfirmButton: boolean = ModalDefinition.defaultProps!.showConfirmButton!;
  @Input() showCancelButton: boolean = ModalDefinition.defaultProps!.showCancelButton!;
  @Input() confirmText?: string = ModalDefinition.defaultProps!.confirmText;
  @Input() cancelText?: string = ModalDefinition.defaultProps!.cancelText;
  @Input() loading: boolean = ModalDefinition.defaultProps!.loading!;
  @Input() centered: boolean = ModalDefinition.defaultProps!.centered!;
  @Input() blockScroll: boolean = ModalDefinition.defaultProps!.blockScroll!;
  @Input() draggable: boolean = ModalDefinition.defaultProps!.draggable!;
  @Input() resizable: boolean = ModalDefinition.defaultProps!.resizable!;

  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;

  @Input() onOpen?: () => void;
  @Input() onClose?: () => void;
  @Input() onConfirm?: () => void;
  @Input() onCancel?: () => void;

  @Output() fyOpen = new EventEmitter<void>();
  @Output() fyClose = new EventEmitter<void>();
  @Output() fyConfirm = new EventEmitter<void>();
  @Output() fyCancel = new EventEmitter<void>();

  @HostBinding('class.fy-animations-disabled')
  get animationsDisabled(): boolean {
    return !this.isAnimationsActive(this.activeAnimations);
  }

  @HostBinding('style')
  get hostStyles(): string {
    return this.getHostStyles(this.customStyles);
  }

  constructor() {
    super(inject(require('../services/fylib.service').FyLibService), 'fy-modal');
  }

  modalAnimClass: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      if (this.visible) {
        if (this.blockScroll && typeof document !== 'undefined') {
          document.body.style.overflow = 'hidden';
        }
        if (this.isAnimationsActive(this.activeAnimations)) {
          const name = this.resolveAnim(
            'open',
            undefined,
            (ModalDefinition.features as any)?.animations?.open as string | undefined
          );
          if (name) {
            this.fylib.playAnimation(name);
            this.modalAnimClass = `fy-anim-${name}`;
            setTimeout(() => { this.modalAnimClass = ''; }, 280);
          }
        }
        if (this.onOpen) this.onOpen();
        this.fyOpen.emit();
      } else {
        if (this.blockScroll && typeof document !== 'undefined') {
          document.body.style.overflow = '';
        }
        if (this.isAnimationsActive(this.activeAnimations)) {
          const name = this.resolveAnim(
            'close',
            undefined,
            (ModalDefinition.features as any)?.animations?.close as string | undefined
          );
          if (name) {
            this.fylib.playAnimation(name);
            this.modalAnimClass = `fy-anim-${name}`;
            setTimeout(() => { this.modalAnimClass = ''; }, 220);
          }
        }
        if (this.onClose) this.onClose();
        this.fyClose.emit();
      }
    }
  }

  handleConfirm() {
    if (this.onConfirm) this.onConfirm();
    this.fyConfirm.emit();
  }

  handleCancel() {
    if (!this.closable) return;
    if (this.onCancel) this.onCancel();
    this.fyCancel.emit();
    if (this.isAnimationsActive(this.activeAnimations)) {
      const name = this.resolveAnim(
        'close',
        undefined,
        (ModalDefinition.features as any)?.animations?.close as string | undefined
      );
      if (name) {
        this.fylib.playAnimation(name);
        this.modalAnimClass = `fy-anim-${name}`;
        setTimeout(() => {
          this.modalAnimClass = '';
          this.visible = false;
          this.ngOnChanges({ visible: { currentValue: false, previousValue: true, firstChange: false, isFirstChange: () => false } } as any);
        }, 220);
        return;
      }
    }
    this.visible = false;
    this.ngOnChanges({ visible: { currentValue: false, previousValue: true, firstChange: false, isFirstChange: () => false } } as any);
  }

  onBackdropClick() {
    if (!this.closeOnBackdrop) return;
    this.handleCancel();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.visible) return;
    if (event.key === 'Escape' && this.closeOnEscape) {
      this.handleCancel();
    }
  }
}
