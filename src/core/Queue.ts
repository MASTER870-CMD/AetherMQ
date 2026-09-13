import { Message } from './Message';

export class Queue {
    private messages: Message[] = [];

    public enqueue(msg: Message): void {
        this.messages.push(msg);
    }

    public dequeue(): Message | undefined {
        return this.messages.shift();
    }

    public size(): number {
        return this.messages.length;
    }
}
