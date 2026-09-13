import net from 'net';
export declare class ConnectionPool {
    private connections;
    add(socket: net.Socket): void;
    broadcast(data: Buffer): void;
}
//# sourceMappingURL=ConnectionPool.d.ts.map