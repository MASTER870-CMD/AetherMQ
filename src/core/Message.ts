export interface Message {
    id: string;
    topic: string;
    payload: Buffer;
    timestamp: number;
}
