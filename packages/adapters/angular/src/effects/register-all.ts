import { registerConfettiPlugin } from './confetti.plugin';
import { registerUIEffectsPlugin } from './ui-effects.plugin';

export function registerAllEffects() {
  try {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    registerConfettiPlugin();
    registerUIEffectsPlugin();
  } catch {}
}
