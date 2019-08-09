import Router from 'koa-router';
import { healthCtrl } from './controllers/health';

export const create = (): Router => {
  const router = new Router();

  router.get('/health', healthCtrl);

  return router;
};

export default {
  create,
};
