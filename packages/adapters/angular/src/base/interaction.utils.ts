import { FyLibService } from '../services/fylib.service';
import { ComponentSelector, EffectName, UIEventKey } from '@fylib/config';

export function resolveAnimationsActive(
  fylib: FyLibService,
  selector: ComponentSelector,
  instanceFlag: boolean | null | undefined
): boolean {
  const globalEnabledForComponent = fylib.isAnimationsEnabledFor(selector);
  if (instanceFlag === false) return false;
  if (instanceFlag === true) return globalEnabledForComponent;
  return globalEnabledForComponent;
}

export function resolveAnimationName(
  fylib: FyLibService,
  selector: ComponentSelector,
  event: string,
  instanceOverride?: string | undefined,
  definitionFallback?: string | undefined
): string | undefined {
  if (instanceOverride) return instanceOverride;
  const fromTheme = fylib.getComponentAnimation(selector, event);
  if (fromTheme) return fromTheme;
  return definitionFallback;
}

export function animationClasses(...names: Array<string | undefined>): string {
  const classes: string[] = [];
  for (const n of names) {
    if (n) classes.push(` fy-anim-${n}`);
  }
  return classes.join('');
}

export function triggerEffectForEvent(
  fylib: FyLibService,
  eventKey: UIEventKey,
  effectName?: EffectName,
  selector?: ComponentSelector,
  instanceFlag?: boolean | null
): void {
  fylib.triggerEffectForEvent(eventKey, effectName, selector, instanceFlag ?? null);
}

export function styleString(style: Record<string, string> | null | undefined): string {
  if (!style) return '';
  return Object.entries(style)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');
}
