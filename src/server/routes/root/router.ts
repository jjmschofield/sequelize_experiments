import Router from 'koa-router';
import { helloWorldCtrl } from './controllers/helloWorld';
import { echoCtrl } from './controllers/echo';

export const create = (): Router => {
  const router = new Router();

  router.get('/', helloWorldCtrl);
  router.get('/echo', echoCtrl);

  return router;
};

export default {
  create,
};
