import fs from 'fs';
import path from 'path';
import { Message } from '../core/Message';

export class WriteAheadLog {
    private stream: fs.WriteStream;
    private buffer: string[] = [];
    private flushInterval: NodeJS.Timeout;

    constructor(dataDir: string, topic: string) {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        this.stream = fs.createWriteStream(path.join(dataDir, `${topic}.wal`), { flags: 'a' });
        
        this.flushInterval = setInterval(() => this.flush(), 100); // 100ms flush
    }

    public append(msg: Message): void {
        this.buffer.push(JSON.stringify(msg) + '\n');
    }

    private flush(): void {
        if (this.buffer.length === 0) return;
        const data = this.buffer.join('');
        this.buffer = [];
        this.stream.write(data);
    }
}
