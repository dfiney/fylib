import { AppConfig } from '@fylib/config';
import { sseConfig } from './sse.config';
import { cryptoConfig } from './crypto.config';

export const themeControllerConfig: AppConfig = {
  theme: "finey-workbench-3",
  animationsEnabled: true,
  sse: sseConfig,
  crypto: cryptoConfig,
  effectsEnabled: false,
  disableAnimationsForComponents: [],
  disableEffectsForComponents: [],
  tokenOverrides: {
  },
  componentAnimationsOverrides: {},
  effectTriggers: {
  }
};

