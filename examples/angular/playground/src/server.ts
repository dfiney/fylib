import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import fs from 'node:fs';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();

const angularApp = new AngularNodeAppEngine();

/**
 * Endpoint para salvar logs locais do fyLib
 */
app.post('/api/fylogs', express.json(), (req, res) => {
  try {
    const logEntry = req.body;
    const logDir = join(process.cwd(), 'fylogs');
    
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    
    const today = new Date().toISOString().split('T')[0];
    const logFile = join(logDir, `fylib-${today}.log`);
    
    const logLine = `[${logEntry.timestamp}] [${logEntry.level.toUpperCase()}] [${logEntry.module}] ${logEntry.message} ${logEntry.data ? JSON.stringify(logEntry.data) : ''}\n`;
    
    fs.appendFileSync(logFile, logLine);
    res.status(200).send({ status: 'ok' });
  } catch (e) {
    console.error('Erro ao salvar log no arquivo:', e);
    res.status(500).send({ error: 'Erro ao salvar log' });
  }
});


/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
