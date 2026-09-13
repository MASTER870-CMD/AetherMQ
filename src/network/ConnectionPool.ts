import net from 'net';

export class ConnectionPool {
    private connections: Set<net.Socket> = new Set();

    public add(socket: net.Socket): void {
        this.connections.add(socket);
        socket.on('close', () => this.connections.delete(socket));
    }

    public broadcast(data: Buffer): void {
        for (const conn of this.connections) {
            conn.write(data);
        }
    }
}
