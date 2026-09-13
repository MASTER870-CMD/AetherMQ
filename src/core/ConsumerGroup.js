"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerGroup = void 0;
class ConsumerGroup {
    groupId;
    offsets = new Map(); // topic -> offset
    constructor(groupId) {
        this.groupId = groupId;
    }
    getOffset(topic) {
        return this.offsets.get(topic) || 0;
    }
    commitOffset(topic, offset) {
        this.offsets.set(topic, offset);
    }
}
exports.ConsumerGroup = ConsumerGroup;
//# sourceMappingURL=ConsumerGroup.js.map