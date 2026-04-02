const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
const d = new Date();
const pad = (n) => String(n).padStart(2, '0');
const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
const logFile = path.join(logsDir, `sse_${stamp}.log`);
const logStream = fs.createWriteStream(logFile, { flags: 'a' });
const origLog = console.log;
const origErr = console.error;
console.log = (...args) => { origLog(...args); logStream.write(args.join(' ') + '\n'); };
console.error = (...args) => { origErr(...args); logStream.write(args.join(' ') + '\n'); };

app.use(cors());
app.use(express.json());

// Armazenar conexões ativas
let clients = [];

// Endpoint SSE
app.get('/events', (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };

  clients.push(newClient);
  console.log(`[SSE] Cliente conectado: ${clientId}`);

  // Enviar evento de boas-vindas
  const welcomeData = JSON.stringify({ message: 'Conectado ao servidor de testes fyLib!' });
  res.write(`data: ${welcomeData}\n\n`);

  // Remover cliente ao desconectar
  req.on('close', () => {
    console.log(`[SSE] Cliente desconectado: ${clientId}`);
    clients = clients.filter(client => client.id !== clientId);
  });
});

// Endpoint para disparar notificações de teste (POST)
app.post('/notify', (req, res) => {
  const notification = req.body;
  
  // Envia para todos os clientes conectados
  clients.forEach(client => {
    client.res.write(`event: new-notification\ndata: ${JSON.stringify(notification)}\n\n`);
  });

  res.json({ success: true, clientsConnected: clients.length });
});

// Endpoint para disparar atualização de sistema (POST)
app.post('/update', (req, res) => {
  const data = req.body;
  
  clients.forEach(client => {
    client.res.write(`event: system-update\ndata: ${JSON.stringify(data)}\n\n`);
  });

  res.json({ success: true, clientsConnected: clients.length });
});

// Simulação de notificações automáticas a cada 30 segundos
setInterval(() => {
  if (clients.length > 0) {
    const autoNotify = {
      title: 'Servidor de Teste',
      message: 'Pulso de conexão ativa (SSE Health Check)',
      details: 'Servidor de testes fyLib está operando normalmente.',
      type: 'info'
    };
    clients.forEach(client => {
      client.res.write(`event: new-notification\ndata: ${JSON.stringify(autoNotify)}\n\n`);
    });
  }
}, 30000);

app.listen(PORT, () => {
  console.log(`🚀 Servidor de testes SSE rodando em http://localhost:${PORT}`);
  console.log(`📡 Endpoint SSE: http://localhost:${PORT}/events`);
  console.log(`✉️ Disparar notificação (POST): http://localhost:${PORT}/notify`);
  console.log(`⚠️ Disparar update (POST): http://localhost:${PORT}/update`);
});
