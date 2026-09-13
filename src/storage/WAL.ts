import fs from 'fs';
import path from 'path';
import { Message } from '../core/Message';

export class WriteAheadLog {
    private stream: fs.WriteStream;
    private buffer: string[] = [];
    private flushInterval: NodeJS.Timeout;
    private isFlushing = false;
    private filePath: string;

    constructor(dataDir: string, topic: string) {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        this.filePath = path.join(dataDir, `${topic}.wal`);
        this.stream = fs.createWriteStream(this.filePath, { flags: 'a' });
        this.flushInterval = setInterval(() => this.flush(), 100);
    }

    public append(msg: Message): void {
        this.buffer.push(JSON.stringify(msg) + '\n');
    }

    public recover(): Message[] {
        if (!fs.existsSync(this.filePath)) return [];
        const content = fs.readFileSync(this.filePath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim().length > 0);
        return lines.map(line => JSON.parse(line));
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
