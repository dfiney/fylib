import { LoggingConfig } from '@fylib/config';

export const loggingConfig: LoggingConfig = {
  enabled: true,
  level: 'info',
  console: { enabled: false },
  localFiles: {
    enabled: true,
    path: 'fylogs',
    filenamePattern: 'fylib-{date}.log'
  },
  remote: {
    enabled: false,
    endpoint: 'https://telemetry.finey.com'
  }
};
