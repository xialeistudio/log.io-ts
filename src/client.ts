/**
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
import * as fs from 'fs';
import * as path from 'path';
import * as lastline from 'read-last-lines';
import * as io from 'socket.io-client';
import logger from './common/logger';

/**
 * a watch job
 */
interface INode {
  node: string;
  path: string;
}

interface IOptions {
  server: string;
  config: string; // config file path
}

export default class Client {
  public static bootstrap(options: IOptions) {
    return new Client(options);
  }

  private server: string;
  private nodes: INode[];
  private socket: SocketIOClient.Socket;

  constructor(options: IOptions) {
    // reading config file
    this.nodes = require(path.resolve(options.config)) as INode[];
    this.server = options.server;
    this.socket = io(`${this.server}/log`, { transports: ['websocket', 'polling'] });
    this.socket.on('ready', () => {
      let connected = true;
      this.socket.on('disconnect', () => {
        connected = false;
        logger.warn(`server disconnected.`);
      });
      logger.info(`server connected, client_id=${this.socket.id}`);
      // watch file
      for (const node of this.nodes) {
        fs.watch(node.path, async (event) => {
          if (event !== 'change' || !connected) {
            return;
          }
          const line = await lastline.read(node.path, 1);
          this.socket.emit('log', node.node, line);
        });
        logger.info(`watch ${node.path}`);
      }
    });
  }
}
