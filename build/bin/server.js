"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
const program = require("commander");
const pkg = require('../../package.json');
program.version(pkg.version).
    // option('-pwd', 'password, default is administrator').
    option('-h,--host', 'listen host, default is 0.0.0.0').
    option('-p,--port', 'listen port, default is 8080', parseInt).
    parse(process.argv);
// const defaultOptions = { host: '0.0.0.0', port: 8080, password: 'administrator' };
// if (program.pwd) {
//   defaultOptions.password = program.pwd;
// }
// if (program.h) {
//   defaultOptions.host = program.h;
// }
// if (program.P) {
//   defaultOptions.port = program.P;
// }
console.log(program);
// Application.bootstrap(defaultOptions);
