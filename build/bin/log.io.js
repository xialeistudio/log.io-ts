"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
const program = require("commander");
const client_1 = require("../client");
const server_1 = require("../server");
const pkg = require('../../package.json');
program.
    version(pkg.version).
    command('start-server').
    description('start server to receive logs').
    option('-p,--port <port>', 'listen port, default is 8080', parseInt).
    option('-h,--host <host>', 'listen host, default is 0.0.0.0').
    option('-P,--pwd <password>', 'password, default is administrator').
    action((command) => {
    const options = {
        host: command.host || '0.0.0.0',
        port: command.port || 8080,
        password: command.password || 'administrator',
    };
    server_1.default.bootstrap(options);
});
program.
    command('start-client').
    description('start client to upload logs').
    option('-s,--server <server>', 'server address, default is http://localhost:8080').
    option('-c,--config <config>', 'config file, format like [{"node":"test","path":"filepath"}]').
    action((command) => {
    const options = {
        server: command.server || 'http://localhost:8080',
        config: command.config,
    };
    client_1.default.bootstrap(options);
});
program.parse(process.argv);
