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
        socket.on('data', (data) => {
            try {
                const { cmd, payload } = ProtocolParser.parse(data);
                if (cmd === Command.PUBLISH) {
                    // Handle publish
                    const msg = { id: Date.now().toString(), topic: 'default', payload, timestamp: Date.now() };
                    this.topicManager.publish('default', msg);
                    socket.write(Buffer.from([0x00])); // OK
                }
            } catch (e) {
                console.error(e);
            }
        });
    }

    public start(): void {
        this.server.listen(this.port, () => console.log(`Running on ${this.port}`));
    }
}
