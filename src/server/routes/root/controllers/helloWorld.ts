import { Context } from 'koa';

export const helloWorldCtrl = (ctx: Context, next: Function) => {
  ctx.status = 200;
  ctx.body = { message: 'Hello World!' };
};
