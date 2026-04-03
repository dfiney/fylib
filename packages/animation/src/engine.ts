import { AnimationDefinition, EffectDefinition } from '@fylib/core';
import { logger } from '@fylib/logger';

export interface AnimationPlugin {
  name: string;
  onBeforeAnimation?(animation: AnimationDefinition): void;
  onAfterAnimation?(animation: AnimationDefinition): void;
}

export interface GlobalEffectPlugin {
  name: string;
  renderEffect(effect: EffectDefinition): void;
}

export class AnimationEngine {
  private animations: Map<string, AnimationDefinition> = new Map();
  private effects: Map<string, EffectDefinition> = new Map();
  private animationPlugins: AnimationPlugin[] = [];
  private globalEffectPlugins: GlobalEffectPlugin[] = [];

  registerAnimation(animation: AnimationDefinition) {
    this.animations.set(animation.name, animation);
  }

  registerEffect(effect: EffectDefinition) {
    this.effects.set(effect.name, effect);
  }

  registerAnimationPlugin(plugin: AnimationPlugin) {
    this.animationPlugins.push(plugin);
  }

  registerGlobalEffectPlugin(plugin: GlobalEffectPlugin) {
    this.globalEffectPlugins.push(plugin);
  }

  playAnimation(name: string) {
    const animation = this.animations.get(name);
    if (!animation) return;

    this.animationPlugins.forEach(p => p.onBeforeAnimation?.(animation));
    logger.debug('Animation', `Playing animation: ${name}`, animation);
    // Implementation would go here (e.g., CSS injection or Web Animations API)
    this.animationPlugins.forEach(p => p.onAfterAnimation?.(animation));

  }

  triggerEffect(name: string, params?: Record<string, any>) {
    const effect = this.effects.get(name);
    if (!effect) return;

    if (effect.type === 'global') {
      const mergedEffect = params ? { ...effect, params: { ...effect.params, ...params } } : effect;
      this.globalEffectPlugins.forEach(p => p.renderEffect(mergedEffect));
    }
  }
}

export const animationEngine = new AnimationEngine();
