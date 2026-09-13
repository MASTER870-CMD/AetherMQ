import { Queue } from './Queue';
import { Message } from './Message';
import { WriteAheadLog } from '../storage/WAL';
import path from 'path';

export class TopicManager {
    private topics: Map<string, Queue> = new Map();
    private wals: Map<string, WriteAheadLog> = new Map();
    private dataDir = path.join(process.cwd(), 'data');

    public getTopic(name: string): Queue {
        if (!this.topics.has(name)) {
            const queue = new Queue();
            const wal = new WriteAheadLog(this.dataDir, name);
            
            // Crash Recovery
            const recovered = wal.recover();
            recovered.forEach(msg => queue.enqueue(msg));
            if (recovered.length > 0) {
                console.log(`Recovered ${recovered.length} messages for topic: ${name}`);
            }

            this.topics.set(name, queue);
            this.wals.set(name, wal);
        }
        return this.topics.get(name)!;
    }

    public publish(topicName: string, payload: any): Message {
        const topic = this.getTopic(topicName);
        const wal = this.wals.get(topicName)!;
        
        const msg: Message = {
            id: Date.now().toString() + Math.random().toString(36).substring(7),
            topic: topicName,
            payload,
            timestamp: Date.now()
        };

        wal.append(msg);
        topic.enqueue(msg);
        return msg;
    }

    public poll(topicName: string, offset: number): Message[] {
        const topic = this.getTopic(topicName);
        return topic.getMessagesFromOffset(offset);
    }
}
