export interface CryptoConfig {
  enabled: boolean;
  secret: string;
  algorithm: string;
  transformation: string;
  ivSize: number;
  tagSize: number;
}
