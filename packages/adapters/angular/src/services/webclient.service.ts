import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, map, retry, timeout, delay, switchMap } from 'rxjs/operators';
import { FyLibService } from './fylib.service';
import { FyNotificationService } from './notification.service';
import { cryptoEngine } from '@fylib/crypto';

export interface FyHttpRequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cryptoEnabled?: boolean;
  autoNotify?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

@Injectable({ providedIn: 'root' })
export class FyWebClientService {
  private http = inject(HttpClient);
  private fylib = inject(FyLibService);
  private notify = inject(FyNotificationService);

  /**
   * Realiza uma requisição GET reativa
   */
  get<T = any>(url: string, options: FyHttpRequestOptions = {}): Observable<T> {
    const finalUrl = this.buildUrl(url);
    const finalOptions = this.mergeOptions(options);

    return this.http.get(finalUrl, {
      headers: finalOptions.headers as any,
      params: finalOptions.params as any,
      responseType: finalOptions.responseType as any
    }).pipe(
      timeout(finalOptions.timeout || 10000),
      retry({
        count: finalOptions.retries || 0,
        delay: finalOptions.retryDelay || 1000
      }),
      switchMap(data => from(this.processIncomingData<T>(data, finalOptions))),
      catchError(err => this.handleError(err, finalOptions))
    );
  }

  /**
   * Realiza uma requisição POST reativa
   */
  post<T = any>(url: string, body: any, options: FyHttpRequestOptions = {}): Observable<T> {
    const finalUrl = this.buildUrl(url);
    const finalOptions = this.mergeOptions(options);

    return from(this.processOutgoingData(body, finalOptions)).pipe(
      switchMap(processedBody => 
        this.http.post(finalUrl, processedBody, {
          headers: finalOptions.headers as any,
          params: finalOptions.params as any,
          responseType: finalOptions.responseType as any
        })
      ),
      timeout(finalOptions.timeout || 10000),
      retry({
        count: finalOptions.retries || 0,
        delay: finalOptions.retryDelay || 1000
      }),
      switchMap(data => from(this.processIncomingData<T>(data, finalOptions))),
      catchError(err => this.handleError(err, finalOptions))
    );
  }

  /**
   * Realiza uma requisição PUT reativa
   */
  put<T = any>(url: string, body: any, options: FyHttpRequestOptions = {}): Observable<T> {
    const finalUrl = this.buildUrl(url);
    const finalOptions = this.mergeOptions(options);

    return from(this.processOutgoingData(body, finalOptions)).pipe(
      switchMap(processedBody => 
        this.http.put(finalUrl, processedBody, {
          headers: finalOptions.headers as any,
          params: finalOptions.params as any,
          responseType: finalOptions.responseType as any
        })
      ),
      timeout(finalOptions.timeout || 10000),
      switchMap(data => from(this.processIncomingData<T>(data, finalOptions))),
      catchError(err => this.handleError(err, finalOptions))
    );
  }

  /**
   * Realiza uma requisição DELETE reativa
   */
  delete<T = any>(url: string, options: FyHttpRequestOptions = {}): Observable<T> {
    const finalUrl = this.buildUrl(url);
    const finalOptions = this.mergeOptions(options);

    return this.http.delete(finalUrl, {
      headers: finalOptions.headers as any,
      params: finalOptions.params as any,
      responseType: finalOptions.responseType as any
    }).pipe(
      timeout(finalOptions.timeout || 10000),
      switchMap(data => from(this.processIncomingData<T>(data, finalOptions))),
      catchError(err => this.handleError(err, finalOptions))
    );
  }

  // --- Métodos Privados Auxiliares ---

  private buildUrl(url: string): string {
    const baseUrl = this.fylib.config().http?.baseUrl;
    if (baseUrl && !url.startsWith('http')) {
      return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    }
    return url;
  }

  private mergeOptions(options: FyHttpRequestOptions): FyHttpRequestOptions {
    const globalHttp = this.fylib.config().http || {};
    return {
      timeout: options.timeout ?? globalHttp.timeout ?? 15000,
      retries: options.retries ?? globalHttp.retries ?? 0,
      retryDelay: options.retryDelay ?? globalHttp.retryDelay ?? 1000,
      cryptoEnabled: options.cryptoEnabled ?? globalHttp.cryptoEnabled ?? true,
      autoNotify: options.autoNotify ?? globalHttp.autoNotify ?? true,
      headers: {
        ...globalHttp.headers,
        ...(options.headers as any)
      },
      ...options
    };
  }

  private async processOutgoingData(body: any, options: FyHttpRequestOptions): Promise<any> {
    const cryptoCfg = this.fylib.config().crypto;
    if (options.cryptoEnabled && cryptoCfg?.enabled && body) {
      const jsonStr = typeof body === 'string' ? body : JSON.stringify(body);
      const encrypted = await cryptoEngine.encrypt(jsonStr, cryptoCfg);
      return { payload: encrypted, encrypted: true };
    }
    return body;
  }

  private async processIncomingData<T>(data: any, options: FyHttpRequestOptions): Promise<T> {
    const cryptoCfg = this.fylib.config().crypto;
    
    let result = data;
    
    // Se vier embrulhado em { payload: '...' } ou for uma string criptografada
    if (options.cryptoEnabled && cryptoCfg?.enabled) {
      const encryptedPayload = data?.payload || (typeof data === 'string' ? data : null);
      if (encryptedPayload) {
        try {
          const decrypted = await cryptoEngine.decrypt(encryptedPayload, cryptoCfg);
          result = JSON.parse(decrypted);
        } catch (e) {
          console.error('[fyLib WebClient] Erro ao descriptografar resposta:', e);
        }
      }
    }

    if (options.autoNotify) {
      this.notify.success('Dados carregados com sucesso', 'WebClient');
    }

    return result as T;
  }

  private handleError(error: HttpErrorResponse | Error, options: FyHttpRequestOptions): Observable<never> {
    let errorMessage = 'Ocorreu um erro na requisição';
    
    if (error instanceof HttpErrorResponse) {
      errorMessage = `Erro ${error.status}: ${error.statusText || error.message}`;
    } else {
      errorMessage = error.message;
    }

    if (options.autoNotify) {
      this.notify.error(errorMessage, 'Erro de Conexão');
    }

    return throwError(() => error);
  }
}
