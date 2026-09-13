export class ConsumerGroup {
    private offsets: Map<string, number> = new Map(); // topic -> offset

    constructor(public readonly groupId: string) {}

    public getOffset(topic: string): number {
        return this.offsets.get(topic) || 0;
    }

    public commitOffset(topic: string, offset: number): void {
        this.offsets.set(topic, offset);
    }
}
