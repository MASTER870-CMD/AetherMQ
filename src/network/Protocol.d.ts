export declare enum Command {
    PUBLISH = 1,
    SUBSCRIBE = 2,
    POLL = 3,
    ACK = 4
}
export declare class ProtocolParser {
    static parse(data: Buffer): {
        cmd: Command;
        payload: Buffer;
    };
}
//# sourceMappingURL=Protocol.d.ts.map