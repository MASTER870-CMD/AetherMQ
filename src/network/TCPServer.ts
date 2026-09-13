import net from 'net';

export class TCPServer {
    private server: net.Server;

    constructor(private port: number) {
        this.server = net.createServer((socket) => this.handleConnection(socket));
    }

    private handleConnection(socket: net.Socket): void {
        console.log('Client connected:', socket.remoteAddress);
        socket.on('data', (data) => {
            // TODO: parse protocol
        });
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`AetherMQ server listening on port ${this.port}`);
        });
    }
}
