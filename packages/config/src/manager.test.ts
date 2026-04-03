import { describe, it, expect, beforeEach } from 'vitest';
import { ConfigManager } from '../src/manager';
import { AppConfig } from '../src/types';

describe('ConfigManager', () => {
  let manager: ConfigManager;

  beforeEach(() => {
    manager = new ConfigManager();
  });

  it('should initialize with default config', () => {
    const config = manager.getConfig();
    expect(config.theme?.theme).toBe('default');
    expect(config.logging?.enabled).toBe(false);
  });

  it('should update theme config', () => {
    manager.updateThemeConfig({ theme: 'christmas' });
    const config = manager.getConfig();
    expect(config.theme?.theme).toBe('christmas');
  });

  it('should update logging config', () => {
    manager.updateConfig({ logging: { enabled: true } });
    const config = manager.getConfig();
    expect(config.logging?.enabled).toBe(true);
  });

  it('should notify listeners on config update', () => {
    let notifiedConfig: AppConfig | undefined;
    manager.subscribe((config) => {
      notifiedConfig = config;
    });

    manager.updateThemeConfig({ theme: 'windows-xp' });
    expect(notifiedConfig!.theme?.theme).toBe('windows-xp');
  });

  it('should perform deep merge on config update', () => {
    manager.updateConfig({ 
      theme: { 
        theme: 'default',
        animationsEnabled: false 
      } 
    });
    
    const config = manager.getConfig();
    expect(config.theme?.theme).toBe('default');
    expect(config.theme?.animationsEnabled).toBe(false);
  });
});
