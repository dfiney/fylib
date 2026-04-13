import { LogEntry, LogLevel, LoggerConfig, LogSink } from './types';

class ConsoleSink implements LogSink {
  log(entry: LogEntry): void {
    const { timestamp, level, module, message, data } = entry;
    const style = this.getStyle(level);
    const msg = `[${timestamp}] [${level.toUpperCase()}] [${module}] ${message}`;
    
    if (data) {
      console.log(`%c${msg}`, style, data);
    } else {
      console.log(`%c${msg}`, style);
    }
  }

  private getStyle(level: LogLevel): string {
    switch (level) {
      case 'debug': return 'color: #7f8c8d';
      case 'info': return 'color: #3498db';
      case 'warn': return 'color: #f39c12';
      case 'error': return 'color: #e74c3c; font-weight: bold';
      default: return '';
    }
  }
}

class FileSink implements LogSink {
  private fs: any;
  private pathModule: any;

  constructor(private directory: string, private pattern?: string) {
    if (typeof window === 'undefined') {
      try {
        // Usar indirect eval para evitar avisos do bundler (direct-eval) 
        // e ocultar 'require' da análise estática em builds do browser
        const nodeRequire = (0, eval)('require');
        this.fs = nodeRequire('fs');
        this.pathModule = nodeRequire('path');
        
        // Inteligência de detecção de path (relativo vs absoluto)
        const isAbsolute = this.directory.startsWith('/') || 
                          /^[a-zA-Z]:\\/.test(this.directory) ||
                          /^[a-zA-Z]:\//.test(this.directory);
        
        if (!isAbsolute) {
          // Se for relativo, resolvemos a partir do CWD (root do projeto em SSR)
          this.directory = this.pathModule.resolve(process.cwd(), this.directory);
        }

        // Garante que o diretório existe
        if (!this.fs.existsSync(this.directory)) {
          this.fs.mkdirSync(this.directory, { recursive: true });
        }
      } catch (e) {
        console.error('[Logger] Erro ao carregar módulos de arquivo no Node:', e);
      }
    }
  }

  log(entry: LogEntry): void {
    if (!this.fs || !this.pathModule) return;

    try {
      const date = new Date().toISOString().split('T')[0];
      const filename = (this.pattern || 'fylib-{date}.log').replace('{date}', date);
      const filePath = this.pathModule.join(this.directory, filename);
      
      const logLine = JSON.stringify(entry) + '\n';
      this.fs.appendFileSync(filePath, logLine, 'utf8');
    } catch (e) {
      // Evita recursão infinita se o erro for no próprio log
      console.error('[Logger] Erro ao gravar log em arquivo:', e);
    }
  }
}

class HttpSink implements LogSink {
  constructor(private endpoint: string) {}

  log(entry: LogEntry): void {
    if (typeof fetch === 'function') {
      fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      }).catch(() => {});
    }
  }
}

export class LoggerEngine {
  private config: LoggerConfig = {
    enabled: false,
    level: 'info',
    console: { enabled: false }
  };
  private consoleSink = new ConsoleSink();
  private localFileSink?: LogSink;
  private remoteSink?: LogSink;
  
  // Lista de chaves cujos valores devem ser mascarados nos logs
  private readonly sensitiveKeys = ['secret', 'token', 'password', 'key', 'auth', 'iv', 'tag'];

  setConfig(config: Partial<LoggerConfig>) {
    this.config = { ...this.config, ...config };
    
    // Gerencia o LocalFileSink (logs locais via path)
    if (this.config.localFiles?.enabled) {
      const path = this.config.localFiles.path;
      const pattern = this.config.localFiles.filenamePattern;
      
      if (typeof window === 'undefined') {
        // Node.js/SSR - Gravação direta
        this.localFileSink = new FileSink(path, pattern);
      } else {
        // Browser - Envio via HTTP
        this.localFileSink = new HttpSink(path);
      }
    } else {
      this.localFileSink = undefined;
    }

    // Gerencia o RemoteSink (telemetria externa)
    if (this.config.remote?.enabled) {
      this.remoteSink = new HttpSink(this.config.remote.endpoint);
    } else {
      this.remoteSink = undefined;
    }
  }

  debug(module: string, message: string, data?: any) {
    this.log('debug', module, message, data);
  }

  info(module: string, message: string, data?: any) {
    this.log('info', module, message, data);
  }

  warn(module: string, message: string, data?: any) {
    this.log('warn', module, message, data);
  }

  error(module: string, message: string, data?: any) {
    this.log('error', module, message, data);
  }

  private log(level: LogLevel, module: string, message: string, data?: any) {
    // Se logs desativados globalmente ou nível insuficiente, não faz nada
    if (!this.config.enabled || !this.shouldLog(level)) return;

    // Sanitiza os dados antes de logar
    const sanitizedData = data ? this.sanitize(data) : undefined;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      module,
      message,
      data: sanitizedData
    };

    // Log no console se habilitado
    if (this.config.console?.enabled) {
      this.consoleSink.log(entry);
    }

    // Log em arquivos locais se habilitado
    if (this.config.localFiles?.enabled && this.localFileSink) {
      this.localFileSink.log(entry);
    }

    // Log remoto se habilitado
    if (this.config.remote?.enabled && this.remoteSink) {
      this.remoteSink.log(entry);
    }
  }

  private sanitize(data: any): any {
    if (data === null || typeof data !== 'object') return data;

    if (Array.isArray(data)) {
      return data.map(item => this.sanitize(item));
    }

    const sanitized: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const lowerKey = key.toLowerCase();
        const isSensitive = this.sensitiveKeys.some(s => lowerKey.includes(s));
        
        if (isSensitive && data[key] !== undefined && data[key] !== null) {
          sanitized[key] = '********';
        } else if (typeof data[key] === 'object') {
          sanitized[key] = this.sanitize(data[key]);
        } else {
          sanitized[key] = data[key];
        }
      }
    }
    return sanitized;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const configIdx = levels.indexOf(this.config.level);
    const entryIdx = levels.indexOf(level);
    return entryIdx >= configIdx;
  }
}

export const logger = new LoggerEngine();
