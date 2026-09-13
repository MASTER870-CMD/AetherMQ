"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const Message_1 = require("./Message");
class Queue {
    messages = [];
    enqueue(msg) {
        this.messages.push(msg);
    }
    dequeue() {
        return this.messages.shift();
    }
    getMessagesFromOffset(offset) {
        // In a real system, offset would be absolute. Here we map it to index.
        return this.messages.slice(offset);
    }
    size() {
        return this.messages.length;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map