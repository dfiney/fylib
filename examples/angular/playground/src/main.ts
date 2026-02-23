import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { configManager } from '@fylib/config';
import { themeControllerConfig } from './fylib/theme-controller.config';

if (typeof window !== 'undefined') {
  (window as any).__FYLIB_DISABLE_CONFIG_POLL__ = true;
}

configManager.updateConfig(themeControllerConfig);

bootstrapApplication(App, appConfig).catch(err => console.error(err));
