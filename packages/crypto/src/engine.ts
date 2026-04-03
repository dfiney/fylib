import { CryptoConfig } from './types';
import { logger } from '@fylib/logger';

function getSubtle(): SubtleCrypto | null {

  const g: any = globalThis as any;
  if (g.crypto && g.crypto.subtle) return g.crypto.subtle as SubtleCrypto;
  return null;
}

function concatBuffers(a: ArrayBuffer, b: ArrayBuffer): Uint8Array {
  const out = new Uint8Array(a.byteLength + b.byteLength);
  out.set(new Uint8Array(a), 0);
  out.set(new Uint8Array(b), a.byteLength);
  return out;
}

function toBase64(u8: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < u8.byteLength; i++) bin += String.fromCharCode(u8[i]);
  return btoa(bin);
}

function fromBase64(s: string): Uint8Array {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function importKey(secret: string): Promise<CryptoKey> {
  const subtle = getSubtle();
  if (!subtle) throw new Error('WebCrypto not available');
  const enc = new TextEncoder();
  const raw = enc.encode(secret);
  return await subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function encrypt(text: string, cfg: CryptoConfig): Promise<string> {
  if (!cfg.enabled) return text;
  logger.debug('Crypto', 'Encrypting data');
  const subtle = getSubtle();
  if (!subtle) {
    logger.error('Crypto', 'WebCrypto not available');
    throw new Error('WebCrypto not available');
  }
  const key = await importKey(cfg.secret);
  const iv = crypto.getRandomValues(new Uint8Array(cfg.ivSize));
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const ct = await subtle.encrypt({ name: 'AES-GCM', iv, tagLength: cfg.tagSize }, key, data);
  const payload = concatBuffers(iv.buffer, ct);
  return toBase64(payload);
}

export async function decrypt(payload: string, cfg: CryptoConfig): Promise<string> {
  if (!cfg.enabled) return payload;
  logger.debug('Crypto', 'Decrypting data');
  const subtle = getSubtle();
  if (!subtle) {
    logger.error('Crypto', 'WebCrypto not available');
    throw new Error('WebCrypto not available');
  }
  try {
    const key = await importKey(cfg.secret);
    const buf = fromBase64(payload);
    const iv = buf.slice(0, cfg.ivSize);
    const ct = buf.slice(cfg.ivSize);
    const pt = await subtle.decrypt({ name: 'AES-GCM', iv, tagLength: cfg.tagSize }, key, ct);
    const dec = new TextDecoder();
    return dec.decode(pt);
  } catch (e) {
    logger.error('Crypto', 'Decryption failed', e);
    throw e;
  }
}

