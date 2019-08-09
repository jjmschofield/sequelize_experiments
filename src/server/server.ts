import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import Koa from 'koa';

import { createApp } from './app';

export const server = async () => {
  const app = createApp();

  startHttpServer(app, process.env.HTTP_PORT || '80');
  startHttpsServer(app, process.env.HTTPS_PORT || '443', './cert');
};

const startHttpServer = (app: Koa, port: string) => {
  http.createServer(app.callback()).listen(port);
};

const startHttpsServer = (app: Koa, port: string, certPath: string) => {
  const options = {
    key: fs.readFileSync(path.resolve(certPath,'server.key')),
    cert: fs.readFileSync(path.resolve(certPath,'server.cert')),
  };

  https.createServer(options, app.callback()).listen(port);
};
