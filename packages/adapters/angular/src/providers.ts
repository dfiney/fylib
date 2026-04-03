import { InjectionToken, Provider, makeEnvironmentProviders, EnvironmentProviders } from '@angular/core';
import { AppConfig } from '@fylib/config';

/**
 * Injection Token para a configuração global do fyLib no Angular.
 */
export const FYLIB_CONFIG = new InjectionToken<Partial<AppConfig>>('FYLIB_CONFIG');

/**
 * Provedor de ambiente para inicializar o fyLib com uma configuração customizada.
 * 
 * @param config Configuração parcial do fyLib (temas, animações, logs, sse, etc).
 */
export function provideFyLib(config: Partial<AppConfig>): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: FYLIB_CONFIG,
      useValue: config
    }
  ]);
}
