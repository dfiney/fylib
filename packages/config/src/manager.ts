import { AppConfig, defaultConfig } from './types';

export class ConfigManager {
  private currentConfig: AppConfig = defaultConfig;
  private listeners: ((config: AppConfig) => void)[] = [];

  constructor() {

  }

  getConfig(): AppConfig {
    return this.currentConfig;
  }

  updateConfig(newConfig: Partial<AppConfig>) {
    this.currentConfig = { ...this.currentConfig, ...newConfig };
    this.notifyListeners();
  }

  subscribe(listener: (config: AppConfig) => void) {
    this.listeners.push(listener);
    listener(this.currentConfig);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(l => l(this.currentConfig));
  }
}

export const configManager = new ConfigManager();
