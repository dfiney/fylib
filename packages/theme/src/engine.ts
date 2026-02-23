import { ThemeDefinition, DesignTokens } from '@fylib/core';

export interface ThemePlugin {
  name: string;
  apply(tokens: DesignTokens): DesignTokens;
}

export type ThemeMode = 'light' | 'dark';

export class ThemeEngine {
  private themes: Map<string, ThemeDefinition> = new Map();
  private plugins: ThemePlugin[] = [];
  private currentTheme: string | null = null;
  private currentMode: ThemeMode = 'light';

  registerTheme(theme: ThemeDefinition) {
    this.themes.set(theme.name, theme);
  }

  registerPlugin(plugin: ThemePlugin) {
    this.plugins.push(plugin);
  }

  setTheme(name: string) {
    if (!this.themes.has(name)) {
      throw new Error(`Theme ${name} not found`);
    }
    this.currentTheme = name;
  }

  setMode(mode: ThemeMode) {
    this.currentMode = mode;
  }

  getMode(): ThemeMode {
    return this.currentMode;
  }

  getComponentAnimation(componentSelector: string, event: string): string | undefined {
    if (!this.currentTheme) {
      return undefined;
    }
    const theme = this.themes.get(this.currentTheme);
    if (!theme || !theme.componentAnimations) {
      return undefined;
    }
    const componentMap = theme.componentAnimations[componentSelector];
    if (!componentMap) {
      return undefined;
    }
    return componentMap[event];
  }

  getTokens(): DesignTokens {
    if (!this.currentTheme) {
      throw new Error('No theme set');
    }

    const theme = this.themes.get(this.currentTheme)!;
    
    // Resolve tokens based on mode
    let baseTokens = { ...theme.tokens };
    if (this.currentMode === 'dark' && theme.darkTokens) {
      baseTokens = this.deepMerge(baseTokens, theme.darkTokens);
    }

    let tokens = { ...baseTokens };

    // Apply plugins
    for (const plugin of this.plugins) {
      tokens = plugin.apply(tokens);
    }

    return tokens;
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
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
}

export const themeEngine = new ThemeEngine();
