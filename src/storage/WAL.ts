import fs from 'fs';
import path from 'path';
import { Message } from '../core/Message';

export class WriteAheadLog {
    private stream: fs.WriteStream;
    private buffer: string[] = [];
    private flushInterval: NodeJS.Timeout;
    private isFlushing = false;

    constructor(dataDir: string, topic: string) {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        this.stream = fs.createWriteStream(path.join(dataDir, `${topic}.wal`), { flags: 'a' });
        this.flushInterval = setInterval(() => this.flush(), 100);
    }

    public append(msg: Message): void {
        this.buffer.push(JSON.stringify(msg) + '\n');
    }

    private flush(): void {
        if (this.buffer.length === 0 || this.isFlushing) return;
        this.isFlushing = true;
        const data = this.buffer.join('');
        this.buffer = [];
        this.stream.write(data, () => {
            this.isFlushing = false;
        });
    }
}
