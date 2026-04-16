import { FyLibService } from '../services/fylib.service';
import { ComponentSelector, UIEventKey, EffectName } from '@fylib/config';
import {
  resolveAnimationsActive,
  resolveAnimationName,
  animationClasses,
  triggerEffectForEvent,
  styleString
} from './interaction.utils';
import { registerAllEffects } from '../effects/register-all';

export interface FyComponentBaseInputs {
  activeAnimations?: boolean | null;
  activeEffects?: boolean | null;
  customStyles?: Record<string, string> | null;
}

export abstract class BaseFyComponent<TSelector extends ComponentSelector> {
  protected constructor(protected fylib: FyLibService, protected selector: TSelector) {}

  protected isAnimationsActive(instanceFlag: boolean | null | undefined): boolean {
    return resolveAnimationsActive(this.fylib, this.selector, instanceFlag);
  }

  protected getHostStyles(style: Record<string, string> | null | undefined, variantStyles?: Record<string, string> | null): string {
    const combined = { ...(variantStyles || {}), ...(style || {}) };
    return styleString(combined);
  }

  protected getVariantStyles(variant: string): Record<string, string> {
    const tokens = this.fylib.getComponentVariantTokens(this.selector, variant);
    if (!tokens) return {};
    
    const styles: Record<string, string> = {};
    this.flattenTokensToVars(tokens, styles);
    return styles;
  }

  private flattenTokensToVars(tokens: any, styles: Record<string, string>, prefix = '--fy-') {
    if (!tokens) return;
    Object.keys(tokens).forEach(key => {
      const value = tokens[key];
      if (value == null) return;

      if (typeof value === 'object' && !Array.isArray(value)) {
        this.flattenTokensToVars(value, styles, `${prefix}${key}-`);
      } else {
        styles[`${prefix}${key}`] = String(value);
      }
    });
  }

  protected resolveAnim(
    event: string,
    instanceOverride?: string,
    definitionFallback?: string
  ): string | undefined {
    return resolveAnimationName(this.fylib, this.selector, event, instanceOverride, definitionFallback);
  }

  protected composeAnimClasses(...names: Array<string | undefined>): string {
    return animationClasses(...names);
  }

  protected triggerByEvent(eventKey: UIEventKey, effectName?: EffectName, instanceFlag?: boolean | null) {
    if (instanceFlag === false) return;
    if (effectName) {
      this.fylib.triggerEffect(effectName);
    } else {
      triggerEffectForEvent(this.fylib, eventKey, this.selector, instanceFlag ?? null);
    }
  }

  protected triggerDirect(effectName?: EffectName, instanceFlag?: boolean | null) {
    if (!effectName) return;
    if (instanceFlag === false) return;
    this.fylib.triggerEffect(effectName);
  }
}
