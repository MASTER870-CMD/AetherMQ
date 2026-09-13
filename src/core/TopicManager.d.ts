import { Queue } from './Queue';
import { Message } from './Message';
export declare class TopicManager {
    private topics;
    private wals;
    private dataDir;
    getTopic(name: string): Queue;
    publish(topicName: string, payload: any): Message;
    poll(topicName: string, offset: number): Message[];
}
//# sourceMappingURL=TopicManager.d.ts.map