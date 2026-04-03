import { registerConfettiPlugin } from './confetti.plugin';
import { registerHeartsPlugin } from './hearts.plugin';
import { registerUIEffectsPlugin } from './ui-effects.plugin';
import { registerExtraEffectsPlugin } from './extra-effects.plugin';

export function registerAllEffects() {
  try {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    registerConfettiPlugin();
    registerHeartsPlugin();
    registerExtraEffectsPlugin();
    registerUIEffectsPlugin();
  } catch {}
}
