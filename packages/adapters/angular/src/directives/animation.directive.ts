import { Directive, inject, ElementRef, Input } from '@angular/core';
import { animationEngine } from '@fylib/animation';

@Directive({
  selector: '[fyAnimation]',
  standalone: true
})
export class FyAnimationDirective {
  private el = inject(ElementRef);
  
  @Input('fyAnimation') animationName!: string;

  play() {
    if (this.animationName) {
      animationEngine.playAnimation(this.animationName);
      // Aqui poderíamos adicionar lógica para aplicar classes CSS ou Web Animations API
      this.el.nativeElement.classList.add(`fy-anim-${this.animationName}`);
    }
  }
}
