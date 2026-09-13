"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCPServer = void 0;
const net_1 = __importDefault(require("net"));
const TopicManager_1 = require("../core/TopicManager");
class TCPServer {
    port;
    server;
    topicManager = new TopicManager_1.TopicManager();
    constructor(port) {
        this.port = port;
        this.server = net_1.default.createServer((socket) => this.handleConnection(socket));
    }
    handleConnection(socket) {
        console.log(`[+] Client connected: ${socket.remoteAddress}:${socket.remotePort}`);
        let buffer = '';
        socket.on('data', (data) => {
            buffer += data.toString();
            let newlineIndex;
            // Handle multiple messages in one TCP chunk using Newline delimited JSON
            while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
                const line = buffer.slice(0, newlineIndex).trim();
                buffer = buffer.slice(newlineIndex + 1);
                if (line) {
                    this.processCommand(socket, line);
                }
            }
        });
        socket.on('close', () => {
            console.log(`[-] Client disconnected`);
        });
        socket.on('error', (err) => {
            console.error('Socket error:', err.message);
        });
    }
    processCommand(socket, line) {
        try {
            const req = JSON.parse(line);
            if (req.command === 'PUBLISH') {
                const msg = this.topicManager.publish(req.topic, req.payload);
                socket.write(JSON.stringify({ status: 'OK', messageId: msg.id }) + '\n');
            }
            else if (req.command === 'POLL') {
                const messages = this.topicManager.poll(req.topic, req.offset || 0);
                socket.write(JSON.stringify({ status: 'OK', messages, nextOffset: (req.offset || 0) + messages.length }) + '\n');
            }
            else {
                socket.write(JSON.stringify({ status: 'ERROR', error: 'Unknown command' }) + '\n');
            }
        }
        catch (e) {
            socket.write(JSON.stringify({ status: 'ERROR', error: 'Invalid JSON', details: e.message }) + '\n');
        }
    }
    start() {
        // Pre-initialize default topic to trigger WAL recovery logging immediately
        this.topicManager.getTopic('default');
        this.server.listen(this.port, () => {
            console.log(`🚀 AetherMQ Server listening on port ${this.port}`);
        });
    }
}
exports.TCPServer = TCPServer;
//# sourceMappingURL=TCPServer.js.map