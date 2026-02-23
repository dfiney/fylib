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

  protected getHostStyles(style: Record<string, string> | null | undefined): string {
    return styleString(style || null);
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
    triggerEffectForEvent(this.fylib, eventKey, effectName, this.selector, instanceFlag ?? null);
  }

  protected triggerDirect(effectName?: EffectName, instanceFlag?: boolean | null) {
    if (!effectName) return;
    if (instanceFlag === false) return;
    this.fylib.triggerEffect(effectName);
  }
}
