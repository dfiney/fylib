const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3002;

// Sistema de Logs idêntico ao sse-server
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
const d = new Date();
const pad = (n) => String(n).padStart(2, '0');
const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
const logFile = path.join(logsDir, `crypto_${stamp}.log`);
const logStream = fs.createWriteStream(logFile, { flags: 'a' });
const origLog = console.log;
const origErr = console.error;
console.log = (...args) => { origLog(...args); logStream.write(args.join(' ') + '\n'); };
console.error = (...args) => { origErr(...args); logStream.write(args.join(' ') + '\n'); };

app.use(cors());
app.use(express.json());

// Configuração idêntica ao playground para garantir compatibilidade
const cryptoConfig = {
  enabled: true,
  secret: 'fancy_you'.padEnd(32, '0').substring(0, 32),
  algorithm: 'AES',
  transformation: 'AES/GCM/NoPadding',
  ivSize: 12,
  tagSize: 128 // bits (para bater com o frontend)
};

/**
 * Criptografa dados usando AES-GCM (compatível com WebCrypto no frontend)
 */
async function encrypt(text, cfg) {
  if (!cfg.enabled) return text;

  // No WebCrypto (frontend), a chave é derivada de forma diferente
  // Aqui vamos simplificar para bater com o importKey do frontend (que usa raw)
  const enc = new TextEncoder();
  const rawKey = enc.encode(cfg.secret);
  
  const iv = crypto.randomBytes(cfg.ivSize);
  const cipher = crypto.createCipheriv('aes-256-gcm', rawKey, iv, {
    authTagLength: cfg.tagSize / 8
  });

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  // WebCrypto concatena IV + Ciphertext + Tag (tagLength bits)
  return Buffer.concat([iv, encrypted, tag]).toString('base64');
}

/**
 * Descriptografa dados usando AES-GCM (compatível com WebCrypto no frontend)
 */
async function decrypt(base64Data, cfg) {
  if (!cfg.enabled) return base64Data;

  const data = Buffer.from(base64Data, 'base64');
  const iv = data.slice(0, cfg.ivSize);
  const tag = data.slice(data.length - (cfg.tagSize / 8));
  const ciphertext = data.slice(cfg.ivSize, data.length - (cfg.tagSize / 8));

  const enc = new TextEncoder();
  const rawKey = enc.encode(cfg.secret);

  const decipher = crypto.createDecipheriv('aes-256-gcm', rawKey, iv, {
    authTagLength: cfg.tagSize / 8
  });
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

app.get('/api/secure-data', async (req, res) => {
  const sensitiveData = {
    message: "Este é um segredo de estado do Finey!",
    balance: "R$ 1.000.000,00",
    status: "CONFIDENCIAL",
    timestamp: new Date().toISOString()
  };

  const jsonStr = JSON.stringify(sensitiveData);
  const encrypted = await encrypt(jsonStr, cryptoConfig);

  console.log(`[CryptoServer] GET /api/secure-data: Enviando dados protegidos...`);

  res.json({
    payload: encrypted,
    protected: true,
    algorithm: cryptoConfig.transformation
  });
});

app.post('/api/secure-data', async (req, res) => {
  try {
    const { payload } = req.body;
    if (!payload) return res.status(400).json({ error: 'Payload ausente' });

    console.log(`[CryptoServer] POST /api/secure-data: Recebido payload criptografado...`);
    
    // Descriptografa o que recebeu
    const decryptedStr = await decrypt(payload, cryptoConfig);
    const clientData = JSON.parse(decryptedStr);
    
    console.log(`[CryptoServer] Dados recebidos com sucesso:`, clientData);

    // Cria uma resposta e criptografa também
    const serverResponse = {
      status: 'RECEBIDO_E_PROCESSADO',
      receivedAt: new Date().toISOString(),
      confirmation: `Olá ${clientData.name || 'Usuário'}, recebemos seus dados de forma segura.`
    };

    const responseStr = JSON.stringify(serverResponse);
    const encryptedResponse = await encrypt(responseStr, cryptoConfig);

    res.json({
      payload: encryptedResponse,
      protected: true,
      algorithm: cryptoConfig.transformation
    });
  } catch (err) {
    console.error(`[CryptoServer] Erro no processamento POST:`, err);
    res.status(500).json({ error: 'Erro ao processar dados criptografados' });
  }
});

app.listen(port, () => {
  console.log(`[CryptoServer] Rodando em http://localhost:${port}`);
  console.log(`[CryptoServer] GET/POST: /api/secure-data`);
});
