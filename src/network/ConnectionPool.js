"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPool = void 0;
const net_1 = __importDefault(require("net"));
class ConnectionPool {
    connections = new Set();
    add(socket) {
        this.connections.add(socket);
        socket.on('close', () => this.connections.delete(socket));
    }
    broadcast(data) {
        for (const conn of this.connections) {
            conn.write(data);
        }
    }
}
exports.ConnectionPool = ConnectionPool;
//# sourceMappingURL=ConnectionPool.js.map