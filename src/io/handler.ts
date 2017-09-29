/**
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */

export default function(io: SocketIO.Server) {
  // receive log
  io.of('/log').on('connection', (socket) => {
    socket.on('log', (node: string, category: string, message: any) => {
      io.of('/administrator').emit('log', node, category, message);
    });
    socket.emit('ready');
  });
  // ready for client
  io.of('/administrator').on('connection', (socket) => {
    socket.emit('ready');
  });
}
