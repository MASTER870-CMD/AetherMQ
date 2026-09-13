import { Queue } from './Queue';

export class DeadLetterQueue extends Queue {
    // Specialized queue for messages that exceed max retries
}
