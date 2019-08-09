import Koa from 'koa';
import * as Boom from '@hapi/boom';

import routers from './routes';
import { createDefaultApp } from '../lib/koa';
import { logRequest } from '../lib/logger/middleware/koa';

export const createApp = (): Koa => {
  const app = createDefaultApp({ requestLogger: logRequest });

  routers.forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods({
      throw: true,
      methodNotAllowed: Boom.methodNotAllowed,
      notImplemented: Boom.notImplemented,
    }));
  });

  return app;
};

