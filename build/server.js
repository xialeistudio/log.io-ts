"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const io = require("socket.io");
const logger_1 = require("./common/logger");
const handler_1 = require("./io/handler");
const site_1 = require("./routes/site");
class Server {
    /**
     * bootstrap the server
     * @param {IBootstrapOptions} options
     * @returns {Application}
     */
    static bootstrap(options) {
        return new Server(options);
    }
    constructor(options) {
        this.options = options;
        this.app = new Koa();
        const site = site_1.default(this.options.password);
        this.app.use(site.routes()).use(site.allowedMethods());
        // start app
        this.server = this.app.listen(this.options.port, this.options.host, () => {
            logger_1.default.info(`http startup on ${this.server.address().address}:${this.server.address().port}`);
            // 启动socket.io
            this.io = io(this.server, { transports: ['websocket', 'polling'] });
            handler_1.default(this.io);
            logger_1.default.info(`socket.io startup`);
        });
    }
}
Server.bootstrap({
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT || '8080', 10),
    password: process.env.PASSWORD || 'administrator',
});
