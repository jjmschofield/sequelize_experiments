import Router from 'koa-router';
import { unexpectedCtrl, expectedCtrl } from './controllers/error';

export const create = (): Router => {
  const router = new Router();

  router.get('/error/unexpected', unexpectedCtrl);
  router.get('/error/expected', expectedCtrl);

  return router;
};

export default {
  create,
};
