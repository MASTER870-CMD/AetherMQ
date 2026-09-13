import { Message } from './Message';

export class Queue {
    private messages: Message[] = [];

    public enqueue(msg: Message): void {
        this.messages.push(msg);
    }

    public dequeue(): Message | undefined {
        return this.messages.shift();
    }

    public getMessagesFromOffset(offset: number): Message[] {
        // In a real system, offset would be absolute. Here we map it to index.
        return this.messages.slice(offset);
    }

    public size(): number {
        return this.messages.length;
    }
}
