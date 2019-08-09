import Koa, { Context } from 'koa';
import helmet from 'koa-helmet';
import { IHelmetConfiguration } from 'helmet';
import cors from 'koa-cors';

import { setCorrelationId, setReqTime, errorHandler } from './middleware';

interface FactoryConfiguration {
  requestLogger?: (ctx: Context, next: Function) => Promise<void>;
  cors?: cors.Options;
  helmet?: IHelmetConfiguration;
}

export const createDefaultApp = (config: FactoryConfiguration): Koa => {
  const app = createApp();
  applyLoggingMiddleware(app, config);
  applyErrorHandlers(app, config);
  applySecurityMiddleware(app, config);
  applyResponseHeaders(app, config);
  return app;
};

export const createApp = (): Koa => new Koa();

export const applyLoggingMiddleware = (app: Koa, config: FactoryConfiguration): Koa => {
  app.use(setCorrelationId);
  if (config.requestLogger) {
    app.use(config.requestLogger);
  }
  return app;
};

export const applyResponseHeaders = (app: Koa, config: FactoryConfiguration): Koa => {
  app.use(setReqTime);
  return app;
};

export const applyErrorHandlers = (app: Koa, config: FactoryConfiguration): Koa => {
  app.use(errorHandler);
  return app;
};

export const applySecurityMiddleware = (app: Koa, config: FactoryConfiguration): Koa => {
  app.use(helmet(config.helmet));
  app.use(cors(config.cors));
  return app;
};
