/**
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
import * as program from 'commander';
import Server from '../server';

const pkg = require('../../package.json');

program.
    version(pkg.version).
    command('start-server').
    description('start server').
    option('-p,--port <port>', 'listen port, default is 8080', parseInt).
    option('-h,--host <host>', 'listen host, default is 0.0.0.0').
    option('-P,--pwd <password>', 'password, default is administrator').
    action((command) => {
      const options = {
        host: command.host || '0.0.0.0',
        port: command.port || 8080,
        password: command.password || 'administrator',
      };
      Server.bootstrap(options);
    });
program.parse(process.argv);
