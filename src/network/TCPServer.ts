import net from 'net';
import { ProtocolParser, Command } from './Protocol';
import { TopicManager } from '../core/TopicManager';

export class TCPServer {
    private server: net.Server;
    private topicManager: TopicManager = new TopicManager();

    constructor(private port: number) {
        this.server = net.createServer((socket) => this.handleConnection(socket));
    }

    private handleConnection(socket: net.Socket): void {
        // Modularized handling
        socket.on('data', (data) => this.routeCommand(socket, data));
    }

    private routeCommand(socket: net.Socket, data: Buffer) {
        try {
            const { cmd, payload } = ProtocolParser.parse(data);
            if (cmd === Command.PUBLISH) {
                // handle
            }
        } catch(e) {}
    }

    public start(): void {
        this.server.listen(this.port, () => console.log(`Running on ${this.port}`));
    }
}
