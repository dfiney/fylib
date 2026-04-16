import { ThemeDefinition, DesignTokens } from '@fylib/core';
import { logger } from '@fylib/logger';

export interface ThemePlugin {

  name: string;
  apply(tokens: DesignTokens): DesignTokens;
}

import { defaultTheme } from './default-theme';
import { fineyPuffy1Theme } from './finey-puffy-1-theme';
import { fineyWorkbench1Theme } from './finey-workbench-1-theme';
import { fineyWorkbench2Theme } from './finey-workbench-2-theme';
import { fineyWorkbench3Theme } from './finey-workbench-3-theme';
import { christmasTheme } from './christmas-theme';
import { windows7Theme } from './win7-theme';
import { windowsXpTheme } from './xp-theme';
import { fineyNexus1Theme } from './finey-nexus-1-theme';
import { fineyHub1Theme } from './finey-hub-1-theme';

export class ThemeEngine {
  private themes: Map<string, ThemeDefinition> = new Map();
  private plugins: ThemePlugin[] = [];
  private currentTheme: string | null = null;
  private currentMode: ThemeMode = 'light';

  constructor() {
    this.registerTheme(defaultTheme);
    this.registerTheme(fineyPuffy1Theme);
    this.registerTheme(fineyWorkbench1Theme);
    this.registerTheme(fineyWorkbench2Theme);
    this.registerTheme(fineyWorkbench3Theme);
    this.registerTheme(christmasTheme);
    this.registerTheme(windows7Theme);
    this.registerTheme(windowsXpTheme);
    this.registerTheme(fineyNexus1Theme);
    this.registerTheme(fineyHub1Theme);
  }

  registerTheme(theme: ThemeDefinition) {
    if (this.themes.has(theme.name)) return;
    this.themes.set(theme.name, theme);
    logger.debug('Theme', `Theme registered: ${theme.name}`);
  }

  registerPlugin(plugin: ThemePlugin) {
    if (this.plugins.some(p => p.name === plugin.name)) return;
    this.plugins.push(plugin);
    logger.debug('Theme', `Plugin registered: ${plugin.name}`);
  }

  setTheme(name: string) {
    if (this.currentTheme === name) return;
    if (!this.themes.has(name)) {
      logger.error('Theme', `Theme ${name} not found`);
      throw new Error(`Theme ${name} not found`);
    }
    this.currentTheme = name;
    logger.info('Theme', `Theme changed to: ${name}`);
  }

  setMode(mode: ThemeMode) {
    if (this.currentMode === mode) return;
    this.currentMode = mode;
    logger.info('Theme', `Theme mode changed to: ${mode}`);
  }


  getMode(): ThemeMode {
    return this.currentMode;
  }

  getBackgroundEffect() {
    if (!this.currentTheme) return undefined;
    const theme = this.themes.get(this.currentTheme);
    return theme?.backgroundEffect;
  }

