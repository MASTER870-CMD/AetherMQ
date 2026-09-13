import { Message } from '../core/Message';
export declare class WriteAheadLog {
    private stream;
    private buffer;
    private flushInterval;
    private isFlushing;
    private filePath;
    constructor(dataDir: string, topic: string);
    append(msg: Message): void;
    recover(): Message[];
    private flush;
}
//# sourceMappingURL=WAL.d.ts.map