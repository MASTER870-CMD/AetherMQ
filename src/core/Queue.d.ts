import { Message } from './Message';
export declare class Queue {
    private messages;
    enqueue(msg: Message): void;
    dequeue(): Message | undefined;
    getMessagesFromOffset(offset: number): Message[];
    size(): number;
}
//# sourceMappingURL=Queue.d.ts.map