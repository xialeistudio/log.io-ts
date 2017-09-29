"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * administrator page
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
const Router = require("koa-router");
exports.default = (password) => {
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
