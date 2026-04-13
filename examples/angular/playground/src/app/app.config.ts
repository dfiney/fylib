import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideFyLib } from '@fylib/adapter-angular';
import { themeConfig } from '../fylib/theme.config';
import { sseConfig } from '../fylib/sse.config';
import { cryptoConfig } from '../fylib/crypto.config';
import { loggingConfig } from '../fylib/logging.config';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideCharts(withDefaultRegisterables()),
    provideFyLib({
      theme: themeConfig,
      sse: sseConfig,
      crypto: cryptoConfig,
      logging: loggingConfig
    })
  ]
};
