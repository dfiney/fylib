export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
}

export interface LoggerConfig {
  enabled: boolean; // Interruptor global mestre
  level: LogLevel;   // Nível mínimo (debug, info, warn, error)
  console?: {
    enabled: boolean; // Logs no console do navegador
  };
  localFiles?: {
    enabled: boolean; // Ativa/Desativa salvamento em disco no projeto (via path)
    path: string;     // Path local (ex: /api/fylogs ou logs/my-app.log)
    filenamePattern?: string; // Padrão sugerido (ex: fylib-{date}.log)
  };
  remote?: {
    enabled: boolean; // Envio para servidor externo de telemetria/central de logs
    endpoint: string;  // URL do servidor (ex: https://logs.minha-empresa.com)
  };
}

export interface LogSink {
  log(entry: LogEntry): void;
}
