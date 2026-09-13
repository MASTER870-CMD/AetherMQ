import fs from 'fs';
import path from 'path';
import { Message } from '../core/Message';

export class WriteAheadLog {
    private stream: fs.WriteStream;

    constructor(dataDir: string, topic: string) {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        this.stream = fs.createWriteStream(path.join(dataDir, `${topic}.wal`), { flags: 'a' });
    }

    public append(msg: Message): Promise<void> {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify(msg) + '\n';
            this.stream.write(data, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}
