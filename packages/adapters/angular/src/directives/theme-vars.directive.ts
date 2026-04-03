import { Directive, ElementRef, inject, effect } from '@angular/core';
import { FyLibService } from '../services/fylib.service';
import { DesignTokens } from '@fylib/core';

@Directive({
  selector: '[fyThemeVars]',
  standalone: true
})
export class FyThemeVarsDirective {
  private el = inject(ElementRef);
  private fylib = inject(FyLibService);

  constructor() {
    this.ensureResetInjected();
    effect(() => {
      const tokens: DesignTokens = this.fylib.tokens();
      const config = this.fylib.config();
      this.applyTokensToElement(this.el.nativeElement, tokens, !!config.theme?.animationsEnabled);
    });
  }

  private ensureResetInjected() {
    const doc = (this.el.nativeElement as HTMLElement).ownerDocument as Document;
    if (!doc.getElementById('fy-reset-style')) {
      const style = doc.createElement('style');
      style.id = 'fy-reset-style';
      style.textContent = `
        *,*::before,*::after{box-sizing:border-box}
        html,body{height:100%}
        body{margin:0;padding:0;line-height:1.5;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
        h1,h2,h3,h4,h5,h6,p,figure,blockquote,dl,dd{margin:0}
        ul,ol{margin:0;padding:0;list-style:none}
        img,picture,video,canvas,svg{display:block;max-width:100%}
        input,button,textarea,select{font:inherit;color:inherit}
        a{text-decoration:none;color:inherit}
        table{border-collapse:collapse;border-spacing:0}
      `;
      doc.head.appendChild(style);
    }
  }

  private applyTokensToElement(element: HTMLElement, tokens: DesignTokens, animationsEnabled: boolean, prefix = '--fy-') {
    Object.keys(tokens as any).forEach(key => {
      const value = (tokens as any)[key];
      if (value == null) {
        return;
      }
      if (typeof value === 'object') {
        this.applyTokensToElement(element, value as any, animationsEnabled, `${prefix}${key}-`);
      } else {
        element.style.setProperty(`${prefix}${key}`, String(value));
      }
    });

    if (!animationsEnabled) {
      element.classList.add('fy-animations-disabled');
    } else {
      element.classList.remove('fy-animations-disabled');
    }
  }
}
