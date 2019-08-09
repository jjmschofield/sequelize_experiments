import rootRouter from './root/router';
import healthRouter from './health/router';
import errorRouter from './error/router';
import Router from 'koa-router';

export const routers: Router[] = [
  healthRouter.create(),
  errorRouter.create(),
  rootRouter.create(),
];

export default routers;
