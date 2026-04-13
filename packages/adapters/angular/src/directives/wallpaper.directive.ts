import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, inject, Renderer2, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FyLibService } from '../services/fylib.service';
import { WallpaperDefinition } from '@fylib/core';
import { WallpaperName } from '@fylib/config';

@Directive({
  selector: '[fyWallpaper]',
  standalone: true
})
export class FyWallpaperDirective implements OnInit, OnChanges {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private fylib = inject(FyLibService);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  @Input('fyWallpaper') wallpaperName?: WallpaperName | string | null;
  @Input() wallpaperOpacity?: number;
  @Input() wallpaperEnabled: boolean = true;

  private styleElement?: HTMLStyleElement;

  constructor() {
    // Reage a mudanças na configuração global (ex: habilitar/desabilitar wallpaperEnabled no theme.config.ts)
    effect(() => {
      this.fylib.config(); 
      this.applyWallpaper();
    });
  }

  ngOnInit() {
    this.applyWallpaper();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['wallpaperName'] || changes['wallpaperOpacity'] || changes['wallpaperEnabled']) {
      this.applyWallpaper();
    }
  }

  private applyWallpaper() {
    // No SSR, evitamos processar wallpaper se não estivermos no browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const config = this.fylib.config();
    const globalEnabled = config.theme?.wallpaperEnabled ?? false;

    // Só mostra se habilitado globalmente no AppConfig (theme.config.ts)
    if (!globalEnabled || this.wallpaperEnabled === false) {
      this.clearWallpaper();
      return;
    }

    let wallpaper: WallpaperDefinition | undefined;

    // Lógica de resolução solicitada:
    // 1. Se informou um nome específico (diferente de "" ou "auto"), usa ele como override com precedência total
    if (this.wallpaperName && this.wallpaperName !== '' && this.wallpaperName !== 'auto') {
      wallpaper = { 
        name: this.wallpaperName as WallpaperName, 
        type: 'pattern', 
        opacity: this.wallpaperOpacity 
      };
    } else {
      // 2. Se a diretiva está presente mas sem valor ("" ou "auto" ou undefined), pega o padrão do tema corrente
      wallpaper = this.fylib.getThemeWallpaper();
      
      // Se pegou do tema, aplica o override de opacidade da diretiva se existir
      if (wallpaper && this.wallpaperOpacity !== undefined) {
        wallpaper = { ...wallpaper, opacity: this.wallpaperOpacity };
      }
    }

    if (!wallpaper) {
      this.clearWallpaper();
      return;
    }

    this.renderWallpaper(wallpaper);
  }

  private renderWallpaper(wp: WallpaperDefinition) {
    // Se não houver opacidade definida (nem na prop nem no objeto wallpaper), padrão é 1
    const opacity = wp.opacity ?? 1;
    
    // Garantir que o elemento tem posição relativa se for usar overlay
    if (wp.overlay) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }

    switch (wp.name) {
      case 'hearts':
        this.applyHeartsPattern(opacity);
        break;
      case 'geometric':
        this.applyGeometricPattern(opacity);
        break;
      case 'pine-trees':
        this.applyPineTreesPattern(opacity);
        break;
      case 'cyber-grid':
        this.applyCyberGridPattern(opacity);
        break;
      case 'dots':
        this.applyDotsPattern(opacity);
        break;
      case 'grass':
        this.applyGrassPattern(opacity);
        break;
      case 'aero-waves':
        this.applyAeroWavesPattern(opacity);
        break;
      case 'mesh-gradient':
        this.applyMeshGradientPattern(opacity);
        break;
      default:
        this.clearWallpaper();
    }
  }

  private applyHeartsPattern(opacity: number) {
    const nativeEl = this.el.nativeElement;
    this.ensureAnimationStyles();
    // Removido backgroundColor fixo para respeitar o do elemento original
    this.renderer.setStyle(nativeEl, 'backgroundImage', `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M50 30c0-10-10-10-10-10s-10 0-10 10 10 20 20 30c10-10 20-20 20-30s0-10-10-10-10 0-10 10z' fill='%23ff85a2' fill-opacity='${opacity * 0.2}'/%3E%3Cpath d='M10 70c0-5-5-5-5-5s-5 0-5 5 5 10 10 15c5-5 10-10 10-15s0-5-5-5-5 0-5 5z' fill='%23ffb3c6' fill-opacity='${opacity * 0.15}'/%3E%3Cpath d='M80 80c0-7-7-7-7-7s-7 0-7 7 7 14 14 21c7-7 14-14 14-21s0-7-7-7-7 0-7 7z' fill='%23a2d2ff' fill-opacity='${opacity * 0.1}'/%3E%3C/svg%3E")`);
    this.renderer.setStyle(nativeEl, 'backgroundRepeat', 'repeat');
    this.renderer.setStyle(nativeEl, 'animation', 'fy-wallpaper-diagonal 20s linear infinite');
  }

  private applyGeometricPattern(opacity: number) {
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'backgroundImage', `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%233b82f6' fill-opacity='${opacity * 0.1}'/%3E%3C/svg%3E")`);
    this.renderer.setStyle(nativeEl, 'backgroundRepeat', 'repeat');
  }

  private applyPineTreesPattern(opacity: number) {
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'backgroundImage', `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 10l15 30H25l15-30zM40 30l20 40H20l20-40z' fill='%232f5233' fill-opacity='${opacity * 0.15}'/%3E%3C/svg%3E")`);
    this.renderer.setStyle(nativeEl, 'backgroundRepeat', 'repeat');
    this.ensureAnimationStyles();
    this.renderer.setStyle(nativeEl, 'animation', 'fy-wallpaper-diagonal 30s linear infinite');
  }

  private applyCyberGridPattern(opacity: number) {
    const nativeEl = this.el.nativeElement;
    // Reduzida a intensidade da linha (0.15) para não escurecer demais o conteúdo
    this.renderer.setStyle(nativeEl, 'backgroundImage', `linear-gradient(rgba(34, 197, 94, ${opacity * 0.15}) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, ${opacity * 0.15}) 1px, transparent 1px)`);
    this.renderer.setStyle(nativeEl, 'backgroundSize', '40px 40px');
  }

  private applyDotsPattern(opacity: number) {
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'backgroundImage', `radial-gradient(circle, rgba(0,0,0,${opacity * 0.1}) 1px, transparent 1px)`);
    this.renderer.setStyle(nativeEl, 'backgroundSize', '20px 20px');
  }

  private applyGrassPattern(opacity: number) {
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'backgroundImage', `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20 40c0-10 5-15 10-20M20 40c0-10-5-15-10-20' stroke='%2334d399' stroke-width='1' fill='none' stroke-opacity='${opacity * 0.3}'/%3E%3C/svg%3E")`);
    this.renderer.setStyle(nativeEl, 'backgroundRepeat', 'repeat');
  }

  private applyAeroWavesPattern(opacity: number) {
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'backgroundImage', `linear-gradient(135deg, rgba(255,255,255,${opacity * 0.2}) 0%, transparent 50%, rgba(255,255,255,${opacity * 0.2}) 100%)`);
    this.renderer.setStyle(nativeEl, 'backgroundSize', '200% 200%');
    this.ensureAnimationStyles();
    this.renderer.setStyle(nativeEl, 'animation', 'fy-wallpaper-diagonal 15s ease infinite');
  }

  private applyMeshGradientPattern(opacity: number) {
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'backgroundImage', `radial-gradient(at 0% 0%, rgba(0, 122, 255, ${opacity * 0.15}) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(82, 212, 255, ${opacity * 0.15}) 0px, transparent 50%)`);
  }

  private ensureAnimationStyles() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.document.getElementById('fy-wallpaper-styles')) return;

    const style = this.document.createElement('style');
    style.id = 'fy-wallpaper-styles';
    style.innerHTML = `
      @keyframes fy-wallpaper-diagonal {
        from { background-position: 0 0; }
        to { background-position: 200px 200px; }
      }
    `;
    this.document.head.appendChild(style);
  }

  private clearWallpaper() {
    const nativeEl = this.el.nativeElement;
    this.renderer.removeStyle(nativeEl, 'backgroundImage');
    this.renderer.removeStyle(nativeEl, 'backgroundRepeat');
    this.renderer.removeStyle(nativeEl, 'animation');
  }
}
