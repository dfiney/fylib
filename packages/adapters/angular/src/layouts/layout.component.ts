import { Component, Input, ViewEncapsulation, HostBinding, inject, OnInit, OnChanges, SimpleChanges, OnDestroy, effect, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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

    /* Fixed Sidebar mode: Lock height to viewport and disable global scroll */
    .fy-layout--app-layout:has(.fy-slot--sidebar-fixed) {
      height: 100vh;
      min-height: 100vh;
      max-height: 100vh;
      overflow: hidden;
    }

    /* Ensure content area takes full height and scrolls internally in fixed mode */
    .fy-layout--app-layout:has(.fy-slot--sidebar-fixed) .fy-slot--content {
      height: 100%;
      overflow-y: auto;
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
export class FyLayoutComponent implements OnInit, OnChanges, OnDestroy {
  private fylib = inject(FyLibService);
  private platformId = inject(PLATFORM_ID);
  private layoutEffectId = `layout-bg-effect-${Math.random().toString(36).substr(2, 9)}`;
  protected currentTheme = signal<string>('default');

  @Input() name: string = AppLayoutDefinition.name;
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;
  @Input() enterEffect?: EffectName;

  // Background effects configuration
  @Input() bgEffect?: EffectName | string | null;
  @Input() bgEffectIntensity?: number | null = null;
  @Input() bgEffectSpeed?: number | null = null;
  @Input() bgEffectLoop?: boolean | null = null;

  @HostBinding('class.fy-animations-disabled')
  get animationsDisabled(): boolean {
    return !resolveAnimationsActive(this.fylib, 'fy-layout', this.activeAnimations);
  }

  constructor() {
    // Reage a mudanças na configuração global de efeitos de tema (themeEffectsEnabled)
    effect(() => {
      const config = this.fylib.config();
      
      // Sincronizar o sinal currentTheme de forma segura
      const theme = config.theme?.theme;
      if (theme) {
        this.currentTheme.set(theme);
      }
      
      this.applyBgEffect();
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

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
        triggerEffectForEvent(this.fylib, 'fy-layout.enter', 'fy-layout', this.activeEffects);
      }
      
      this.applyBgEffect();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (changes['bgEffect'] || changes['bgEffectIntensity'] || changes['bgEffectSpeed'] || changes['bgEffectLoop']) {
      this.applyBgEffect();
    }
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.stopBgEffect();
  }

  private applyBgEffect() {
    if (!isPlatformBrowser(this.platformId)) return;

    const config = this.fylib.config();
    const globalEnabled = config.theme?.themeEffectsEnabled ?? false;

    // Só mostra se habilitado globalmente no AppConfig (theme.config.ts)
    if (!globalEnabled) {
      this.stopBgEffect();
      return;
    }

    // Regra solicitada: seguir a ativação do wallpaper. 
    // Ou seja, só ativa se a prop bgEffect estiver presente (não undefined).
    if (this.bgEffect === undefined) {
      this.stopBgEffect();
      return;
    }

    const enabled = this.fylib.isEffectsEnabledFor('fy-layout', this.activeEffects);
    if (!enabled) {
      this.stopBgEffect();
      return;
    }

    let effectToPlay: EffectName | undefined;
    let params: any = {
      id: this.layoutEffectId,
      intensity: this.bgEffectIntensity,
      speed: this.bgEffectSpeed,
      loop: this.bgEffectLoop
    };

    // 1. Se informou um nome específico (diferente de "" ou "auto"), usa ele como override com precedência total
    if (this.bgEffect && this.bgEffect !== '' && this.bgEffect !== 'auto') {
      effectToPlay = this.bgEffect as EffectName;
    } else {
      // 2. Se a prop está presente mas sem valor ("" ou "auto"), pega o padrão do tema corrente
      const themeEffect = this.fylib.getThemeBackgroundEffect();
      if (themeEffect) {
        effectToPlay = themeEffect.name as EffectName;
        // Aplica fallbacks do tema se não houver overrides na instância
        params.intensity = params.intensity ?? themeEffect.intensity;
        params.speed = params.speed ?? themeEffect.speed;
        params.loop = params.loop ?? themeEffect.loop;
      }
    }

    if (effectToPlay) {
      this.fylib.triggerEffect(effectToPlay, params);
    } else {
      this.stopBgEffect();
    }
  }

  private stopBgEffect() {
    // Tenta parar tanto o efeito da prop quanto o possível efeito do tema
    // O ID é o mesmo para o componente layout, então vai parar o que estiver rodando nele
    const currentEffect = this.bgEffect || this.fylib.getThemeBackgroundEffect()?.name;
    if (currentEffect) {
      this.fylib.triggerEffect(currentEffect, {
        id: this.layoutEffectId,
        stop: true
      });
    }
  }

  private resolveAnimationsActive(): boolean {
    return resolveAnimationsActive(this.fylib, 'fy-layout', this.activeAnimations);
  }
}
