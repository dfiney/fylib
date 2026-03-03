import { CryptoConfig } from '@fylib/crypto';

export const cryptoConfig: CryptoConfig = {
  enabled: true,
  secret: 'fancy_you'.padEnd(32, '0').substring(0, 32),
  algorithm: 'AES',
  transformation: 'AES/GCM/NoPadding',
  ivSize: 12,
  tagSize: 128
};
