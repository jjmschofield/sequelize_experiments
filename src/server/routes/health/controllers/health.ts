import { Context } from 'koa';
import { Health } from '../../../../lib/process';

// TODO - this should be secured
export const healthCtrl = (ctx: Context, next: Function) => {
  ctx.status = 200;
  ctx.body = Health.Calc();
};
