import { Queue } from './Queue';
import { Message } from './Message';

export class TopicManager {
    private topics: Map<string, Queue> = new Map();

    public getTopic(name: string): Queue {
        if (!this.topics.has(name)) {
            this.topics.set(name, new Queue());
        }
        return this.topics.get(name)!;
    }

    public publish(topicName: string, msg: Message): void {
        const topic = this.getTopic(topicName);
        topic.enqueue(msg);
    }
}
