import { Context } from 'koa';
import { STATUS_CODES } from '../../../../lib/koa';

export const unexpectedCtrl = (ctx: Context, next: Function) => {
  throw new Error('This message should not appear!');
};

export const expectedCtrl = (ctx: Context, next: Function) => {
  ctx.throw(STATUS_CODES.BAD_GATEWAY, 'Some expected message');
};
