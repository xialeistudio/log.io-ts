"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
const fs = require("fs");
const path = require("path");
const lastline = require("read-last-lines");
const io = require("socket.io-client");
const logger_1 = require("./common/logger");
class Client {
    static bootstrap(options) {
        return new Client(options);
    }
    constructor(options) {
        // reading config file
        this.nodes = require(path.resolve(options.config));
        this.server = options.server;
        this.socket = io(`${this.server}/log`, { transports: ['websocket', 'polling'] });
        this.socket.on('ready', () => {
            logger_1.default.info(`server connected, client_id=${this.socket.id}`);
            // watch file
            for (const node of this.nodes) {
                fs.watch(node.path, async (event) => {
                    if (event !== 'change') {
                        return;
                    }
                    const line = await lastline.read(node.path, 1);
                    this.socket.emit('log', node.node, line);
                });
                logger_1.default.info(`watch ${node.path}`);
            }
        });
    }
}
exports.default = Client;
