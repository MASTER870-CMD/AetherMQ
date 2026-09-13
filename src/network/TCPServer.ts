import net from 'net';
import { TopicManager } from '../core/TopicManager';

export class TCPServer {
    private server: net.Server;
    private topicManager: TopicManager = new TopicManager();

    constructor(private port: number) {
        this.server = net.createServer((socket) => this.handleConnection(socket));
    }

    private handleConnection(socket: net.Socket): void {
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

    private processCommand(socket: net.Socket, line: string) {
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
        } catch (e: any) {
            socket.write(JSON.stringify({ status: 'ERROR', error: 'Invalid JSON', details: e.message }) + '\n');
        }
    }

    public start(): void {
        // Pre-initialize default topic to trigger WAL recovery logging immediately
        this.topicManager.getTopic('default');
        
        this.server.listen(this.port, () => {
            console.log(`🚀 AetherMQ Server listening on port ${this.port}`);
        });
    }
}
