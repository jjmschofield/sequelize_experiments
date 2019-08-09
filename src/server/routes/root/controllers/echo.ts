import { Context } from 'koa';

export const echoCtrl = (ctx: Context, next: Function) => {
  ctx.status = 200;
  ctx.body = { message: ctx.request.query.message };
};
// TODO validation and santisation
