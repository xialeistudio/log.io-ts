/**
 * administrator page
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
import * as Router from 'koa-router';

const pkg = require('../../package.json');

export default (password: string) => {
  const router = new Router();
  router.get('/', async (ctx) => {
    if (ctx.query.password !== password) {
      ctx.throw(401);
    }
    await ctx.render('index', { version: pkg.version });
  });
  return router;
};
