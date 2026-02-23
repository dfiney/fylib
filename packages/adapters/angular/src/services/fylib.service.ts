import { Injectable, signal, computed, inject, PLATFORM_ID, Signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { themeEngine, defaultTheme } from '@fylib/theme';
import { animationEngine } from '@fylib/animation';
import { AppConfig, configManager, ComponentSelector, UIEventKey, EffectName } from '@fylib/config';
import { registerAllEffects } from '../effects/register-all';
import { DesignTokens } from '@fylib/core';
import { registerPhosphorProvider } from '../icons/providers/phosphor.provider';
import { registerFontAwesomeProvider } from '../icons/providers/fontawesome.provider';
import { registerMdiProvider } from '../icons/providers/mdi.provider';

@Injectable({
  providedIn: 'root'
})
export class FyLibService {
  private platformId = inject(PLATFORM_ID);
  private configSignal = signal<AppConfig>(configManager.getConfig());
  private themeVersion = signal(0);
  
  readonly config = this.configSignal.asReadonly();
  
  readonly tokens: Signal<DesignTokens> = computed(() => {
    this.themeVersion(); 
    try {
      return themeEngine.getTokens();
    } catch (e) {
      return defaultTheme.tokens; 
    }
  });

  constructor() {
    // Garante que o tema padrão esteja registrado
    try {
      themeEngine.registerTheme(defaultTheme);
    } catch (e) { }

    themeEngine.registerPlugin({
      name: 'config-token-overrides',
      apply: (tokens: DesignTokens) => {
        const config = this.configSignal();
        const overrides = config.tokenOverrides;
        if (!overrides) {
          return tokens;
        }
        return this.deepMerge(tokens, overrides);
      }
    });

    // Providers de ícones default
    try {
      registerPhosphorProvider();
    } catch (e) { }
    try {
      registerFontAwesomeProvider();
    } catch (e) { }
    try {
      registerMdiProvider();
    } catch (e) { }

    // Subscreve ao gerenciador de configuração
    configManager.subscribe(config => {
      if (!config) return;
      
      this.configSignal.set(config);
      if (config.theme) {
        try {
          this.setTheme(config.theme);
        } catch (e) {
          console.error(`[fyLib] Erro ao carregar tema do arquivo de config: ${e instanceof Error ? e.message : 'Tema não encontrado'}`);
        }
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      registerAllEffects();
      const disablePoll =
        typeof window !== 'undefined' &&
        (window as any).__FYLIB_DISABLE_CONFIG_POLL__ === true;
      if (!disablePoll) {
        this.watchConfigFile();
      }
    }
  }

  private async watchConfigFile() {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/fylib/theme-control/theme-controller.json');
        if (response.ok) {
          const newConfig = await response.json();
          configManager.updateConfig(newConfig);
        }
      } catch (e) {
        // Arquivo pode não existir ainda
      }
    };

    fetchConfig();
    setInterval(fetchConfig, 3000); // Polling a cada 3s para exemplo
  }

  setTheme(name: string) {
    themeEngine.setTheme(name);
    this.themeVersion.update(v => v + 1);
  }

  setMode(mode: 'light' | 'dark') {
    themeEngine.setMode(mode);
    this.themeVersion.update(v => v + 1);
  }

  getMode() {
    return themeEngine.getMode();
  }

  getTokens() {
    return themeEngine.getTokens();
  }

  triggerEffect(name: string) {
    animationEngine.triggerEffect(name);
  }

  triggerEffectForEvent(eventKey: UIEventKey, effectName?: EffectName, componentSelector?: ComponentSelector, instanceFlag?: boolean | null) {
    if (componentSelector) {
      const enabled = this.isEffectsEnabledFor(componentSelector, instanceFlag);
      if (!enabled) {
        return;
      }
    }
    const config = this.configSignal();
    const fromConfig = config.effectTriggers?.[eventKey];
    const finalEffect = fromConfig ?? effectName;
    if (!finalEffect) {
      return;
    }
    registerAllEffects();
    animationEngine.triggerEffect(finalEffect);
  }

  playAnimation(name: string) {
    animationEngine.playAnimation(name);
  }

  isAnimationsEnabledFor(componentSelector: ComponentSelector): boolean {
    const config = this.configSignal();
    if (!config.animationsEnabled) {
      return false;
    }
    const disabledList = config.disableAnimationsForComponents || [];
    return !disabledList.includes(componentSelector);
  }

  isEffectsEnabledFor(componentSelector: ComponentSelector, instanceFlag: boolean | null | undefined): boolean {
    const config = this.configSignal();
    if (instanceFlag === false) {
      return false;
    }
    const globalEnabled = config.effectsEnabled !== false;
    if (!globalEnabled) {
      return false;
    }
    const disabledList = config.disableEffectsForComponents || [];
    if (disabledList.includes(componentSelector)) {
      return false;
    }
    return true;
  }

  getComponentAnimation(componentSelector: ComponentSelector, event: string): string | undefined {
    const config = this.configSignal();
    const byComponent = (config.componentAnimationsOverrides as any)?.[componentSelector] as
      | Record<string, string>
      | undefined;
    const override = byComponent ? byComponent[event] : undefined;
    if (override) {
      return override;
    }
    return themeEngine.getComponentAnimation(componentSelector, event);
  }

  private deepMerge(target: any, source: any): any {
    const output = { ...target };
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  private isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
}
