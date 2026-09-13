export declare class ConsumerGroup {
    readonly groupId: string;
    private offsets;
    constructor(groupId: string);
    getOffset(topic: string): number;
    commitOffset(topic: string, offset: number): void;
}
//# sourceMappingURL=ConsumerGroup.d.ts.map