  getWallpaper() {
    if (!this.currentTheme) return undefined;
    const theme = this.themes.get(this.currentTheme);
    return theme?.wallpaper;
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

  getComponentVariantTokens(componentSelector: string, variant: string): Partial<DesignTokens> | undefined {
    if (!this.currentTheme) {
      return undefined;
    }
    const theme = this.themes.get(this.currentTheme);
    if (!theme || !theme.componentVariants) {
      return undefined;
    }
    const componentMap = theme.componentVariants[componentSelector];
    if (!componentMap) {
      return undefined;
    }
    const variantData = componentMap[variant];
    if (!variantData) {
      return undefined;
    }

    // Se for a nova estrutura com light/dark
    if ('light' in variantData || 'dark' in variantData) {
      const typedVariant = variantData as { light?: DesignTokens; dark?: DesignTokens };
      return this.currentMode === 'dark' 
        ? (typedVariant.dark || typedVariant.light) 
        : typedVariant.light;
    }

    // Caso contrário, retorna o objeto parcial diretamente (comportamento antigo)
    return variantData as Partial<DesignTokens>;
  }

  getTokens(): DesignTokens {
    if (!this.currentTheme) {
      throw new Error('No theme set');
    }

    const theme = this.themes.get(this.currentTheme)!;
    
    // Start with defaultTheme tokens to ensure all variables are accounted for
    let tokens = this.deepMerge({}, defaultTheme.tokens);
    
    // Layer the current theme's tokens
    tokens = this.deepMerge(tokens, theme.tokens);
    
    // Apply dark mode overrides if needed
    if (this.currentMode === 'dark' && theme.darkTokens) {
      tokens = this.deepMerge(tokens, theme.darkTokens);
    }

    // Apply global variables and scrollbar styles
    if (typeof document !== 'undefined') {
      this.applyGlobalTokens(tokens);
      if (tokens.scrollbar) {
        this.applyScrollbarStyles(tokens.scrollbar);
      }
    }

    // Apply plugins
    for (const plugin of this.plugins) {
      tokens = plugin.apply(tokens);
    }

    return tokens;
  }

  private applyGlobalTokens(tokens: DesignTokens) {
    const root = document.documentElement;
    this.injectTokensAsVars(root, tokens);
  }

  private injectTokensAsVars(element: HTMLElement, tokens: any, prefix = '--fy-') {
    Object.keys(tokens).forEach(key => {
      const value = tokens[key];
      if (value == null) return;

      if (typeof value === 'object' && !Array.isArray(value)) {
        this.injectTokensAsVars(element, value, `${prefix}${key}-`);
      } else {
        element.style.setProperty(`${prefix}${key}`, String(value));
      }
    });
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

  private applyScrollbarStyles(s: any) {
    const id = 'fy-scrollbar-styles';
    let style = document.getElementById(id) as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = id;
      document.head.appendChild(style);
    }

    const width = s.width || '10px';
    
    // Build Track Background
    const trackBase = s.trackBackground || 'transparent';
    const trackFull = s.trackImage 
      ? `url(${s.trackImage}) repeat, ${trackBase}`
      : trackBase;

    // Build Thumb Background
    const thumbBase = s.thumbBackground || '#888';
    const thumbFull = s.thumbGripImage 
      ? `url(${s.thumbGripImage}) center no-repeat, ${thumbBase}`
      : thumbBase;

    const thumbHoverBase = s.thumbHoverBackground || '#555';
    const thumbHoverFull = s.thumbHoverBackground || '#555';

    // Horizontal Thumb (using a rotated gradient if it's a linear-gradient)
    let hThumbFull = thumbFull;
    let hThumbHoverFull = thumbHoverFull;
    const hGrip = s.thumbGripImageHorizontal || s.thumbGripImage;

    if (thumbBase.includes('to right')) {
      const hBase = thumbBase.replace('to right', 'to bottom');
      const hHoverBase = thumbHoverBase.replace('to right', 'to bottom');
      hThumbFull = hGrip ? `url(${hGrip}) center no-repeat, ${hBase}` : hBase;
      hThumbHoverFull = hGrip ? `url(${hGrip}) center no-repeat, ${hHoverBase}` : hHoverBase;
    } else if (hGrip) {
       hThumbFull = `url(${hGrip}) center no-repeat, ${thumbBase}`;
       hThumbHoverFull = `url(${hGrip}) center no-repeat, ${thumbHoverFull}`;
    }

    const radius = s.thumbBorderRadius || '10px';
    const bWidth = s.thumbBorderWidth || '0px';
    const bColor = s.thumbBorderColor || 'transparent';
    const shadow = s.thumbBoxShadow || 'none';

    // Extract solid color fallback from thumbBase if it's a gradient
    const thumbFallback = thumbBase.includes('gradient') ? '#2b56a3' : thumbBase;
    const hThumbFallback = hThumbFull.includes('gradient') ? '#2b56a3' : thumbFallback;

    let styleContent = `
      ::-webkit-scrollbar { 
        width: ${width} !important; 
        height: ${width} !important; 
        display: block !important;
      }
      ::-webkit-scrollbar-track { 
        background: ${trackFull} !important; 
      }
      ::-webkit-scrollbar-thumb { 
        background: ${thumbFull} !important; 
        background-color: ${thumbFallback} !important;
        border-radius: ${radius} !important; 
        border: ${bWidth} solid ${bColor} !important;
        box-shadow: ${shadow} !important;
        min-height: 20px !important;
      }
      ::-webkit-scrollbar-thumb:vertical { 
        background: ${thumbFull} !important; 
        background-color: ${thumbFallback} !important;
      }
      ::-webkit-scrollbar-thumb:horizontal { 
        background: ${hThumbFull} !important; 
        background-color: ${hThumbFallback} !important;
      }
      ::-webkit-scrollbar-thumb:hover { 
        background: ${thumbHoverFull} !important; 
      }
      ::-webkit-scrollbar-thumb:vertical:hover { 
        background: ${thumbHoverFull} !important; 
      }
      ::-webkit-scrollbar-thumb:horizontal:hover { 
        background: ${hThumbHoverFull} !important; 
      }
    `;

    if (s.buttonsVisible) {
      const bBg = s.buttonBackground || thumbBase;
      const bHoverBg = s.buttonHoverBackground || bBg;
      const bActiveBg = s.buttonActiveBackground || bHoverBg;
      const bRad = s.buttonBorderRadius || radius;
      
      const upImg = s.buttonUpImage ? `url(${s.buttonUpImage})` : `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='18 15 12 9 6 15'%3E%3C/polyline%3E%3C/svg%3E")`;
      const upHoverImg = s.buttonUpHoverImage ? `url(${s.buttonUpHoverImage})` : upImg;
      const upActiveImg = s.buttonUpActiveImage ? `url(${s.buttonUpActiveImage})` : upHoverImg;

      const downImg = s.buttonDownImage ? `url(${s.buttonDownImage})` : `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='4' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;
      const downHoverImg = s.buttonDownHoverImage ? `url(${s.buttonDownHoverImage})` : downImg;
      const downActiveImg = s.buttonDownActiveImage ? `url(${s.buttonDownActiveImage})` : downHoverImg;

      styleContent += `
        ::-webkit-scrollbar-button:single-button {
          background: ${bBg} !important;
          display: block !important;
          border-radius: ${bRad} !important;
          border: ${bWidth} solid ${bColor} !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          box-shadow: ${shadow} !important;
        }
        ::-webkit-scrollbar-button:single-button:hover {
          background: ${bHoverBg} !important;
        }
        ::-webkit-scrollbar-button:single-button:active {
          background: ${bActiveBg} !important;
        }
        ::-webkit-scrollbar-button:single-button:vertical:decrement {
          background-image: ${upImg} !important;
        }
        ::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
          background-image: ${upHoverImg} !important;
        }
        ::-webkit-scrollbar-button:single-button:vertical:decrement:active {
          background-image: ${upActiveImg} !important;
        }
        ::-webkit-scrollbar-button:single-button:vertical:increment {
          background-image: ${downImg} !important;
        }
        ::-webkit-scrollbar-button:single-button:vertical:increment:hover {
          background-image: ${downHoverImg} !important;
        }
        ::-webkit-scrollbar-button:single-button:vertical:increment:active {
          background-image: ${downActiveImg} !important;
        }
      `;
    }

    style.innerHTML = styleContent;
  }
}

export const themeEngine = new ThemeEngine();

export type ThemeMode = 'light' | 'dark';

export class ConfigOverridePlugin implements ThemePlugin {
  name = 'ConfigOverride';
  apply(tokens: DesignTokens) {
    const config = (globalThis as any).configManager?.getConfig();
    const overrides = config?.theme?.tokenOverrides;
    if (!overrides) {
      return tokens;
    }
    return (themeEngine as any).deepMerge(tokens, overrides);
  }
}
