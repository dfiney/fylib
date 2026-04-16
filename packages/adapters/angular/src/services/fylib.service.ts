import { Injectable, signal, computed, inject, PLATFORM_ID, Signal, Optional, Inject, untracked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { themeEngine, defaultTheme } from '@fylib/theme';
import { animationEngine } from '@fylib/animation';
import { AppConfig, configManager, ComponentSelector, UIEventKey, EffectName } from '@fylib/config';
import { logger } from '@fylib/logger';
import { registerAllEffects } from '../effects/register-all';
import { FYLIB_CONFIG } from '../providers';

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

  constructor(@Optional() @Inject(FYLIB_CONFIG) configFromProvider: Partial<AppConfig>) {
    // Se existir configuração via provider (provideFyLib), aplica imediatamente
    // ANTES de qualquer outro log para garantir que o estado do logger (enabled/disabled) seja respeitado
    if (configFromProvider) {
      configManager.updateConfig(configFromProvider);
    }

    logger.info('AngularAdapter', 'FyLibService initialized');

    // Garante que o tema padrão esteja registrado
    try {
      themeEngine.registerTheme(defaultTheme);
    } catch (e) { }

    themeEngine.registerPlugin({
      name: 'config-token-overrides',
      apply: (tokens: DesignTokens) => {
        const config = this.configSignal();
        const overrides = config.theme?.tokenOverrides;
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

    // Sincroniza tema se mudou
    configManager.subscribe(config => {
      if (!config) return;
      
      untracked(() => {
        const oldConfig = this.configSignal();
        this.configSignal.set(config);
        
        const themeName = config.theme?.theme;
        if (themeName && themeName !== oldConfig.theme?.theme) {
          try {
            this.setTheme(themeName);
          } catch (e) {
            logger.error('Theme', `Erro ao carregar tema: ${themeName}`);
          }
        }
      });
    });


    if (isPlatformBrowser(this.platformId)) {
      registerAllEffects();
      
      // Regra de precedência: 
      // 1. Se __FYLIB_DISABLE_CONFIG_POLL__ estiver ativo no window, desabilita.
      // 2. Se houver configuração vinda do provider (e não for um objeto vazio), 
      //    o provider "vence" e desabilita o polling automático por padrão.
      const hasProviderConfig = configFromProvider && Object.keys(configFromProvider).length > 0;
      const disablePoll =
        (typeof window !== 'undefined' && (window as any).__FYLIB_DISABLE_CONFIG_POLL__ === true) ||
        hasProviderConfig;

      if (!disablePoll) {
        this.watchConfigFile();
      } else if (hasProviderConfig) {
        logger.info('AngularAdapter', 'Polling desabilitado: utilizando configuração estática do provider');
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

  getThemeBackgroundEffect() {
    return themeEngine.getBackgroundEffect();
  }

  getThemeWallpaper() {
    return themeEngine.getWallpaper();
  }

  getComponentVariantTokens(componentSelector: ComponentSelector, variant: string): Partial<DesignTokens> | undefined {
    return themeEngine.getComponentVariantTokens(componentSelector, variant);
  }

  triggerEffect(name: string, params?: Record<string, any>) {
    animationEngine.triggerEffect(name, params);
  }

  triggerEffectForEvent(eventKey: UIEventKey, componentSelector?: ComponentSelector, instanceFlag?: boolean | null): void {
    const config = this.configSignal();
    const effectNameFromConfig = config.theme?.effectTriggers?.[eventKey];

    if (effectNameFromConfig) {
      this.triggerEffect(effectNameFromConfig);
    }
  }

  playAnimation(name: string) {
    animationEngine.playAnimation(name);
  }

  isAnimationsEnabledFor(componentSelector: ComponentSelector): boolean {
    const config = this.configSignal();
    if (!config.theme?.animationsEnabled) return false;
    if (config.theme?.disableAnimationsForComponents?.includes(componentSelector)) return false;
    return true;
  }

  isEffectsEnabledFor(componentSelector: ComponentSelector, instanceFlag: boolean | null | undefined): boolean {
    const config = this.configSignal();
    if (config.theme?.effectsEnabled === false) return false;
    if (config.theme?.disableEffectsForComponents?.includes(componentSelector)) return false;
    if (instanceFlag === false) return false;
    return true;
  }

  getComponentAnimation(componentSelector: ComponentSelector, event: string): string | undefined {
    const config = this.configSignal();
    const byComponent = (config.theme?.componentAnimationsOverrides as any)?.[componentSelector] as
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
