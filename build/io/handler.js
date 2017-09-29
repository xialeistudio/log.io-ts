"use strict";
/**
 * @name log.io-ts
 * @author xialeistudio<xialeistudio@gmail.com>
 * @date 2017/9/29
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(io) {
    // receive log
    io.of('/log').on('connection', (socket) => {
        socket.on('log', (node, category, message) => {
            io.of('/administrator').emit('log', node, category, message);
        });
        socket.emit('ready');
    });
    // ready for client
    io.of('/administrator').on('connection', (socket) => {
        socket.emit('ready');
    });
}
exports.default = default_1;
