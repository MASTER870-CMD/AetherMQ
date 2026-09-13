export enum Command {
    PUBLISH = 1,
    SUBSCRIBE = 2,
    POLL = 3,
    ACK = 4
}

export class ProtocolParser {
    public static parse(data: Buffer): { cmd: Command, payload: Buffer } {
        const cmd = data.readUInt8(0);
        const payload = data.subarray(1);
        return { cmd, payload };
    }
}
