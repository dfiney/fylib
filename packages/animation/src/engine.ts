import { AnimationDefinition, EffectDefinition } from '@fylib/core';

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
    console.log(`Playing animation: ${name}`);
    // Implementation would go here (e.g., CSS injection or Web Animations API)
    this.animationPlugins.forEach(p => p.onAfterAnimation?.(animation));
  }

  triggerEffect(name: string) {
    const effect = this.effects.get(name);
    if (!effect) return;

    if (effect.type === 'global') {
      this.globalEffectPlugins.forEach(p => p.renderEffect(effect));
    }
  }
}

export const animationEngine = new AnimationEngine();
