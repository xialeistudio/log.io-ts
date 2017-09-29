/**
 * administrator page
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
import * as Router from 'koa-router';

export default (password: string) => {
  const router = new Router();
  router.get('/', async (ctx) => {
    if (ctx.query.password !== password) {
      ctx.throw(401);
    }
    // todo: 显示监控页面
    ctx.body = { errmsg: 'ok', errcode: 0 };
  });
  return router;
};
