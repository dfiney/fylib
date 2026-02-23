import { Component, Input, ViewEncapsulation, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyLibService } from '../services/fylib.service';
import { FyIconComponent } from '../components/icon.component';
import { FyBadgeComponent } from '../components/badge.component';
import { resolveAnimationsActive, triggerEffectForEvent, styleString } from '../base/interaction.utils';
import { EffectName } from '@fylib/config';

@Component({
  selector: 'fy-slot',
  standalone: true,
  imports: [CommonModule, FyIconComponent, FyBadgeComponent],
  template: `
    <ng-template #projected>
      <ng-content></ng-content>
    </ng-template>

    @switch (name) {
      @case ('sidebar') {
        <button
          type="button"
          class="fy-sidebar-toggle"
          [class.fy-sidebar-toggle--tongue]="sidebarToggleMode === 'tongue'"
          [attr.data-tongue-pos]="sidebarTonguePos"
          (click)="toggleSidebar()"
        >
          <fy-icon [name]="sidebarToggleIconName"></fy-icon>
        </button>
        <div class="fy-slot__panel" [class.fy-slot__panel--open]="sidebarOpen">
          <div class="fy-slot__sidebar-inner">
            @if (sidebarLogoImgSrc || sidebarLogoSvgSrc) {
              <div class="fy-slot__sidebar-logo">
                <div class="fy-logo">
                  <div class="fy-logo__image" [style.filter]="sidebarLogoFilter || computedSidebarLogoFilter || null">
                    @if (sidebarLogoImgSrc) {
                      <img [src]="sidebarLogoImgSrc" [alt]="sidebarLogoAlt || 'Logo'">
                    } @else if (sidebarLogoSvgSrc) {
                      <img [src]="sidebarLogoSvgSrc" [alt]="sidebarLogoAlt || 'Logo'">
                    }
                  </div>
                  @if (sidebarLogoBadgeText) {
                    <fy-badge
                      [text]="sidebarLogoBadgeText"
                      [background]="sidebarLogoBadgeBG ?? headerLogoBadgeBG ?? null"
                      [textColor]="sidebarLogoBadgeTextColor ?? headerLogoBadgeTextColor ?? null"
                      [borderRadius]="sidebarLogoBadgeRadius ?? headerLogoBadgeRadius ?? null"
                      [shine]="(sidebarLogoBadgeShine ?? headerLogoBadgeShine) ?? null"></fy-badge>
                  }
                </div>
              </div>
            } @else {
              <div class="fy-slot__sidebar-logo">
                <div class="fy-logo">
                  <div class="fy-logo__image" [style.filter]="sidebarLogoFilter || computedSidebarLogoFilter || null">
                    <ng-content select="[fy-sidebar-logo]"></ng-content>
                  </div>
                  @if (sidebarLogoBadgeText) {
                    <fy-badge
                      [text]="sidebarLogoBadgeText"
                      [background]="sidebarLogoBadgeBG ?? headerLogoBadgeBG ?? null"
                      [textColor]="sidebarLogoBadgeTextColor ?? headerLogoBadgeTextColor ?? null"
                      [borderRadius]="sidebarLogoBadgeRadius ?? headerLogoBadgeRadius ?? null"
                      [shine]="(sidebarLogoBadgeShine ?? headerLogoBadgeShine) ?? null"></fy-badge>
                  }
                </div>
              </div>
            }
            <div class="fy-slot__sidebar-header">
              <ng-content select="[fy-sidebar-header]"></ng-content>
            </div>
            <div class="fy-slot__sidebar-links">
              <ng-content select="[fy-sidebar-links]"></ng-content>
            </div>
            <div class="fy-slot__sidebar-footer">
              <ng-content select="[fy-sidebar-footer]"></ng-content>
              @if (copyrightText) {
                <div class="fy-slot__copyright">
                  <span class="fy-slot__copyright-text">&copy; {{ copyrightText }} · {{ currentYear }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      }
      @case ('header') {
        <header class="fy-slot__header-shell">
          <div class="fy-slot__header-left">
            @if (headerLogoImgSrc || headerLogoSvgSrc) {
              <div class="fy-logo">
                <div class="fy-logo__image" [style.filter]="headerLogoFilter || computedHeaderLogoFilter || null">
                  @if (headerLogoImgSrc) {
                    <img [src]="headerLogoImgSrc" [alt]="headerLogoAlt || 'Logo'">
                  } @else if (headerLogoSvgSrc) {
                    <img [src]="headerLogoSvgSrc" [alt]="headerLogoAlt || 'Logo'">
                  }
                </div>
                @if (headerLogoBadgeText) {
                  <fy-badge
                    [text]="headerLogoBadgeText"
                    [background]="headerLogoBadgeBG || null"
                    [textColor]="headerLogoBadgeTextColor || null"
                    [borderRadius]="headerLogoBadgeRadius || null"
                    [shine]="headerLogoBadgeShine ?? null"></fy-badge>
                }
              </div>
            } @else {
              <div class="fy-logo">
                <div class="fy-logo__image" [style.filter]="headerLogoFilter || computedHeaderLogoFilter || null">
                  <ng-content select="[fy-header-logo]"></ng-content>
                </div>
                @if (headerLogoBadgeText) {
                  <fy-badge
                    [text]="headerLogoBadgeText"
                    [background]="headerLogoBadgeBG || null"
                    [textColor]="headerLogoBadgeTextColor || null"
                    [borderRadius]="headerLogoBadgeRadius || null"
                    [shine]="headerLogoBadgeShine ?? null"></fy-badge>
                }
              </div>
            }
          </div>
          <div class="fy-slot__header-menus"
               [class.fy-slot__header-menus--open]="headerMenuOpen"
               [class.fy-anim-header-menu-slide-in]="headerMenuAnimClass==='fy-anim-header-menu-slide-in'"
               [class.fy-anim-header-menu-slide-out]="headerMenuAnimClass==='fy-anim-header-menu-slide-out'"
               [class.fy-anim-header-menu-macos-slide-in]="headerMenuAnimClass==='fy-anim-header-menu-macos-slide-in'"
               [class.fy-anim-header-menu-macos-slide-out]="headerMenuAnimClass==='fy-anim-header-menu-macos-slide-out'">
            <nav class="fy-slot__header-links fy-slot__header-links--center">
              <ng-content select="[fy-header-links],[fy-header-links-center]"></ng-content>
            </nav>
            <nav class="fy-slot__header-links fy-slot__header-links--right">
              <ng-content select="[fy-header-links-right]"></ng-content>
            </nav>
          </div>
          <div class="fy-slot__header-meta">
            <ng-content select="[fy-header-meta]"></ng-content>
            @if (copyrightText) {
              <div class="fy-slot__copyright">
                <span class="fy-slot__copyright-text">&copy; {{ copyrightText }} · {{ currentYear }}</span>
              </div>
            }
            <button type="button" class="fy-slot__header-toggle" (click)="toggleHeaderMenu()">
              <fy-icon [name]="sidebarToggleIconName"></fy-icon>
            </button>
          </div>
        </header>
      }

      @default {
        <ng-container [ngTemplateOutlet]="projected"></ng-container>
      }
    }
  `,
  host: {
    '[style.grid-area]': 'name',
    '[class]': 'hostClass',
    '[attr.data-slot]': 'name'
  },
  styles: [`
    .fy-slot { display: block; position: relative; }

    .fy-slot--header {
      z-index: 10;
      min-height: var(--fy-layout-header-height, 64px);
      padding: var(--fy-layout-header-padding, 0 24px);
      background-color: var(--fy-colors-surface, #fff);
      border-bottom: 1px solid var(--fy-colors-border, rgba(0,0,0,0.08));
      box-shadow: var(--fy-layout-header-shadow, 0 1px 0 rgba(0,0,0,0.06));
      display: flex;
      align-items: center;
    }

    .fy-slot__header-shell {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: auto 1fr auto auto;
      align-items: center;
      gap: var(--fy-spacing-md, 16px);
      width: 100%;
      position: relative;
    }

    .fy-slot__header-left { display: flex; align-items: center; gap: var(--fy-spacing-md, 16px); flex-shrink: 0; }
    .fy-slot__header-menus { display: contents; }
    .fy-slot__header-links {
      display: flex;
      align-items: center;
      gap: var(--fy-spacing-md, 16px);
      min-width: 0;
      width: max-content;
    }
    .fy-slot__header-links.fy-slot__header-links--left { justify-self: start; justify-content: flex-start; }
    .fy-slot__header-links.fy-slot__header-links--center { justify-self: center; justify-content: center; }
    .fy-slot__header-links.fy-slot__header-links--right { justify-self: end; justify-content: flex-end; }
    .fy-slot__header-left .fy-logo { position: relative; display: inline-block; }
    .fy-slot__header-left .fy-logo__image img,
    .fy-slot__header-left .fy-logo__image svg { display: block; height: 28px; width: auto; }
    .fy-slot__header-left .fy-logo fy-badge { position: absolute; top: -6px; right: -6px; z-index: 1; }
    .fy-slot__header-left .fy-logo fy-badge .fy-badge { position: static; }

    .fy-slot__header-meta {
      display: flex;
      align-items: center;
      gap: var(--fy-spacing-md, 16px);
      flex-shrink: 0;
    }

    .fy-slot__header-toggle {
      display: none;
      width: 40px;
      height: 40px;
      border-radius: var(--fy-layout-header-toggle-borderRadius, 999px);
      border: 1px solid var(--fy-layout-header-toggle-borderColor, transparent);
      background-color: var(--fy-layout-header-toggle-background, var(--fy-colors-primary, #2563eb));
      color: var(--fy-layout-header-toggle-textColor, #fff);
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
    }

    .fy-slot__header-toggle .fy-icon { font-size: 18px; }
    .fy-slot__header-shell {
      color: var(--fy-colors-textOverlay, var(--fy-colors-text));
    }
    .fy-slot--header .fy-nav-link {
      color: var(--fy-colors-textOverlay, var(--fy-colors-text));
    }

    .fy-slot--sidebar {
      min-width: var(--fy-layout-sidebar-width, 260px);
      padding: var(--fy-layout-sidebar-padding, 16px 0);
      border-right: 1px solid var(--fy-colors-border, rgba(0,0,0,0.1));
      background-color: var(--fy-colors-surface, transparent);
    }

    .fy-slot--sidebar .fy-slot__panel {
      height: 100%;
      display: block;
      background-color: var(--fy-colors-surface, #fff);
      color: var(--fy-colors-textOverlay, var(--fy-colors-text, inherit));
    }

    .fy-slot__sidebar-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .fy-slot__sidebar-logo {
      padding: var(--fy-spacing-md, 16px);
      border-bottom: 1px solid var(--fy-colors-border, rgba(0,0,0,0.08));
      color: var(--fy-colors-textOverlay, var(--fy-colors-text));
    }
    .fy-slot__sidebar-logo .fy-logo {
      position: relative;
      display: inline-block;
      color: var(--fy-colors-textOverlay, var(--fy-colors-text));
    }
    .fy-slot__sidebar-logo .fy-logo__image img,
    .fy-slot__sidebar-logo .fy-logo__image svg {
      display: block;
      height: 32px;
      width: auto;
    }
    .fy-slot__sidebar-logo .fy-logo fy-badge { position: absolute; top: -6px; right: -6px; z-index: 1; }
    .fy-slot__sidebar-logo .fy-logo fy-badge .fy-badge { position: static; }

    .fy-slot__sidebar-links {
      flex: 1 1 auto;
      overflow-y: auto;
      padding-inline: var(--fy-spacing-md, 16px);
      padding-top: var(--fy-spacing-md, 16px);
      padding-bottom: var(--fy-spacing-md, 16px);
      display: flex;
      flex-direction: column;
      gap: var(--fy-spacing-sm, 8px);
    }
    .fy-slot__sidebar-links > * {
      display: flex;
      flex-direction: column;
      gap: var(--fy-spacing-sm, 8px);
    }
    .fy-slot--sidebar .fy-nav-link {
      width: 100%;
      color: var(--fy-colors-textOverlay, var(--fy-colors-text));
    }

    .fy-slot__sidebar-footer {
      flex-shrink: 0;
      border-top: 1px solid var(--fy-colors-border, rgba(0,0,0,0.08));
      padding: var(--fy-spacing-md, 16px);
      display: flex;
      flex-direction: column;
      gap: var(--fy-spacing-sm, 8px);
    }

    .fy-slot__copyright {
      font-size: var(--fy-typography-fontSize-sm, 12px);
      color: var(--fy-colors-secondary, #6b7280);
    }

    .fy-slot__copyright-text {
      position: relative;
      display: inline-block;
      font-weight: var(--fy-typography-fontWeight-normal, 400);
      background: linear-gradient(135deg, var(--fy-colors-secondary, #6b7280), var(--fy-colors-secondary, #6b7280), rgba(255,255,255,0.9));
      background-size: 200% 200%;
      -webkit-background-clip: text;
      color: transparent;
      animation: fy-copyright-shimmer 3s ease-in-out infinite;
    }

    .fy-animations-disabled .fy-slot__copyright-text {
      animation: none;
    }

    .fy-sidebar-toggle {
      display: none;
      border-radius: var(--fy-layout-sidebar-toggle-borderRadius, 999px);
      background-color: var(--fy-layout-sidebar-toggle-background, var(--fy-colors-primary, #2563eb));
      color: var(--fy-layout-sidebar-toggle-textColor, #fff);
    }

    .fy-slot--content {
      padding: var(--fy-layout-content-padding, var(--fy-spacing-lg, 24px));
      overflow-y: auto;
    }

    @keyframes fy-copyright-shimmer {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @media (max-width: 768px) {
      .fy-slot__header-shell { align-items: center; }
      .fy-slot__header-left { flex: 0 0 auto; }
      .fy-slot__header-menus {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        width: 100%;
        display: block;
        background-color: var(--fy-colors-surface, #fff);
        border-bottom: 1px solid var(--fy-colors-border, rgba(0,0,0,0.08));
        padding: var(--fy-spacing-sm, 8px) var(--fy-spacing-md, 16px);
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transform: translateY(-8px);
        transition: max-height 0.25s ease, opacity 0.25s ease, transform 0.25s ease;
        z-index: 15;
      }
      .fy-slot__header-menus--open {
        max-height: 400px;
        opacity: 1;
        transform: translateY(0);
      }
      .fy-slot__header-menus.fy-anim-header-menu-slide-in {
        transform: translateY(0);
      }
      .fy-slot__header-menus.fy-anim-header-menu-slide-out {
        transform: translateY(-8px);
      }
      .fy-slot__header-menus.fy-anim-header-menu-macos-slide-in {
        transform: translateY(0);
      }
      .fy-slot__header-menus.fy-anim-header-menu-macos-slide-out {
        transform: translateY(-8px);
      }
      .fy-slot__header-links {
        display: flex;
        flex-direction: column;
        gap: var(--fy-spacing-sm, 8px);
        width: 100%;
        justify-content: flex-start;
      }

      .fy-slot__header-meta {
        width: 100%;
        justify-content: space-between;
      }

      .fy-slot__header-toggle {
        display: inline-flex;
      }
      .fy-slot--sidebar {
        height: 0;
        grid-area: unset !important;
        min-width: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
      }

      .fy-slot--sidebar .fy-slot__panel {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: var(--fy-layout-sidebar-width, 260px);
        max-width: 80vw;
        background-color: var(--fy-colors-surface, #fff);
        transform: translateX(-100%);
        opacity: 0;
        transition: transform 0.25s ease-out, opacity 0.25s ease-out;
        z-index: 110;
        overflow-y: auto;
        pointer-events: none;
      }

      .fy-slot--sidebar .fy-slot__panel.fy-slot__panel--open {
        transform: translateX(0);
        opacity: 1;
        box-shadow: 0 0 0 9999px rgba(0,0,0,0.35), 0 10px 40px rgba(0,0,0,0.35);
        pointer-events: auto;
      }

      .fy-layout--app-layout .fy-slot--content {
        width: 100%;
      }

      .fy-sidebar-toggle {
        position: fixed;
        bottom: 16px;
        left: 16px;
        width: 40px;
        height: 40px;
        border-radius: var(--fy-layout-sidebar-toggle-borderRadius, 999px);
        border: 1px solid var(--fy-layout-sidebar-toggle-borderColor, transparent);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: var(--fy-layout-sidebar-toggle-background, var(--fy-colors-primary, #2563eb));
        color: var(--fy-layout-sidebar-toggle-textColor, #fff);
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        cursor: pointer;
        z-index: 120;
      }

      .fy-sidebar-toggle.fy-sidebar-toggle--tongue {
        left: 0;
        transform: translateX(-50%);
        bottom: auto;
      }
      .fy-sidebar-toggle.fy-sidebar-toggle--tongue[data-tongue-pos="top"] { top: 16px; }
      .fy-sidebar-toggle.fy-sidebar-toggle--tongue[data-tongue-pos="middle"] { top: 50%; transform: translate(-50%, -50%); }
      .fy-sidebar-toggle.fy-sidebar-toggle--tongue[data-tongue-pos="bottom"] { top: auto; bottom: 16px; }

      .fy-sidebar-toggle span {
        display: inline;
      }

      .fy-sidebar-toggle .fy-icon { font-size: 18px; }
    }

    @media (min-width: 769px) {
      .fy-slot__header-menus { display: contents; }
      .fy-slot__header-links { max-height: none; opacity: 1; transform: none; position: static; padding: 0; border: 0; display: flex; }

      .fy-slot__header-toggle {
        display: none;
      }
      .fy-slot--sidebar .fy-slot__panel {
        position: relative;
        transform: none;
        box-shadow: none;
        width: 100%;
        max-width: none;
        opacity: 1;
        pointer-events: auto;
      }

      .fy-sidebar-toggle {
        display: none;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FySlotComponent {
  private fylib = inject(FyLibService);

  @Input() name!: string;
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;
  @Input() fixedSidebar: boolean | null = null;
  @Input() copyrightText: string | null = null;
  @Input() openEffect?: EffectName;
  @Input() closeEffect?: EffectName;
  sidebarOpen = false;
  headerMenuOpen = false;
  headerToggleIconName: string = 'menu';
  sidebarToggleIconName: string = 'menu';
  sidebarToggleMode: 'floating'|'tongue' = 'floating';
  sidebarTonguePos: 'top'|'middle'|'bottom' = 'bottom';
  headerMenuAnimClass: string = '';
  @Input() headerMenuAnimationOpen?: import('@fylib/animation').HeaderMenuAnimationName | null;
  @Input() headerMenuAnimationClose?: import('@fylib/animation').HeaderMenuAnimationName | null;
  /** Deprecated: use fy-header-links-center/right slots */
  @Input() headerLinksAlign: 'left'|'center'|'right' = 'center';

  @Input() headerLogoImgSrc?: string | null;
  @Input() headerLogoSvgSrc?: string | null;
  @Input() headerLogoAlt?: string | null;
  @Input() headerLogoBadgeText?: string | null;
  @Input() headerLogoBadgeBG?: string | null;
  @Input() headerLogoBadgeTextColor?: string | null;
  @Input() headerLogoBadgeRadius?: string | null;
  @Input() headerLogoBadgeShine?: boolean | null;
  @Input() headerLogoColorLight?: string | null;
  @Input() headerLogoColorDark?: string | null;

  @Input() sidebarLogoImgSrc?: string | null;
  @Input() sidebarLogoSvgSrc?: string | null;
  @Input() sidebarLogoAlt?: string | null;
  @Input() headerLogoFilter?: string | null;
  @Input() sidebarLogoFilter?: string | null;
  @Input() sidebarLogoColorLight?: string | null;
  @Input() sidebarLogoColorDark?: string | null;
  @Input() sidebarLogoBadgeText?: string | null;
  @Input() sidebarLogoBadgeBG?: string | null;
  @Input() sidebarLogoBadgeTextColor?: string | null;
  @Input() sidebarLogoBadgeRadius?: string | null;
  @Input() sidebarLogoBadgeShine?: boolean | null = false;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  @HostBinding('class.fy-animations-disabled')
  get animationsDisabled(): boolean {
    return !resolveAnimationsActive(this.fylib, 'fy-slot', this.activeAnimations);
  }

  @HostBinding('style')
  get hostStyles(): string {
    return styleString(this.customStyles);
  }

  get hostClass(): string {
    const fixedClass = this.name === 'sidebar' && this.fixedSidebar ? ' fy-slot--sidebar-fixed' : '';
    return `fy-slot fy-slot--${this.name}${fixedClass}`;
  }

  get computedHeaderLogoFilter(): string | null {
    const mode = this.fylib.getMode?.() || 'light';
    const target = mode === 'dark' ? this.headerLogoColorDark : this.headerLogoColorLight;
    const base = this.filterFromTargetColor(target);
    if (!base) return null;
    if (mode === 'dark') {
      const op = this.getLogoDarkOpacity('header');
      return `${base} opacity(${op})`;
    }
    return base;
  }

  get computedSidebarLogoFilter(): string | null {
    const mode = this.fylib.getMode?.() || 'light';
    const target = mode === 'dark'
      ? this.sidebarLogoColorDark
      : this.sidebarLogoColorLight;
    const base = this.filterFromTargetColor(target);
    if (!base) return null;
    if (mode === 'dark') {
      const op = this.getLogoDarkOpacity('sidebar');
      return `${base} opacity(${op})`;
    }
    return base;
  }

  private filterFromTargetColor(color?: string | null): string | null {
    if (!color) return null;
    const c = String(color).trim().toLowerCase();
    if (c === 'white' || c === '#fff' || c === '#ffffff') {
      return 'brightness(0) invert(1)';
    }
    if (c === 'black' || c === '#000' || c === '#000000') {
      return 'brightness(0) saturate(100%)';
    }
    return null;
  }

  private getLogoDarkOpacity(slot: 'header'|'sidebar'): string {
    const t = this.fylib.tokens() as any;
    const layout = (t?.layout || {}) as any;
    const v = (layout?.[slot] || {})?.logoFilterDarkOpacity;
    const num = parseFloat(String(v ?? '0.85'));
    const safe = isNaN(num) ? 0.85 : Math.min(Math.max(num, 0), 1);
    return String(safe);
  }

  toggleSidebar() {
    if (this.name === 'sidebar' && resolveAnimationsActive(this.fylib, 'fy-slot', this.activeAnimations)) {
      const event = this.sidebarOpen ? 'close' : 'open';
      const animationName = this.fylib.getComponentAnimation('fy-slot:sidebar', event);
      if (animationName) {
        this.fylib.playAnimation(animationName);
      }
      const enabled = this.fylib.isEffectsEnabledFor('fy-slot:sidebar' as any, this.activeEffects);
      if (enabled) {
        const inst = event === 'open' ? this.openEffect : this.closeEffect;
        if (inst) {
          this.fylib.triggerEffect(inst);
        } else {
          triggerEffectForEvent(this.fylib, `fy-slot:sidebar.${event}` as import('@fylib/config').UIEventKey, undefined, 'fy-slot:sidebar', this.activeEffects);
        }
      }
    }
    this.sidebarOpen = !this.sidebarOpen;
    const t = this.fylib.tokens() as any;
    const sidebarToggle = (((t as any).layout || {}) as any).sidebar?.toggle || {};
    const openIcon = sidebarToggle.openIcon || 'x';
    const closedIcon = sidebarToggle.icon || 'menu';
    this.sidebarToggleIconName = this.sidebarOpen ? openIcon : closedIcon;
  }

  toggleHeaderMenu() {
    if (this.name !== 'header') {
      return;
    }
    const event = this.headerMenuOpen ? 'close' : 'open';
    if (resolveAnimationsActive(this.fylib, 'fy-slot', this.activeAnimations)) {
      const configured = this.fylib.getComponentAnimation('fy-slot:header', event);
      const fallback = event === 'open' ? this.headerMenuAnimationOpen || undefined : this.headerMenuAnimationClose || undefined;
      const animationName = configured || fallback;
      if (animationName) {
        this.fylib.playAnimation(animationName);
      }
      // Atribui classe CSS correspondente para animar o contêiner do header (mobile)
      const nameToClass: Record<string, string> = {
        'sidebar-slide-in': 'fy-anim-header-menu-slide-in',
        'sidebar-slide-out': 'fy-anim-header-menu-slide-out',
        'sidebar-macos-slide-in': 'fy-anim-header-menu-macos-slide-in',
        'sidebar-macos-slide-out': 'fy-anim-header-menu-macos-slide-out',
        'header-menu-slide-in': 'fy-anim-header-menu-slide-in',
        'header-menu-slide-out': 'fy-anim-header-menu-slide-out',
        'header-menu-macos-slide-in': 'fy-anim-header-menu-macos-slide-in',
        'header-menu-macos-slide-out': 'fy-anim-header-menu-macos-slide-out'
      };
      const cls = animationName ? nameToClass[animationName] : undefined;
      if (cls) {
        this.headerMenuAnimClass = cls;
        // limpa após o término para permitir re-disparo
        setTimeout(() => { this.headerMenuAnimClass = ''; }, 350);
      }
      // Dispara efeito semântico para o header
      triggerEffectForEvent(this.fylib, `fy-slot:header.${event}` as import('@fylib/config').UIEventKey, undefined, 'fy-slot:header', this.activeEffects);
    }
    this.headerMenuOpen = !this.headerMenuOpen;
    const t = this.fylib.tokens() as any;
    const headerToggle = (((t as any).layout || {}) as any).header?.toggle || {};
    const openIcon = headerToggle.openIcon || 'x';
    const closedIcon = headerToggle.icon || 'menu';
    this.headerToggleIconName = this.headerMenuOpen ? openIcon : closedIcon;
  }

  constructor() {
    const t = this.fylib.tokens();
    const headerToggle = (((t as any).layout || {}) as any).header?.toggle || {};
    const sidebarToggle = (((t as any).layout || {}) as any).sidebar?.toggle || {};
    this.headerToggleIconName = headerToggle.icon || 'menu';
    this.sidebarToggleIconName = sidebarToggle.icon || 'menu';
    this.sidebarToggleMode = (sidebarToggle.mode as any) || 'floating';
    this.sidebarTonguePos = (sidebarToggle.tonguePosition as any) || 'bottom';
  }

  private resolveAnimationsActive(): boolean {
    return resolveAnimationsActive(this.fylib, 'fy-slot', this.activeAnimations);
  }
}
