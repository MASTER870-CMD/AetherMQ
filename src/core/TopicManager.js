"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicManager = void 0;
const Queue_1 = require("./Queue");
const Message_1 = require("./Message");
const WAL_1 = require("../storage/WAL");
const path_1 = __importDefault(require("path"));
class TopicManager {
    topics = new Map();
    wals = new Map();
    dataDir = path_1.default.join(process.cwd(), 'data');
    getTopic(name) {
        if (!this.topics.has(name)) {
            const queue = new Queue_1.Queue();
            const wal = new WAL_1.WriteAheadLog(this.dataDir, name);
            // Crash Recovery
            const recovered = wal.recover();
            recovered.forEach(msg => queue.enqueue(msg));
            if (recovered.length > 0) {
                console.log(`Recovered ${recovered.length} messages for topic: ${name}`);
            }
            this.topics.set(name, queue);
            this.wals.set(name, wal);
        }
        return this.topics.get(name);
    }
    publish(topicName, payload) {
        const topic = this.getTopic(topicName);
        const wal = this.wals.get(topicName);
        const msg = {
            id: Date.now().toString() + Math.random().toString(36).substring(7),
            topic: topicName,
            payload,
            timestamp: Date.now()
        };
        wal.append(msg);
        topic.enqueue(msg);
        return msg;
    }
    poll(topicName, offset) {
        const topic = this.getTopic(topicName);
        return topic.getMessagesFromOffset(offset);
    }
}
exports.TopicManager = TopicManager;
//# sourceMappingURL=TopicManager.js.map