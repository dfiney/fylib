import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoggerEngine } from '../src/engine';

describe('LoggerEngine', () => {
  let logger: LoggerEngine;

  beforeEach(() => {
    logger = new LoggerEngine();
    logger.setConfig({
      enabled: true,
      level: 'debug',
      console: { enabled: true }
    });
  });

  it('should log debug messages when level is debug', () => {
    const spy = vi.spyOn(console, 'log');
    logger.debug('Test', 'Debug message');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log debug messages when level is info', () => {
    logger.setConfig({ level: 'info' });
    const spy = vi.spyOn(console, 'log');
    logger.debug('Test', 'Debug message');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should sanitize sensitive data', () => {
    const spy = vi.spyOn(console, 'log');
    logger.info('Test', 'Safe message', { password: '123', token: 'abc', safe: 'ok' });
    
    const lastCall = spy.mock.calls[0][1]; // The data object is usually the second argument in this engine's console.log
    // Note: ConsoleSink in engine.ts uses console.log(`%c${msg}`, style, data);
    
    const loggedData = spy.mock.calls[0][2];
    expect(loggedData.password).toBe('********');
    expect(loggedData.token).toBe('********');
    expect(loggedData.safe).toBe('ok');
    
    spy.mockRestore();
  });
});
