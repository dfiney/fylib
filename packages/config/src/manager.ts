import { AppConfig, defaultConfig, ThemeConfig, LoggingConfig } from './types';
import { logger } from '@fylib/logger';

export class ConfigManager {
  private currentConfig: AppConfig = { ...defaultConfig };
  private listeners: Array<(config: AppConfig) => void> = [];

  constructor() {
    // Sincroniza configuração de log inicial
    if (this.currentConfig.logging) {
      logger.setConfig(this.currentConfig.logging as any);
    }
    // Expõe o manager globalmente para plugins de outros pacotes (ex: ThemeEngine)
    (globalThis as any).configManager = this;
  }

  getConfig(): AppConfig {
    return this.currentConfig;
  }

  updateConfig(newConfig: Partial<AppConfig>) {
    // Verifica se houve mudança real para evitar logs repetitivos
    const themeChanged = newConfig.theme && JSON.stringify(newConfig.theme) !== JSON.stringify(this.currentConfig.theme);
    const loggingChanged = newConfig.logging && JSON.stringify(newConfig.logging) !== JSON.stringify(this.currentConfig.logging);

    // Merge profundo para preservar sub-objetos como theme, sse, etc.
    this.currentConfig = {
      ...this.currentConfig,
      ...newConfig,
      theme: newConfig.theme ? { ...this.currentConfig.theme, ...newConfig.theme } : this.currentConfig.theme,
      logging: newConfig.logging ? { ...this.currentConfig.logging, ...newConfig.logging } : this.currentConfig.logging
    } as AppConfig;
    
    // Sincroniza configuração de log se presente e mudou
    if (this.currentConfig.logging && loggingChanged) {
      logger.setConfig(this.currentConfig.logging as any);
    }

    if (themeChanged || loggingChanged) {
      logger.info('Config', 'Configuration updated', {
        theme: this.currentConfig.theme?.theme,
        animations: this.currentConfig.theme?.animationsEnabled
      });
    }
    this.notifyListeners();
  }

  updateThemeConfig(themeConfig: Partial<ThemeConfig>) {
    this.updateConfig({ theme: themeConfig as any });
  }

  updateLoggingConfig(loggingConfig: Partial<LoggingConfig>) {
    this.updateConfig({ logging: loggingConfig });
  }

  subscribe(listener: (config: AppConfig) => void) {
    this.listeners.push(listener);
    logger.debug('Config', 'New listener subscribed');
    listener(this.currentConfig);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
      logger.debug('Config', 'Listener unsubscribed');
    };
  }

  private notifyListeners() {
    this.listeners.forEach(l => l(this.currentConfig));
  }
}

export const configManager = new ConfigManager();
