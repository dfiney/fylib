import { GlobalEffectPlugin, animationEngine } from '@fylib/animation';

function createOrGet(id: string, setup: (el: HTMLElement) => void): HTMLElement {
  const existing = document.getElementById(id);
  if (existing) return existing;
  const el = document.createElement('div');
  el.id = id;
  setup(el);
  document.body.appendChild(el);
  return el;
}

function playTemporary(el: HTMLElement, duration: number, cleanup?: () => void) {
  el.style.opacity = '1';
  if (duration <= 0) {
    el.style.opacity = '0';
    if (cleanup) cleanup();
    return;
  }
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      if (el.parentElement) {
        el.parentElement.removeChild(el);
      }
      if (cleanup) cleanup();
    }, 200);
  }, duration);
}

function renderWindowOpen(duration = 600) {
  const overlay = createOrGet('fy-window-open-overlay', el => {
    el.style.position = 'fixed';
    el.style.inset = '0';
    el.style.background = 'rgba(255, 255, 255, 0.5)';
    el.style.pointerEvents = 'none';
    el.style.transition = 'opacity 0.2s ease';
    el.style.opacity = '0';
    el.style.zIndex = '9998';
  });
  playTemporary(overlay, duration);
}

function renderMacSheet(kind: 'open' | 'close', duration = 600) {
  const id = kind === 'open' ? 'fy-macos-sheet-open' : 'fy-macos-sheet-close';
  const sheet = createOrGet(id, el => {
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.top = '0';
    el.style.transform = 'translateX(-50%)';
    el.style.width = '560px';
    el.style.maxWidth = 'calc(100% - 40px)';
    el.style.height = '140px';
    el.style.background =
      'linear-gradient(to bottom, rgba(245,245,247,0.98), rgba(229,229,234,0.98))';
    el.style.borderRadius = '0 0 12px 12px';
    el.style.boxShadow = '0 18px 40px rgba(0,0,0,0.35)';
    el.style.pointerEvents = 'none';
    el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    el.style.opacity = '0';
    el.style.zIndex = '9999';
  });
  sheet.style.transform =
    kind === 'open' ? 'translate(-50%, -20px)' : 'translate(-50%, 0)';
  setTimeout(() => {
    sheet.style.opacity = kind === 'open' ? '1' : '0';
    sheet.style.transform =
      kind === 'open' ? 'translate(-50%, 0)' : 'translate(-50%, -20px)';
  }, 10);
  playTemporary(sheet, duration);
}

function renderSidebarSlideGlow(side: 'in' | 'out', duration = 600) {
  const id = side === 'in' ? 'fy-sidebar-glow-in' : 'fy-sidebar-glow-out';
  const glow = createOrGet(id, el => {
    el.style.position = 'fixed';
    el.style.top = '0';
    el.style.left = '0';
    el.style.height = '100%';
    el.style.width = '8px';
    el.style.background = side === 'in'
      ? 'linear-gradient(to right, rgba(37,99,235,0.6), rgba(37,99,235,0))'
      : 'linear-gradient(to right, rgba(239,68,68,0.6), rgba(239,68,68,0))';
    el.style.pointerEvents = 'none';
    el.style.transition = 'opacity 0.2s ease';
    el.style.opacity = '0';
    el.style.zIndex = '9997';
  });
  playTemporary(glow, duration);
}

const uiEffectsPlugin: GlobalEffectPlugin = {
  name: 'ui-effects-renderer',
  renderEffect(effect) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    switch (effect.name) {
      case 'window-open': {
        const duration = (effect.params && (effect.params as any)['duration']) as number | undefined;
        renderWindowOpen(duration ?? 600);
        break;
      }
      case 'window-macos-sheet-open': {
        const duration = (effect.params && (effect.params as any)['duration']) as number | undefined;
        renderMacSheet('open', duration ?? 800);
        break;
      }
      case 'window-macos-sheet-close': {
        const duration = (effect.params && (effect.params as any)['duration']) as number | undefined;
        renderMacSheet('close', duration ?? 600);
        break;
      }
      case 'sidebar-slide-in': {
        const duration = (effect.params && (effect.params as any)['duration']) as number | undefined;
        renderSidebarSlideGlow('in', duration ?? 600);
        break;
      }
      case 'sidebar-slide-out': {
        const duration = (effect.params && (effect.params as any)['duration']) as number | undefined;
        renderSidebarSlideGlow('out', duration ?? 600);
        break;
      }
      default:
        break;
    }
  }
};

let registered = false;
export function registerUIEffectsPlugin() {
  if (registered) return;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  animationEngine.registerGlobalEffectPlugin(uiEffectsPlugin);
  registered = true;
}
