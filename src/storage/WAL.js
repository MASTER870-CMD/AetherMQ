"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteAheadLog = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Message_1 = require("../core/Message");
class WriteAheadLog {
    stream;
    buffer = [];
    flushInterval;
    isFlushing = false;
    filePath;
    constructor(dataDir, topic) {
        if (!fs_1.default.existsSync(dataDir)) {
            fs_1.default.mkdirSync(dataDir, { recursive: true });
        }
        this.filePath = path_1.default.join(dataDir, `${topic}.wal`);
        this.stream = fs_1.default.createWriteStream(this.filePath, { flags: 'a' });
        this.flushInterval = setInterval(() => this.flush(), 100);
    }
    append(msg) {
        this.buffer.push(JSON.stringify(msg) + '\n');
    }
    recover() {
        if (!fs_1.default.existsSync(this.filePath))
            return [];
        const content = fs_1.default.readFileSync(this.filePath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim().length > 0);
        return lines.map(line => JSON.parse(line));
    }
    flush() {
        if (this.buffer.length === 0 || this.isFlushing)
            return;
        this.isFlushing = true;
        const data = this.buffer.join('');
        this.buffer = [];
        this.stream.write(data, () => {
            this.isFlushing = false;
        });
    }
}
exports.WriteAheadLog = WriteAheadLog;
//# sourceMappingURL=WAL.js.map